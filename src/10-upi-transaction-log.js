/**
 * 💸 UPI Transaction Log Analyzer
 *
 * Aaj kal sab UPI pe chalta hai! Tujhe ek month ke transactions ka log
 * milega, aur tujhe pura analysis karna hai - kitna aaya, kitna gaya,
 * kiski saath zyada transactions hue, etc.
 *
 * Rules:
 *   - transactions is array of objects:
 *     [{ id: "TXN001", type: "credit"/"debit", amount: 500,
 *        to: "Rahul", category: "food", date: "2025-01-15" }, ...]
 *   - Skip transactions where amount is not a positive number
 *   - Skip transactions where type is not "credit" or "debit"
 *   - Calculate (on valid transactions only):
 *     - totalCredit: sum of all "credit" type amounts
 *     - totalDebit: sum of all "debit" type amounts
 *     - netBalance: totalCredit - totalDebit
 *     - transactionCount: total number of valid transactions
 *     - avgTransaction: Math.round(sum of all valid amounts / transactionCount)
 *     - highestTransaction: the full transaction object with highest amount
 *     - categoryBreakdown: object with category as key and total amount as value
 *       e.g., { food: 1500, travel: 800 } (include both credit and debit)
 *     - frequentContact: the "to" field value that appears most often
 *       (if tie, return whichever appears first)
 *     - allAbove100: boolean, true if every valid transaction amount > 100 (use every)
 *     - hasLargeTransaction: boolean, true if some valid amount >= 5000 (use some)
 *   - Hint: Use filter(), reduce(), sort(), find(), every(), some(),
 *     Object.entries(), Math.round(), typeof
 *
 * Validation:
 *   - Agar transactions array nahi hai ya empty hai, return null
 *   - Agar after filtering invalid transactions, koi valid nahi bacha, return null
 *
 * @param {Array<{ id: string, type: string, amount: number, to: string, category: string, date: string }>} transactions
 * @returns {{ totalCredit: number, totalDebit: number, netBalance: number, transactionCount: number, avgTransaction: number, highestTransaction: object, categoryBreakdown: object, frequentContact: string, allAbove100: boolean, hasLargeTransaction: boolean } | null}
 *
 * @example
 *   analyzeUPITransactions([
 *     { id: "T1", type: "credit", amount: 5000, to: "Salary", category: "income", date: "2025-01-01" },
 *     { id: "T2", type: "debit", amount: 200, to: "Swiggy", category: "food", date: "2025-01-02" },
 *     { id: "T3", type: "debit", amount: 100, to: "Swiggy", category: "food", date: "2025-01-03" }
 *   ])
 *   // => { totalCredit: 5000, totalDebit: 300, netBalance: 4700,
 *   //      transactionCount: 3, avgTransaction: 1767,
 *   //      highestTransaction: { id: "T1", ... },
 *   //      categoryBreakdown: { income: 5000, food: 300 },
 *   //      frequentContact: "Swiggy", allAbove100: false, hasLargeTransaction: true }
 */
export function analyzeUPITransactions(transactions) {
  if (!Array.isArray(transactions) || transactions.length <= 0) return null;
  if (transactions.find((val) => val.amount < 0)) return null;

  const pureTransaction = transactions.filter(
    (val) => val.amount > 0 && ["credit", "debit"].includes(val.type),
  );
  if (pureTransaction.length <= 0) return null;
  const totalCredit = pureTransaction.reduce((acc, curr) => {
    if (curr.type === "credit") {
      acc += curr.amount;
    }
    return acc;
  }, 0);
  const totalDebit = pureTransaction.reduce((acc, curr) => {
    if (curr.type === "debit") {
      acc += curr.amount;
    }
    return acc;
  }, 0);
  const netBalance = totalCredit - totalDebit;
  const transactionCount = pureTransaction.length;
  const avgTransaction = Math.round(
    (totalCredit + totalDebit) / transactionCount,
  );
  const highestTransaction = pureTransaction.reduce(
    (acc, curr) => {
      if (acc.amount < curr.amount) {
        Object.assign(acc, curr);
      }
      return acc;
    },
    { amount: -Infinity },
  );
  const categoryBreakdown = pureTransaction.reduce((acc, curr) => {
    if (Object.keys(acc).includes(curr.category)) {
      return { ...acc, [curr.category]: acc[curr.category] + curr.amount };
    } else {
      return { ...acc, [curr.category]: curr.amount };
    }
  }, {});
  const contactObj = pureTransaction.reduce((acc, curr) => {
    if (Object.keys(acc).includes(curr.to)) {
      return { ...acc, [curr.to]: acc[curr.to] + 1 };
    } else {
      return { ...acc, [curr.to]: 1 };
    }
  }, {});
  let frequentContact = { name: "", freqValue: -Infinity };
  for (const [key, value] of Object.entries(contactObj)) {
    if (frequentContact.freqValue < value) {
      frequentContact = { name: key, freqValue: value };
    }
  }
  const allAbove100 = pureTransaction.every((val) => val.amount > 100);
  const hasLargeTransaction = pureTransaction.some((val) => val.amount >= 5000);
  return {
    totalCredit,
    totalDebit,
    netBalance,
    transactionCount,
    avgTransaction,
    highestTransaction,
    categoryBreakdown,
    frequentContact: frequentContact.name,
    allAbove100,
    hasLargeTransaction,
  };
  // Your code here
}
console.log(
  analyzeUPITransactions([
    {
      id: "T2",
      type: "debit",
      amount: -100,
      to: "B",
      category: "b",
      date: "2025-01-02",
    },
  ]),
);
