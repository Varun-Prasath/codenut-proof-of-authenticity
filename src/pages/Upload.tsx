import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from 'react-router-dom';
import { Upload, FileImage, FileVideo, FileText, Loader2 } from 'lucide-react';
import { apiService } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

export default function UploadPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedFile) {
      toast({ title: 'Error', description: 'Please select an image file', variant: 'destructive' });
      return;
    }

    setLoading(true);
    try {
      const result = await apiService.analyzeImage(selectedFile);
      if (result.success) {
        navigate('/results', { state: { analysis: result.analysis, type: 'image' } });
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to analyze image', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleVideoUpload = async () => {
    if (!selectedFile) {
      toast({ title: 'Error', description: 'Please select a video file', variant: 'destructive' });
      return;
    }

    setLoading(true);
    try {
      const result = await apiService.analyzeVideo(selectedFile);
      if (result.success) {
        navigate('/results', { state: { analysis: result.analysis, type: 'video' } });
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to analyze video', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleTextAnalysis = async () => {
    if (!text.trim()) {
      toast({ title: 'Error', description: 'Please enter some text', variant: 'destructive' });
      return;
    }

    setLoading(true);
    try {
      const result = await apiService.analyzeText(text);
      if (result.success) {
        navigate('/results', { state: { analysis: result.analysis, type: 'text' } });
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to analyze text', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Upload Content</h1>
          <p className="text-xl text-gray-300">Choose your content type and upload for AI analysis</p>
        </div>

        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Content Analysis</CardTitle>
            <CardDescription className="text-gray-300">
              Upload images, videos, or text for verification
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="image" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="image">
                  <FileImage className="w-4 h-4 mr-2" />
                  Image
                </TabsTrigger>
                <TabsTrigger value="video">
                  <FileVideo className="w-4 h-4 mr-2" />
                  Video
                </TabsTrigger>
                <TabsTrigger value="text">
                  <FileText className="w-4 h-4 mr-2" />
                  Text
                </TabsTrigger>
              </TabsList>

              <TabsContent value="image">
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-400 rounded-lg p-12 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <span className="text-white">Click to upload image</span>
                      <p className="text-gray-400 text-sm mt-2">PNG, JPG, GIF up to 50MB</p>
                    </label>
                    {selectedFile && (
                      <p className="text-green-400 mt-4">Selected: {selectedFile.name}</p>
                    )}
                  </div>
                  <Button 
                    onClick={handleImageUpload} 
                    disabled={loading || !selectedFile}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                    Analyze Image
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="video">
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-400 rounded-lg p-12 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="video-upload"
                    />
                    <label htmlFor="video-upload" className="cursor-pointer">
                      <span className="text-white">Click to upload video</span>
                      <p className="text-gray-400 text-sm mt-2">MP4, MOV, AVI up to 50MB</p>
                    </label>
                    {selectedFile && (
                      <p className="text-green-400 mt-4">Selected: {selectedFile.name}</p>
                    )}
                  </div>
                  <Button 
                    onClick={handleVideoUpload} 
                    disabled={loading || !selectedFile}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                    Analyze Video
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="text">
                <div className="space-y-4">
                  <Textarea
                    placeholder="Enter your text here for analysis..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="min-h-[200px] bg-white/5 border-white/20 text-white"
                  />
                  <Button 
                    onClick={handleTextAnalysis} 
                    disabled={loading || !text.trim()}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                    Analyze Text
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
