import { useState } from 'react';
import { Scan } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FileUploader } from '@/components/FileUploader';
import { OcrResult } from '@/components/OcrResult';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [ocrResult, setOcrResult] = useState<{ text: string; fileName: string } | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Sanitize filename - replace spaces and special chars
      const sanitizedName = selectedFile.name
        .replace(/\s+/g, '_')
        .replace(/[^a-zA-Z0-9._-]/g, '');
      const filePath = `${Date.now()}_${sanitizedName}`;

      // Create job record
      const { data: job, error: jobError } = await supabase
        .from('ocr_jobs')
        .insert({
          file_name: selectedFile.name,
          file_path: filePath,
          file_size: selectedFile.size,
          mime_type: selectedFile.type,
          status: 'pending',
        })
        .select()
        .single();

      if (jobError || !job) {
        throw new Error('Failed to create job');
      }

      setUploadProgress(20);

      // Upload file to storage
      const { error: uploadError } = await supabase.storage
        .from('ocr-uploads')
        .upload(job.file_path, selectedFile);

      if (uploadError) {
        throw new Error('Failed to upload file');
      }

      setUploadProgress(40);

      // Call OCR edge function
      const { data, error: functionError } = await supabase.functions.invoke('process-ocr', {
        body: { jobId: job.id },
      });

      if (functionError) {
        throw new Error('Failed to process OCR');
      }

      setUploadProgress(100);

      if (data.success && data.text) {
        setOcrResult({
          text: data.text,
          fileName: selectedFile.name,
        });
        toast.success('OCR completed successfully!');
      } else {
        throw new Error('No text extracted');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to process file');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setOcrResult(null);
    setUploadProgress(0);
  };

  if (ocrResult) {
    return (
      <div className="min-h-screen bg-gradient-hero p-6">
        <div className="container mx-auto py-12">
          <OcrResult
            text={ocrResult.text}
            fileName={ocrResult.fileName}
            onReset={handleReset}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
            <Scan className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered OCR</span>
          </div>
          <h1 className="text-5xl font-bold tracking-tight">
            Extract Text from Any
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Image or Document
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload images or PDFs and get accurate OCR results powered by advanced AI vision models.
            Fast, reliable, and developer-friendly.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          {[
            { title: 'Multi-format Support', desc: 'PNG, JPG, WEBP, TIFF, PDF' },
            { title: 'AI-Powered', desc: 'Advanced vision models for accuracy' },
            { title: 'Fast Processing', desc: 'Results in seconds, not minutes' },
          ].map((feature, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all hover:shadow-lg"
            >
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Uploader */}
        <FileUploader
          onFileSelect={handleFileSelect}
          onUploadComplete={() => {}}
          isUploading={isUploading}
          uploadProgress={uploadProgress}
        />

        {selectedFile && !isUploading && (
          <div className="flex justify-center mt-6">
            <Button
              onClick={handleUpload}
              size="lg"
              variant="gradient"
            >
              <Scan className="w-5 h-5 mr-2" />
              Extract Text
            </Button>
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col gap-2 p-6 bg-card border border-border rounded-lg">
            <p className="text-sm text-muted-foreground">
              🚀 Powered by <span className="text-primary font-semibold">Lovable AI</span>
            </p>
            <p className="text-xs text-muted-foreground">
              Using Google Gemini 2.5 Flash for vision & OCR
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
