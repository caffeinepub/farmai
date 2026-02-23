import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import CropPredictionPage from './pages/CropPredictionPage';
import CostCalculatorPage from './pages/CostCalculatorPage';
import ProfitCalculatorPage from './pages/ProfitCalculatorPage';
import MarketplacePage from './pages/MarketplacePage';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LandingPage,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: DashboardPage,
});

const cropPredictionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/crop-prediction',
  component: CropPredictionPage,
});

const costCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/cost-calculator',
  component: CostCalculatorPage,
});

const profitCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profit-calculator',
  component: ProfitCalculatorPage,
});

const marketplaceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/marketplace',
  component: MarketplacePage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  dashboardRoute,
  cropPredictionRoute,
  costCalculatorRoute,
  profitCalculatorRoute,
  marketplaceRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
