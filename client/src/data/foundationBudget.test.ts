import { describe, expect, it } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { budgetRevenue, budgetExpenses, restrictedProjections, budgetTotals, budgetReconciliationNote, budgetSourceUrl, formatBudgetAmount, type BudgetRow } from "./foundationBudget";
const sum = (rows: BudgetRow[], key: "adopted" | "ytd" | "proposed") => rows.reduce((total, row) => total + Math.round((row[key] ?? 0) * 100), 0) / 100;
describe("FY 2026–27 supplied budget", () => {
  it("preserves every proposed revenue line and reconciles the total", () => {
    expect(budgetRevenue.map(r => r.proposed)).toEqual([75000,100000,13000,25000,25000,50000,-12500,0,0,35000]);
    expect(sum(budgetRevenue, "proposed")).toBe(310500);
    expect(budgetTotals.revenue.proposed).toBe(310500);
  });
  it("preserves every proposed expense line and reconciles the total and surplus", () => {
    expect(budgetExpenses.map(r => r.proposed)).toEqual([10000,500,5000,25000,7500,0,5000,10000,3000,17500,1000,3000,0,10000,35000,1500,7500,5000,3000,500,1000,5000,7500,250,7500,200]);
    expect(sum(budgetExpenses, "proposed")).toBe(171450);
    expect(budgetTotals.expenses.proposed).toBe(171450);
    expect(budgetTotals.surplus.proposed).toBe(budgetTotals.revenue.proposed - budgetTotals.expenses.proposed);
    expect(budgetTotals.surplus.proposed).toBe(139050);
  });
  it("keeps restricted projections outside operating revenue", () => {
    expect(restrictedProjections.map(r => r.proposed)).toEqual([30000,200000,150000,25000]);
    expect(sum(restrictedProjections, "proposed")).toBe(405000);
    expect(budgetRevenue).toHaveLength(10);
    expect(budgetExpenses).toHaveLength(26);
  });
  it("retains printed historical totals and explicitly discloses discrepancies", () => {
    expect(sum(budgetRevenue, "adopted")).toBe(223000);
    expect(budgetTotals.revenue.adopted).toBe(143000);
    expect(sum(budgetRevenue, "ytd")).toBe(51248.86);
    expect(budgetTotals.revenue.ytd).toBe(51248.87);
    expect(sum(budgetExpenses, "adopted")).toBe(157450);
    expect(sum(budgetExpenses, "ytd")).toBe(51113.51);
    expect(budgetTotals.surplus.adopted).toBe(-14450);
    expect(budgetTotals.surplus.ytd).toBe(135.36);
    expect(budgetReconciliationNote).toContain("$223,000");
    expect(budgetReconciliationNote).toContain("$51,248.86");
  });
  it("formats negatives, zeroes, and blank cells without losing meaning", () => {
    expect(formatBudgetAmount(-12500)).toBe("($12,500.00)");
    expect(formatBudgetAmount(0)).toBe("$0.00");
    expect(formatBudgetAmount(null)).toBe("—");
  });
  it("links the supplied source and removes stale budget messaging", () => {
    expect(existsSync(`client/public${budgetSourceUrl}`)).toBe(true);
    const page = readFileSync("client/src/pages/Budget.tsx", "utf8");
    expect(page).toContain("Proposed Budget");
    expect(page).toContain("budgetSourceUrl");
    expect(page).not.toContain("2024-25");
    expect(page).not.toContain("$80,000");
    expect(page).not.toContain("acrobat.adobe.com");
    const detail = readFileSync("client/src/components/BudgetDetails.tsx", "utf8");
    expect(detail).toContain("2025/26 YTD");
    expect(detail).toContain("06/30/26");
    expect(detail).toContain("Restricted Fundraising / Campaign Projections");
  });
});
