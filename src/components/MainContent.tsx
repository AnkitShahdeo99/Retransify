
import React from 'react';
import { ViewState } from '@/pages/Index';
import { UploadView } from './views/UploadView';
import { TranslateView } from './views/TranslateView';
import { EditView } from './views/EditView';
import { DownloadView } from './views/DownloadView';

interface MainContentProps {
  currentView: ViewState;
  setCurrentView: (view: ViewState) => void;
  uploadedFile: File | null;
  setUploadedFile: (file: File | null) => void;
  translatedContent: string;
  setTranslatedContent: (content: string) => void;
  sourceLanguage: string;
  setSourceLanguage: (lang: string) => void;
  targetLanguage: string;
  setTargetLanguage: (lang: string) => void;
}

export const MainContent: React.FC<MainContentProps> = ({
  currentView,
  setCurrentView,
  uploadedFile,
  setUploadedFile,
  translatedContent,
  setTranslatedContent,
  sourceLanguage,
  setSourceLanguage,
  targetLanguage,
  setTargetLanguage,
}) => {
  const renderView = () => {
    switch (currentView) {
      case 'upload':
        return (
          <UploadView 
            uploadedFile={uploadedFile}
            setUploadedFile={setUploadedFile}
            onNext={() => setCurrentView('translate')}
          />
        );
      case 'translate':
        return (
          <TranslateView 
            uploadedFile={uploadedFile}
            translatedContent={translatedContent}
            setTranslatedContent={setTranslatedContent}
            sourceLanguage={sourceLanguage}
            setSourceLanguage={setSourceLanguage}
            targetLanguage={targetLanguage}
            setTargetLanguage={setTargetLanguage}
            onNext={() => setCurrentView('edit')}
          />
        );
      case 'edit':
        return (
          <EditView 
            uploadedFile={uploadedFile}
            translatedContent={translatedContent}
            onNext={() => setCurrentView('download')}
          />
        );
      case 'download':
        return (
          <DownloadView 
            uploadedFile={uploadedFile}
            translatedContent={translatedContent}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 overflow-hidden">
      {renderView()}
    </div>
  );
};
