
import React from 'react';
import { FileText, Languages, Edit, Download, Check } from 'lucide-react';
import { ViewState } from '@/pages/Index';
import { cn } from '@/lib/utils';

interface SidebarProps {
  currentView: ViewState;
  setCurrentView: (view: ViewState) => void;
  uploadedFile: File | null;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  currentView, 
  setCurrentView, 
  uploadedFile 
}) => {
  const steps = [
    { id: 'upload', label: 'Upload Document', icon: FileText, completed: !!uploadedFile },
    { id: 'translate', label: 'Translate Content', icon: Languages, completed: false },
    { id: 'edit', label: 'Edit & Review', icon: Edit, completed: false },
    { id: 'download', label: 'Download Result', icon: Download, completed: false },
  ];

  return (
    <div className="w-80 bg-white/80 backdrop-blur-sm border-r border-slate-200 p-6 shadow-lg">
      <div className="mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          DocTranslate Pro
        </h1>
        <p className="text-slate-600 text-sm mt-1">AI-powered document translation</p>
      </div>

      <nav className="space-y-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = currentView === step.id;
          const isClickable = index === 0 || steps[index - 1].completed;
          
          return (
            <button
              key={step.id}
              onClick={() => isClickable && setCurrentView(step.id as ViewState)}
              disabled={!isClickable}
              className={cn(
                "w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200",
                isActive 
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md" 
                  : isClickable
                    ? "hover:bg-slate-100 text-slate-700"
                    : "text-slate-400 cursor-not-allowed",
                !isClickable && "opacity-50"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center",
                step.completed 
                  ? "bg-green-500 text-white" 
                  : isActive 
                    ? "bg-white/20" 
                    : "bg-slate-200"
              )}>
                {step.completed ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Icon className="w-4 h-4" />
                )}
              </div>
              <span className="font-medium">{step.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
        <h3 className="font-semibold text-slate-700 mb-2">Supported Formats</h3>
        <ul className="text-sm text-slate-600 space-y-1">
          <li>• PDF documents</li>
          <li>• Images (JPG, PNG)</li>
          <li>• Text files (.txt)</li>
          <li>• Word docs (DOCX)</li>
        </ul>
      </div>
    </div>
  );
};
