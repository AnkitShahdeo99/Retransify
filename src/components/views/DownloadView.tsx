
import React from 'react';
import { Download, FileText, Image, File, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DownloadViewProps {
  uploadedFile: File | null;
  translatedContent: string;
}

export const DownloadView: React.FC<DownloadViewProps> = ({
  uploadedFile,
  translatedContent,
}) => {
  const handleDownload = (format: string) => {
    console.log(`Downloading as ${format}`);
    // In a real implementation, this would generate and download the file
  };

  const downloadOptions = [
    {
      format: 'PDF',
      description: 'Preserves original layout and formatting',
      icon: FileText,
      primary: true,
    },
    {
      format: 'DOCX',
      description: 'Editable Word document',
      icon: File,
      primary: false,
    },
    {
      format: 'TXT',
      description: 'Plain text file',
      icon: File,
      primary: false,
    },
    {
      format: 'PNG',
      description: 'High-quality image format',
      icon: Image,
      primary: false,
    },
  ];

  return (
    <div className="h-full p-8 flex flex-col">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Download Your Translation</h2>
        <p className="text-slate-600">
          Choose your preferred format and download the translated document.
        </p>
      </div>

      <div className="flex-1">
        <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Translation Complete!</h3>
          <p className="text-slate-600">
            Your document "{uploadedFile?.name}" has been successfully translated and is ready for download.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {downloadOptions.map((option) => (
            <Card key={option.format} className={option.primary ? 'ring-2 ring-blue-500' : ''}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <option.icon className="w-6 h-6 text-blue-600" />
                  <span>{option.format}</span>
                  {option.primary && (
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                      Recommended
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">{option.description}</p>
                <Button
                  onClick={() => handleDownload(option.format)}
                  className={
                    option.primary
                      ? "w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                      : "w-full"
                  }
                  variant={option.primary ? "default" : "outline"}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download as {option.format}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <Mail className="w-6 h-6 text-blue-600" />
              <span>Email Document</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 mb-4">Send the translated document directly to your email.</p>
            <div className="flex space-x-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-2 border border-slate-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button variant="outline">
                <Mail className="w-4 h-4 mr-2" />
                Send Email
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
