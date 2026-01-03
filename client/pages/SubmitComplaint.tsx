import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { LogOut, MapPin, Upload, AlertCircle } from "lucide-react";

export default function SubmitComplaint() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    navigate("/");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Implementation will be added in full backend setup
    setTimeout(() => {
      setLoading(false);
      navigate("/citizen-dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <MapPin className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold text-foreground">Fix My Ward</h1>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/citizen-dashboard"
            className="inline-flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity"
          >
            <span className="text-sm text-primary font-semibold">
              ← Back to Dashboard
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">
            Report an Issue
          </h1>
          <p className="text-slate-600 mt-2">
            Help improve your community by reporting civic problems
          </p>
        </div>

        <Card className="border-0 shadow-lg">
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <Label htmlFor="title" className="text-sm font-medium">
                  Problem Title
                </Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="e.g., Pothole on Main Street"
                  className="mt-2"
                />
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description" className="text-sm font-medium">
                  Description
                </Label>
                <textarea
                  id="description"
                  placeholder="Describe the issue in detail..."
                  className="mt-2 w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={4}
                />
              </div>

              {/* Category */}
              <div>
                <Label htmlFor="category" className="text-sm font-medium">
                  Category
                </Label>
                <select
                  id="category"
                  className="mt-2 w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select a category</option>
                  <option value="road">Road</option>
                  <option value="water">Water</option>
                  <option value="garbage">Garbage</option>
                  <option value="drainage">Drainage</option>
                  <option value="electricity">Electricity</option>
                  <option value="others">Others</option>
                </select>
              </div>

              {/* Ward Number */}
              <div>
                <Label htmlFor="ward" className="text-sm font-medium">
                  Ward Number
                </Label>
                <Input
                  id="ward"
                  type="text"
                  placeholder="e.g., Ward 5"
                  className="mt-2"
                />
              </div>

              {/* Photo Upload */}
              <div>
                <Label htmlFor="photo" className="text-sm font-medium">
                  Photo (Required)
                </Label>
                <div className="mt-2 border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-600">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    PNG, JPG, GIF up to 10MB
                  </p>
                  <input
                    id="photo"
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full font-semibold h-10"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Complaint"}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-blue-800">
                Your complaint will be reviewed by your ward councillor. You'll
                receive updates on its status.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
