import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wallet, CheckCircle, Loader2, ArrowLeft, ExternalLink } from 'lucide-react';
import { walletService, WalletState } from '@/lib/wallet';
import { apiService } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { ethers } from 'ethers';

export default function Verification() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { analysis, type } = location.state || {};

  const [walletState, setWalletState] = useState<WalletState>({
    address: null,
    chainId: null,
    isConnected: false,
  });
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);

  if (!analysis) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-white">No Analysis Found</CardTitle>
            <CardDescription className="text-gray-300">
              Please analyze content first
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

  const handleConnectWallet = async () => {
    setLoading(true);
    try {
      const state = await walletService.connect();
      setWalletState(state);
      toast({ title: 'Success', description: 'Wallet connected successfully' });
    } catch (error: any) {
      toast({ 
        title: 'Error', 
        description: error.message || 'Failed to connect wallet', 
        variant: 'destructive' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePublishProof = async () => {
    if (!walletState.isConnected || !walletState.address) {
      toast({ title: 'Error', description: 'Please connect wallet first', variant: 'destructive' });
      return;
    }

    setLoading(true);
    try {
      // Generate proof hash from analysis data
      const proofData = JSON.stringify(analysis);
      const proofHash = ethers.keccak256(ethers.toUtf8Bytes(proofData));

      // Publish to backend (which would interact with smart contract)
      const result = await apiService.publishProof(proofHash, walletState.address);

      if (result.success && result.txHash) {
        setTxHash(result.txHash);
        toast({ 
          title: 'Success', 
          description: 'Proof published to blockchain successfully' 
        });
      }
    } catch (error: any) {
      toast({ 
        title: 'Error', 
        description: error.message || 'Failed to publish proof', 
        variant: 'destructive' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/results', { state: { analysis, type } })}
          className="text-white mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Results
        </Button>

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Blockchain Verification</h1>
          <p className="text-xl text-gray-300">Publish your proof to the blockchain</p>
        </div>

        <div className="space-y-6">
          {/* Wallet Connection */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Wallet Connection</CardTitle>
              <CardDescription className="text-gray-300">
                Connect your wallet to publish proof on-chain
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!walletState.isConnected ? (
                <Button 
                  onClick={handleConnectWallet}
                  disabled={loading}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Wallet className="w-4 h-4 mr-2" />}
                  Connect Wallet
                </Button>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-600/20 rounded-lg border border-green-600/50">
                    <div>
                      <p className="text-gray-400 text-sm">Connected Address</p>
                      <p className="text-white font-mono">
                        {walletState.address?.slice(0, 6)}...{walletState.address?.slice(-4)}
                      </p>
                    </div>
                    <Badge className="bg-green-600">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Connected
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Chain ID</p>
                      <p className="text-white">{walletState.chainId}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Network</p>
                      <p className="text-white">
                        {walletState.chainId === 1 ? 'Ethereum Mainnet' : `Chain ${walletState.chainId}`}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Proof Details */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Proof Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 text-sm">Content Type</p>
                  <p className="text-white capitalize">{type}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Confidence Score</p>
                  <p className="text-white">{(analysis.confidence * 100).toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Analysis Timestamp</p>
                  <p className="text-white">{new Date(analysis.timestamp).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Proof Hash</p>
                  <p className="text-white font-mono text-sm break-all">
                    {ethers.keccak256(ethers.toUtf8Bytes(JSON.stringify(analysis)))}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transaction Result */}
          {txHash && (
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 border-green-600/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Proof Published</CardTitle>
                  <Badge className="bg-green-600">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Success
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400 text-sm">Transaction Hash</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-white font-mono text-sm break-all">{txHash}</p>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => window.open(`https://etherscan.io/tx/${txHash}`, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-green-400 text-sm">
                    Your proof has been successfully published to the blockchain and is now immutable.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button 
              onClick={handlePublishProof}
              disabled={!walletState.isConnected || loading || !!txHash}
              className="flex-1 bg-purple-600 hover:bg-purple-700"
            >
              {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              {txHash ? 'Proof Published' : 'Publish Proof'}
            </Button>
            {txHash && (
              <Button 
                onClick={() => navigate('/upload')}
                variant="outline"
                className="flex-1 border-white/20 text-white hover:bg-white/10"
              >
                Verify Another
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
