'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import type { FtpAction } from '@/app/components/type'; 

const FileManager = dynamic(() => import('@/app/components/FileManager'), {
    loading: () => <p>Loading Manager...</p>, 
    ssr: false 
});

export default function HomePage() {
  const [isManagerOpen, setManagerOpen] = useState<boolean>(false);
  const [actions, setActions] = useState<FtpAction[]>([]);

  const openFileManager = (allowedActions: FtpAction[]) => {
    setActions(allowedActions);
    setManagerOpen(true);
  };

  return (
    <main className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-slate-50 to-gray-200">
        <button onClick={() => openFileManager(['read', 'upload', 'delete', 'rename', 'create'])}>
            Open File Manager
        </button>
        {isManagerOpen && (
            <FileManager 
                isOpen={isManagerOpen} 
                onClose={() => setManagerOpen(false)}
                allowedActions={actions}
            />
        )}
    </main>
  );
}
