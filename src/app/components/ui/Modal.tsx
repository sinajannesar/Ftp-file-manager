'use client';
import { FC, useState, useEffect } from 'react';
import { useFileManagerContext } from '@/app/context/FileManagerContext';

export const Modal: FC = () => {
    const { modal, closeModal, createFolder, renameItem } = useFileManagerContext();
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (modal) {
            setInputValue(modal.type === 'rename' && modal.data ? modal.data.name : '');
        }
    }, [modal]);

    if (!modal) return null;

    const handleConfirm = () => {
        if (!inputValue.trim()) return;
        if (modal.type === 'create') {
            createFolder(inputValue.trim());
        } else if (modal.type === 'rename' && modal.data) {
            renameItem(modal.data, inputValue.trim());
        }
        closeModal();
    };

    const title = modal.type === 'create' ? 'Create Folder' : `Rename "${modal.data?.name}"`;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50" onClick={closeModal}>
            <div className="p-6 bg-white rounded-lg shadow-xl w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
                <h3 className="mb-4 text-lg font-semibold text-slate-800">{title}</h3>
                <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} type="text" placeholder="Enter name..." className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500" autoFocus onKeyDown={(e) => e.key === 'Enter' && handleConfirm()} />
                <div className="flex justify-end mt-4 space-x-3">
                    <button onClick={closeModal} className="px-4 py-2 text-slate-700 bg-slate-100 rounded-md hover:bg-slate-200">Cancel</button>
                    <button onClick={handleConfirm} className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">Confirm</button>
                </div>
            </div>
        </div>
    );
};

