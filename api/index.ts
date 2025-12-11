import express, { Request, Response } from 'express';
import cors from 'cors';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Analyze image endpoint
app.post('/api/analyze-image', upload.single('image'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const { originalname, mimetype, size, buffer } = req.file;
    
    // Simulate AI analysis
    const analysis = {
      filename: originalname,
      mimetype,
      size,
      detected: 'Sample detection result',
      confidence: 0.95,
      metadata: {
        width: 1920,
        height: 1080,
        format: mimetype.split('/')[1]
      },
      timestamp: new Date().toISOString()
    };

    res.json({ success: true, analysis });
  } catch (error) {
    console.error('Image analysis error:', error);
    res.status(500).json({ error: 'Failed to analyze image' });
  }
});

// Analyze video endpoint
app.post('/api/analyze-video', upload.single('video'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No video file provided' });
    }

    const { originalname, mimetype, size } = req.file;
    
    // Simulate AI analysis
    const analysis = {
      filename: originalname,
      mimetype,
      size,
      detected: 'Sample video analysis',
      confidence: 0.92,
      metadata: {
        duration: 120,
        format: mimetype.split('/')[1]
      },
      timestamp: new Date().toISOString()
    };

    res.json({ success: true, analysis });
  } catch (error) {
    console.error('Video analysis error:', error);
    res.status(500).json({ error: 'Failed to analyze video' });
  }
});

// Analyze text endpoint
app.post('/api/analyze-text', async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'No text provided' });
    }

    // Simulate AI analysis
    const analysis = {
      text,
      wordCount: text.split(/\s+/).length,
      sentiment: 'neutral',
      confidence: 0.88,
      entities: ['entity1', 'entity2'],
      timestamp: new Date().toISOString()
    };

    res.json({ success: true, analysis });
  } catch (error) {
    console.error('Text analysis error:', error);
    res.status(500).json({ error: 'Failed to analyze text' });
  }
});

// Publish proof to blockchain
app.post('/api/publish-proof', async (req: Request, res: Response) => {
  try {
    const { proofHash, walletAddress } = req.body;
    
    if (!proofHash || !walletAddress) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Simulate blockchain transaction
    const txHash = '0x' + Math.random().toString(16).substring(2, 66);
    
    res.json({ 
      success: true, 
      txHash,
      proofHash,
      walletAddress,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Publish proof error:', error);
    res.status(500).json({ error: 'Failed to publish proof' });
  }
});

// For Vercel serverless
export default app;

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
