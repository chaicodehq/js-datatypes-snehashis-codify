/**
 * 🍕 Zomato Order Builder
 *
 * Zomato jaisa order summary banana hai! Cart mein items hain (with quantity
 * aur addons), ek optional coupon code hai, aur tujhe final bill banana hai
 * with itemwise breakdown, taxes, delivery fee, aur discount.
 *
 * Rules:
 *   - cart is array of items:
 *     [{ name: "Butter Chicken", price: 350, qty: 2, addons: ["Extra Butter:50", "Naan:40"] }, ...]
 *   - Each addon string format: "AddonName:Price" (split by ":" to get price)
 *   - Per item total = (price + sum of addon prices) * qty
 *   - Calculate:
 *     - items: array of { name, qty, basePrice, addonTotal, itemTotal }
 *     - subtotal: sum of all itemTotals
 *     - deliveryFee: Rs 30 if subtotal < 500, Rs 15 if 500-999, FREE (0) if >= 1000
 *     - gst: 5% of subtotal, rounded to 2 decimal places parseFloat(val.toFixed(2))
 *     - discount: based on coupon (see below)
 *     - grandTotal: subtotal + deliveryFee + gst - discount (minimum 0, use Math.max)
 *     - Round grandTotal to 2 decimal places
 *
 *   Coupon codes (case-insensitive):
 *     - "FIRST50"  => 50% off subtotal, max Rs 150 (use Math.min)
 *     - "FLAT100"  => flat Rs 100 off
 *     - "FREESHIP" => delivery fee becomes 0 (discount = original delivery fee value)
 *     - null/undefined/invalid string => no discount (0)
 *
 *   - Items with qty <= 0 ko skip karo
 *   - Hint: Use map(), reduce(), filter(), split(), parseFloat(),
 *     toFixed(), Math.max(), Math.min(), toLowerCase()
 *
 * Validation:
 *   - Agar cart array nahi hai ya empty hai, return null
 *
 * @param {Array<{ name: string, price: number, qty: number, addons?: string[] }>} cart
 * @param {string} [coupon] - Optional coupon code
 * @returns {{ items: Array<{ name: string, qty: number, basePrice: number, addonTotal: number, itemTotal: number }>, subtotal: number, deliveryFee: number, gst: number, discount: number, grandTotal: number } | null}
 *
 * @example
 *   buildZomatoOrder([{ name: "Biryani", price: 300, qty: 1, addons: ["Raita:30"] }], "FLAT100")
 *   // subtotal: 330, deliveryFee: 30, gst: 16.5, discount: 100
 *   // grandTotal: 330 + 30 + 16.5 - 100 = 276.5
 *
 *   buildZomatoOrder([{ name: "Pizza", price: 500, qty: 2, addons: [] }], "FIRST50")
 *   // subtotal: 1000, deliveryFee: 0, gst: 50, discount: min(500, 150) = 150
 *   // grandTotal: 1000 + 0 + 50 - 150 = 900
 */
export function buildZomatoOrder(cart, coupon) {
  if (!Array.isArray(cart) || cart.length <= 0) return null;
  const items = cart
    .filter((val) => val.qty > 0)
    .map((item) => {
      return {
        name: item.name,
        qty: item.qty,
        basePrice: item.price,
        addonTotal: handleAddonPriceTotal(item.addons),
        itemTotal: (item.price + handleAddonPriceTotal(item.addons)) * item.qty,
      };
    });
  const subtotal = items.reduce((acc, curr) => {
    acc += curr.itemTotal;
    return acc;
  }, 0);
  const deliveryFee = handleDeliveryFee(subtotal);
  const gst = parseFloat((0.05 * subtotal).toFixed(2));
  const discount = handleCouponDiscount(coupon, subtotal);
  const grandTotal = parseFloat(
    Math.max(0, subtotal + deliveryFee + gst - discount).toFixed(2),
  );
  return {
    items,
    subtotal,
    deliveryFee:
      coupon && coupon.toLowerCase() === "freeship" ? 0 : deliveryFee,
    gst,
    discount,
    grandTotal,
  };
  // Your code here
}
function handleAddonPriceTotal(addons) {
  if (!addons || !Array.isArray(addons)) return 0;
  return addons
    .map((val) => Number(val.split(":")[1]))
    .reduce((acc, curr) => {
      acc += curr;
      return acc;
    }, 0);
}
function handleDeliveryFee(total) {
  if (total < 500) {
    return 30;
  } else if (total >= 500 && total <= 999) {
    return 15;
  } else {
    return 0;
  }
}
function handleCouponDiscount(coupon, total) {
  let initialVal = 0;
  if (!coupon || typeof coupon !== "string") return 0;
  switch (coupon.toLowerCase()) {
    case "first50":
      initialVal = Math.min(150, parseFloat((0.5 * total).toFixed(2)));
      break;
    case "flat100":
      initialVal = 100;
      break;
    case "freeship":
      initialVal = handleDeliveryFee(total);
      break;
    default:
      initialVal = 0;
      break;
  }
  return initialVal;
}
console.log(
  buildZomatoOrder(
    [{ name: "Biryani", price: 300, qty: 1, addons: ["Raita:30"] }],
    "FLAT100",
  ),
);
