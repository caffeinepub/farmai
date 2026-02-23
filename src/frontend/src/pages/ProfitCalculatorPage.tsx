import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DollarSign, Loader2, TrendingUp, TrendingDown } from 'lucide-react';
import { calculateProfit, type ProfitInput, type ProfitResult } from '@/utils/profitCalculations';
import { toast } from 'sonner';

export default function ProfitCalculatorPage() {
  const [formData, setFormData] = useState<ProfitInput>({
    cultivationCost: 44000,
    yieldQuantity: 30,
    marketPrice: 2000,
  });
  const [result, setResult] = useState<ProfitResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof ProfitInput, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: parseFloat(value) || 0 }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    const profitResult = calculateProfit(formData);
    setResult(profitResult);
    setIsLoading(false);
    
    if (profitResult.profit > 0) {
      toast.success('Profit calculation completed - Profitable!');
    } else {
      toast.error('Profit calculation completed - Loss detected');
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-background to-muted/30 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-950 flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold">Profit Calculator</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Forecast your expected returns and profit margins
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle>Financial Details</CardTitle>
              <CardDescription>Enter your cost, yield, and market price information</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="cultivationCost">Total Cultivation Cost (₹)</Label>
                  <Input
                    id="cultivationCost"
                    type="number"
                    min="0"
                    step="100"
                    value={formData.cultivationCost}
                    onChange={(e) => handleInputChange('cultivationCost', e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Total expenses including seeds, fertilizers, labor, etc.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="yieldQuantity">Expected Yield (quintals)</Label>
                  <Input
                    id="yieldQuantity"
                    type="number"
                    min="0"
                    step="0.1"
                    value={formData.yieldQuantity}
                    onChange={(e) => handleInputChange('yieldQuantity', e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Estimated crop yield in quintals (100 kg)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="marketPrice">Market Price per Quintal (₹)</Label>
                  <Input
                    id="marketPrice"
                    type="number"
                    min="0"
                    step="10"
                    value={formData.marketPrice}
                    onChange={(e) => handleInputChange('marketPrice', e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Current or expected market price per quintal
                  </p>
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Calculating...
                    </>
                  ) : (
                    'Calculate Profit'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            {result ? (
              <>
                {/* Revenue Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Expected Revenue</CardTitle>
                    <CardDescription>Total income from crop sale</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      ₹{result.revenue.toLocaleString('en-IN')}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {formData.yieldQuantity} quintals × ₹{formData.marketPrice}
                    </p>
                  </CardContent>
                </Card>

                {/* Profit/Loss Card */}
                <Card className={result.profit >= 0 
                  ? 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800'
                  : 'bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 border-red-200 dark:border-red-800'
                }>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-2xl">
                        {result.profit >= 0 ? 'Expected Profit' : 'Expected Loss'}
                      </CardTitle>
                      {result.profit >= 0 ? (
                        <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400" />
                      ) : (
                        <TrendingDown className="h-8 w-8 text-red-600 dark:text-red-400" />
                      )}
                    </div>
                    <CardDescription>
                      {result.profit >= 0 ? 'Profitable cultivation' : 'Loss-making cultivation'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className={`text-4xl font-bold ${
                      result.profit >= 0 
                        ? 'text-green-700 dark:text-green-300' 
                        : 'text-red-700 dark:text-red-300'
                    }`}>
                      {result.profit >= 0 ? '+' : ''}₹{result.profit.toLocaleString('en-IN')}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Revenue - Cultivation Cost
                    </p>
                  </CardContent>
                </Card>

                {/* Profit Margin Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Profit Margin</CardTitle>
                    <CardDescription>Return on investment percentage</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`text-3xl font-bold ${
                        result.profitMargin >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {result.profitMargin >= 0 ? '+' : ''}{result.profitMargin.toFixed(2)}%
                      </div>
                      <img
                        src="/assets/generated/profit-icon.dim_96x96.png"
                        alt="Profit"
                        className="h-12 w-12 opacity-70"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all ${
                          result.profitMargin >= 0 ? 'bg-green-600' : 'bg-red-600'
                        }`}
                        style={{ width: `${Math.min(Math.abs(result.profitMargin), 100)}%` }}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-3">
                      {result.profitMargin >= 0 
                        ? `You will earn ₹${(result.profit / formData.cultivationCost * 100).toFixed(2)} for every ₹100 invested`
                        : `You will lose ₹${Math.abs(result.profit / formData.cultivationCost * 100).toFixed(2)} for every ₹100 invested`
                      }
                    </p>
                  </CardContent>
                </Card>

                {/* Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Financial Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between pb-2 border-b">
                      <span className="text-muted-foreground">Cultivation Cost</span>
                      <span className="font-semibold">₹{formData.cultivationCost.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b">
                      <span className="text-muted-foreground">Expected Revenue</span>
                      <span className="font-semibold">₹{result.revenue.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b">
                      <span className="text-muted-foreground">Net Profit/Loss</span>
                      <span className={`font-semibold ${result.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {result.profit >= 0 ? '+' : ''}₹{result.profit.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2">
                      <span className="font-medium">Profit Margin</span>
                      <span className={`font-bold text-lg ${result.profitMargin >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {result.profitMargin >= 0 ? '+' : ''}{result.profitMargin.toFixed(2)}%
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="h-full flex items-center justify-center min-h-[400px]">
                <CardContent className="text-center py-12">
                  <DollarSign className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Calculation Yet</h3>
                  <p className="text-muted-foreground">
                    Enter your financial details and click "Calculate Profit" to see your expected returns
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
