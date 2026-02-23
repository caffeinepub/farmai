import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Leaf, Loader2 } from 'lucide-react';
import { predictCrop, type CropPredictionInput, type CropPredictionResult } from '@/utils/cropPredictionLogic';
import { toast } from 'sonner';

export default function CropPredictionPage() {
  const [formData, setFormData] = useState<CropPredictionInput>({
    temperature: 25,
    humidity: 60,
    rainfall: 100,
    ph: 6.5,
    nitrogen: 50,
    phosphorus: 50,
    potassium: 50,
  });
  const [results, setResults] = useState<CropPredictionResult[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof CropPredictionInput, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: parseFloat(value) || 0 }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    const predictions = predictCrop(formData);
    setResults(predictions);
    setIsLoading(false);
    toast.success('Crop prediction completed successfully!');
  };

  const inputFields = [
    { key: 'temperature' as const, label: 'Temperature (°C)', min: 0, max: 50, step: 0.1 },
    { key: 'humidity' as const, label: 'Humidity (%)', min: 0, max: 100, step: 1 },
    { key: 'rainfall' as const, label: 'Rainfall (mm)', min: 0, max: 500, step: 1 },
    { key: 'ph' as const, label: 'Soil pH', min: 0, max: 14, step: 0.1 },
    { key: 'nitrogen' as const, label: 'Nitrogen (N)', min: 0, max: 200, step: 1 },
    { key: 'phosphorus' as const, label: 'Phosphorus (P)', min: 0, max: 200, step: 1 },
    { key: 'potassium' as const, label: 'Potassium (K)', min: 0, max: 200, step: 1 },
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-background to-muted/30 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-950 flex items-center justify-center">
              <Leaf className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold">Crop Prediction</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Get AI-powered crop recommendations based on environmental and soil parameters
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle>Environmental & Soil Parameters</CardTitle>
              <CardDescription>Enter your field conditions for accurate predictions</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {inputFields.map((field) => (
                  <div key={field.key} className="space-y-2">
                    <Label htmlFor={field.key}>{field.label}</Label>
                    <Input
                      id={field.key}
                      type="number"
                      min={field.min}
                      max={field.max}
                      step={field.step}
                      value={formData[field.key]}
                      onChange={(e) => handleInputChange(field.key, e.target.value)}
                      required
                    />
                  </div>
                ))}
                <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    'Predict Suitable Crops'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            {results ? (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Recommended Crops</CardTitle>
                    <CardDescription>Based on your environmental and soil conditions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {results.map((result, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-4 p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
                      >
                        <img
                          src={result.icon}
                          alt={result.crop}
                          className="w-16 h-16 rounded-lg object-cover"
                          onError={(e) => {
                            e.currentTarget.src = '/assets/generated/wheat-icon.dim_128x128.png';
                          }}
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold">{result.crop}</h3>
                            <span className="text-sm font-medium text-primary">
                              {result.confidence}% Match
                            </span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2 mb-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all"
                              style={{ width: `${result.confidence}%` }}
                            />
                          </div>
                          <p className="text-sm text-muted-foreground">{result.reason}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="h-full flex items-center justify-center min-h-[400px]">
                <CardContent className="text-center py-12">
                  <Leaf className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Predictions Yet</h3>
                  <p className="text-muted-foreground">
                    Enter your field parameters and click "Predict Suitable Crops" to get AI-powered recommendations
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
