import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Calculator, DollarSign, ShoppingCart, Target, Leaf, AlertCircle, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/assets/generated/hero-background.dim_1920x1080.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Welcome to <span className="text-green-400">FARMAI</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Intelligent Agriculture Platform Empowering Farmers with AI-Driven Insights
          </p>
          <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
            Make informed decisions with crop predictions, cost estimation, profit forecasting, and direct marketplace access
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button size="lg" className="text-lg px-8">
                Get Started
              </Button>
            </Link>
            <Link to="/marketplace">
              <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 text-white border-white hover:bg-white/20">
                Explore Marketplace
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Challenges Farmers Face</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Traditional farming practices lead to significant challenges that impact productivity and profitability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <AlertCircle className="h-12 w-12 text-destructive mb-3" />
                <CardTitle className="text-xl">Wrong Crop Selection</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Losses due to improper crop selection based on guesswork rather than data-driven insights
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <Calculator className="h-12 w-12 text-orange-500 mb-3" />
                <CardTitle className="text-xl">Lack of Predictions</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  No access to accurate cost and profit predictions before cultivation begins
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <Users className="h-12 w-12 text-yellow-600 mb-3" />
                <CardTitle className="text-xl">Middlemen Exploitation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Farmers lose significant profits due to exploitation by intermediaries in the supply chain
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <DollarSign className="h-12 w-12 text-red-600 mb-3" />
                <CardTitle className="text-xl">Financial Uncertainty</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  No clear understanding of expected profit margins before investing in cultivation
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Solution</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              FARMAI combines Machine Learning with practical tools to transform agricultural decision-making
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
              <CardHeader>
                <Leaf className="h-12 w-12 text-green-600 dark:text-green-400 mb-3" />
                <CardTitle className="text-2xl">AI Crop Prediction</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Machine Learning-based recommendations for suitable crops based on environmental and soil parameters including temperature, humidity, rainfall, pH, and nutrient levels
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
              <CardHeader>
                <Calculator className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-3" />
                <CardTitle className="text-2xl">Cost Estimation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Rule-based calculator for accurate cultivation cost estimation including seeds, fertilizers, labor, irrigation, and equipment expenses
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-purple-600 dark:text-purple-400 mb-3" />
                <CardTitle className="text-2xl">Profit Forecasting</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Formula-based profit prediction using expected yield and market prices to calculate revenue, profit margins, and return on investment
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 border-amber-200 dark:border-amber-800">
              <CardHeader>
                <ShoppingCart className="h-12 w-12 text-amber-600 dark:text-amber-400 mb-3" />
                <CardTitle className="text-2xl">Direct Marketplace</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Connect directly with buyers, eliminate middlemen, ensure fair pricing, and maximize profits through our digital marketplace platform
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Objectives Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Objectives</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              FARMAI is committed to transforming agriculture through technology and data-driven insights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <Target className="h-10 w-10 text-primary mb-2" />
                <CardTitle>ML-Based Crop Prediction</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Develop a Machine Learning system for recommending suitable crops based on environmental conditions
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Calculator className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Cost Management</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Estimate cultivation costs using rule-based agricultural parameters for better financial planning
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <DollarSign className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Income Prediction</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Predict expected income and profit using formula-based calculations for informed decision-making
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <ShoppingCart className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Direct Marketplace</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Provide a digital marketplace for farmers to sell crops directly without intermediaries
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Risk Reduction</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Reduce financial risk and improve decision-making through data-driven insights and predictions
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Leaf className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Sustainable Practices</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Promote sustainable and technology-driven agricultural practices for long-term productivity
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Transform Your Farming?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join FARMAI today and start making data-driven decisions for better yields and profits
          </p>
          <Link to="/">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Get Started
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
