'use client';

import { useState } from 'react';
import FileManager from '@/app/components/FileManager';
import type { FtpAction } from '@/app/components/type';
import { FiImage, FiGrid, FiArrowRight } from 'react-icons/fi';

export default function HomePageClient() {
  const [isManagerOpen, setManagerOpen] = useState<boolean>(false);
  const [actions, setActions] = useState<FtpAction[]>([]);

  const openFileManager = (allowedActions: FtpAction[]) => {
    setActions(allowedActions);
    setManagerOpen(true);
  };
  
  const closeFileManager = () => {
    setManagerOpen(false);
  };

  return (
    <>
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            FTP File Manager
          </h1>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-slate-600">
            A modern solution to manage your files. Start by selecting one of the options below.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div 
            className="relative p-8 overflow-hidden transition-all duration-300 bg-white border shadow-lg cursor-pointer group rounded-2xl border-slate-200 hover:shadow-2xl hover:-translate-y-1"
            onClick={() => openFileManager(['read', 'upload'])}
          >
             <div className="relative z-10">
                <div className="flex items-center justify-center w-12 h-12 text-white bg-indigo-500 rounded-lg">
                  <FiImage size={24} />
                </div>
                <h2 className="mt-6 text-xl font-bold text-slate-800">
                  Select Profile Picture
                </h2>
                <p className="mt-2 text-slate-500">
                  Read and upload only. Ideal for picking specific files.
                </p>
                <div className="flex items-center mt-6 font-semibold text-indigo-600">
                  Get Started
                  <FiArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
          </div>

          <div 
            className="relative p-8 overflow-hidden transition-all duration-300 bg-white border shadow-lg cursor-pointer group rounded-2xl border-slate-200 hover:shadow-2xl hover:-translate-y-1"
            onClick={() => openFileManager(['read', 'upload', 'delete', 'rename', 'create'])}
          >
            <div className="relative z-10">
                <div className="flex items-center justify-center w-12 h-12 text-white bg-teal-500 rounded-lg">
                  <FiGrid size={24} />
                </div>
                <h2 className="mt-6 text-xl font-bold text-slate-800">
                  Full File Management
                </h2>
                <p className="mt-2 text-slate-500">
                  Full access to all operations including delete and rename.
                </p>
                <div className="flex items-center mt-6 font-semibold text-teal-600">
                  Open Manager
                  <FiArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
          </div>
        </div>
      </div>

      <FileManager 
        isOpen={isManagerOpen} 
        onClose={closeFileManager}
        allowedActions={actions}
      />
    </>
  );
}