'use client';
import { FC, Fragment } from 'react';
import { HiArrowUp, HiFolderAdd } from 'react-icons/hi';
import { useFileManagerContext } from '@/app/context/FileManagerContext';

interface ToolbarProps {
    canCreate: boolean;
}

export const FileManagerToolbar: FC<ToolbarProps> = ({ canCreate }) => {
    const { currentPath, setCurrentPath, openModal } = useFileManagerContext();
    
    const breadcrumbs = currentPath.split('/').filter(p => p);
    const handleGoUp = () => { if (currentPath !== '/') setCurrentPath(currentPath.substring(0, currentPath.lastIndexOf('/')) || '/'); };

    return (
        <div className="flex items-center p-2 space-x-2 border-b border-slate-200 bg-slate-50 shrink-0">
            {currentPath !== '/' && <button onClick={handleGoUp} className="p-2 rounded-md hover:bg-slate-200 text-slate-600" title="Go up"><HiArrowUp /></button>}
            <div className="flex items-center flex-grow p-2 text-sm text-slate-600 bg-white border rounded-md font-mono">
                <span onClick={() => setCurrentPath('/')} className="cursor-pointer hover:text-blue-600">Home</span>
                {breadcrumbs.map((crumb, i) => {
                    const path = '/' + breadcrumbs.slice(0, i + 1).join('/');
                    return <Fragment key={i}><span className="mx-1 text-slate-400">/</span><span onClick={() => setCurrentPath(path)} className="cursor-pointer hover:text-blue-600">{crumb}</span></Fragment>;
                })}
            </div>
            {canCreate && <button onClick={() => openModal({ type: 'create' })} className="flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"><HiFolderAdd className="mr-2" size={18} /> New Folder</button>}
        </div>
    );
};

