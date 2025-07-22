# FTP File Manager

A modern, web-based FTP file manager built with Next.js 15, React 19, and TypeScript. This application provides a beautiful and intuitive interface for managing files on FTP servers with drag-and-drop functionality.

## Features

- 🚀 **Modern UI/UX** - Clean, responsive interface with Tailwind CSS
- 📁 **Full File Management** - Create, rename, delete folders and files
- 📤 **Drag & Drop Upload** - Easy file uploading with visual feedback
- 🔄 **Real-time Operations** - Instant feedback for all file operations
- 🛡️ **Permission-based Actions** - Configurable user permissions
- 📱 **Mobile Responsive** - Works seamlessly on all devices

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Icons**: React Icons
- **FTP Client**: basic-ftp

## FileZilla Server Setup

### Step 1: Download and Install
1. Download FileZilla Server from the official website
2. Install and configure as Windows service

### Step 2: Configure Server
1. **Create User**:
   - Username: `Myuser`
   - Password: `12341234`

2. **Set Permissions**:
   - Add shared folder
   - Enable: Read, Write, Delete, Create directories
   - Set as home directory

3. **Enable TLS**:
   - Enable "FTP over TLS support"
   - Allow explicit FTP over TLS

## Installation

### 1. Clone Repository
```bash
git clone <repository-url>
cd ftp-file-manager
npm install
```

### 2. Environment Setup
Create `.env.local`:
```env
FTP_HOST="127.0.0.1"
FTP_USER="Myuser"
FTP_PASSWORD="12341234"
```

### 3. Run Application
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Usage

- **Navigate**: Double-click folders to enter
- **Upload**: Drag and drop files
- **Create Folder**: Click "New Folder" button
- **Rename/Delete**: Use action buttons on hover

## Permission Modes

```typescript
// Read-only mode
['read', 'upload']

// Full management mode
['read', 'upload', 'delete', 'rename', 'create']
```
