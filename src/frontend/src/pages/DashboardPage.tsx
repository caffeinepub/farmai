import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Leaf, Calculator, DollarSign, ShoppingCart, ArrowRight, Activity } from 'lucide-react';

export default function DashboardPage() {
  const metrics = [
    {
      label: 'Crops Managed',
      value: '12',
      change: '+3 this month',
      icon: Leaf,
      color: 'text-green-600',
    },
    {
      label: 'Estimated Profits',
      value: '₹2,45,000',
      change: '+18% from last season',
      icon: TrendingUp,
      color: 'text-blue-600',
    },
    {
      label: 'Active Listings',
      value: '8',
      change: '3 pending buyers',
      icon: ShoppingCart,
      color: 'text-purple-600',
    },
    {
      label: 'Recommendations',
      value: '5',
      change: 'New insights available',
      icon: Activity,
      color: 'text-orange-600',
    },
  ];

  const quickActions = [
    {
      title: 'Crop Prediction',
      description: 'Get AI-powered crop recommendations',
      icon: Leaf,
      path: '/crop-prediction',
      color: 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300',
    },
    {
      title: 'Cost Calculator',
      description: 'Estimate cultivation expenses',
      icon: Calculator,
      path: '/cost-calculator',
      color: 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300',
    },
    {
      title: 'Profit Calculator',
      description: 'Forecast your expected returns',
      icon: DollarSign,
      path: '/profit-calculator',
      color: 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300',
    },
  ];

  const recentActivity = [
    { action: 'Crop prediction completed', crop: 'Rice', time: '2 hours ago' },
    { action: 'Cost estimation saved', crop: 'Wheat', time: '5 hours ago' },
    { action: 'New marketplace listing', crop: 'Cotton', time: '1 day ago' },
    { action: 'Profit calculation updated', crop: 'Corn', time: '2 days ago' },
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'url(/assets/generated/dashboard-bg.dim_1600x900.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Farmer Dashboard</h1>
          <p className="text-muted-foreground text-lg">
            Welcome back! Here's an overview of your farming operations
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.label}
                </CardTitle>
                <metric.icon className={`h-5 w-5 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-1">{metric.value}</div>
                <p className="text-xs text-muted-foreground">{metric.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.path}>
                <Card className="hover:shadow-lg transition-all hover:scale-105 cursor-pointer h-full">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-3`}>
                      <action.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{action.title}</CardTitle>
                    <CardDescription className="text-base">{action.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" className="w-full justify-between group">
                      Get Started
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity & Marketplace */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Recent Activity</CardTitle>
              <CardDescription>Your latest farming operations and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 pb-3 border-b last:border-0">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                    <div className="flex-1">
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.crop} • {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Marketplace Quick Access */}
          <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 border-amber-200 dark:border-amber-800">
            <CardHeader>
              <ShoppingCart className="h-10 w-10 text-amber-600 dark:text-amber-400 mb-2" />
              <CardTitle className="text-xl">Marketplace</CardTitle>
              <CardDescription>Connect directly with buyers and sell your crops</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Active Listings: 8</p>
                <p className="text-sm font-medium">Pending Inquiries: 3</p>
                <p className="text-sm font-medium">Total Sales: ₹1,85,000</p>
              </div>
              <Link to="/marketplace">
                <Button className="w-full" size="lg">
                  Visit Marketplace
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
