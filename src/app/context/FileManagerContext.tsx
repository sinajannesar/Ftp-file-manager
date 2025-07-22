'use client';
import { createContext, useContext, FC, ReactNode, useState, useCallback } from 'react';
import { useFtpManager } from '@/app/hooks/useFtpManager';
import type { FtpFileInfo } from '@/app/components/type';

type ModalState = { type: 'rename' | 'create'; data?: FtpFileInfo } | null;

type FtpManagerHookType = ReturnType<typeof useFtpManager> & {
    modal: ModalState;
    openModal: (modalState: ModalState) => void;
    closeModal: () => void;
};

const FileManagerContext = createContext<FtpManagerHookType | null>(null);

export const FileManagerProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const ftpManager = useFtpManager();
    const [modal, setModal] = useState<ModalState>(null);

    const openModal = useCallback((modalState: ModalState) => setModal(modalState), []);
    const closeModal = useCallback(() => setModal(null), []);

    const value = { ...ftpManager, modal, openModal, closeModal };

    return (
        <FileManagerContext.Provider value={value}>
            {children}
        </FileManagerContext.Provider>
    );
};

export const useFileManagerContext = () => {
    const context = useContext(FileManagerContext);
    if (!context) throw new Error('useFileManagerContext must be used within a FileManagerProvider');
    return context;
};
