/**
 * 🧾 GST Calculator - Tax Lagao Bhai!
 *
 * Bunty apni dukaan ke liye GST calculator bana raha hai. Customer ko bill
 * dena hai jisme base price, GST amount, aur total clearly dikhna chahiye.
 * GST rate category ke hisaab se change hota hai.
 *
 * GST Rates (by category string, case-insensitive):
 *   - "essential"   => 0% GST  (dal, chawal, atta, etc.)
 *   - "food"        => 5% GST  (packaged food, restaurant below Rs 7500)
 *   - "standard"    => 12% GST (processed food, business class tickets)
 *   - "electronics" => 18% GST (phones, laptops, etc.)
 *   - "luxury"      => 28% GST (cars, aerated drinks, tobacco)
 *   - Any other category => return null
 *
 * Rules:
 *   - Calculate: gstAmount = amount * rate / 100
 *   - Calculate: totalAmount = amount + gstAmount
 *   - Round gstAmount aur totalAmount to 2 decimal places using
 *     parseFloat(value.toFixed(2))
 *   - Return object: { baseAmount, gstRate, gstAmount, totalAmount }
 *   - category ko lowercase mein compare karo (case-insensitive)
 *   - Hint: Use toFixed(), parseFloat(), Number.isFinite(), toLowerCase()
 *
 * Validation:
 *   - Agar amount positive finite number nahi hai, return null
 *   - Agar category string nahi hai, return null
 *   - Agar category unknown hai, return null
 *
 * @param {number} amount - Base amount before tax
 * @param {string} category - Product category
 * @returns {{ baseAmount: number, gstRate: number, gstAmount: number, totalAmount: number } | null}
 *
 * @example
 *   calculateGST(1000, "electronics")
 *   // => { baseAmount: 1000, gstRate: 18, gstAmount: 180, totalAmount: 1180 }
 *
 *   calculateGST(500, "essential")
 *   // => { baseAmount: 500, gstRate: 0, gstAmount: 0, totalAmount: 500 }
 */
export function calculateGST(amount, category) {
  if (amount <= 0 || !Number.isFinite(amount)) return null;
  if (typeof category !== "string") return null;
  let baseObj = null;
  switch (category.toLowerCase()) {
    case "essential":
      baseObj = {
        baseAmount: amount,
        gstRate: 0,
        gstAmount: handleGSTAmount(amount, 0),
        totalAmount: handleTotalAmount(amount, 0),
      };
      break;
    case "food":
      baseObj = {
        baseAmount: amount,
        gstRate: 5,
        gstAmount: handleGSTAmount(amount, 5),
        totalAmount: handleTotalAmount(amount, 5),
      };
      break;
    case "standard":
      baseObj = {
        baseAmount: amount,
        gstRate: 12,
        gstAmount: handleGSTAmount(amount, 12),
        totalAmount: handleTotalAmount(amount, 12),
      };
      break;
    case "electronics":
      baseObj = {
        baseAmount: amount,
        gstRate: 18,
        gstAmount: handleGSTAmount(amount, 18),
        totalAmount: handleTotalAmount(amount, 18),
      };
      break;
    case "luxury":
      baseObj = {
        baseAmount: amount,
        gstRate: 28,
        gstAmount: handleGSTAmount(amount, 28),
        totalAmount: handleTotalAmount(amount, 28),
      };
      break;
    default:
      baseObj = null;
      break;
  }
  return baseObj;
  // Your code here
}
function handleGSTAmount(amount, rate) {
  return parseFloat(((amount * rate) / 100).toFixed(2));
}
function handleTotalAmount(amount, rate) {
  return parseFloat(Number(amount + handleGSTAmount(amount, rate)).toFixed(2));
}
