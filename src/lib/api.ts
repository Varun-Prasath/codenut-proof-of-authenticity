import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface AnalysisResult {
  success: boolean;
  analysis?: any;
  error?: string;
}

export interface PublishProofResult {
  success: boolean;
  txHash?: string;
  proofHash?: string;
  walletAddress?: string;
  timestamp?: string;
  error?: string;
}

export const apiService = {
  async analyzeImage(file: File): Promise<AnalysisResult> {
    const formData = new FormData();
    formData.append('image', file);

    const response = await api.post('/analyze-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },

  async analyzeVideo(file: File): Promise<AnalysisResult> {
    const formData = new FormData();
    formData.append('video', file);

    const response = await api.post('/analyze-video', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },

  async analyzeText(text: string): Promise<AnalysisResult> {
    const response = await api.post('/analyze-text', { text });
    return response.data;
  },

  async publishProof(proofHash: string, walletAddress: string): Promise<PublishProofResult> {
    const response = await api.post('/publish-proof', {
      proofHash,
      walletAddress,
    });
    return response.data;
  },

  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    const response = await api.get('/health');
    return response.data;
  },
};
