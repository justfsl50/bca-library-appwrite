import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { databaseService } from '../appwrite/database';
import { 
  BookOpen, 
  Download, 
  TrendingUp, 
  Users,
  FileText,
  Video,
  Code,
  Bookmark,
  Clock,
  Star,
  ArrowRight
} from 'lucide-react';
import type { Resource, DashboardStats } from '../types';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentResources, setRecentResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load dashboard stats
      const dashboardStats = await databaseService.getDashboardStats();
      setStats(dashboardStats);

      // Load recent resources for current semester
      if (user?.semester) {
        const resources = await databaseService.getResourcesBySemester(user.semester);
        setRecentResources(resources.slice(0, 6));
      }
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    {
      title: `Semester ${user?.semester} Resources`,
      description: 'Browse resources for your current semester',
      icon: BookOpen,
      color: 'bg-blue-500',
      link: `/semester/${user?.semester}`,
    },
    {
      title: 'My Downloads',
      description: 'View your downloaded resources',
      icon: Download,
      color: 'bg-green-500',
      link: '/downloads',
    },
    {
      title: 'Bookmarks',
      description: 'Access your saved resources',
      icon: Bookmark,
      color: 'bg-purple-500',
      link: '/bookmarks',
    },
    {
      title: 'Search Resources',
      description: 'Find specific study materials',
      icon: FileText,
      color: 'bg-orange-500',
      link: '/search',
    },
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'notes':
        return <FileText className="h-4 w-4" />;
      case 'videos':
        return <Video className="h-4 w-4" />;
      case 'code':
        return <Code className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="spinner w-8 h-8 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-600 to-blue-700 rounded-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-primary-100 text-lg">
              You're currently in Semester {user?.semester}. Ready to continue learning?
            </p>
          </div>
          <div className="hidden md:block">
            <BookOpen className="h-20 w-20 text-primary-200" />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="card-content">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                <BookOpen className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">
                  {stats?.totalResources || 0}
                </p>
                <p className="text-gray-600">Total Resources</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                <Users className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">
                  {stats?.totalStudents || 0}
                </p>
                <p className="text-gray-600">Active Students</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
                <Download className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">
                  {stats?.totalDownloads || 0}
                </p>
                <p className="text-gray-600">Total Downloads</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 text-orange-600 rounded-lg">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">
                  98%
                </p>
                <p className="text-gray-600">Success Rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link
                key={index}
                to={action.link}
                className="card hover:shadow-lg transition-shadow duration-300 group"
              >
                <div className="card-content">
                  <div className={`inline-flex p-3 ${action.color} text-white rounded-lg mb-4`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600">
                    {action.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {action.description}
                  </p>
                  <ArrowRight className="h-4 w-4 text-gray-400 mt-3 group-hover:text-primary-600" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Resources */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Recent Resources - Semester {user?.semester}
          </h2>
          <Link
            to={`/semester/${user?.semester}`}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            View All
          </Link>
        </div>

        {recentResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentResources.map((resource) => (
              <div key={resource.$id} className="card hover:shadow-lg transition-shadow duration-300">
                <div className="card-header">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        {getCategoryIcon(resource.category)}
                      </div>
                      <div>
                        <span className="badge badge-secondary">{resource.category}</span>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-primary-600">
                      <Bookmark className="h-4 w-4" />
                    </button>
                  </div>
                  <h3 className="card-title text-lg mt-4">{resource.title}</h3>
                  <p className="card-description line-clamp-2">
                    {resource.description}
                  </p>
                </div>
                <div className="card-footer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Download className="h-4 w-4 mr-1" />
                        {resource.download_count}
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1" />
                        {resource.rating.toFixed(1)}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {formatDate(resource.upload_date)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No resources available yet
            </h3>
            <p className="text-gray-600 mb-6">
              Resources for Semester {user?.semester} will appear here as they are uploaded.
            </p>
            <Link
              to={`/semester/${user?.semester}`}
              className="btn btn-primary"
            >
              Browse All Semesters
            </Link>
          </div>
        )}
      </div>

      {/* Study Tips */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-green-100 text-green-600 rounded-lg">
            <Star className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              💡 Study Tip of the Day
            </h3>
            <p className="text-gray-700">
              Create a study schedule and stick to it. Consistent daily practice is more effective 
              than cramming before exams. Use our resources to build a strong foundation in each subject!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
