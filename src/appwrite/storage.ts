import { storage, appwriteConfig, handleAppwriteError } from './config';
import { ID } from 'appwrite';

export class StorageService {
  // Upload file to Appwrite storage
  async uploadFile(file: File, onProgress?: (progress: number) => void): Promise<string> {
    try {
      const fileId = ID.unique();
      
      const response = await storage.createFile(
        appwriteConfig.storageId,
        fileId,
        file
      );

      return response.$id;
    } catch (error: any) {
      console.error('File upload error:', error);
      throw new Error(handleAppwriteError(error));
    }
  }

  // Get file URL for download
  getFileDownload(fileId: string): string {
    try {
      return storage.getFileDownload(appwriteConfig.storageId, fileId).href;
    } catch (error: any) {
      console.error('Get file download error:', error);
      throw new Error(handleAppwriteError(error));
    }
  }

  // Get file preview URL
  getFilePreview(fileId: string, width?: number, height?: number): string {
    try {
      return storage.getFilePreview(
        appwriteConfig.storageId,
        fileId,
        width,
        height
      ).href;
    } catch (error: any) {
      console.error('Get file preview error:', error);
      throw new Error(handleAppwriteError(error));
    }
  }

  // Get file view URL
  getFileView(fileId: string): string {
    try {
      return storage.getFileView(appwriteConfig.storageId, fileId).href;
    } catch (error: any) {
      console.error('Get file view error:', error);
      throw new Error(handleAppwriteError(error));
    }
  }

  // Delete file from storage
  async deleteFile(fileId: string): Promise<void> {
    try {
      await storage.deleteFile(appwriteConfig.storageId, fileId);
    } catch (error: any) {
      console.error('Delete file error:', error);
      throw new Error(handleAppwriteError(error));
    }
  }

  // Get file details
  async getFile(fileId: string) {
    try {
      const file = await storage.getFile(appwriteConfig.storageId, fileId);
      return file;
    } catch (error: any) {
      console.error('Get file error:', error);
      throw new Error(handleAppwriteError(error));
    }
  }

  // Validate file type and size
  validateFile(file: File): { isValid: boolean; error?: string } {
    const maxSize = 100 * 1024 * 1024; // 100MB
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'video/mp4',
      'video/webm',
      'text/plain',
      'application/zip',
      'application/x-rar-compressed',
      'image/jpeg',
      'image/png',
      'image/gif'
    ];

    if (file.size > maxSize) {
      return {
        isValid: false,
        error: 'File size must be less than 100MB'
      };
    }

    if (!allowedTypes.includes(file.type)) {
      return {
        isValid: false,
        error: 'File type not supported. Please upload PDF, DOC, PPT, MP4, ZIP, or image files.'
      };
    }

    return { isValid: true };
  }

  // Format file size for display
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Get file type icon
  getFileTypeIcon(mimeType: string): string {
    const typeMap: Record<string, string> = {
      'application/pdf': '📄',
      'application/msword': '📝',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '📝',
      'application/vnd.ms-powerpoint': '📊',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': '📊',
      'video/mp4': '🎥',
      'video/webm': '🎥',
      'text/plain': '📄',
      'application/zip': '📦',
      'application/x-rar-compressed': '📦',
      'image/jpeg': '🖼️',
      'image/png': '🖼️',
      'image/gif': '🖼️'
    };

    return typeMap[mimeType] || '📄';
  }

  // Bulk upload files
  async uploadMultipleFiles(
    files: File[],
    onProgress?: (fileIndex: number, progress: number) => void
  ): Promise<string[]> {
    const uploadPromises = files.map(async (file, index) => {
      try {
        const fileId = await this.uploadFile(file, (progress) => {
          onProgress?.(index, progress);
        });
        return fileId;
      } catch (error) {
        console.error(`Failed to upload file ${file.name}:`, error);
        throw error;
      }
    });

    return Promise.all(uploadPromises);
  }
}

export const storageService = new StorageService();
