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

  const extractTextFromFile = async (file: File): Promise<string> => {
    const fileType = file.type.toLowerCase();
    const fileName = file.name.toLowerCase();

    try {
      // Handle text files
      if (fileType.includes('text') || fileName.endsWith('.txt')) {
        return await file.text();
      }
      
      // Handle images - return placeholder text for demo
      if (fileType.includes('image') || fileName.match(/\.(jpg|jpeg|png|gif|bmp)$/)) {
        return `This is a sample text extracted from the image file "${file.name}". 

In a real application, this would use OCR (Optical Character Recognition) to extract text from images. 

For this demo, imagine this text was extracted from your image and can now be translated to any language.

Hello world! Welcome to our translation service. Thank you for using our application.`;
      }

      // Handle PDF files - return placeholder text for demo
      if (fileType.includes('pdf') || fileName.endsWith('.pdf')) {
        return `This is sample content extracted from the PDF file "${file.name}".

In a real application, this would use a PDF parsing library to extract text content from PDF documents.

Sample document content:
- Introduction to document translation
- Welcome message: Hello and welcome to our service
- Thank you for choosing our translation platform
- We support multiple languages and file formats
- Good morning! Have a great day using our app
- Goodbye and see you again soon

This demo shows how PDF content would be processed and made ready for translation.`;
      }

      // Handle Word documents - return placeholder text for demo
      if (fileType.includes('officedocument') || fileName.endsWith('.docx')) {
        return `This is sample content extracted from the Word document "${file.name}".

Document Title: Sample Document for Translation

Content:
Hello everyone! Welcome to our document translation service. 

This is a demonstration of how Word documents would be processed. In a production environment, we would use libraries to extract the actual text content from DOCX files.

Key features:
• Support for multiple file formats
• Professional translation quality  
• Thank you for your trust in our service
• Good morning to all our users worldwide
• Have a wonderful experience

Best regards,
Translation Team

Goodbye for now!`;
      }

      // Default fallback
      return `Unsupported file type: ${fileType}. 

For this demo, here's sample text that can be translated:

Hello! Welcome to our translation service. Thank you for uploading your file. We support many languages including English, Spanish, French, German, Hindi, and many more.

Good morning! How are you today? We hope you have a great experience using our translation tool.

Goodbye and thank you for using our service!`;

    } catch (error) {
      console.error('Error extracting text from file:', error);
      throw new Error(`Failed to extract text from ${file.name}. Please try with a different file.`);
    }
  };

  const handleTranslate = async () => {
    if (!uploadedFile) {
      setError('No file uploaded');
      return;
    }

    setIsTranslating(true);
    setError(null);

    try {
      console.log('Starting translation for file:', uploadedFile.name, 'Type:', uploadedFile.type);
      
      // Extract text from the file
      const extractedText = await extractTextFromFile(uploadedFile);
      console.log('Extracted text:', extractedText.substring(0, 200) + '...');
      
      setOriginalContent(extractedText);

      // Simulate translation with the extracted text
      const translatedText = await simulateTranslation(extractedText, sourceLanguage, targetLanguage);
      
      setTranslatedContent(translatedText);
      
      toast({
        title: "Translation Complete",
        description: `Document translated from ${getLanguageName(sourceLanguage)} to ${getLanguageName(targetLanguage)}`,
      });
      
      console.log('Translation successful');
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

  // Simulate translation for demo purposes with readable output
  const simulateTranslation = async (text: string, sourceLang: string, targetLang: string): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const targetLangName = getLanguageName(targetLang);
    
    // Create readable sample translations for common phrases
    const translations: { [key: string]: { [key: string]: string } } = {
      'es': {
        'hello': 'Hola',
        'welcome': 'Bienvenido',
        'thank you': 'Gracias',
        'good morning': 'Buenos días',
        'how are you': '¿Cómo estás?',
        'goodbye': 'Adiós',
        'hello everyone': 'Hola a todos',
        'have a great day': 'Que tengas un buen día',
        'best regards': 'Saludos cordiales'
      },
      'fr': {
        'hello': 'Bonjour',
        'welcome': 'Bienvenue',
        'thank you': 'Merci',
        'good morning': 'Bonjour',
        'how are you': 'Comment allez-vous?',
        'goodbye': 'Au revoir',
        'hello everyone': 'Bonjour tout le monde',
        'have a great day': 'Passez une excellente journée',
        'best regards': 'Cordialement'
      },
      'de': {
        'hello': 'Hallo',
        'welcome': 'Willkommen',
        'thank you': 'Danke',
        'good morning': 'Guten Morgen',
        'how are you': 'Wie geht es Ihnen?',
        'goodbye': 'Auf Wiedersehen',
        'hello everyone': 'Hallo alle zusammen',
        'have a great day': 'Haben Sie einen schönen Tag',
        'best regards': 'Mit freundlichen Grüßen'
      },
      'hi': {
        'hello': 'नमस्ते',
        'welcome': 'स्वागत है',
        'thank you': 'धन्यवाद',
        'good morning': 'सुप्रभात',
        'how are you': 'आप कैसे हैं?',
        'goodbye': 'अलविदा',
        'hello everyone': 'सभी को नमस्ते',
        'have a great day': 'आपका दिन शुभ हो',
        'best regards': 'सादर'
      },
      'ja': {
        'hello': 'こんにちは',
        'welcome': 'いらっしゃいませ',
        'thank you': 'ありがとう',
        'good morning': 'おはよう',
        'how are you': 'お元気ですか？',
        'goodbye': 'さようなら',
        'hello everyone': 'みなさん、こんにちは',
        'have a great day': '良い一日を',
        'best regards': 'よろしくお願いします'
      },
      'zh': {
        'hello': '你好',
        'welcome': '欢迎',
        'thank you': '谢谢',
        'good morning': '早上好',
        'how are you': '你好吗？',
        'goodbye': '再见',
        'hello everyone': '大家好',
        'have a great day': '祝你有美好的一天',
        'best regards': '此致敬礼'
      }
    };

    let translatedText = text;
    
    // Apply translations if available for the target language
    if (translations[targetLang]) {
      const langTranslations = translations[targetLang];
      Object.keys(langTranslations).forEach(key => {
        const regex = new RegExp(key, 'gi');
        translatedText = translatedText.replace(regex, langTranslations[key]);
      });
    } else {
      // For languages not in our translation map, add a realistic demo prefix
      translatedText = `[Translated to ${targetLangName}]

${text}

Note: This is a demonstration showing how your document would appear after translation to ${targetLangName}. In a production environment, the entire text would be properly translated using professional translation services.`;
    }
    
    return translatedText;
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
