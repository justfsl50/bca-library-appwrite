import { databases, appwriteConfig, handleAppwriteError } from './config';
import { ID, Query } from 'appwrite';
import type { Resource, Subject, Download, Bookmark, SearchFilters, SearchResult } from '../types';

export class DatabaseService {
  // Resources CRUD Operations
  async createResource(resourceData: Omit<Resource, '$id' | '$createdAt' | '$updatedAt'>): Promise<Resource> {
    try {
      const resource = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.resourcesCollectionId,
        ID.unique(),
        {
          ...resourceData,
          upload_date: new Date().toISOString(),
          download_count: 0,
          rating: 0,
          status: 'active'
        }
      );
      return resource as unknown as Resource;
    } catch (error: any) {
      console.error('Create resource error:', error);
      throw new Error(handleAppwriteError(error));
    }
  }

  async getResource(resourceId: string): Promise<Resource> {
    try {
      const resource = await databases.getDocument(
        appwriteConfig.databaseId,
        appwriteConfig.resourcesCollectionId,
        resourceId
      );
      return resource as unknown as Resource;
    } catch (error: any) {
      console.error('Get resource error:', error);
      throw new Error(handleAppwriteError(error));
    }
  }

  async updateResource(resourceId: string, data: Partial<Resource>): Promise<Resource> {
    try {
      const resource = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.resourcesCollectionId,
        resourceId,
        data
      );
      return resource as unknown as Resource;
    } catch (error: any) {
      console.error('Update resource error:', error);
      throw new Error(handleAppwriteError(error));
    }
  }

  async deleteResource(resourceId: string): Promise<void> {
    try {
      await databases.deleteDocument(
        appwriteConfig.databaseId,
        appwriteConfig.resourcesCollectionId,
        resourceId
      );
    } catch (error: any) {
      console.error('Delete resource error:', error);
      throw new Error(handleAppwriteError(error));
    }
  }

  // Get resources with filters and pagination
  async getResources(
    filters: SearchFilters = {},
    limit: number = 12,
    offset: number = 0
  ): Promise<SearchResult> {
    try {
      const queries: string[] = [
        Query.equal('status', 'active'),
        Query.limit(limit),
        Query.offset(offset),
        Query.orderDesc('upload_date')
      ];

      // Add filters
      if (filters.semester) {
        queries.push(Query.equal('semester', filters.semester));
      }
      if (filters.subject) {
        queries.push(Query.equal('subject', filters.subject));
      }
      if (filters.category) {
        queries.push(Query.equal('category', filters.category));
      }
      if (filters.tags && filters.tags.length > 0) {
        queries.push(Query.equal('tags', filters.tags));
      }

      const response = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.resourcesCollectionId,
        queries
      );

      return {
        resources: response.documents as unknown as Resource[],
        total: response.total,
        page: Math.floor(offset / limit) + 1,
        limit
      };
    } catch (error: any) {
      console.error('Get resources error:', error);
      throw new Error(handleAppwriteError(error));
    }
  }

  // Search resources
  async searchResources(
    searchTerm: string,
    filters: SearchFilters = {},
    limit: number = 20
  ): Promise<SearchResult> {
    try {
      const queries: string[] = [
        Query.equal('status', 'active'),
        Query.search('title', searchTerm),
        Query.limit(limit),
        Query.orderDesc('upload_date')
      ];

      // Add filters
      if (filters.semester) {
        queries.push(Query.equal('semester', filters.semester));
      }
      if (filters.subject) {
        queries.push(Query.equal('subject', filters.subject));
      }
      if (filters.category) {
        queries.push(Query.equal('category', filters.category));
      }

      const response = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.resourcesCollectionId,
        queries
      );

      return {
        resources: response.documents as unknown as Resource[],
        total: response.total,
        page: 1,
        limit
      };
    } catch (error: any) {
      console.error('Search resources error:', error);
      throw new Error(handleAppwriteError(error));
    }
  }

  // Get resources by semester
  async getResourcesBySemester(semester: number): Promise<Resource[]> {
    try {
      const response = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.resourcesCollectionId,
        [
          Query.equal('semester', semester),
          Query.equal('status', 'active'),
          Query.orderDesc('upload_date')
        ]
      );
      return response.documents as unknown as Resource[];
    } catch (error: any) {
      console.error('Get resources by semester error:', error);
      throw new Error(handleAppwriteError(error));
    }
  }

  // Subjects Operations
  async createSubject(subjectData: Omit<Subject, '$id' | '$createdAt' | '$updatedAt'>): Promise<Subject> {
    try {
      const subject = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.subjectsCollectionId,
        ID.unique(),
        {
          ...subjectData,
          resource_count: 0,
          created_at: new Date().toISOString()
        }
      );
      return subject as unknown as Subject;
    } catch (error: any) {
      console.error('Create subject error:', error);
      throw new Error(handleAppwriteError(error));
    }
  }

  async getSubjectsBySemester(semester: number): Promise<Subject[]> {
    try {
      const response = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.subjectsCollectionId,
        [
          Query.equal('semester', semester),
          Query.orderAsc('name')
        ]
      );
      return response.documents as unknown as Subject[];
    } catch (error: any) {
      console.error('Get subjects by semester error:', error);
      throw new Error(handleAppwriteError(error));
    }
  }

  // Download Operations
  async recordDownload(userId: string, resourceId: string, fileSize: number): Promise<Download> {
    try {
      // Record download
      const download = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.downloadsCollectionId,
        ID.unique(),
        {
          user_id: userId,
          resource_id: resourceId,
          download_date: new Date().toISOString(),
          file_size: fileSize,
          ip_address: 'unknown' // In a real app, you'd get this from server
        }
      );

      // Update resource download count
      const resource = await this.getResource(resourceId);
      await this.updateResource(resourceId, {
        download_count: resource.download_count + 1
      });

      return download as unknown as Download;
    } catch (error: any) {
      console.error('Record download error:', error);
      throw new Error(handleAppwriteError(error));
    }
  }

  async getUserDownloads(userId: string, limit: number = 50): Promise<Download[]> {
    try {
      const response = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.downloadsCollectionId,
        [
          Query.equal('user_id', userId),
          Query.orderDesc('download_date'),
          Query.limit(limit)
        ]
      );
      return response.documents as unknown as Download[];
    } catch (error: any) {
      console.error('Get user downloads error:', error);
      throw new Error(handleAppwriteError(error));
    }
  }

  // Bookmark Operations
  async addBookmark(userId: string, resourceId: string): Promise<Bookmark> {
    try {
      const bookmark = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.bookmarksCollectionId,
        ID.unique(),
        {
          user_id: userId,
          resource_id: resourceId,
          created_at: new Date().toISOString()
        }
      );
      return bookmark as unknown as Bookmark;
    } catch (error: any) {
      console.error('Add bookmark error:', error);
      throw new Error(handleAppwriteError(error));
    }
  }

  async removeBookmark(userId: string, resourceId: string): Promise<void> {
    try {
      // Find the bookmark
      const response = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.bookmarksCollectionId,
        [
          Query.equal('user_id', userId),
          Query.equal('resource_id', resourceId)
        ]
      );

      if (response.documents.length > 0) {
        await databases.deleteDocument(
          appwriteConfig.databaseId,
          appwriteConfig.bookmarksCollectionId,
          response.documents[0].$id
        );
      }
    } catch (error: any) {
      console.error('Remove bookmark error:', error);
      throw new Error(handleAppwriteError(error));
    }
  }

  async getUserBookmarks(userId: string): Promise<Bookmark[]> {
    try {
      const response = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.bookmarksCollectionId,
        [
          Query.equal('user_id', userId),
          Query.orderDesc('created_at')
        ]
      );
      return response.documents as unknown as Bookmark[];
    } catch (error: any) {
      console.error('Get user bookmarks error:', error);
      throw new Error(handleAppwriteError(error));
    }
  }

  async isBookmarked(userId: string, resourceId: string): Promise<boolean> {
    try {
      const response = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.bookmarksCollectionId,
        [
          Query.equal('user_id', userId),
          Query.equal('resource_id', resourceId)
        ]
      );
      return response.documents.length > 0;
    } catch (error: any) {
      console.error('Check bookmark error:', error);
      return false;
    }
  }

  // Statistics
  async getDashboardStats(): Promise<any> {
    try {
      // Get total resources
      const resourcesResponse = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.resourcesCollectionId,
        [Query.equal('status', 'active')]
      );

      // Get total users
      const usersResponse = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.usersCollectionId,
        []
      );

      // Get total downloads
      const downloadsResponse = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.downloadsCollectionId,
        []
      );

      // Get recent uploads
      const recentUploads = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.resourcesCollectionId,
        [
          Query.equal('status', 'active'),
          Query.orderDesc('upload_date'),
          Query.limit(5)
        ]
      );

      return {
        totalResources: resourcesResponse.total,
        totalStudents: usersResponse.total,
        totalDownloads: downloadsResponse.total,
        recentUploads: recentUploads.documents
      };
    } catch (error: any) {
      console.error('Get dashboard stats error:', error);
      throw new Error(handleAppwriteError(error));
    }
  }
}

export const databaseService = new DatabaseService();
