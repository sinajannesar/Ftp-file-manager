import { FC } from 'react';
import { HiFolder, HiDocument, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';
import { useFileManagerContext } from '@/app/context/FileManagerContext';
import type { FtpFileInfo } from './type';

interface FileItemProps {
    file: FtpFileInfo; // دریافت فقط داده‌های سریال‌شده
    allowedActions: { rename: boolean; delete: boolean; };
}

export const FileItem: FC<FileItemProps> = ({ file, allowedActions }) => {
    const { deleteItem, setCurrentPath, currentPath, openModal } = useFileManagerContext();

    const handleDelete = () => { if (window.confirm(`Delete "${file.name}"?`)) deleteItem(file); };
    const handleRename = () => openModal({ type: 'rename', data: file });
    const handleDoubleClick = () => { if (file.isDirectory) setCurrentPath(`${currentPath.replace(/\/$/, '')}/${file.name}`); };

    return (
        <div onDoubleClick={handleDoubleClick} className="relative flex flex-col items-center p-4 text-center bg-white border rounded-lg shadow-sm cursor-pointer group hover:shadow-md hover:border-blue-500 transition-all duration-200">
            <div className="text-5xl mb-2">{file.isDirectory ? <HiFolder className="text-yellow-500" /> : <HiDocument className="text-slate-500" />}</div>
            <p className="w-full text-sm font-medium truncate text-slate-700" title={file.name}>{file.name}</p>
            <p className="text-xs text-slate-400">{file.isDirectory ? 'Folder' : `${(file.size / 1024).toFixed(1)} KB`}</p>
            <div className="absolute top-1 right-1 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {allowedActions.rename && <button onClick={handleRename} className="p-1.5 bg-white/60 backdrop-blur-sm rounded-full hover:bg-blue-100 text-blue-600"><HiOutlinePencil size={16} /></button>}
                {allowedActions.delete && <button onClick={handleDelete} className="p-1.5 bg-white/60 backdrop-blur-sm rounded-full hover:bg-red-100 text-red-600"><HiOutlineTrash size={16} /></button>}
            </div>
        </div>
    );
};
