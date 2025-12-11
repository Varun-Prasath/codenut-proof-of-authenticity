import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { analysis, type } = location.state || {};
  const [walletConnected, setWalletConnected] = useState(false);

  if (!analysis) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-white">No Results Found</CardTitle>
            <CardDescription className="text-gray-300">
              Please upload content first
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/upload')} className="bg-purple-600 hover:bg-purple-700">
              Go to Upload
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handlePublishProof = () => {
    navigate('/verification', { state: { analysis, type } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/upload')}
          className="text-white mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Upload
        </Button>

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Analysis Results</h1>
          <p className="text-xl text-gray-300">Review your content analysis</p>
        </div>

        <div className="space-y-6">
          {/* Status Card */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Verification Status</CardTitle>
                <Badge className="bg-green-600">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Verified
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Content Type</p>
                  <p className="text-white font-semibold capitalize">{type}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Confidence Score</p>
                  <p className="text-white font-semibold">
                    {(analysis.confidence * 100).toFixed(1)}%
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Timestamp</p>
                  <p className="text-white font-semibold">
                    {new Date(analysis.timestamp).toLocaleString()}
                  </p>
                </div>
                {analysis.filename && (
                  <div>
                    <p className="text-gray-400 text-sm">Filename</p>
                    <p className="text-white font-semibold">{analysis.filename}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Analysis Details */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Analysis Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {type === 'text' && (
                  <>
                    <div>
                      <p className="text-gray-400 text-sm">Word Count</p>
                      <p className="text-white">{analysis.wordCount}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Sentiment</p>
                      <p className="text-white capitalize">{analysis.sentiment}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Detected Entities</p>
                      <div className="flex gap-2 mt-2">
                        {analysis.entities?.map((entity: string, i: number) => (
                          <Badge key={i} variant="secondary">{entity}</Badge>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                {(type === 'image' || type === 'video') && (
                  <>
                    <div>
                      <p className="text-gray-400 text-sm">Detection Result</p>
                      <p className="text-white">{analysis.detected}</p>
                    </div>
                    {analysis.metadata && (
                      <div>
                        <p className="text-gray-400 text-sm">Metadata</p>
                        <pre className="text-white bg-black/30 p-4 rounded mt-2 overflow-auto">
                          {JSON.stringify(analysis.metadata, null, 2)}
                        </pre>
                      </div>
                    )}
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button 
              onClick={handlePublishProof}
              className="flex-1 bg-purple-600 hover:bg-purple-700"
            >
              Publish Proof to Blockchain
            </Button>
            <Button 
              onClick={() => navigate('/upload')}
              variant="outline"
              className="flex-1 border-white/20 text-white hover:bg-white/10"
            >
              Analyze Another
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
