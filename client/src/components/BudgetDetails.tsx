import { budgetRevenue, budgetExpenses, restrictedProjections, budgetTotals, budgetReconciliationNote, formatBudgetAmount, type BudgetRow } from "@/data/foundationBudget";

function BudgetTable({ title, rows, totals = [] }: { title: string; rows: BudgetRow[]; totals?: BudgetRow[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white focus-visible:outline-2 focus-visible:outline-blue-600" role="region" aria-label={title} tabIndex={0}>
      <table className="w-full min-w-[760px] text-sm text-slate-700">
        <caption className="text-left p-5 font-heading font-bold text-xl text-slate-900">{title}</caption>
        <thead className="bg-slate-100 text-slate-800">
          <tr><th scope="col" className="p-4 text-left w-[40%]">Description</th><th scope="col" className="p-4 text-right">2025/26 Budget<br />(Adopted)</th><th scope="col" className="p-4 text-right">2025/26 YTD<br />(as of 06/30/26)</th><th scope="col" className="p-4 text-right text-blue-800">2026/27 Proposed<br />Budget</th></tr>
        </thead>
        <tbody>{rows.map(item => <tr key={item.label} className="border-t border-slate-100"><th scope="row" className="p-4 text-left font-normal">{item.label}</th>{(["adopted", "ytd", "proposed"] as const).map(column => <td key={column} className={`p-4 text-right whitespace-nowrap tabular-nums ${column === "proposed" ? "bg-blue-50/40 font-medium" : ""}`}>{formatBudgetAmount(item[column])}</td>)}</tr>)}</tbody>
        {totals.length > 0 && <tfoot className="bg-blue-50 font-bold text-slate-900">{totals.map(item => <tr key={item.label} className="border-t border-blue-100"><th scope="row" className="p-4 text-left">{item.label}</th>{(["adopted", "ytd", "proposed"] as const).map(column => <td key={column} className="p-4 text-right whitespace-nowrap tabular-nums">{formatBudgetAmount(item[column])}</td>)}</tr>)}</tfoot>}
      </table>
    </div>
  );
}

export default function BudgetDetails() {
  return <section className="py-16 bg-[#fafbfd]">
    <div className="container space-y-8">
      <div className="max-w-3xl"><span className="text-[11px] font-semibold text-blue-600 uppercase tracking-[0.12em]">Foundation Budget FY 2026–27</span><h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mt-3 mb-4">Proposed Operating Budget</h2><p className="text-slate-600 leading-relaxed">The supplied worksheet labels the 2026/27 budget as proposed. Prior-year adopted and year-to-date figures are shown for comparison. Restricted fundraising and campaign projections are separate from the unrestricted operating budget.</p><p className="text-sm text-slate-500 mt-3">On smaller screens, scroll each table horizontally to compare all three columns. Source dashes are displayed as $0.00; blank cells are shown as —.</p></div>
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-950 leading-relaxed">{budgetReconciliationNote}</div>
      <BudgetTable title="Income / Revenue (Unrestricted)" rows={budgetRevenue} totals={[budgetTotals.revenue]} />
      <BudgetTable title="Expenses (Unrestricted)" rows={budgetExpenses} totals={[budgetTotals.expenses, budgetTotals.surplus]} />
      <BudgetTable title="Restricted Fundraising / Campaign Projections" rows={restrictedProjections} />
      <div className="text-sm text-slate-600 space-y-2"><p>* Restricted fund accounts and fundraising projections are excluded from unrestricted operating totals.</p><p>** Temporary Restricted Fund Accounts that charge indirect costs (10%).</p></div>
    </div>
  </section>;
}
