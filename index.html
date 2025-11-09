<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI-Powered OCR Extractor</title>
    <!-- Load Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Load React, ReactDOM, and Babel for JSX in-browser compilation -->
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <!-- FIX: Load Lucide Icons using the UMD bundle which exposes a global 'lucide' object -->
    <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
    <style>
        /* Define custom colors and styles used in the app */
        :root {
            --color-primary: #06b6d4; /* Tailwind cyan-500 */
            --color-secondary: #3b82f6; /* Tailwind blue-600 */
            --color-background: #0f172a; /* Tailwind slate-900 */
            --color-card: #1f2937; /* Tailwind gray-800 */
        }
        body {
            font-family: 'Inter', sans-serif;
            background-color: var(--color-background);
            color: white;
        }
        .bg-gradient-primary {
            background-image: linear-gradient(to right, var(--color-primary), var(--color-secondary));
        }
        .bg-clip-text {
            -webkit-background-clip: text;
            background-clip: text;
        }
    </style>
</head>
<body>
    <div id="root"></div>

    <script type="text/babel">
        const { useState, useEffect, useCallback, useMemo, forwardRef } = React;
        const { createRoot } = ReactDOM;

        // Helper function for Lucide icons, now correctly referencing the global 'lucide' object
        const Icon = ({ name, className = '' }) => {
            // Check if lucide object and its icons property exist before accessing
            const iconData = window.lucide && window.lucide.icons && window.lucide.icons[name];
            if (!iconData) return null;
            const [path, attrs] = iconData;
            return (
                <svg {...attrs} className={className} dangerouslySetInnerHTML={{ __html: path.join('') }} />
            );
        };

        // --- Utility Functions ---

        /** Converts file size in bytes to a human-readable string. */
        const formatFileSize = (bytes) => {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        };

        /** Converts a File object to a Base64 encoded string. */
        const fileToBase64 = (file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64String = reader.result.split(',')[1];
                    if (base64String) {
                        resolve(base64String);
                    } else {
                        reject(new Error("Failed to read file as base64."));
                    }
                };
                reader.onerror = (error) => reject(error);
                reader.readAsDataURL(file);
            });
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

        const Button = forwardRef(({ className = '', variant = 'default', size = 'default', children, ...props }, ref) => {
            const baseClasses = 'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 disabled:pointer-events-none disabled:opacity-50 shadow-md hover:shadow-lg transition-shadow';

            const variantClasses = useMemo(() => {
                switch (variant) {
                    case 'gradient':
                        return 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:opacity-90';
                    case 'secondary':
                        return 'bg-gray-700 text-white hover:bg-gray-600';
                    case 'outline':
                        return 'border border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white';
                    case 'ghost':
                        return 'hover:bg-gray-700 hover:text-white';
                    case 'danger':
                        return 'bg-red-600 text-white hover:bg-red-700';
                    case 'default':
                    default:
                        return 'bg-cyan-500 text-white hover:bg-cyan-600';
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
                    console.error('File size exceeds the 20MB limit.');
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
                            {uploadProgress < 40 ? 'Converting file to Base64...' : 'Extracting text with AI model...'}
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
                                    <Icon name="Upload" className="w-8 h-8 text-cyan-400" />
                                    <p className="text-lg font-medium text-white truncate max-w-full">{file.name}</p>
                                    <p className="text-sm text-gray-400">{formatFileSize(file.size)}</p>
                                    <Button onClick={handleRemove} variant="danger" size="sm" className="mt-2">
                                        <Icon name="X" className="w-4 h-4 mr-1" />
                                        Remove File
                                    </Button>
                                </div>
                            ) : (
                                <div className="text-center space-y-2">
                                    <Icon name="Upload" className="w-10 h-10 text-gray-500 mx-auto" />
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
                // document.execCommand('copy') is required in this environment
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
                            <Icon name="Scan" className="w-6 h-6 mr-3 text-cyan-400" />
                            OCR Results
                        </h2>
                        <Button onClick={onReset} variant="outline" size="sm" className="text-gray-300 bg-gray-700 border-gray-600 hover:bg-gray-600">
                            <Icon name="ArrowLeft" className="w-4 h-4 mr-2" />
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
                        <Button onClick={handleCopy} variant="secondary">
                            <Icon name="Copy" className="w-4 h-4 mr-2" />
                            Copy Text
                        </Button>
                        <Button onClick={handleDownload} variant="gradient">
                            <Icon name="Download" className="w-4 h-4 mr-2" />
                            Download .txt
                        </Button>
                    </div>
                </div>
            );
        };

        // --- Main Application Component ---

        const App = () => {
            const { toastMessage, toastVariant, showToast } = useToast();
            const [selectedFile, setSelectedFile] = useState(null);
            const [isUploading, setIsUploading] = useState(false);
            const [uploadProgress, setUploadProgress] = useState(0);
            const [ocrResult, setOcrResult] = useState(null);

            // In this static HTML version, we assume auth is ready for the API call.
            const isAuthReady = true;

            const handleFileSelect = (file) => {
                setSelectedFile(file);
            };

            const handleUpload = async () => {
                if (!selectedFile) return;

                setIsUploading(true);
                setUploadProgress(10);
                let base64Data;

                try {
                    // 1. Convert file to Base64
                    base64Data = await fileToBase64(selectedFile);
                    setUploadProgress(30);
                    showToast('File converted. Sending to AI model...', 'success');

                    // 2. Prepare API payload
                    const prompt = "Perform Optical Character Recognition (OCR) on the provided image/document. Extract all visible text into a single, clean block of plain text. Do not add any introductory phrases, commentary, or descriptions of the image content; just output the extracted text.";
                    const apiKey = ""; // Canvas will provide this
                    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

                    const payload = {
                        contents: [
                            {
                                role: "user",
                                parts: [
                                    { text: prompt },
                                    {
                                        inlineData: {
                                            mimeType: selectedFile.type,
                                            data: base64Data
                                        }
                                    }
                                ]
                            }
                        ],
                    };

                    setUploadProgress(60);

                    // 3. Call Gemini API (with Exponential Backoff)
                    const MAX_RETRIES = 5;
                    let response;
                    for (let i = 0; i < MAX_RETRIES; i++) {
                        response = await fetch(apiUrl, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(payload)
                        });

                        if (response.ok) break;

                        // Handle API errors (e.g., 429 Too Many Requests)
                        if (response.status === 429 && i < MAX_RETRIES - 1) {
                            const delay = Math.pow(2, i) * 1000;
                            await new Promise(resolve => setTimeout(resolve, delay));
                        } else {
                            // Throw error if not a retryable error or max retries reached
                            throw new Error(`AI API Request failed (Status: ${response.status}).`);
                        }
                    }

                    if (!response.ok) {
                        throw new Error("AI API request failed after all retries.");
                    }

                    const result = await response.json();
                    const extractedText = result.candidates?.[0]?.content?.parts?.[0]?.text;

                    if (extractedText) {
                        setOcrResult({
                            text: extractedText.trim(),
                            fileName: selectedFile.name,
                        });
                        showToast('OCR completed successfully!', 'success');
                        setUploadProgress(100);
                    } else {
                        const errorMessage = result.error?.message || "AI model returned no text or encountered an internal error.";
                        throw new Error(errorMessage);
                    }

                } catch (error) {
                    console.error('OCR Processing Error:', error);
                    showToast(error.message || 'Failed to process OCR via API.', 'error');
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
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 rounded-full border border-cyan-500/20">
                                        <Icon name="Scan" className="w-5 h-5 text-cyan-500" />
                                        <span className="text-sm font-medium text-cyan-500">AI-Powered OCR</span>
                                    </div>
                                    <h1 className="text-5xl font-extrabold tracking-tight md:text-6xl">
                                        Extract Text from Any
                                        <span className="block bg-gradient-primary bg-clip-text text-transparent">
                                            Image or Document
                                        </span>
                                    </h1>
                                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                                        Upload images or PDFs and get accurate OCR results powered by advanced AI vision models.
                                        Fast, reliable, and developer-friendly.
                                    </p>
                                </div>

                                {/* Features */}
                                <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
                                    {[
                                        { title: 'Multi-format Support', desc: 'PNG, JPG, WEBP, TIFF, PDF' },
                                        { title: 'AI-Powered', desc: 'Real-time text extraction via Gemini' },
                                        { title: 'Fast Processing', desc: 'Results in seconds' },
                                    ].map((feature, i) => (
                                        <div
                                            key={i}
                                            className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-cyan-500/50 transition-all hover:shadow-lg"
                                        >
                                            <h3 className="font-semibold mb-2 text-white">{feature.title}</h3>
                                            <p className="text-sm text-gray-400">{feature.desc}</p>
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
                                                    <Icon name="Loader2" className="w-5 h-5 mr-2 animate-spin" />
                                                    Processing...
                                                </>
                                            ) : (
                                                <>
                                                    <Icon name="Scan" className="w-5 h-5 mr-2" />
                                                    Extract Text
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                )}

                                {/* Footer */}
                                <div className="mt-16 text-center">
                                    <div className="inline-flex flex-col gap-2 p-6 bg-gray-800 border border-gray-700 rounded-lg">
                                        <p className="text-sm text-gray-400">
                                            🚀 Powered by <span className="text-cyan-500 font-semibold">Google Gemini 2.5 Flash</span>
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

        // Render the App
        document.addEventListener('DOMContentLoaded', () => {
            const container = document.getElementById('root');
            if (container) {
                const root = createRoot(container);
                root.render(<App />);
            } else {
                console.error("Root element not found.");
            }
        });
    </script>
</body>
</html>
