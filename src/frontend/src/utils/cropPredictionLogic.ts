export interface CropPredictionInput {
  temperature: number;
  humidity: number;
  rainfall: number;
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
}

export interface CropPredictionResult {
  crop: string;
  confidence: number;
  reason: string;
  icon: string;
}

export function predictCrop(input: CropPredictionInput): CropPredictionResult[] {
  const results: CropPredictionResult[] = [];

  // Rice prediction
  if (
    input.temperature >= 20 && input.temperature <= 35 &&
    input.humidity >= 60 &&
    input.rainfall >= 150 &&
    input.ph >= 5.5 && input.ph <= 7.0
  ) {
    const confidence = Math.min(95, 70 + (input.humidity / 100) * 15 + (input.rainfall / 500) * 10);
    results.push({
      crop: 'Rice',
      confidence: Math.round(confidence),
      reason: 'High humidity and rainfall with suitable temperature make this ideal for rice cultivation',
      icon: '/assets/generated/rice-icon.dim_128x128.png',
    });
  }

  // Wheat prediction
  if (
    input.temperature >= 12 && input.temperature <= 25 &&
    input.humidity >= 40 && input.humidity <= 70 &&
    input.rainfall >= 50 && input.rainfall <= 150 &&
    input.ph >= 6.0 && input.ph <= 7.5
  ) {
    const confidence = Math.min(92, 65 + (input.nitrogen / 200) * 15 + (7 - Math.abs(input.ph - 6.5)) * 12);
    results.push({
      crop: 'Wheat',
      confidence: Math.round(confidence),
      reason: 'Moderate temperature and rainfall with good nitrogen levels are perfect for wheat',
      icon: '/assets/generated/wheat-icon.dim_128x128.png',
    });
  }

  // Corn prediction
  if (
    input.temperature >= 18 && input.temperature <= 32 &&
    input.humidity >= 50 &&
    input.rainfall >= 80 &&
    input.nitrogen >= 40 &&
    input.phosphorus >= 30
  ) {
    const confidence = Math.min(90, 68 + (input.nitrogen / 200) * 12 + (input.phosphorus / 200) * 10);
    results.push({
      crop: 'Corn',
      confidence: Math.round(confidence),
      reason: 'Good nitrogen and phosphorus levels with adequate rainfall support corn growth',
      icon: '/assets/generated/corn-icon.dim_128x128.png',
    });
  }

  // Cotton prediction
  if (
    input.temperature >= 21 && input.temperature <= 35 &&
    input.humidity >= 50 && input.humidity <= 80 &&
    input.rainfall >= 60 && input.rainfall <= 120 &&
    input.ph >= 6.0 && input.ph <= 8.0 &&
    input.potassium >= 40
  ) {
    const confidence = Math.min(88, 65 + (input.potassium / 200) * 15 + (input.temperature / 50) * 8);
    results.push({
      crop: 'Cotton',
      confidence: Math.round(confidence),
      reason: 'High temperature with good potassium levels create favorable conditions for cotton',
      icon: '/assets/generated/cotton-icon.dim_128x128.png',
    });
  }

  // Sort by confidence
  results.sort((a, b) => b.confidence - a.confidence);

  // If no crops match, provide default recommendations
  if (results.length === 0) {
    results.push({
      crop: 'Wheat',
      confidence: 60,
      reason: 'General purpose crop suitable for various conditions',
      icon: '/assets/generated/wheat-icon.dim_128x128.png',
    });
  }

  return results.slice(0, 3); // Return top 3 recommendations
}
