# API Integration Guide

## Overview
This guide provides information on integrating the AI services for production deployment of NoteSong AI.

## Required API Services

### 1. Document Processing

#### PDF Processing
- **Recommended**: PDF.js or react-native-pdf
- **Purpose**: Extract text and metadata from PDF files
- **Setup**: 
  ```bash
  npm install pdfjs-dist
  # or
  npm install react-native-pdf
  ```

#### Word Document Processing
- **Recommended**: Mammoth.js
- **Purpose**: Extract text from .doc and .docx files
- **Setup**:
  ```bash
  npm install mammoth
  ```

#### PowerPoint Processing
- **Recommended**: officegen or custom parser
- **Purpose**: Extract text and slides from PPT/PPTX

### 2. Image Analysis & OCR

#### Google Cloud Vision API
- **Features**: 
  - Image labeling and classification
  - OCR (Optical Character Recognition)
  - Object detection
  - Logo detection
- **Setup**:
  ```bash
  npm install @google-cloud/vision
  ```
- **Configuration**:
  ```javascript
  const vision = require('@google-cloud/vision');
  const client = new vision.ImageAnnotatorClient({
    keyFilename: 'path/to/service-account-key.json'
  });
  ```

#### Alternative: AWS Rekognition
- **Features**: Image and video analysis
- **Setup**:
  ```bash
  npm install aws-sdk
  ```

#### Alternative: Azure Computer Vision
- **Features**: Image analysis, OCR, face detection
- **Setup**:
  ```bash
  npm install @azure/cognitiveservices-computervision
  ```

### 3. Text Summarization & Lyrics Generation

#### OpenAI GPT-4 API
- **Features**:
  - Advanced text understanding
  - Creative content generation
  - Context-aware responses
- **Setup**:
  ```bash
  npm install openai
  ```
- **Configuration**:
  ```javascript
  const { Configuration, OpenAIApi } = require("openai");
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  ```

#### Alternative: Anthropic Claude
- **Features**: Similar to GPT-4 with strong instruction following
- **Setup**:
  ```bash
  npm install @anthropic-ai/sdk
  ```

### 4. Music Generation

#### Suno AI
- **Features**: Text-to-music generation with vocals
- **Access**: Via API (contact for access)

#### Mubert API
- **Features**: AI-generated royalty-free music
- **Setup**:
  ```javascript
  // API endpoint
  const MUBERT_API = 'https://api-b2b.mubert.com/v2/RecordTrack';
  ```

#### AIVA (Artificial Intelligence Virtual Artist)
- **Features**: Composition in various styles
- **Access**: Enterprise API available

### 5. Text-to-Speech (Singing Voice)

#### Google Cloud Text-to-Speech
- **Features**: Multiple voices and languages
- **Setup**:
  ```bash
  npm install @google-cloud/text-to-speech
  ```

#### Amazon Polly
- **Features**: Neural voices with SSML support
- **Setup**:
  ```bash
  npm install @aws-sdk/client-polly
  ```

#### Azure Cognitive Services Speech
- **Features**: Neural voices, custom voices
- **Setup**:
  ```bash
  npm install microsoft-cognitiveservices-speech-sdk
  ```

## Environment Variables

Create a `.env` file in the root directory:

```env
# OpenAI
OPENAI_API_KEY=your_openai_api_key_here

# Google Cloud
GOOGLE_CLOUD_PROJECT_ID=your_project_id
GOOGLE_CLOUD_API_KEY=your_api_key

# AWS
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1

# Azure
AZURE_SUBSCRIPTION_KEY=your_subscription_key
AZURE_REGION=eastus

# Music Generation
MUBERT_API_KEY=your_mubert_key
SUNO_API_KEY=your_suno_key

# Backend API
BACKEND_API_URL=https://api.yourbackend.com
```

## Implementation Example

### Document Processing Service

```javascript
// src/services/documentService.js
import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';

export const extractTextFromPDF = async (fileUri) => {
  const pdf = await pdfjsLib.getDocument(fileUri).promise;
  let fullText = '';
  
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map(item => item.str).join(' ');
    fullText += pageText + '\n';
  }
  
  return fullText;
};

export const extractTextFromWord = async (fileUri) => {
  const result = await mammoth.extractRawText({ path: fileUri });
  return result.value;
};
```

