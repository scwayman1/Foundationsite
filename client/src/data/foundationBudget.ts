// Transcribed from the supplied “Foundation Budget FY 2026-27” worksheet.
// null preserves an empty source cell; zero includes source dashes.
export type BudgetRow = { label: string; adopted: number | null; ytd: number; proposed: number };
const row = (label: string, adopted: number | null, ytd: number, proposed: number): BudgetRow => ({ label, adopted, ytd, proposed });
export const budgetRevenue = [
  row("Donations - Fundraising Events", 75000, 7750.25, 75000),
  row("Donations - Unrestricted", 25000, 15940, 100000),
  row("Donation - President's Circle", 13000, 4200, 13000),
  row("Donations - Newport Beach Campaign (Naming Opportunities)", 10000, 0, 25000),
  row("Donations - In-Kind/Non Cash", 5000, 3660, 25000),
  row("Interest Income (LTE & General)", 20000, 40579.42, 50000),
  row("Interest Return (25%)", -5000, -10144.86, -12500),
  row("Realized Gain/Loss - Exec Dir. (Stock Sold)", null, -34745.95, 0),
  row("Miscellaneous Income", null, 10, 0),
  row("Indirect Costs Revenue**", 80000, 24000, 35000),
];
export const budgetExpenses = [
  row("Advertising Expense", 10000, 0, 10000),
  row("Bad Debt", 500, 0, 500),
  row("Campus Support", 5000, 200, 5000),
  row("Ceremonies/Events", 10000, 14343.01, 25000),
  row("Conferences and Meetings", 3000, 5219.70, 7500),
  row("Consultants/Staff", 0, 0, 0),
  row("Credit Card Merchant Fees", 3000, 1471.09, 5000),
  row("Donation Exp - Transfer/In Kind (Individuals)", 5000, 0, 10000),
  row("Dues and Memberships", 3000, 30, 3000),
  row("Endowment Management Fee", 17500, 12174.90, 17500),
  row("Equipment - Purchase", 1000, 1343.33, 1000),
  row("Expenses - Naming Opportunities", 3000, 0, 3000),
  row("External Audit Fees", 0, 0, 0),
  row("Food & Beverage - Exec Dir. (Hospitality)", 10000, 3268.04, 10000),
  row("Fundraising Events Expenses", 35000, 3881.70, 35000),
  row("Insurance", 1500, 0, 1500),
  row("Misc. Donor Exp - Pres Circle", 7500, 0, 7500),
  row("Miscellaneous", 5000, 83, 5000),
  row("Office Supplies", 3000, 479.79, 3000),
  row("Permits/Licenses", 500, 100, 500),
  row("Postage", 1000, 396.14, 1000),
  row("Printing", 5000, 67.34, 5000),
  row("Public Relations", 7500, 6640.45, 7500),
  row("Sales Tax", 250, 0, 250),
  row("Software", 20000, 1415.02, 7500),
  row("Subscriptions", 200, 0, 200),
];
export const restrictedProjections = [
  row("Unrealized Assets (Planned Giving/Legacy Gifts)", 200000, 200000, 30000),
  row("Private Foundation Grants*", 300000, 200000, 200000),
  row('Donations - 5 for 50 Campaign*', 500000, 0, 150000),
  row("Scholarship Campaign", 500000, 163809, 25000),
];
// Preserve PRINTED totals, including historical inconsistencies, rather than silently rewriting the source.
export const budgetTotals = {
  revenue: row("Total unrestricted revenue", 143000, 51248.87, 310500),
  expenses: row("Total unrestricted expenses", 157450, 51113.51, 171450),
  surplus: row("Total surplus", -14450, 135.36, 139050),
};
export const budgetSourceUrl = "/documents/foundation-budget-fy2026-27.png";
export const budgetReconciliationNote = "Historical source note: the 2025/26 adopted revenue line items sum to $223,000, while the worksheet prints $143,000. The 2025/26 YTD revenue line items sum to $51,248.86, while the worksheet prints $51,248.87. Historical totals and surplus below are preserved as printed, not reconciled or corrected. All 2026/27 proposed operating totals reconcile to the line items.";
export function formatBudgetAmount(value: number | null) {
  if (value === null) return "—";
  const formatted = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(Math.abs(value));
  return value < 0 ? `(${formatted})` : formatted;
}
