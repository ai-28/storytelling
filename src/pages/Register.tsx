import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex">
      <div className="hidden lg:flex lg:w-1/2 hero-bg relative items-center justify-center p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary/70" />
        <div className="relative z-10 max-w-md text-center">
          <h1 className="font-display text-4xl font-bold text-primary-foreground mb-4">
            Observe<span className="text-secondary"> Life</span>
          </h1>
          <p className="font-body text-primary-foreground/70 text-lg leading-relaxed">
            Join families and facilities preserving life stories across generations.
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 text-center">
            <h1 className="font-display text-2xl font-bold text-foreground">
              Observe<span className="text-secondary"> Life</span>
            </h1>
          </div>

          <h2 className="font-display text-2xl font-bold text-foreground mb-2">Create your account</h2>
          <p className="font-body text-muted-foreground mb-8">Start preserving the stories that matter</p>

          <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); navigate("/login"); }}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-body">First Name</Label>
                <Input placeholder="Jane" className="font-body" />
              </div>
              <div className="space-y-2">
                <Label className="font-body">Last Name</Label>
                <Input placeholder="Doe" className="font-body" />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-body">Email</Label>
              <Input type="email" placeholder="you@example.com" className="font-body" />
            </div>

            <div className="space-y-2">
              <Label className="font-body">Password</Label>
              <Input type="password" placeholder="Minimum 8 characters" className="font-body" />
            </div>

            <div className="space-y-2">
              <Label className="font-body">I am joining as</Label>
              <select className="w-full h-10 rounded-md border border-input bg-background px-3 font-body text-sm">
                <option>Family Member (invited by a facility)</option>
                <option>Family Member (personal account)</option>
                <option>Facility Staff</option>
                <option>Facility Administrator</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label className="font-body">Invitation Code (if applicable)</Label>
              <Input placeholder="Enter code from your invitation email" className="font-body" />
            </div>

            <Button variant="hero" size="lg" className="w-full">
              Create Account
            </Button>

            <p className="text-center font-body text-sm text-muted-foreground">
              Already have an account?{" "}
              <a href="/login" className="text-secondary hover:underline font-medium">
                Sign in
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
