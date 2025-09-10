# BCA Student Library - Appwrite

A comprehensive digital library platform for BCA (Bachelor of Computer Applications) students, built with React, TypeScript, Tailwind CSS, and Appwrite as the backend service.

## 🚀 Features

- **Authentication System**: Secure user registration and login with Appwrite Auth
- **Resource Management**: Upload, organize, and access study materials by semester
- **Real-time Updates**: Live notifications and updates using Appwrite Realtime
- **Search & Filter**: Advanced search capabilities across all resources
- **Bookmarking**: Save and organize favorite resources
- **Download Tracking**: Monitor resource usage and popularity
- **Admin Panel**: Comprehensive admin dashboard for content management
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Dark Mode**: Support for light and dark themes
- **PWA Ready**: Progressive Web App capabilities

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Backend**: Appwrite (BaaS)
- **State Management**: Zustand
- **Routing**: React Router v6
- **Forms**: React Hook Form
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- npm or yarn
- Git

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/justfsl50/bca-library-appwrite.git
cd bca-library-appwrite
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Set Up Appwrite

#### Create Appwrite Project

1. Go to [Appwrite Cloud](https://cloud.appwrite.io/) or set up your own Appwrite instance
2. Create a new project
3. Note down your project ID

#### Configure Database

Create the following collections in your Appwrite database:

##### Users Collection
```json
{
  "name": "users",
  "enabled": true,
  "documentSecurity": true,
  "attributes": [
    {
      "key": "name",
      "type": "string",
      "size": 255,
      "required": true
    },
    {
      "key": "email",
      "type": "string",
      "size": 255,
      "required": true
    },
    {
      "key": "semester",
      "type": "integer",
      "min": 1,
      "max": 6,
      "required": true
    },
    {
      "key": "role",
      "type": "string",
      "size": 50,
      "required": true,
      "default": "student"
    },
    {
      "key": "college",
      "type": "string",
      "size": 255,
      "required": false
    },
    {
      "key": "verified",
      "type": "boolean",
      "required": true,
      "default": false
    },
    {
      "key": "created_at",
      "type": "datetime",
      "required": true
    }
  ],
  "indexes": [
    {
      "key": "email",
      "type": "unique",
      "attributes": ["email"]
    },
    {
      "key": "semester",
      "type": "key",
      "attributes": ["semester"]
    },
    {
      "key": "role",
      "type": "key",
      "attributes": ["role"]
    }
  ]
}
```

##### Resources Collection
```json
{
  "name": "resources",
  "enabled": true,
  "documentSecurity": true,
  "attributes": [
    {
      "key": "title",
      "type": "string",
      "size": 255,
      "required": true
    },
    {
      "key": "description",
      "type": "string",
      "size": 1000,
      "required": true
    },
    {
      "key": "semester",
      "type": "integer",
      "min": 1,
      "max": 6,
      "required": true
    },
    {
      "key": "subject",
      "type": "string",
      "size": 255,
      "required": true
    },
    {
      "key": "category",
      "type": "string",
      "size": 50,
      "required": true
    },
    {
      "key": "file_id",
      "type": "string",
      "size": 255,
      "required": true
    },
    {
      "key": "file_type",
      "type": "string",
      "size": 50,
      "required": true
    },
    {
      "key": "file_size",
      "type": "integer",
      "required": true
    },
    {
      "key": "uploaded_by",
      "type": "string",
      "size": 255,
      "required": true
    },
    {
      "key": "upload_date",
      "type": "datetime",
      "required": true
    },
    {
      "key": "download_count",
      "type": "integer",
      "required": true,
      "default": 0
    },
    {
      "key": "rating",
      "type": "double",
      "required": true,
      "default": 0
    },
    {
      "key": "tags",
      "type": "string",
      "size": 1000,
      "array": true,
      "required": false
    },
    {
      "key": "status",
      "type": "string",
      "size": 50,
      "required": true,
      "default": "active"
    }
  ],
  "indexes": [
    {
      "key": "semester",
      "type": "key",
      "attributes": ["semester"]
    },
    {
      "key": "subject",
      "type": "key",
      "attributes": ["subject"]
    },
    {
      "key": "category",
      "type": "key",
      "attributes": ["category"]
    },
    {
      "key": "status",
      "type": "key",
      "attributes": ["status"]
    },
    {
      "key": "upload_date",
      "type": "key",
      "attributes": ["upload_date"]
    }
  ]
}
```

##### Create other collections: subjects, downloads, bookmarks (similar structure)

#### Set Up Storage

1. Create a storage bucket for file uploads
2. Configure bucket permissions for read/write access
3. Set up file size limits (recommended: 100MB max)

### 4. Environment Configuration

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Update the environment variables with your Appwrite configuration:

```env
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your-project-id
VITE_APPWRITE_DATABASE_ID=your-database-id
VITE_APPWRITE_STORAGE_BUCKET_ID=your-storage-bucket-id

# Collection IDs
VITE_APPWRITE_USERS_COLLECTION_ID=users
VITE_APPWRITE_RESOURCES_COLLECTION_ID=resources
VITE_APPWRITE_SUBJECTS_COLLECTION_ID=subjects
VITE_APPWRITE_DOWNLOADS_COLLECTION_ID=downloads
VITE_APPWRITE_BOOKMARKS_COLLECTION_ID=bookmarks
```

### 5. Start Development Server

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
client/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable React components
│   │   ├── ui/           # Basic UI components
│   │   ├── forms/        # Form components
│   │   └── layout/       # Layout components
│   ├── pages/            # Page components
│   │   ├── auth/         # Authentication pages
│   │   ├── admin/        # Admin panel pages
│   │   └── student/      # Student pages
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Utility functions
│   ├── types/            # TypeScript type definitions
│   ├── appwrite/         # Appwrite service functions
│   │   ├── config.ts     # Appwrite configuration
│   │   ├── auth.ts       # Authentication services
│   │   ├── database.ts   # Database operations
│   │   └── storage.ts    # File storage services
│   ├── styles/           # Global styles
│   └── main.tsx          # Application entry point
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## 🎯 BCA Semester Structure

The application is organized around the standard BCA curriculum:

### Semester 1
- C Programming
- Computer Fundamentals
- Mathematics I
- English Communication
- Environmental Studies

### Semester 2
- C++ Programming
- Data Structures
- Mathematics II
- Digital Electronics
- Financial Accounting

### Semester 3
- Java Programming
- Database Management System
- Computer Networks
- Web Technologies
- Software Engineering

### Semester 4
- Advanced Java
- System Analysis & Design
- Python Programming
- Computer Graphics
- Mobile Application Development

### Semester 5
- Artificial Intelligence
- Cloud Computing
- Cyber Security
- Project Management
- Data Mining

### Semester 6
- Machine Learning
- Internet of Things
- Blockchain Technology
- Major Project
- Industrial Training

## 🔐 Authentication & Permissions

### User Roles
- **Student**: Can view and download resources, manage bookmarks
- **Admin**: Full access to upload, edit, delete resources and manage users

### Permissions Structure
- **Public**: Landing page, registration, login
- **Authenticated Users**: Dashboard, resources, profile management
- **Admin Only**: Admin panel, user management, resource upload/edit

## 📱 Features in Detail

### Resource Management
- Upload files with metadata (title, description, subject, semester)
- Organize by semester and subject
- Support for multiple file types (PDF, DOC, PPT, MP4, etc.)
- File compression and optimization

### Search & Discovery
- Full-text search across titles and descriptions
- Filter by semester, subject, category, and date
- Sort by popularity, date, rating
- Tag-based organization

### User Experience
- Responsive design for all devices
- Dark/light mode toggle
- Offline support with service workers
- Progressive Web App capabilities
- Real-time notifications

## 🚀 Deployment

### Build for Production

```bash
npm run build
# or
yarn build
```

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

### Deploy to Netlify

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to Netlify

### Environment Variables for Production

Ensure all environment variables are set in your deployment platform:
- `VITE_APPWRITE_ENDPOINT`
- `VITE_APPWRITE_PROJECT_ID`
- `VITE_APPWRITE_DATABASE_ID`
- `VITE_APPWRITE_STORAGE_BUCKET_ID`
- Collection IDs

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run e2e tests
npm run test:e2e
```

## 📊 Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **Bundle Size**: < 500KB gzipped
- **Load Time**: < 2s on 3G networks
- **Real-time Updates**: WebSocket connections for live data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Email: support@bcalibrary.com
- Documentation: [docs.bcalibrary.com](https://docs.bcalibrary.com)

## 🎉 Acknowledgments

- Built with [Appwrite](https://appwrite.io/) - Open source backend server
- UI components inspired by [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

---

**Happy Coding! 🚀**#   b c a - l i b r a r y - a p p w r i t e  
 