import type { FileInfo } from 'basic-ftp';

export type FtpAction = 'read' | 'upload' | 'delete' | 'rename' | 'create';

export type FtpFileInfo = FileInfo;