<div align="center">
  <h1>Advanced FTP File Manager</h1>
  <p>A modern, fast, and full-featured file manager built with Next.js, React, and TypeScript. Designed to be easily integrated into any project as a beautiful and intuitive modal.</p>
</div>

<p align="center">
<img src="https://github.com/user-attachments/assets/92fa78a6-32fa-430a-a9e2-0ee65538b553" alt="File Manager Screenshot" width="80%" />
</p>

<br />

---

## 🌟 Key Features

* **Modern & Responsive UI:**
    * Designed with **Tailwind CSS** for a flawless experience on all devices.
    * Smooth animations and transitions for a premium feel.

* **Full CRUD Operations:**
    * Complete support for creating folders, reading (listing), renaming, and deleting files and folders.

* **Effortless Uploading:**
    * **Drag & Drop:** A dedicated drop zone for uploading files intuitively.
    * **File Selection:** A standard button to open the native file selection dialog.

* **Clean & Optimized Architecture:**
    * **Lazy Loading:** The component is loaded only when needed, ensuring a fast initial page load.
    * **React Context API:** Centralized state management to avoid prop drilling and keep components clean.
    * **Custom Hooks:** Separation of concerns by moving all logic into a dedicated `useFtpManager` hook.

* **Advanced Navigation:**
    * **Clickable Breadcrumbs:** Easily navigate the folder hierarchy.
    * **Go Up Button:** A quick way to return to the parent directory.
    * **Double-Click:** The standard way to enter folders.

* **Dynamic Access Control:**
    * Programmatically define which actions (`read`, `upload`, `delete`, etc.) are available to the user.

## 🛠️ Tech Stack

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js"/>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"/>
  <img src="https://img.shields.io/badge/basic--ftp-9A4668?style=for-the-badge" alt="basic-ftp"/>
</div>

---

## 🚀 Setup and Installation Guide

### 1. Software Prerequisites

* **Node.js:** Version 18.17 or higher.
* **Git:** For version control.
* **An active FTP Server:** For local development, we recommend **FileZilla Server**.
    * **Download:** Get the free software from its [official website](https://filezilla-project.org/download.php?type=server).
    * **Setup:** After installation, create a user with a password, assign a home directory, and grant the necessary permissions.

### 2. Project Setup Steps

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/ftp-file-manager.git](https://github.com/your-username/ftp-file-manager.git)
    cd ftp-file-manager
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a file named `.env.local` in the project root.
    ```env
    # .env.local
    FTP_HOST="127.0.0.1"
    FTP_USER="your_ftp_user"
    FTP_PASSWORD="your_ftp_password"
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The project is now available at `http://localhost:3000`.

---

## 📖 How to Use

To use the file manager, dynamically import the `FileManager` component.

```jsx
'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';

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
          allowedActions={['read', 'upload']}
        />
      )}
    </div>
  );
}
```

### ⚠️ Important Security Note

In `lib/ftp-client.ts`, the `rejectUnauthorized: false` option is used for local development. **Never use this in a production environment.**

---

## 📂 Project Structure

```
/
├── app/
│   ├── api/ftp/              # API Routes for all FTP operations
│   └── page.tsx              # Example home page
├── components/
│   ├── ui/Modal.tsx          # Modal component
│   ├── FileItem.tsx          # File/Folder item component
│   └── FileManager.tsx       # Main component
├── contexts/
│   └── FileManagerContext.tsx# Central context for State Management
├── hooks/
│   └── useFtpManager.ts      # Custom hook with all application logic
└── ...
```

---

## 🤝 Contributing

Contributions are welcome! Please open an issue to discuss what you would like to change before submitting a pull request.


