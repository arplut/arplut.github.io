// Google Cloud Vision AI integration service
// Replace 'YOUR_API_KEY' with your actual Google Cloud Vision API key

export interface VisionAnalysis {
  labels: Array<{
    description: string;
    score: number;
  }>;
  suggestedCategory: 'garbage' | 'sewage' | 'burning' | 'construction' | 'pollution' | 'other';
  confidence: number;
  safeSearchDetection?: {
    adult: string;
    medical: string;
    violence: string;
    racy: string;
  };
}

class VisionService {
  private apiKey = 'YOUR_GOOGLE_CLOUD_VISION_API_KEY'; // Replace with actual API key
  private apiUrl = 'https://vision.googleapis.com/v1/images:annotate';

  async analyzeImage(imageFile: File): Promise<VisionAnalysis> {
    try {
      // Convert image to base64
      const base64Image = await this.fileToBase64(imageFile);
      
      const requestBody = {
        requests: [
          {
            image: {
              content: base64Image
            },
            features: [
              {
                type: 'LABEL_DETECTION',
                maxResults: 10
              },
              {
                type: 'SAFE_SEARCH_DETECTION'
              }
            ]
          }
        ]
      };

      const response = await fetch(`${this.apiUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`Vision API error: ${response.statusText}`);
      }

      const data = await response.json();
      const annotations = data.responses[0];

      // Extract labels
      const labels = annotations.labelAnnotations || [];
      
      // Determine category based on detected labels
      const suggestedCategory = this.determineCategoryFromLabels(labels);
      
      // Calculate overall confidence
      const confidence = labels.length > 0 ? 
        labels.reduce((sum: number, label: any) => sum + label.score, 0) / labels.length : 0;

      return {
        labels: labels.map((label: any) => ({
          description: label.description,
          score: label.score
        })),
        suggestedCategory,
        confidence,
        safeSearchDetection: annotations.safeSearchAnnotation
      };
    } catch (error) {
      console.error('Vision analysis error:', error);
      
      // Return fallback analysis
      return {
        labels: [],
        suggestedCategory: 'other',
        confidence: 0,
      };
    }
  }

  private async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result as string;
        // Remove data:image/jpeg;base64, prefix
        resolve(base64.split(',')[1]);
      };
      reader.onerror = error => reject(error);
    });
  }

  private determineCategoryFromLabels(labels: any[]): VisionAnalysis['suggestedCategory'] {
    const labelDescriptions = labels.map(label => label.description.toLowerCase());
    
    // Define keywords for each category
    const categoryKeywords = {
      garbage: ['waste', 'trash', 'garbage', 'litter', 'rubbish', 'debris', 'refuse'],
      sewage: ['sewage', 'drain', 'water', 'flooding', 'pipe', 'sewer', 'waste water'],
      burning: ['fire', 'smoke', 'burning', 'flame', 'combustion', 'ash'],
      construction: ['construction', 'building', 'concrete', 'machinery', 'equipment', 'scaffolding'],
      pollution: ['pollution', 'contamination', 'chemical', 'oil', 'spill']
    };

    // Count matches for each category
    const categoryScores = Object.entries(categoryKeywords).map(([category, keywords]) => {
      const matches = keywords.filter(keyword => 
        labelDescriptions.some(label => label.includes(keyword))
      ).length;
      return { category, score: matches };
    });

    // Return category with highest score
    const bestMatch = categoryScores.reduce((prev, current) => 
      prev.score > current.score ? prev : current
    );

    return bestMatch.score > 0 ? bestMatch.category as VisionAnalysis['suggestedCategory'] : 'other';
  }

  // Batch analyze multiple images
  async analyzeImages(imageFiles: File[]): Promise<VisionAnalysis[]> {
    const analysisPromises = imageFiles.map(file => this.analyzeImage(file));
    return Promise.all(analysisPromises);
  }
}

export const visionService = new VisionService();