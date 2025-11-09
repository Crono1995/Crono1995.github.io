import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Scan, Copy, Download, Upload, X, Loader2, ArrowLeft } from 'lucide-react';

// --- Utility Functions ---

/** Converts file size in bytes to a human-readable string. */
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/** A simple global state for displaying toast messages. */
const useToast = () => {
  const [toastMessage, setToastMessage] = useState(null);
  const [toastVariant, setToastVariant] = useState('success'); // success, error

  const showToast = useCallback((message, variant = 'success') => {
    setToastMessage(message);
    setToastVariant(variant);
    setTimeout(() => setToastMessage(null), 5000);
  }, []);

  return { toastMessage, toastVariant, showToast };
};

// --- UI Components (Simplified Shadcn/Tailwind Look) ---

const Button = React.forwardRef(({ className = '', variant = 'default', size = 'default', children, ...props }, ref) => {
  const baseClasses = 'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow-md hover:shadow-lg transition-shadow';

  const variantClasses = useMemo(() => {
    switch (variant) {
      case 'gradient':
        return 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:opacity-90';
      case 'secondary':
        return 'bg-secondary text-secondary-foreground hover:bg-secondary/80';
      case 'outline':
        return 'border border-input bg-background hover:bg-accent hover:text-accent-foreground';
      case 'ghost':
        return 'hover:bg-accent hover:text-accent-foreground';
      case 'danger':
        return 'bg-red-600 text-white hover:bg-red-700';
      case 'default':
      default:
        return 'bg-primary text-primary-foreground hover:bg-primary/90';
    }
  }, [variant]);

  const sizeClasses = useMemo(() => {
    switch (size) {
      case 'sm':
        return 'h-9 px-3';
      case 'lg':
        return 'h-12 px-8 text-base';
      case 'icon':
        return 'h-10 w-10';
      case 'default':
      default:
        return 'h-10 px-4 py-2';
    }
  }, [size]);

  return (
    <button
      ref={ref}
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});

const Progress = ({ value = 0, className = '' }) => (
  <div className={`w-full h-2 bg-gray-700 rounded-full overflow-hidden ${className}`}>
    <div
      className="h-full bg-cyan-400 transition-all duration-300 ease-out"
      style={{ width: `${value}%` }}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin="0"
      aria-valuemax="100"
    />
  </div>
);

const ToastContainer = ({ message, variant }) => {
  if (!message) return null;

  const color = variant === 'success' ? 'bg-green-500' : 'bg-red-500';

  return (
    <div className="fixed bottom-4 right-4 z-50 p-3 rounded-lg shadow-xl text-white transition-all duration-300 transform translate-y-0 opacity-100" style={{ backgroundColor: color }}>
      {message}
    </div>
  );
};

// --- Custom OCR Components ---

const FileUploader = ({ onFileSelect, isUploading, uploadProgress }) => {
  const [file, setFile] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      selectFile(files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files.length > 0) {
      selectFile(e.target.files[0]);
    }
  };

  const selectFile = (selectedFile) => {
    if (selectedFile.size > 20971520) { // 20MB limit
      alert('File size exceeds the 20MB limit.');
      return;
    }
    setFile(selectedFile);
    onFileSelect(selectedFile);
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    setFile(null);
    onFileSelect(null);
  };

  if (isUploading) {
    return (
      <div className="max-w-3xl mx-auto p-8 border-2 border-cyan-500/50 rounded-xl bg-gray-800/50 shadow-2xl space-y-4">
        <div className="flex items-center justify-between text-gray-300">
          <p className="font-medium truncate">{file.name}</p>
          <p className="text-sm">{formatFileSize(file.size)}</p>
        </div>
        <Progress value={uploadProgress} />
        <p className="text-center text-sm text-cyan-400">
          {uploadProgress < 40 ? 'Uploading and creating job...' : 'Processing OCR with AI vision model...'}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <label
        htmlFor="file-upload"
        className="block w-full cursor-pointer"
        onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center h-56 p-6 border-2 border-dashed border-gray-600 rounded-xl bg-gray-800/50 hover:border-cyan-500 transition-colors shadow-xl">
          {file ? (
            <div className="flex flex-col items-center space-y-3">
              <Upload className="w-8 h-8 text-cyan-400" />
              <p className="text-lg font-medium text-white truncate max-w-full">{file.name}</p>
              <p className="text-sm text-gray-400">{formatFileSize(file.size)}</p>
              <Button onClick={handleRemove} variant="danger" size="sm" className="mt-2">
                <X className="w-4 h-4 mr-1" />
                Remove File
              </Button>
            </div>
          ) : (
            <div className="text-center space-y-2">
              <Upload className="w-10 h-10 text-gray-500 mx-auto" />
              <p className="text-white font-semibold">Drag & drop files here</p>
              <p className="text-sm text-gray-400">or click to browse</p>
              <p className="text-xs text-gray-500">Supported: PNG, JPG, WEBP, TIFF, PDF (Max 20MB)</p>
            </div>
          )}
        </div>
      </label>
      <input
        id="file-upload"
        type="file"
        accept="image/png, image/jpeg, image/webp, image/tiff, application/pdf"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
};

const OcrResult = ({ text, fileName, onReset, showToast }) => {
  const handleCopy = () => {
    document.execCommand('copy', false, text);
    showToast('Text copied to clipboard!', 'success');
  };

  const handleDownload = () => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName.split('.')[0] || 'ocr_result'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Text file downloaded!', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-2xl p-6 md:p-10 border border-cyan-500/30">
      <div className="flex justify-between items-center border-b border-gray-700 pb-4 mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <Scan className="w-6 h-6 mr-3 text-cyan-400" />
          OCR Results
        </h2>
        <Button onClick={onReset} variant="outline" size="sm" className="text-gray-300 bg-gray-700 border-gray-600 hover:bg-gray-600">
          <ArrowLeft className="w-4 h-4 mr-2" />
          New Scan
        </Button>
      </div>

      <p className="text-sm text-gray-400 mb-4">
        File: <span className="font-mono text-cyan-400">{fileName}</span>
      </p>

      <div className="min-h-[300px] max-h-[500px] overflow-y-auto bg-black p-4 rounded-lg border border-gray-700 font-mono text-sm text-gray-200 resize-y">
        <pre className="whitespace-pre-wrap">{text}</pre>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <Button onClick={handleCopy} variant="secondary" className="bg-gray-700 hover:bg-gray-600 text-white">
          <Copy className="w-4 h-4 mr-2" />
          Copy Text
        </Button>
        <Button onClick={handleDownload} variant="gradient">
          <Download className="w-4 h-4 mr-2" />
          Download .txt
        </Button>
      </div>
    </div>
  );
};

// --- Main Application Component (Consolidated from Index.tsx) ---

// This environment requires a main App component as the default export.
const App = () => {
  const { toastMessage, toastVariant, showToast } = useToast();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [ocrResult, setOcrResult] = useState(null);

  // AUTH STATE: Required for Firestore and persistent storage
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [userId, setUserId] = useState(null);
  const [db, setDb] = useState(null);
  const [auth, setAuth] = useState(null);

  // 1. Firebase Initialization and Authentication
  useEffect(() => {
    // Dynamically load Firebase SDKs
    import("https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js")
      .then(module => {
        const { initializeApp } = module;
        const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
        if (Object.keys(firebaseConfig).length === 0) {
            console.error("Firebase config is missing. Cannot initialize database.");
            return;
        }
        const app = initializeApp(firebaseConfig);

        return Promise.all([
          import("https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js"),
          import("https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js")
        ]).then(([authModule, firestoreModule]) => {
          const { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged, setPersistence, browserSessionPersistence } = authModule;
          const { getFirestore } = firestoreModule;

          const firestoreDb = getFirestore(app);
          const firebaseAuth = getAuth(app);

          setDb(firestoreDb);
          setAuth(firebaseAuth);

          // Attempt authentication
          setPersistence(firebaseAuth, browserSessionPersistence).then(() => {
            if (typeof __initial_auth_token !== 'undefined') {
              signInWithCustomToken(firebaseAuth, __initial_auth_token)
                .catch(e => {
                  console.error("Custom token sign-in failed, falling back to anonymous:", e);
                  signInAnonymously(firebaseAuth);
                });
            } else {
              signInAnonymously(firebaseAuth);
            }
          });

          onAuthStateChanged(firebaseAuth, (user) => {
            if (user) {
              setUserId(user.uid);
            } else {
              // Fallback for environment without auth (shouldn't happen with signInAnonymously)
              setUserId(crypto.randomUUID());
            }
            setIsAuthReady(true);
            console.log("Firebase Auth State Ready. User ID:", user?.uid || 'anonymous');
          });
        });
      })
      .catch(error => {
        console.error("Error loading Firebase SDKs:", error);
      });
  }, []);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile || !isAuthReady || !db || !userId) {
      showToast('System not ready. Please wait.', 'error');
      return;
    }

    setIsUploading(true);
    setUploadProgress(10); // Start progress

    // Import Firestore modules dynamically
    const { collection, addDoc, doc, onSnapshot, updateDoc } = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js");
    const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-ocr-app';
    const privateCollectionPath = `/artifacts/${appId}/users/${userId}/ocr_jobs`;

    try {
      // 1. Create job record in Firestore (Simulated 'pending' state)
      const jobRef = await addDoc(collection(db, privateCollectionPath), {
        file_name: selectedFile.name,
        file_size: selectedFile.size,
        mime_type: selectedFile.type,
        status: 'pending',
        created_at: new Date().toISOString(),
      });
      console.log('Job created in Firestore:', jobRef.id);
      showToast('Job created. Processing starting...', 'success');
      setUploadProgress(30);

      // 2. SIMULATE OCR PROCESS (Replaces Supabase Function call)
      // Wait for 3 seconds to mimic server processing time
      const mockResult = `
        Extracted OCR Text from Document: ${selectedFile.name}

        This is a simulated result from the AI vision model, which normally runs on the backend.
        
        The quick brown fox jumps over the lazy dog. 12345
        
        This application successfully demonstrated:
        - React component structure (App, Button, Result, Uploader)
        - Tailwind CSS implementation
        - State management (useState)
        - File input and formatting
        - Firebase/Firestore readiness check (Auth)
        - A mock asynchronous job processing lifecycle.

        Thank you for testing the OCR Swift application!
      `;

      // Simulate a long-running AI task
      setUploadProgress(50);
      await new Promise(resolve => setTimeout(resolve, 3000));
      setUploadProgress(70);

      // 3. Update job record with result (Simulated 'completed' state)
      await updateDoc(jobRef, {
        status: 'completed',
        ocr_text: mockResult.trim(),
        completed_at: new Date().toISOString(),
      });
      setUploadProgress(90);

      // 4. Listen for completion (or just read the result immediately since it's synchronous simulation)
      const unsubscribe = onSnapshot(doc(db, privateCollectionPath, jobRef.id), (docSnapshot) => {
        if (docSnapshot.exists()) {
          const jobData = docSnapshot.data();
          if (jobData.status === 'completed' && jobData.ocr_text) {
            setOcrResult({
              text: jobData.ocr_text,
              fileName: jobData.file_name,
            });
            showToast('OCR completed successfully!', 'success');
            unsubscribe(); // Stop listening
            setUploadProgress(100);
          } else if (jobData.status === 'failed') {
            throw new Error(jobData.error_message || 'OCR processing failed on server.');
            unsubscribe();
          }
        }
      });
    } catch (error) {
      console.error('Upload and processing error:', error);
      showToast(error.message || 'Failed to process file', 'error');
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

  // Main UI Render
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <style>{`
        /* Custom Tailwind Color Classes (for simulation) */
        .bg-gradient-hero {
          background-image: radial-gradient(at 0% 0%, #1e3a8a, #0f172a 50%);
        }
        .bg-gradient-primary {
          background-image: linear-gradient(to right, #06b6d4, #3b82f6);
        }
        .bg-clip-text {
          -webkit-background-clip: text;
          background-clip: text;
        }
        .bg-primary { background-color: #06b6d4; }
        .text-primary { color: #06b6d4; }
        .text-primary-foreground { color: white; }
        .text-muted-foreground { color: #9ca3af; }
        .bg-card { background-color: #1f2937; }
        .border-border { border-color: #374151; }
        .text-cyan-400 { color: #22d3ee; }
        .bg-cyan-500\/50 { background-color: rgba(6, 182, 212, 0.5); }
        .border-cyan-500\/30 { border-color: rgba(6, 182, 212, 0.3); }
        .bg-gray-800\/50 { background-color: rgba(31, 41, 55, 0.5); }
      `}</style>
      <div className="container mx-auto px-4 py-12">
        {ocrResult ? (
          <OcrResult
            text={ocrResult.text}
            fileName={ocrResult.fileName}
            onReset={handleReset}
            showToast={showToast}
          />
        ) : (
          <>
            {/* Header */}
            <div className="text-center mb-12 space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                <Scan className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-primary">AI-Powered OCR</span>
              </div>
              <h1 className="text-5xl font-extrabold tracking-tight md:text-6xl">
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
                { title: 'AI-Powered (Simulated)', desc: 'Advanced vision models for accuracy' },
                { title: 'Fast Processing', desc: 'Results in seconds, not minutes' },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all hover:shadow-lg"
                >
                  <h3 className="font-semibold mb-2 text-white">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              ))}
            </div>

            {/* Uploader */}
            <FileUploader
              onFileSelect={handleFileSelect}
              isUploading={isUploading}
              uploadProgress={uploadProgress}
            />

            {selectedFile && (
              <div className="flex justify-center mt-6">
                <Button
                  onClick={handleUpload}
                  size="lg"
                  variant="gradient"
                  disabled={isUploading || !isAuthReady}
                  className="min-w-[200px]"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : !isAuthReady ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <Scan className="w-5 h-5 mr-2" />
                      Extract Text
                    </>
                  )}
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
                  Using Google Gemini 2.5 Flash for vision & OCR (Functionality is **Simulated** here)
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  <span className="text-red-400">NOTE:</span> Due to the single-file constraint, the backend function and database calls are simulated with a delay and a mock result.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
      <ToastContainer message={toastMessage} variant={toastVariant} />
    </div>
  );
};

export default App;
