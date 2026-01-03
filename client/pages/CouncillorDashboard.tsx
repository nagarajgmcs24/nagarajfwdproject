import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, MapPin, Shield } from "lucide-react";

export default function CouncillorDashboard() {
  const navigate = useNavigate();
  const [complaints] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Shield className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold text-foreground">Fix My Ward - Councillor</h1>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-2">Councillor Dashboard</h2>
          <p className="text-slate-600">Manage complaints and resolve issues in your ward</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <p className="text-sm text-slate-600 mb-2">Total Complaints</p>
            <p className="text-3xl font-bold text-primary">0</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <p className="text-sm text-slate-600 mb-2">In Progress</p>
            <p className="text-3xl font-bold text-warning">0</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <p className="text-sm text-slate-600 mb-2">Resolved</p>
            <p className="text-3xl font-bold text-success">0</p>
          </div>
        </div>

        {/* Complaints List */}
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
          {complaints.length === 0 ? (
            <div className="py-12">
              <MapPin className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Complaints</h3>
              <p className="text-slate-600">There are currently no complaints in your ward.</p>
            </div>
          ) : (
            <p className="text-slate-600">Complaints will appear here</p>
          )}
        </div>
      </div>
    </div>
  );
}
