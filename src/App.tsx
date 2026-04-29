import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import Thermomix from "./pages/Thermomix";
import Jobs from "./pages/Jobs";
import Event from "./pages/Event";
import BackToTop from "./components/BackToTop";
import { ContentProvider } from "./context/ContentContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ContentProvider>
          <BackToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/thermomix" element={<Thermomix />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/event" element={<Event />} />
            <Route path="/admin" element={<Admin />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ContentProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
