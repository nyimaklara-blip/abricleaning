import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Thermomix from "./pages/Thermomix";
import Jobs from "./pages/Jobs";
import BackToTop from "./components/BackToTop";
import { ContentProvider } from "./context/ContentContext";
import Seo from "./components/Seo";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ContentProvider>
          <Seo />
          <BackToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/thermomix" element={<Thermomix />} />
            <Route path="/jobs" element={<Jobs />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ContentProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
