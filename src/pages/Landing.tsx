import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  Download, 
  Star,
  ArrowRight,
  Github,
  Heart
} from 'lucide-react';

export const Landing: React.FC = () => {
  const stats = [
    { label: 'Resources', value: '500+', icon: BookOpen },
    { label: 'Students', value: '1,200+', icon: Users },
    { label: 'Downloads', value: '10,000+', icon: Download },
    { label: 'Rating', value: '4.9/5', icon: Star },
  ];

  const semesters = [
    {
      number: 1,
      title: 'Semester 1',
      description: 'Foundation of Programming',
      subjects: ['C Programming', 'Computer Fundamentals', 'Mathematics I'],
      resources: 85
    },
    {
      number: 2,
      title: 'Semester 2',
      description: 'Data Structures & OOP',
      subjects: ['C++', 'Data Structures', 'Mathematics II'],
      resources: 92
    },
    {
      number: 3,
      title: 'Semester 3',
      description: 'Web & Database Technologies',
      subjects: ['Java', 'DBMS', 'Web Technologies'],
      resources: 78
    },
    {
      number: 4,
      title: 'Semester 4',
      description: 'Advanced Programming',
      subjects: ['Advanced Java', 'Python', 'System Analysis'],
      resources: 65
    },
    {
      number: 5,
      title: 'Semester 5',
      description: 'Modern Technologies',
      subjects: ['AI', 'Cloud Computing', 'Cyber Security'],
      resources: 42
    },
    {
      number: 6,
      title: 'Semester 6',
      description: 'Project & Specialization',
      subjects: ['ML', 'IoT', 'Major Project'],
      resources: 38
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                BCA Library
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-700 hover:text-primary-600 font-medium"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="btn btn-primary btn-md"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Your Complete
              <span className="text-primary-600 block">BCA Study Companion</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Access comprehensive study materials, notes, assignments, and resources 
              for all BCA semesters. Built by students, for students.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="btn btn-primary btn-lg"
              >
                Join Now - It's Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/login"
                className="btn btn-secondary btn-lg"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 text-primary-600 rounded-lg mb-4">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Semesters Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Complete BCA Curriculum Coverage
            </h2>
            <p className="text-xl text-gray-600">
              Organized resources for every semester of your BCA journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {semesters.map((semester) => (
              <div
                key={semester.number}
                className="card hover:shadow-lg transition-shadow duration-300"
              >
                <div className="card-header">
                  <div className="flex items-center justify-between">
                    <h3 className="card-title text-lg">{semester.title}</h3>
                    <span className="badge badge-default">
                      {semester.resources} Resources
                    </span>
                  </div>
                  <p className="card-description">{semester.description}</p>
                </div>
                <div className="card-content">
                  <ul className="space-y-2">
                    {semester.subjects.map((subject, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-primary-400 rounded-full mr-3"></div>
                        {subject}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="card-footer">
                  <Link
                    to="/register"
                    className="btn btn-primary btn-sm w-full"
                  >
                    Access Resources
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need to Excel
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive features designed for BCA students
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-xl mb-6">
                <BookOpen className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Organized Content
              </h3>
              <p className="text-gray-600">
                Resources organized by semester, subject, and category for easy navigation
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-xl mb-6">
                <Download className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Instant Downloads
              </h3>
              <p className="text-gray-600">
                Download notes, assignments, and study materials instantly
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 text-purple-600 rounded-xl mb-6">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Community Driven
              </h3>
              <p className="text-gray-600">
                Content contributed and verified by BCA students and faculty
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Accelerate Your Studies?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of BCA students already using our platform
          </p>
          <Link
            to="/register"
            className="btn bg-white text-primary-600 hover:bg-gray-50 btn-lg"
          >
            Get Started Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center mb-4">
                <BookOpen className="h-8 w-8 text-primary-400" />
                <span className="ml-2 text-xl font-bold">BCA Library</span>
              </div>
              <p className="text-gray-400 mb-4">
                Empowering BCA students with comprehensive study resources and materials.
              </p>
              <div className="flex items-center space-x-4">
                <a
                  href="https://github.com/justfsl50/bca-library-appwrite"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Github className="h-6 w-6" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/login" className="text-gray-400 hover:text-white">Sign In</Link></li>
                <li><Link to="/register" className="text-gray-400 hover:text-white">Register</Link></li>
                <li><a href="#features" className="text-gray-400 hover:text-white">Features</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><span className="text-gray-400">Semester 1-6</span></li>
                <li><span className="text-gray-400">Notes & Assignments</span></li>
                <li><span className="text-gray-400">Question Papers</span></li>
                <li><span className="text-gray-400">Video Lectures</span></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              Made with <Heart className="inline h-4 w-4 text-red-500" /> for BCA students
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
