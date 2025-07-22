'use client';
import { FC, useEffect, useRef, useState } from 'react'; // Import useState
import { HiX } from 'react-icons/hi';
import { FileManagerProvider, useFileManagerContext } from '@/app/context/FileManagerContext';
import type { FtpAction } from './type';
import { Modal } from './ui/Modal';
import { FileItem } from './FileItem';
import { FileManagerToolbar } from './FileManagerTolbar';

const FileManagerUI: FC<{ allowedActions: FtpAction[] }> = ({ allowedActions }) => {
    const { files, isLoading, error, fetchFiles, currentPath, uploadFiles } = useFileManagerContext();
    const [dragActive, setDragActive] = useState(false);
    const dragCounter = useRef(0);

    useEffect(() => {
        fetchFiles(currentPath);
    }, [currentPath, fetchFiles]);

    const handleDrag = (e: React.DragEvent) => { e.preventDefault(); e.stopPropagation(); };
    const handleDragIn = (e: React.DragEvent) => { e.preventDefault(); e.stopPropagation(); dragCounter.current++; if (e.dataTransfer.items?.length > 0) setDragActive(true); };
    const handleDragOut = (e: React.DragEvent) => { e.preventDefault(); e.stopPropagation(); dragCounter.current--; if (dragCounter.current === 0) setDragActive(false); };
    const handleDrop = (e: React.DragEvent) => { e.preventDefault(); e.stopPropagation(); setDragActive(false); dragCounter.current = 0; if (e.dataTransfer.files?.length > 0) uploadFiles(e.dataTransfer.files); };

    return (
        <div className="flex flex-col w-full h-full" onDragEnter={handleDragIn} onDragLeave={handleDragOut} onDragOver={handleDrag} onDrop={handleDrop}>
            <FileManagerToolbar canCreate={allowedActions.includes('create')} />
            <main className="relative flex-grow p-4 overflow-y-auto">
                {isLoading && <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50"><div className="w-10 h-10 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div></div>}
                {error && <div className="p-4 mb-4 text-red-800 bg-red-100 border-l-4 border-red-500 rounded-md"><strong>Error:</strong> {error}</div>}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {files.map(file => (
                        <FileItem
                            key={file.name}
                            file={file}
                            allowedActions={{ rename: allowedActions.includes('rename'), delete: allowedActions.includes('delete') }}
                        />
                    ))}
                </div>
                {dragActive && <div className="absolute inset-0 z-20 flex items-center justify-center bg-blue-500/20 border-4 border-dashed border-blue-600 rounded-lg pointer-events-none"><p className="text-2xl font-bold text-blue-700">Drop files to upload</p></div>}
            </main>
        </div>
    );
};

interface FileManagerProps {
  isOpen: boolean;
  onClose: () => void;
  allowedActions?: FtpAction[];
}

const FileManager: FC<FileManagerProps> = ({ isOpen, onClose, allowedActions }) => {
    if (!isOpen) return null;

    return (
        <FileManagerProvider>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                <div className="flex flex-col w-full h-full max-w-5xl max-h-[90vh] bg-slate-100 rounded-xl shadow-2xl overflow-hidden">
                    <header className="flex items-center justify-between p-4 bg-white border-b border-slate-200 shrink-0">
                        <h2 className="text-xl font-bold text-slate-800">File Manager</h2>
                        <button onClick={onClose} className="p-2 text-slate-500 rounded-full hover:bg-slate-100"><HiX size={24} /></button>
                    </header>
                    <FileManagerUI allowedActions={allowedActions || []} />
                </div>
            </div>
            {/* The Modal is now also inside the Provider tree, so it can use the context */}
            <Modal />
        </FileManagerProvider>
    );
};

export default FileManager;
