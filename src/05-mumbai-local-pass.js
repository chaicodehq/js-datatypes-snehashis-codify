/**
 * 🚂 Mumbai Local Train Pass Generator
 *
 * Aaj se tu Mumbai local ka digital pass system bana raha hai! Passenger
 * ka data milega aur tujhe ek formatted pass string generate karni hai.
 * Pass mein sab details honi chahiye ek specific format mein.
 *
 * Rules:
 *   - passenger object mein required fields: name, from, to, classType
 *   - classType must be "first" ya "second" (case-insensitive check)
 *   - Pass ID generate karo:
 *     classType ka first char uppercase + from ke pehle 3 letters uppercase
 *     + to ke pehle 3 letters uppercase
 *     Example: "first", "dadar", "andheri" => "F" + "DAD" + "AND" = "FDADAND"
 *   - Output format using template literal:
 *     Line 1: "MUMBAI LOCAL PASS"
 *     Line 2: "---"
 *     Line 3: "Name: <NAME IN UPPERCASE>"
 *     Line 4: "From: <From in Title Case>"
 *     Line 5: "To: <To in Title Case>"
 *     Line 6: "Class: <FIRST or SECOND>"
 *     Line 7: "Pass ID: <PASSID>"
 *   - Title Case = first letter uppercase, rest lowercase
 *   - Lines are separated by \n (newline)
 *   - Hint: Use template literals, slice(), toUpperCase(), toLowerCase(),
 *     charAt(), typeof
 *
 * Validation:
 *   - Agar passenger object nahi hai ya null hai, return "INVALID PASS"
 *   - Agar koi required field (name, from, to, classType) missing hai
 *     ya empty string hai, return "INVALID PASS"
 *   - Agar classType "first" ya "second" nahi hai, return "INVALID PASS"
 *
 * @param {{ name: string, from: string, to: string, classType: string }} passenger
 * @returns {string} Formatted pass or "INVALID PASS"
 *
 * @example
 *   generateLocalPass({ name: "rahul sharma", from: "dadar", to: "andheri", classType: "first" })
 *   // => "MUMBAI LOCAL PASS\n---\nName: RAHUL SHARMA\nFrom: Dadar\nTo: Andheri\nClass: FIRST\nPass ID: FDADAND"
 *
 *   generateLocalPass(null)
 *   // => "INVALID PASS"
 */
export function generateLocalPass(passenger) {
  if (passenger === null || typeof passenger !== "object")
    return "INVALID PASS";
  if (
    !passenger.hasOwnProperty("name") ||
    !passenger.hasOwnProperty("from") ||
    !passenger.hasOwnProperty("to") ||
    !passenger.hasOwnProperty("classType")
  )
    return "INVALID PASS";
  const { name, from, to, classType } = passenger;
  if (
    name.trim() === "" ||
    from.trim() === "" ||
    to.trim() === "" ||
    classType.trim() === ""
  )
    return "INVALID PASS";
  if (
    !["first","second"].includes(classType.toLowerCase())
  )
    return "INVALID PASS";
  const PASS_ID = `${classType.charAt(0).toUpperCase()}${from.slice(0, 3).toUpperCase()}${to.slice(0, 3).toUpperCase()}`;
  return `MUMBAI LOCAL PASS\n---\nName: ${name.toUpperCase()}\nFrom: ${from.charAt(0).toUpperCase()}${from.slice(1).toLowerCase()}\nTo: ${to.charAt(0).toUpperCase()}${to.slice(1)}\nClass: ${classType.toUpperCase()}\nPass ID: ${PASS_ID}`;
  // Your code here
}
console.log(generateLocalPass({name: "test", from: "dadar", to: "cst", classType: "first"}))
