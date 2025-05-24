
import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { MainContent } from '@/components/MainContent';
import { useState } from 'react';

export type ViewState = 'upload' | 'translate' | 'edit' | 'download';

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewState>('upload');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [translatedContent, setTranslatedContent] = useState<string>('');
  const [sourceLanguage, setSourceLanguage] = useState<string>('auto');
  const [targetLanguage, setTargetLanguage] = useState<string>('en');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex">
      <Sidebar 
        currentView={currentView}
        setCurrentView={setCurrentView}
        uploadedFile={uploadedFile}
      />
      <MainContent 
        currentView={currentView}
        setCurrentView={setCurrentView}
        uploadedFile={uploadedFile}
        setUploadedFile={setUploadedFile}
        translatedContent={translatedContent}
        setTranslatedContent={setTranslatedContent}
        sourceLanguage={sourceLanguage}
        setSourceLanguage={setSourceLanguage}
        targetLanguage={targetLanguage}
        setTargetLanguage={setTargetLanguage}
      />
    </div>
  );
};

export default Index;