### Image Analysis Service

```javascript
// src/services/imageAnalysisService.js
import vision from '@google-cloud/vision';

const client = new vision.ImageAnnotatorClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});

export const analyzeImage = async (imageUri) => {
  const [result] = await client.annotateImage({
    image: { source: { filename: imageUri } },
    features: [
      { type: 'LABEL_DETECTION' },
      { type: 'TEXT_DETECTION' },
      { type: 'OBJECT_LOCALIZATION' },
    ],
  });
  
  return {
    labels: result.labelAnnotations,
    text: result.textAnnotations,
    objects: result.localizedObjectAnnotations,
  };
};
```

### Lyrics Generation Service

```javascript
// src/services/lyricsService.js
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const generateLyrics = async (content, genre, imageAnalyses) => {
  const prompt = `Create educational song lyrics in ${genre} style based on:
  
  Content: ${content}
  
  Images analyzed: ${imageAnalyses.map(a => a.description).join(', ')}
  
  Make the lyrics memorable, rhythmic, and educational.`;
  
  const completion = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are an expert at creating educational song lyrics."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.8,
    max_tokens: 1000,
  });
  
  return completion.data.choices[0].message.content;
};
```

## Cost Considerations

### API Pricing (Approximate)
- **OpenAI GPT-4**: $0.03 per 1K tokens (input), $0.06 per 1K tokens (output)
- **Google Cloud Vision**: $1.50 per 1,000 images (first 1,000 free)
- **Google Cloud TTS**: $4 per 1 million characters
- **AWS Polly**: $4 per 1 million characters
- **Mubert**: Custom pricing based on usage

### Optimization Tips
1. Cache processed documents to avoid re-processing
2. Batch image analysis requests
3. Use efficient prompts to minimize token usage
4. Implement rate limiting
5. Consider using smaller models for simpler tasks

## Security Best Practices

1. **Never commit API keys** to version control
2. **Use environment variables** for all sensitive data
3. **Implement rate limiting** to prevent abuse
4. **Validate user inputs** before sending to APIs
5. **Encrypt data** in transit and at rest
6. **Use HTTPS** for all API communications
7. **Implement proper error handling** to avoid exposing sensitive information

## Backend Architecture

For production, consider implementing a backend service:

```
Mobile App → API Gateway → Backend Services → AI APIs
                ↓
           Database (User data, songs, cache)
```

### Recommended Stack
- **Backend**: Node.js with Express or NestJS
- **Database**: PostgreSQL or MongoDB
- **Storage**: AWS S3 or Google Cloud Storage
- **Queue**: Redis or RabbitMQ (for async processing)
- **Hosting**: AWS, Google Cloud, or Azure

## Testing

### Test API Integrations
```javascript
// __tests__/services/documentService.test.js
import { extractTextFromPDF } from '../src/services/documentService';

describe('Document Service', () => {
  it('should extract text from PDF', async () => {
    const text = await extractTextFromPDF('test.pdf');
    expect(text).toBeTruthy();
    expect(text.length).toBeGreaterThan(0);
  });
});
```

## Monitoring & Analytics

Implement logging and monitoring for:
- API response times
- Error rates
- Usage patterns
- Cost tracking
- User engagement metrics

### Recommended Tools
- **Logging**: Winston, Bunyan
- **Monitoring**: Datadog, New Relic, Sentry
- **Analytics**: Google Analytics, Mixpanel

## Support & Resources

- [OpenAI Documentation](https://platform.openai.com/docs)
- [Google Cloud Vision](https://cloud.google.com/vision/docs)
- [AWS Rekognition](https://docs.aws.amazon.com/rekognition/)
- [Azure Cognitive Services](https://docs.microsoft.com/azure/cognitive-services/)
- [Expo Documentation](https://docs.expo.dev/)

---

For questions or issues, please open an issue on GitHub or contact the development team.
