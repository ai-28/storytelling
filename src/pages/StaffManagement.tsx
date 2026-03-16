import { useState } from "react";
import { mockStaffMembers } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, Plus, MoreVertical } from "lucide-react";

const StaffManagement = () => {
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Staff Management</h1>
          <p className="font-body text-muted-foreground mt-1">
            {mockStaffMembers.filter(s => s.active).length} active staff members
          </p>
        </div>
        <Button variant="hero" onClick={() => setShowAdd(!showAdd)}>
          <Plus className="w-4 h-4 mr-2" /> Add Staff
        </Button>
      </div>

      {showAdd && (
        <div className="rounded-2xl bg-card border border-secondary/20 p-6 space-y-4">
          <h2 className="font-display text-lg font-semibold text-foreground">Add New Staff Member</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-body">Full Name</Label>
              <Input placeholder="Jane Smith" className="font-body" />
            </div>
            <div className="space-y-2">
              <Label className="font-body">Email</Label>
              <Input type="email" placeholder="jane@facility.com" className="font-body" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-body">Role</Label>
              <select className="w-full h-10 rounded-md border border-input bg-background px-3 font-body text-sm">
                <option>Facilitator</option>
                <option>Therapist</option>
                <option>Admin</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label className="font-body">Department</Label>
              <Input placeholder="e.g., Activities, OT/PT" className="font-body" />
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="hero">Send Invitation</Button>
            <Button variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
          </div>
        </div>
      )}

      <div className="rounded-2xl bg-card border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-5">Name</th>
              <th className="text-left font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-5">Email</th>
              <th className="text-left font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-5">Role</th>
              <th className="text-left font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-5">Department</th>
              <th className="text-left font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-5">Last Login</th>
              <th className="text-left font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-5">Status</th>
              <th className="py-3 px-5"></th>
            </tr>
          </thead>
          <tbody>
            {mockStaffMembers.map(staff => (
              <tr key={staff.id} className="border-b border-border/50 hover:bg-muted/20">
                <td className="py-3 px-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-body text-xs font-bold">
                      {staff.name.charAt(0)}
                    </div>
                    <span className="font-body text-sm font-medium text-foreground">{staff.name}</span>
                  </div>
                </td>
                <td className="py-3 px-5 font-body text-sm text-muted-foreground">{staff.email}</td>
                <td className="py-3 px-5">
                  <span className="font-body text-xs font-semibold bg-muted text-muted-foreground px-2 py-0.5 rounded-full capitalize">
                    {staff.role.toLowerCase()}
                  </span>
                </td>
                <td className="py-3 px-5 font-body text-sm text-muted-foreground">{staff.department}</td>
                <td className="py-3 px-5 font-body text-sm text-muted-foreground">{staff.lastLogin}</td>
                <td className="py-3 px-5">
                  <span className={`font-body text-xs font-semibold px-2 py-0.5 rounded-full ${
                    staff.active ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"
                  }`}>
                    {staff.active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="py-3 px-5">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffManagement;
