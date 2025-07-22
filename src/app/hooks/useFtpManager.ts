'use client';
import { useState, useCallback } from 'react';
import type { FtpFileInfo } from '@/app/components/type'; // Adjust path if needed

type ApiBody = Record<string, unknown> | FormData;

export const useFtpManager = () => {
    const [files, setFiles] = useState<FtpFileInfo[]>([]);
    const [currentPath, setCurrentPath] = useState<string>('/');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const callApi = async (endpoint: string, body: ApiBody) => {
        setIsLoading(true);
        setError(null);
        try {
            const isFormData = body instanceof FormData;

            const options: RequestInit = {
                method: 'POST',
            };

            if (isFormData) {
                options.body = body;
            } else {
                options.headers = { 'Content-Type': 'application/json' };
                options.body = JSON.stringify(body);
            }

            const response = await fetch(`/api/ftp/${endpoint}`, options);
            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.error || `Failed to perform action: ${endpoint}`);
            }
            return result;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : `An unknown error occurred.`;
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchFiles = useCallback(async (path: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/ftp/list', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ path }),
            });
            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || 'Failed to fetch files.');
            }
            const data: FtpFileInfo[] = await response.json();
            setFiles(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const uploadFiles = async (filesToUpload: FileList) => {
        if (filesToUpload.length === 0) return;
        const formData = new FormData();
        formData.append('file', filesToUpload[0]);
        formData.append('path', currentPath);
        await callApi('upload', formData);
        await fetchFiles(currentPath);
    };

    const createFolder = async (folderName: string) => {
        const newPath = [currentPath.replace(/\/$/, ''), folderName].join('/');
        await callApi('create-folder', { path: newPath });
        await fetchFiles(currentPath);
    };



    const deleteItem = async (item: FtpFileInfo) => {
        const path = [currentPath.replace(/\/$/, ''), item.name].join('/');
        await callApi('delete', { path, type: item.isDirectory ? 1 : 2 });
        await fetchFiles(currentPath);
    };

    const renameItem = async (item: FtpFileInfo, newName: string) => {
        const fromPath = [currentPath.replace(/\/$/, ''), item.name].join('/');
        const toPath = [currentPath.replace(/\/$/, ''), newName].join('/');
        await callApi('rename', { fromPath, toPath });
        await fetchFiles(currentPath);
    };

    return {
        files,
        currentPath,
        isLoading,
        error,
        fetchFiles,
        uploadFiles,
        createFolder,
        deleteItem,
        renameItem,
        setCurrentPath,
    };
};
