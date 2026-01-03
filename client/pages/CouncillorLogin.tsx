import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { AlertCircle, Lock } from "lucide-react";

export default function CouncillorLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please enter email and password");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/councillor/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // Store token and redirect
      localStorage.setItem("token", data.token);
      localStorage.setItem("userType", "councillor");
      navigate("/councillor-dashboard");
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity">
            <span className="text-sm text-primary font-semibold">← Back to Home</span>
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <Lock className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Ward Councillor</h1>
          </div>
          <p className="text-slate-600 mt-2">Access your ward's complaint management dashboard</p>
        </div>

        <Card className="border-0 shadow-lg">
          <div className="p-8">
            {error && (
              <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <p className="text-sm text-slate-700">
                <span className="font-semibold">Note:</span> Only registered councillors can log in. Contact your administrative office if you need credentials.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="councillor@ward.gov.in"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-2"
                />
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-2"
                />
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <a href="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full mt-6 font-semibold h-10"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            {/* Info for citizens */}
            <div className="mt-6 pt-6 border-t border-slate-200 text-center">
              <p className="text-sm text-slate-600">
                Are you a citizen?{" "}
                <Link to="/citizen-login" className="text-primary font-semibold hover:underline">
                  Log in here
                </Link>
              </p>
            </div>
          </div>
        </Card>

        {/* Security Notice */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-slate-700 leading-relaxed">
            <span className="font-semibold">🔒 Security:</span> This portal uses secure authentication. Your credentials are encrypted and protected. For security reasons, no password reset links will be sent. Contact your administrative office for password changes.
          </p>
        </div>
      </div>
    </div>
  );
}
