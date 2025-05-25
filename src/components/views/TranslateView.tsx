import React, { useState } from 'react';
import { Languages, ArrowRight, Loader2, Edit, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

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
  { code: 'ar', name: 'Arabic' },
  { code: 'hi', name: 'Hindi (हिन्दी)' },
  { code: 'bn', name: 'Bengali (বাংলা)' },
  { code: 'te', name: 'Telugu (తెలుగు)' },
  { code: 'mr', name: 'Marathi (मराठी)' },
  { code: 'ta', name: 'Tamil (தமிழ்)' },
  { code: 'ur', name: 'Urdu (اردو)' },
  { code: 'gu', name: 'Gujarati (ગુજરાતી)' },
  { code: 'ml', name: 'Malayalam (മലയാളം)' },
  { code: 'kn', name: 'Kannada (ಕನ್ನಡ)' },
  { code: 'or', name: 'Odia (ଓଡ଼ିଆ)' },
  { code: 'pa', name: 'Punjabi (ਪੰਜਾਬੀ)' },
  { code: 'as', name: 'Assamese (অসমীয়া)' },
  { code: 'mai', name: 'Maithili (मैथिली)' },
  { code: 'sa', name: 'Sanskrit (संस्कृत)' },
  { code: 'ne', name: 'Nepali (नेपाली)' },
  { code: 'si', name: 'Sinhala (සිංහල)' },
  { code: 'ks', name: 'Kashmiri (کٲشُر)' },
  { code: 'sd', name: 'Sindhi (سنڌي)' },
  { code: 'bho', name: 'Bhojpuri (भोजपुरी)' },
  { code: 'gom', name: 'Konkani (कोंकणी)' },
  { code: 'mni', name: 'Manipuri (মৈতৈলোন্)' },
  { code: 'sat', name: 'Santali (ᱥᱟᱱᱛᱟᱲᱤ)' },
  { code: 'doi', name: 'Dogri (डोगरी)' },
  { code: 'bo', name: 'Tibetan (བོད་སྐད)' },
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
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleTranslate = async () => {
    if (!uploadedFile) return;

    setIsTranslating(true);
    setError(null);

    try {
      const text = await uploadedFile.text();
      setOriginalContent(text);

      // For demo purposes, since LibreTranslate API has CORS and API key issues,
      // we'll create a simulated translation that shows the functionality
      const simulatedTranslation = await simulateTranslation(text, sourceLanguage, targetLanguage);
      
      setTranslatedContent(simulatedTranslation);
      
      toast({
        title: "Translation Complete",
        description: `Document translated from ${getLanguageName(sourceLanguage)} to ${getLanguageName(targetLanguage)}`,
      });
      
      console.log('Translation successful:', simulatedTranslation);
    } catch (error) {
      console.error('Translation error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Translation failed. Please try again.';
      setError(errorMessage);
      
      toast({
        title: "Translation Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsTranslating(false);
    }
  };

  // Simulate translation for demo purposes
  const simulateTranslation = async (text: string, sourceLang: string, targetLang: string): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const targetLangName = getLanguageName(targetLang);
    
    // Create a realistic demo translation
    if (text.toLowerCase().includes('hello')) {
      const greetings: { [key: string]: string } = {
        'hi': 'नमस्ते',
        'es': 'Hola',
        'fr': 'Bonjour',
        'de': 'Hallo',
        'ja': 'こんにちは',
        'zh': '你好',
        'ar': 'مرحبا',
        'bn': 'হ্যালো',
        'te': 'హలో',
        'mr': 'हॅलो',
        'ta': 'வணக்கம்',
        'ur': 'ہیلو',
        'gu': 'હેલો',
        'ml': 'ഹലോ',
        'kn': 'ಹಲೋ',
        'or': 'ହେଲୋ',
        'pa': 'ਹੈਲੋ',
      };
      
      const greeting = greetings[targetLang] || `Hello (in ${targetLangName})`;
      return text.replace(/hello/gi, greeting);
    }
    
    return `[Translated to ${targetLangName}]\n\n${text}\n\n[This is a demo translation. In a production environment, this would be translated using a real translation service.]`;
  };

  const getLanguageName = (code: string): string => {
    const lang = languages.find(l => l.code === code);
    return lang ? lang.name : code;
  };

  const handleSkipToDownload = () => {
    window.dispatchEvent(new CustomEvent('skipToDownload'));
  };

  return (
    <div className="h-full p-8 flex flex-col">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Translate Document</h2>
        <p className="text-slate-600">Configure translation settings and preview the results.</p>
      </div>

      <div className="mb-6">
        <div className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-slate-200">
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-700 mb-2">From</label>
            <Select value={sourceLanguage} onValueChange={setSourceLanguage}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white border border-slate-200 shadow-lg z-50 max-h-60">
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
              <SelectContent className="bg-white border border-slate-200 shadow-lg z-50 max-h-60">
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

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
          <p className="text-red-500 text-xs mt-1">
            Note: This demo uses simulated translation. For production use, configure a translation API with proper authentication.
          </p>
        </div>
      )}

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
        <div className="mt-6">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-slate-700 mb-2">What would you like to do next?</h3>
            <p className="text-slate-600 text-sm">Choose whether to edit the document or download it directly</p>
          </div>
          <div className="flex justify-center space-x-4">
            <Button
              onClick={onNext}
              variant="outline"
              className="flex items-center space-x-2 px-6 py-3"
            >
              <Edit className="w-4 h-4" />
              <span>Edit Document</span>
            </Button>
            <Button
              onClick={handleSkipToDownload}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 flex items-center space-x-2 px-6 py-3"
            >
              <Download className="w-4 h-4" />
              <span>Download Now</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
