// import "./global.css";

// import { Toaster } from "@/components/ui/toaster";
// import { createRoot } from "react-dom/client";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Index from "./pages/Index";
// import CitizenSignup from "./pages/CitizenSignup";
// import CitizenLogin from "./pages/CitizenLogin";
// import CouncillorLogin from "./pages/CouncillorLogin";
// import CitizenDashboard from "./pages/CitizenDashboard";
// import CouncillorDashboard from "./pages/CouncillorDashboard";
// import SubmitComplaint from "./pages/SubmitComplaint";
// import NotFound from "./pages/NotFound";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Index />} />
//           <Route path="/citizen-signup" element={<CitizenSignup />} />
//           <Route path="/citizen-login" element={<CitizenLogin />} />
//           <Route path="/councillor-login" element={<CouncillorLogin />} />
//           <Route path="/citizen-dashboard" element={<CitizenDashboard />} />
//           <Route
//             path="/councillor-dashboard"
//             element={<CouncillorDashboard />}
//           />
//           <Route path="/submit-complaint" element={<SubmitComplaint />} />
//           {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// createRoot(document.getElementById("root")!).render(<App />);
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

import Index from "./pages/Index";
import CitizenSignup from "./pages/CitizenSignup";
import CitizenLogin from "./pages/CitizenLogin";
import CouncillorLogin from "./pages/CouncillorLogin";
import CitizenDashboard from "./pages/CitizenDashboard";
import CouncillorDashboard from "./pages/CouncillorDashboard";
import SubmitComplaint from "./pages/SubmitComplaint";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/citizen-signup" element={<CitizenSignup />} />
            <Route path="/citizen-login" element={<CitizenLogin />} />
            <Route path="/councillor-login" element={<CouncillorLogin />} />
            <Route path="/citizen-dashboard" element={<CitizenDashboard />} />
            <Route path="/councillor-dashboard" element={<CouncillorDashboard />} />
            <Route path="/submit-complaint" element={<SubmitComplaint />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

