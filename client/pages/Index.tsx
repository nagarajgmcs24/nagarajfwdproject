import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Users, CheckCircle2, Shield, AlertCircle, FileText } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white">
      {/* Navigation Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Fix My Ward</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/citizen-login">
              <Button variant="outline">Citizen Login</Button>
            </Link>
            <Link to="/councillor-login">
              <Button variant="outline">Councillor Login</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 leading-tight">
              Your Community,<br />
              <span className="text-primary">Your Voice</span>
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Fix My Ward is a transparent platform empowering citizens to report civic issues and enabling ward councillors to resolve them efficiently. Together, we build better communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/citizen-signup">
                <Button size="lg" className="w-full sm:w-auto">
                  Report an Issue
                </Button>
              </Link>
              <a href="#how-it-works">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </a>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-12 aspect-square flex items-center justify-center">
              <MapPin className="w-32 h-32 text-primary/30" />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-slate-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-4">
            How Fix My Ward Works
          </h3>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
            A simple, transparent process to track and resolve community issues
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white rounded-xl p-8 border border-slate-200 hover:border-primary/50 transition-colors">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-6">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-3">Report Issue</h4>
              <p className="text-slate-600 leading-relaxed">
                Citizens submit complaints with photos, descriptions, categories, and location details. Every issue matters.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-xl p-8 border border-slate-200 hover:border-primary/50 transition-colors">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-6">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-3">Councillor Review</h4>
              <p className="text-slate-600 leading-relaxed">
                Ward councillors review complaints, assign priorities, and update statuses. Transparency at every step.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-xl p-8 border border-slate-200 hover:border-primary/50 transition-colors">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-6">
                <CheckCircle2 className="w-6 h-6 text-success" />
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-3">Resolution</h4>
              <p className="text-slate-600 leading-relaxed">
                Citizens track progress in real-time. Once resolved, they receive updates and can view remarks from councillors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <h3 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-12">
          Powerful Features
        </h3>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Citizens Feature */}
          <div className="bg-white rounded-xl p-8 border border-slate-200">
            <Users className="w-8 h-8 text-primary mb-4" />
            <h4 className="text-2xl font-semibold text-foreground mb-4">For Citizens</h4>
            <ul className="space-y-3 text-slate-600">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold mt-1">✓</span>
                <span>Sign up and create account in minutes</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold mt-1">✓</span>
                <span>Report issues with photo, description, and category</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold mt-1">✓</span>
                <span>Auto-detect ward or select manually</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold mt-1">✓</span>
                <span>Track complaint status in real-time</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold mt-1">✓</span>
                <span>View public complaints in your ward</span>
              </li>
            </ul>
          </div>

          {/* Councillors Feature */}
          <div className="bg-white rounded-xl p-8 border border-slate-200">
            <Shield className="w-8 h-8 text-primary mb-4" />
            <h4 className="text-2xl font-semibold text-foreground mb-4">For Ward Councillors</h4>
            <ul className="space-y-3 text-slate-600">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold mt-1">✓</span>
                <span>Secure login with pre-existing credentials</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold mt-1">✓</span>
                <span>View all complaints for your assigned ward</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold mt-1">✓</span>
                <span>Update complaint status and add remarks</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold mt-1">✓</span>
                <span>Access ward-specific dashboard and statistics</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold mt-1">✓</span>
                <span>Track resolution history and performance</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-12">
            Report Any Issue Category
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {["Road", "Water", "Garbage", "Drainage", "Electricity", "Others"].map((category) => (
              <div key={category} className="bg-white rounded-lg p-6 border border-slate-200 text-center hover:shadow-md transition-shadow">
                <AlertCircle className="w-8 h-8 text-primary mx-auto mb-3" />
                <p className="font-semibold text-foreground">{category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-12 text-center">
          <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h3>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of citizens reporting issues and building better communities
          </p>
          <Link to="/citizen-signup">
            <Button size="lg" variant="secondary" className="font-semibold">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-600">
            <p>&copy; 2024 Fix My Ward. Building better communities together.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms</a>
              <a href="#" className="hover:text-primary transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
