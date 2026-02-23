import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/Layout';
import AuthPage from './pages/AuthPage';
import AboutPage from './pages/AboutPage';
import DashboardPage from './pages/DashboardPage';
import CropPredictionPage from './pages/CropPredictionPage';
import CostCalculatorPage from './pages/CostCalculatorPage';
import ProfitCalculatorPage from './pages/ProfitCalculatorPage';
import MarketplacePage from './pages/MarketplacePage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';

const queryClient = new QueryClient();

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: AuthPage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: () => (
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  ),
});

const cropPredictionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/crop-prediction',
  component: () => (
    <ProtectedRoute>
      <CropPredictionPage />
    </ProtectedRoute>
  ),
});

const costCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/cost-calculator',
  component: () => (
    <ProtectedRoute>
      <CostCalculatorPage />
    </ProtectedRoute>
  ),
});

const profitCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profit-calculator',
  component: () => (
    <ProtectedRoute>
      <ProfitCalculatorPage />
    </ProtectedRoute>
  ),
});

const marketplaceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/marketplace',
  component: () => (
    <ProtectedRoute>
      <MarketplacePage />
    </ProtectedRoute>
  ),
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: () => (
    <ProtectedRoute requireAdmin>
      <AdminDashboardPage />
    </ProtectedRoute>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  dashboardRoute,
  cropPredictionRoute,
  costCalculatorRoute,
  profitCalculatorRoute,
  marketplaceRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
