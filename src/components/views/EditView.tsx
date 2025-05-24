
import React from 'react';
import { Edit, Save, Undo, Redo } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface EditViewProps {
  uploadedFile: File | null;
  translatedContent: string;
  onNext: () => void;
}

export const EditView: React.FC<EditViewProps> = ({
  uploadedFile,
  translatedContent,
  onNext,
}) => {
  return (
    <div className="h-full p-8 flex flex-col">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Edit & Review</h2>
        <p className="text-slate-600">
          Review and edit your translated document before downloading.
        </p>
      </div>

      <div className="mb-4 flex items-center space-x-2">
        <Button variant="outline" size="sm">
          <Undo className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="sm">
          <Redo className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="sm">
          <Save className="w-4 h-4" />
          Save Changes
        </Button>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Edit className="w-5 h-5 mr-2" />
              Original Document
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96 bg-slate-100 rounded border flex items-center justify-center text-slate-500">
              PDF Viewer would be rendered here
              <br />
              <span className="text-sm">({uploadedFile?.name})</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Translated Content</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              className="w-full h-96 p-4 border border-slate-200 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={translatedContent}
              placeholder="Translated content will appear here..."
            />
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 flex justify-between">
        <div className="text-sm text-slate-600">
          Changes are automatically saved
        </div>
        <Button
          onClick={onNext}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
        >
          Continue to Download
        </Button>
      </div>
    </div>
  );
};
