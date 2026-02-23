import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, Loader2 } from 'lucide-react';
import { calculateCost, type CostInput, type CostBreakdown } from '@/utils/costCalculations';
import { toast } from 'sonner';

export default function CostCalculatorPage() {
  const [formData, setFormData] = useState<CostInput>({
    cropType: 'rice',
    landArea: 1,
    seeds: 5000,
    fertilizers: 8000,
    labor: 15000,
    irrigation: 6000,
    equipment: 10000,
  });
  const [breakdown, setBreakdown] = useState<CostBreakdown | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof CostInput, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: typeof value === 'string' ? value : parseFloat(value.toString()) || 0 }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    const result = calculateCost(formData);
    setBreakdown(result);
    setIsLoading(false);
    toast.success('Cost calculation completed!');
  };

  const crops = [
    { value: 'rice', label: 'Rice' },
    { value: 'wheat', label: 'Wheat' },
    { value: 'corn', label: 'Corn' },
    { value: 'cotton', label: 'Cotton' },
    { value: 'sugarcane', label: 'Sugarcane' },
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-background to-muted/30 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-950 flex items-center justify-center">
              <Calculator className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold">Cost Calculator</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Estimate your cultivation costs with detailed breakdown
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle>Cultivation Details</CardTitle>
              <CardDescription>Enter your crop and cost information</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cropType">Crop Type</Label>
                  <Select value={formData.cropType} onValueChange={(value) => handleInputChange('cropType', value)}>
                    <SelectTrigger id="cropType">
                      <SelectValue placeholder="Select crop" />
                    </SelectTrigger>
                    <SelectContent>
                      {crops.map((crop) => (
                        <SelectItem key={crop.value} value={crop.value}>
                          {crop.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="landArea">Land Area (acres)</Label>
                  <Input
                    id="landArea"
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={formData.landArea}
                    onChange={(e) => handleInputChange('landArea', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="seeds">Seeds Cost (₹)</Label>
                  <Input
                    id="seeds"
                    type="number"
                    min="0"
                    value={formData.seeds}
                    onChange={(e) => handleInputChange('seeds', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fertilizers">Fertilizers Cost (₹)</Label>
                  <Input
                    id="fertilizers"
                    type="number"
                    min="0"
                    value={formData.fertilizers}
                    onChange={(e) => handleInputChange('fertilizers', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="labor">Labor Cost (₹)</Label>
                  <Input
                    id="labor"
                    type="number"
                    min="0"
                    value={formData.labor}
                    onChange={(e) => handleInputChange('labor', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="irrigation">Irrigation Cost (₹)</Label>
                  <Input
                    id="irrigation"
                    type="number"
                    min="0"
                    value={formData.irrigation}
                    onChange={(e) => handleInputChange('irrigation', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="equipment">Equipment Cost (₹)</Label>
                  <Input
                    id="equipment"
                    type="number"
                    min="0"
                    value={formData.equipment}
                    onChange={(e) => handleInputChange('equipment', e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Calculating...
                    </>
                  ) : (
                    'Calculate Total Cost'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            {breakdown ? (
              <>
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
                  <CardHeader>
                    <CardTitle className="text-2xl">Total Cultivation Cost</CardTitle>
                    <CardDescription>For {formData.landArea} acres of {formData.cropType}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold text-blue-700 dark:text-blue-300">
                      ₹{breakdown.total.toLocaleString('en-IN')}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      ₹{(breakdown.total / formData.landArea).toLocaleString('en-IN', { maximumFractionDigits: 2 })} per acre
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Cost Breakdown</CardTitle>
                    <CardDescription>Itemized cultivation expenses</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {breakdown.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between pb-3 border-b last:border-0">
                        <div className="flex-1">
                          <p className="font-medium">{item.category}</p>
                          <div className="w-full bg-muted rounded-full h-2 mt-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all"
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <p className="font-semibold">₹{item.amount.toLocaleString('en-IN')}</p>
                          <p className="text-sm text-muted-foreground">{item.percentage.toFixed(1)}%</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="h-full flex items-center justify-center min-h-[400px]">
                <CardContent className="text-center py-12">
                  <img
                    src="/assets/generated/calculator-icon.dim_96x96.png"
                    alt="Calculator"
                    className="h-24 w-24 mx-auto mb-4 opacity-50"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <Calculator className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Calculation Yet</h3>
                  <p className="text-muted-foreground">
                    Enter your cultivation details and click "Calculate Total Cost" to see the breakdown
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
