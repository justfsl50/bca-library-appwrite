import { account, databases, appwriteConfig, handleAppwriteError } from './config';
import { ID } from 'appwrite';
import type { User, RegisterForm } from '../types';

export class AuthService {
  // Get current user session
  async getCurrentUser(): Promise<User | null> {
    try {
      const currentAccount = await account.get();
      if (currentAccount) {
        // Get user profile from database
        const userDoc = await databases.getDocument(
          appwriteConfig.databaseId,
          appwriteConfig.usersCollectionId,
          currentAccount.$id
        );
        return userDoc as User;
      }
      return null;
    } catch (error) {
      console.log('No current user session');
      return null;
    }
  }

  // User registration
  async register(userData: RegisterForm): Promise<User> {
    try {
      const { name, email, password, semester, college } = userData;
      
      // Create account
      const newAccount = await account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (!newAccount) throw new Error('Failed to create account');

      // Login automatically after registration
      await this.login(email, password);

      // Create user document in database
      const userDoc = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.usersCollectionId,
        newAccount.$id,
        {
          name,
          email,
          semester,
          college: college || '',
          role: 'student',
          verified: false,
          created_at: new Date().toISOString(),
        }
      );

      return userDoc as User;
    } catch (error: any) {
      console.error('Registration error:', error);
      throw new Error(handleAppwriteError(error));
    }
  }

  // User login
  async login(email: string, password: string): Promise<User> {
    try {
      await account.createEmailSession(email, password);
      const user = await this.getCurrentUser();
      if (!user) throw new Error('Failed to get user data');
      return user;
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(handleAppwriteError(error));
    }
  }

  // User logout
  async logout(): Promise<void> {
    try {
      await account.deleteSession('current');
    } catch (error: any) {
      console.error('Logout error:', error);
      throw new Error(handleAppwriteError(error));
    }
  }

  // Update user profile
  async updateProfile(userId: string, data: Partial<User>): Promise<User> {
    try {
      const updatedDoc = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.usersCollectionId,
        userId,
        data
      );
      return updatedDoc as User;
    } catch (error: any) {
      console.error('Profile update error:', error);
      throw new Error(handleAppwriteError(error));
    }
  }

  // Send password recovery email
  async forgotPassword(email: string): Promise<void> {
    try {
      await account.createRecovery(
        email,
        `${window.location.origin}/reset-password`
      );
    } catch (error: any) {
      console.error('Password recovery error:', error);
      throw new Error(handleAppwriteError(error));
    }
  }

  // Reset password
  async resetPassword(
    userId: string,
    secret: string,
    password: string
  ): Promise<void> {
    try {
      await account.updateRecovery(userId, secret, password, password);
    } catch (error: any) {
      console.error('Password reset error:', error);
      throw new Error(handleAppwriteError(error));
    }
  }

  // Verify email
  async verifyEmail(userId: string, secret: string): Promise<void> {
    try {
      await account.updateVerification(userId, secret);
    } catch (error: any) {
      console.error('Email verification error:', error);
      throw new Error(handleAppwriteError(error));
    }
  }

  // Send verification email
  async sendVerification(): Promise<void> {
    try {
      await account.createVerification(`${window.location.origin}/verify`);
    } catch (error: any) {
      console.error('Send verification error:', error);
      throw new Error(handleAppwriteError(error));
    }
  }
}

export const authService = new AuthService();
