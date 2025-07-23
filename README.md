Advanced FTP File Manager with Next.js
A modern, fast, and full-featured file manager that can be easily integrated into any React or Next.js project. This component is designed as a modal (popup) and provides a smooth user experience for managing files on an FTP server.

🌟 Key Features
This file manager comes with a powerful set of features:

Modern & Responsive UI: Designed with Tailwind CSS for a beautiful appearance and flawless performance on all devices (mobile, tablet, and desktop).

Full CRUD Operations: Complete support for creating folders, reading (listing), renaming, and deleting files and folders.

Easy Upload:

Drag & Drop: Upload files simply by dragging them into the file manager window.

Upload Button: Allows file selection through the standard operating system dialog.

Clean & Optimized Architecture:

Lazy Loading: The heavy file manager component is loaded only when the user needs it, significantly increasing the initial page speed.

React Context API: Centralized state management to prevent complexity and prop drilling.

Custom Hooks: Complete separation of application logic from the user interface for easier code readability and maintenance.

Advanced Navigation:

Breadcrumbs: Displays the current path like Home / Documents / Images with clickable links for quick navigation.

Double-Click Navigation: Enter folders by double-clicking.

Dynamic Access Control: You can specify which operations (e.g., only read and upload) the user has access to when calling the component.

🛠️ Tech Stack
<p align="left">
<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js"/>
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"/>
<img src="https://img.shields.io/badge/basic--ftp-9A4668?style=for-the-badge" alt="basic-ftp"/>
</p>

🚀 Setup and Installation Guide
To run this project, you will need the following:

1. Software Prerequisites
Node.js: Version 18.17 or higher.

Git: For version control.

An active FTP Server: For local development and testing, we have used FileZilla Server.

Download: You can download this free software from its official website and install it.

Setup: After installation, create a user with a password, assign a folder from your computer as its home directory, and grant the necessary permissions (read, write, delete, etc.).

2. Project Setup Steps
Clone the repository:

git clone https://github.com/your-username/ftp-file-manager.git
cd ftp-file-manager

Install dependencies:

npm install

Configure Environment Variables:
Create a file named .env.local in the project root and enter your FTP server details.

# .env.local

# Your FTP Server credentials
# For local testing with FileZilla Server:
FTP_HOST="127.0.0.1"
FTP_USER="your_ftp_user"      # The username you created in FileZilla Server
FTP_PASSWORD="your_ftp_password" # The password you set

Run the development server:

npm run dev

Your project is now available at http://localhost:3000.

📖 How to Use
To use this file manager anywhere in your application, dynamically import the FileManager component and call it with the necessary props:

'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';

// Lazy load the component
const FileManager = dynamic(() => import('@/components/FileManager'), { ssr: false });

export default function MyPage() {
  const [isManagerOpen, setManagerOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setManagerOpen(true)}>Open File Manager</button>

      {isManagerOpen && (
        <FileManager
          isOpen={isManagerOpen}
          onClose={() => setManagerOpen(false)}
          // (Optional) Restrict permissions
          allowedActions={['read', 'upload']}
        />
      )}
    </div>
  );
}

⚠️ Important Security Note
In the lib/ftp-client.ts file, the rejectUnauthorized: false option is used to connect to a local FTP server (which does not have a valid SSL certificate). Never use this option in a production environment.

📂 Project Structure
/
├── app/
│   ├── api/ftp/              # API Routes for all FTP operations
│   │   ├── list/route.ts
│   │   └── ...
│   └── page.tsx              # Example home page
├── components/
│   ├── ui/Modal.tsx          # Modal component
│   ├── FileItem.tsx          # File/Folder item component
│   ├── FileManagerToolbar.tsx# Toolbar component
│   └── FileManager.tsx       # Main coordinating component
├── contexts/
│   └── FileManagerContext.tsx# Central context for State Management
├── hooks/
│   └── useFtpManager.ts      # Custom hook with all application logic
├── public/
└── ...

🤝 Contributing
Contributions are welcome! Please open an issue to discuss what you would like to change before submitting a pull request.

📜 License
This project is licensed under the MIT License.
