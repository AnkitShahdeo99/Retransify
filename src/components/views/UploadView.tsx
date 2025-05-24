import React, { useCallback } from 'react';
import { Upload, FileText, Image, File, Edit, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface UploadViewProps {
  uploadedFile: File | null;
  setUploadedFile: (file: File | null) => void;
  onNext: () => void;
}

export const UploadView: React.FC<UploadViewProps> = ({
  uploadedFile,
  setUploadedFile,
  onNext,
}) => {
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      setUploadedFile(files[0]);
    }
  }, [setUploadedFile]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setUploadedFile(files[0]);
    }
  };

  const handleSkipToEdit = () => {
    // Skip translate view and go directly to edit
    window.dispatchEvent(new CustomEvent('skipToEdit'));
  };

  const getFileIcon = (file: File) => {
    const type = file.type;
    if (type.includes('pdf')) return FileText;
    if (type.includes('image')) return Image;
    return File;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="h-full p-8 flex flex-col">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Upload Your Document</h2>
        <p className="text-slate-600">
          Choose a file to translate. We support PDF, images, text files, and Word documents.
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-2xl">
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className={cn(
              "border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200",
              uploadedFile
                ? "border-green-300 bg-green-50"
                : "border-slate-300 hover:border-blue-400 hover:bg-blue-50/50"
            )}
          >
            {uploadedFile ? (
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                  {React.createElement(getFileIcon(uploadedFile), {
                    className: "w-8 h-8 text-green-600"
                  })}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">{uploadedFile.name}</h3>
                  <p className="text-slate-600">{formatFileSize(uploadedFile.size)}</p>
                </div>
                <div className="space-y-4">
                  <Button
                    variant="outline"
                    onClick={() => setUploadedFile(null)}
                    className="mb-4"
                  >
                    Remove File
                  </Button>
                  
                  <div className="space-y-3">
                    <div className="text-center">
                      <h4 className="text-lg font-semibold text-slate-700 mb-2">What would you like to do?</h4>
                      <p className="text-slate-600 text-sm mb-4">Choose whether to translate the document or edit it directly</p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button
                        onClick={onNext}
                        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 flex items-center space-x-2 px-6 py-3"
                      >
                        <Languages className="w-4 h-4" />
                        <span>Translate Document</span>
                      </Button>
                      <Button
                        onClick={handleSkipToEdit}
                        variant="outline"
                        className="flex items-center space-x-2 px-6 py-3"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Edit Document</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                  <Upload className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">
                    Drag and drop your file here
                  </h3>
                  <p className="text-slate-600 mb-4">or click to browse</p>
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png,.txt,.docx"
                    onChange={handleFileSelect}
                  />
                  <label htmlFor="file-upload">
                    <Button
                      asChild
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                    >
                      <span className="cursor-pointer">Choose File</span>
                    </Button>
                  </label>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-3 bg-white rounded-lg border border-slate-200">
              <FileText className="w-6 h-6 mx-auto text-red-500 mb-2" />
              <span className="text-sm text-slate-600">PDF</span>
            </div>
            <div className="p-3 bg-white rounded-lg border border-slate-200">
              <Image className="w-6 h-6 mx-auto text-green-500 mb-2" />
              <span className="text-sm text-slate-600">Images</span>
            </div>
            <div className="p-3 bg-white rounded-lg border border-slate-200">
              <File className="w-6 h-6 mx-auto text-blue-500 mb-2" />
              <span className="text-sm text-slate-600">Text</span>
            </div>
            <div className="p-3 bg-white rounded-lg border border-slate-200">
              <FileText className="w-6 h-6 mx-auto text-purple-500 mb-2" />
              <span className="text-sm text-slate-600">Word</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
