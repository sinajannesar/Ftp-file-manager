FTP File Manager with Next.js and React
This project is a modern and complete File Manager component for FTP servers, built with Next.js (App Router), React, and TypeScript. The file manager is displayed as a modal (popup) and provides full functionality for managing files and folders.

<!-- Place a screenshot of your project here -->

✨ Features
Full CRUD Operations: Create, read, update, and delete files and folders.

Modern UI: Designed with Tailwind CSS for a beautiful and responsive interface.

Drag & Drop: Easily upload files by dragging and dropping them into the file manager window.

Lazy Loading: The file manager component is only loaded when the user needs it, improving initial page load speed.

Clean Architecture: Uses React Context API for state management, preventing prop drilling.

Easy Navigation: Features breadcrumbs for convenient navigation between folders.

Access Control: Ability to limit allowed operations for the user (e.g., read and upload only).

🛠️ Tech Stack
Next.js 13+ (App Router)

React 18

TypeScript

Tailwind CSS

basic-ftp: A server-side library for communicating with FTP.

react-icons: For beautiful icons.

⚙️ Prerequisites and Installation
To run this project, you will need the following:

1. Software Dependencies
Node.js: Version 18.17 or higher.

Git: For version control.

An active FTP Server: You need an FTP server to connect to. For local development and testing, we have used FileZilla Server.

Download FileZilla Server: You can download this free software from its official website and install it on Windows.

Setup: After installation, create a user with a password and assign a folder from your computer as its home directory. Grant the necessary permissions (read, write, delete) to the user.

2. Project Setup Steps
Clone the repository:

git clone https://github.com/your-username/ftp-file-manager.git
cd ftp-file-manager

Install dependencies:

npm install

Create the environment variables file:
Create a file named .env.local in the root of your project and enter your FTP server details.

# .env.local

# Your FTP Server credentials
# For local testing with FileZilla Server:
FTP_HOST="127.0.0.1"
FTP_USER="your_ftp_user"      # The username you created in FileZilla Server
FTP_PASSWORD="your_ftp_password" # The password you set

Run the development server:

npm run dev

Your project is now available at http://localhost:3000.

⚠️ Important Security Note
In the lib/ftp-client.ts file, the rejectUnauthorized: false option is used to connect to a local FTP server (which does not have a valid SSL certificate).

Never use this option in a production environment to connect to a real server on the internet, as it compromises the security of your connection.

📂 Project Structure
/app/api/ftp/: Contains all server-side API Routes for communicating with the FTP server.

/components/: Contains reusable UI components.

/contexts/: Contains the React Context for managing the file manager's global state.

/hooks/: Contains the useFtpManager custom hook to separate logic from the UI.
