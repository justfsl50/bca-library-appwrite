// User Types
export interface User {
  $id: string;
  name: string;
  email: string;
  semester: number;
  role: 'student' | 'admin';
  college?: string;
  verified: boolean;
  created_at: string;
  $createdAt: string;
  $updatedAt: string;
}

// Resource Types
export interface Resource {
  $id: string;
  title: string;
  description: string;
  semester: number;
  subject: string;
  category: 'notes' | 'assignments' | 'papers' | 'videos' | 'code';
  file_id: string;
  file_type: string;
  file_size: number;
  uploaded_by: string;
  upload_date: string;
  download_count: number;
  rating: number;
  tags: string[];
  status: 'active' | 'inactive';
  $createdAt: string;
  $updatedAt: string;
}

// Subject Types
export interface Subject {
  $id: string;
  name: string;
  code: string;
  semester: number;
  credits: number;
  description: string;
  prerequisites: string[];
  resource_count: number;
  created_at: string;
  $createdAt: string;
  $updatedAt: string;
}

// Download Types
export interface Download {
  $id: string;
  user_id: string;
  resource_id: string;
  download_date: string;
  file_size: number;
  ip_address: string;
  $createdAt: string;
  $updatedAt: string;
}

// Bookmark Types
export interface Bookmark {
  $id: string;
  user_id: string;
  resource_id: string;
  created_at: string;
  $createdAt: string;
  $updatedAt: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  semester: number;
  college?: string;
}

export interface ResourceUploadForm {
  title: string;
  description: string;
  semester: number;
  subject: string;
  category: Resource['category'];
  tags: string[];
  file: File;
}

// Component Props Types
export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterForm) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

export interface ResourceCardProps {
  resource: Resource;
  onDownload?: (resource: Resource) => void;
  onBookmark?: (resource: Resource) => void;
  isBookmarked?: boolean;
}

// Search and Filter Types
export interface SearchFilters {
  semester?: number;
  subject?: string;
  category?: Resource['category'];
  dateRange?: {
    start: string;
    end: string;
  };
  rating?: number;
  tags?: string[];
}

export interface SearchResult {
  resources: Resource[];
  total: number;
  page: number;
  limit: number;
}

// Statistics Types
export interface DashboardStats {
  totalResources: number;
  totalStudents: number;
  totalDownloads: number;
  popularSubjects: Array<{
    subject: string;
    count: number;
  }>;
  recentUploads: Resource[];
}

// Semester Information
export interface SemesterInfo {
  number: number;
  name: string;
  subjects: string[];
  description: string;
  prerequisites?: string[];
}

// Notification Types
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
}

// File Upload Types
export interface FileUploadProgress {
  fileName: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  error?: string;
}

// Analytics Types
export interface ResourceAnalytics {
  views: number;
  downloads: number;
  bookmarks: number;
  rating: number;
  popularTimes: Array<{
    hour: number;
    count: number;
  }>;
}