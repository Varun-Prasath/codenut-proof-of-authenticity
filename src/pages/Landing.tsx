import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Upload, Shield, CheckCircle, Zap } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-6">
            AI Content Verification
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Upload images, videos, or text for AI-powered analysis and publish verifiable proofs on the blockchain
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate('/upload')}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg"
          >
            Get Started
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader>
              <Upload className="w-12 h-12 text-purple-400 mb-4" />
              <CardTitle className="text-white">Multi-Format Upload</CardTitle>
              <CardDescription className="text-gray-300">
                Support for images, videos, and text analysis
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader>
              <Zap className="w-12 h-12 text-yellow-400 mb-4" />
              <CardTitle className="text-white">AI-Powered Analysis</CardTitle>
              <CardDescription className="text-gray-300">
                Advanced AI algorithms for content verification
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader>
              <Shield className="w-12 h-12 text-blue-400 mb-4" />
              <CardTitle className="text-white">Blockchain Proof</CardTitle>
              <CardDescription className="text-gray-300">
                Immutable verification records on-chain
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader>
              <CheckCircle className="w-12 h-12 text-green-400 mb-4" />
              <CardTitle className="text-white">Instant Results</CardTitle>
              <CardDescription className="text-gray-300">
                Get verification results in seconds
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* How It Works */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Upload Content</h3>
              <p className="text-gray-300">Upload your image, video, or text for analysis</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">AI Analysis</h3>
              <p className="text-gray-300">Our AI analyzes and verifies your content</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Publish Proof</h3>
              <p className="text-gray-300">Store verification proof on the blockchain</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
