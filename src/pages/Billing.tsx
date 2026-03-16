import { mockOrg, mockAnalytics } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { CreditCard, Download, Building2 } from "lucide-react";

const Billing = () => {
  const ratePerResident = mockOrg.type === "SNF" ? 10 : mockOrg.type === "AL" ? 8 : 15;
  const monthlyTotal = Math.max(500, mockOrg.residentsCount * ratePerResident);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">Billing & Subscription</h1>
        <p className="font-body text-muted-foreground mt-1">{mockOrg.name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl bg-card border border-border p-5">
          <p className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1">Plan Type</p>
          <p className="font-display text-2xl font-bold text-foreground">{mockOrg.type}</p>
          <p className="font-body text-sm text-secondary">${ratePerResident}/resident/mo</p>
        </div>
        <div className="rounded-xl bg-card border border-border p-5">
          <p className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1">Active Residents</p>
          <p className="font-display text-2xl font-bold text-foreground">{mockOrg.residentsCount}</p>
          <Button variant="ghost" size="sm" className="font-body text-secondary p-0 h-auto text-xs">Update Census</Button>
        </div>
        <div className="rounded-xl bg-card border border-border p-5">
          <p className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1">Monthly Total</p>
          <p className="font-display text-2xl font-bold text-foreground">${monthlyTotal}</p>
          <p className="font-body text-xs text-muted-foreground">$500 minimum floor</p>
        </div>
      </div>

      <div className="rounded-2xl bg-card border border-border p-6 space-y-4">
        <h2 className="font-display text-lg font-semibold text-foreground">Billing Details</h2>
        <div className="space-y-3 font-body text-sm">
          <Row label="Contract Start" value={mockOrg.contractStart} />
          <Row label="Billing Cycle" value="Monthly (anchored to contract start)" />
          <Row label="Next Billing Date" value="2025-04-15" />
          <Row label="Payment Status">
            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-semibold capitalize">
              {mockOrg.billingStatus}
            </span>
          </Row>
          <Row label="Payment Method">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-muted-foreground" />
              <span>•••• •••• •••• 4242</span>
            </div>
          </Row>
        </div>
        <div className="flex gap-3 pt-2">
          <Button variant="outline" className="font-body">
            <CreditCard className="w-4 h-4 mr-2" /> Manage Payment Method
          </Button>
          <Button variant="outline" className="font-body">
            <Download className="w-4 h-4 mr-2" /> Download Invoice
          </Button>
        </div>
      </div>

      <div className="rounded-2xl bg-card border border-border p-6">
        <h2 className="font-display text-lg font-semibold text-foreground mb-4">Billing History</h2>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left font-body text-xs font-semibold text-muted-foreground uppercase py-2">Date</th>
              <th className="text-left font-body text-xs font-semibold text-muted-foreground uppercase py-2">Amount</th>
              <th className="text-left font-body text-xs font-semibold text-muted-foreground uppercase py-2">Residents</th>
              <th className="text-left font-body text-xs font-semibold text-muted-foreground uppercase py-2">Status</th>
              <th className="py-2"></th>
            </tr>
          </thead>
          <tbody>
            {[
              { date: "Mar 15, 2025", amount: "$500", residents: 47, status: "Paid" },
              { date: "Feb 15, 2025", amount: "$500", residents: 45, status: "Paid" },
              { date: "Jan 15, 2025", amount: "$500", residents: 42, status: "Paid" },
            ].map((inv, i) => (
              <tr key={i} className="border-b border-border/50">
                <td className="py-3 font-body text-sm text-foreground">{inv.date}</td>
                <td className="py-3 font-body text-sm font-medium text-foreground">{inv.amount}</td>
                <td className="py-3 font-body text-sm text-muted-foreground">{inv.residents}</td>
                <td className="py-3"><span className="font-body text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{inv.status}</span></td>
                <td className="py-3"><Button variant="ghost" size="sm" className="font-body text-xs">PDF</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Row = ({ label, value, children }: { label: string; value?: string; children?: React.ReactNode }) => (
  <div className="flex justify-between py-2 border-b border-border/50">
    <span className="text-muted-foreground">{label}</span>
    {children || <span className="font-medium text-foreground">{value}</span>}
  </div>
);

export default Billing;
