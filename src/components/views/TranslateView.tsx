
import React, { useState } from 'react';
import { Languages, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TranslateViewProps {
  uploadedFile: File | null;
  translatedContent: string;
  setTranslatedContent: (content: string) => void;
  sourceLanguage: string;
  setSourceLanguage: (lang: string) => void;
  targetLanguage: string;
  setTargetLanguage: (lang: string) => void;
  onNext: () => void;
}

const languages = [
  { code: 'auto', name: 'Auto-detect' },
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'zh', name: 'Chinese' },
];

export const TranslateView: React.FC<TranslateViewProps> = ({
  uploadedFile,
  translatedContent,
  setTranslatedContent,
  sourceLanguage,
  setSourceLanguage,
  targetLanguage,
  setTargetLanguage,
  onNext,
}) => {
  const [isTranslating, setIsTranslating] = useState(false);
  const [originalContent, setOriginalContent] = useState('');

  const handleTranslate = async () => {
    if (!uploadedFile) return;
    
    setIsTranslating(true);
    
    // Simulate file processing and translation
    setTimeout(() => {
      const mockOriginal = `This is a sample document content extracted from ${uploadedFile.name}. 
      
In a real implementation, this would contain the actual extracted text from your PDF, image (via OCR), or text file. The AI translation service would then process this content and provide an accurate translation while preserving formatting and structure.

This demo shows how the interface would work with your translated content appearing here.`;

      const mockTranslated = `Este es un contenido de documento de muestra extraído de ${uploadedFile.name}.

En una implementación real, esto contendría el texto real extraído de su PDF, imagen (a través de OCR) o archivo de texto. El servicio de traducción de IA procesaría este contenido y proporcionaría una traducción precisa mientras preserva el formato y la estructura.

Esta demostración muestra cómo funcionaría la interfaz con su contenido traducido apareciendo aquí.`;

      setOriginalContent(mockOriginal);
      setTranslatedContent(mockTranslated);
      setIsTranslating(false);
    }, 3000);
  };

  return (
    <div className="h-full p-8 flex flex-col">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Translate Document</h2>
        <p className="text-slate-600">
          Configure translation settings and preview the results.
        </p>
      </div>

      <div className="mb-6">
        <div className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-slate-200">
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-700 mb-2">From</label>
            <Select value={sourceLanguage} onValueChange={setSourceLanguage}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white border border-slate-200 shadow-lg z-50">
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <ArrowRight className="w-6 h-6 text-slate-400 mt-6" />
          
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-700 mb-2">To</label>
            <Select value={targetLanguage} onValueChange={setTargetLanguage}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white border border-slate-200 shadow-lg z-50">
                {languages.filter(lang => lang.code !== 'auto').map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="mt-6">
            <Button
              onClick={handleTranslate}
              disabled={isTranslating || !uploadedFile}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              {isTranslating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Languages className="w-4 h-4" />
              )}
              {isTranslating ? 'Translating...' : 'Translate'}
            </Button>
          </div>
        </div>
      </div>

      {(originalContent || translatedContent) && (
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Original Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96 overflow-y-auto p-4 bg-slate-50 rounded border text-sm leading-relaxed">
                {originalContent}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Translated Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96 overflow-y-auto p-4 bg-blue-50 rounded border text-sm leading-relaxed">
                {translatedContent}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {translatedContent && (
        <div className="mt-6 flex justify-end">
          <Button
            onClick={onNext}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          >
            Continue to Editor
          </Button>
        </div>
      )}
    </div>
  );
};
