import * as React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Applications from "./pages/Applications";
import Deadlines from "./pages/Deadlines";
import DocumentVault from "./pages/DocumentVault";
import NotFound from "./pages/NotFound";
import { AuthProvider, useAuth } from "@/hooks/useAuth";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60 * 24, // 24 hours
      gcTime: 1000 * 60 * 60 * 24, // 24 hours (formerly cacheTime)
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  },
});

function AuthTest() {
  const { user, isAuthenticated, role, login, logout, token } = useAuth();
  return (
    <div className="p-4 border bg-gray-50">
      <div>Authenticated: {isAuthenticated ? "Yes" : "No"}</div>
      <div>User: {user ? user.email : "None"}</div>
      <div>Role: {role}</div>
      <div>Token: {token ? token.slice(0, 20) + "..." : "None"}</div>
      <button
        className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
        onClick={() => login("admin@akios.gov", "admin123")}
      >
        Login as Admin
      </button>
      <button
        className="bg-red-500 text-white px-2 py-1 rounded"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthTest />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/deadlines" element={<Deadlines />} />
            <Route path="/documents" element={<DocumentVault />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
