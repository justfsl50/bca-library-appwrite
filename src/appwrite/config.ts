import { Client, Account, Databases, Storage, Teams, Avatars } from 'appwrite';

// Environment variables with validation
const requiredEnvVars = [
  'VITE_APPWRITE_ENDPOINT',
  'VITE_APPWRITE_PROJECT_ID',
  'VITE_APPWRITE_DATABASE_ID',
  'VITE_APPWRITE_STORAGE_BUCKET_ID'
] as const;

// Validate environment variables
for (const envVar of requiredEnvVars) {
  if (!import.meta.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

// Appwrite configuration
export const appwriteConfig = {
  endpoint: import.meta.env.VITE_APPWRITE_ENDPOINT,
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  storageId: import.meta.env.VITE_APPWRITE_STORAGE_BUCKET_ID,
  
  // Collection IDs
  usersCollectionId: import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID || 'users',
  resourcesCollectionId: import.meta.env.VITE_APPWRITE_RESOURCES_COLLECTION_ID || 'resources',
  subjectsCollectionId: import.meta.env.VITE_APPWRITE_SUBJECTS_COLLECTION_ID || 'subjects',
  downloadsCollectionId: import.meta.env.VITE_APPWRITE_DOWNLOADS_COLLECTION_ID || 'downloads',
  bookmarksCollectionId: import.meta.env.VITE_APPWRITE_BOOKMARKS_COLLECTION_ID || 'bookmarks',
};

// Initialize Appwrite client
export const client = new Client()
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId);

// Initialize Appwrite services
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const teams = new Teams(client);
export const avatars = new Avatars(client);

// Helper function to handle Appwrite errors
export const handleAppwriteError = (error: any): string => {
  console.error('Appwrite Error:', error);
  
  if (error.code === 401) {
    return 'Authentication failed. Please log in again.';
  }
  
  if (error.code === 403) {
    return 'Access denied. You do not have permission to perform this action.';
  }
  
  if (error.code === 404) {
    return 'Resource not found.';
  }
  
  if (error.code === 409) {
    return 'Resource already exists.';
  }
  
  if (error.code === 429) {
    return 'Too many requests. Please try again later.';
  }
  
  if (error.code === 500) {
    return 'Server error. Please try again later.';
  }
  
  return error.message || 'An unexpected error occurred.';
};

// Constants for the application
export const SEMESTER_OPTIONS = [
  { value: 1, label: 'Semester 1' },
  { value: 2, label: 'Semester 2' },
  { value: 3, label: 'Semester 3' },
  { value: 4, label: 'Semester 4' },
  { value: 5, label: 'Semester 5' },
  { value: 6, label: 'Semester 6' },
];

export const CATEGORY_OPTIONS = [
  { value: 'notes', label: 'Notes' },
  { value: 'assignments', label: 'Assignments' },
  { value: 'papers', label: 'Question Papers' },
  { value: 'videos', label: 'Video Lectures' },
  { value: 'code', label: 'Code Examples' },
];

export const SUBJECTS_BY_SEMESTER = {
  1: [
    'C Programming',
    'Computer Fundamentals',
    'Mathematics I',
    'English Communication',
    'Environmental Studies',
    'Digital Computer Fundamentals'
  ],
  2: [
    'C++ Programming',
    'Data Structures',
    'Mathematics II',
    'Digital Electronics',
    'Financial Accounting',
    'Computer System Architecture'
  ],
  3: [
    'Java Programming',
    'Database Management System',
    'Computer Networks',
    'Web Technologies',
    'Software Engineering',
    'Operating Systems'
  ],
  4: [
    'Advanced Java',
    'System Analysis & Design',
    'Python Programming',
    'Computer Graphics',
    'Management Information Systems',
    'Mobile Application Development'
  ],
  5: [
    'Artificial Intelligence',
    'Cloud Computing',
    'Cyber Security',
    'Project Management',
    'E-Commerce',
    'Data Mining'
  ],
  6: [
    'Machine Learning',
    'Internet of Things',
    'Blockchain Technology',
    'Major Project',
    'Industrial Training',
    'Entrepreneurship Development'
  ]
};

// File type configurations
export const ALLOWED_FILE_TYPES = {
  'application/pdf': 'PDF',
  'application/msword': 'DOC',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOCX',
  'application/vnd.ms-powerpoint': 'PPT',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'PPTX',
  'video/mp4': 'MP4',
  'video/webm': 'WEBM',
  'text/plain': 'TXT',
  'application/zip': 'ZIP',
  'application/x-rar-compressed': 'RAR',
};

export const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

// Default configuration
export const DEFAULT_PAGINATION_LIMIT = 12;
export const DEFAULT_SEARCH_LIMIT = 20;

// App metadata
export const APP_METADATA = {
  name: import.meta.env.VITE_APP_NAME || 'BCA Student Library',
  url: import.meta.env.VITE_APP_URL || 'http://localhost:3000',
  description: 'Access study materials, notes, assignments, and resources for all BCA semesters',
  version: '1.0.0',
};