// frontend/src/LoginFile/Analytics.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/UseAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const Analytics = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);
  const [weeklyData, setWeeklyData] = useState([]);
  const [subjectData, setSubjectData] = useState([]);
  const [completionData, setCompletionData] = useState(null);
  const [stats, setStats] = useState(null);
  const [activeTab, setActiveTab] = useState('weekly');

  useEffect(() => {
    if (user?.email) {
      fetchAllAnalytics();
    }
  }, [user]);

  const fetchAllAnalytics = async () => {
    try {
      setLoading(true);
      
      const [weekly, subjects, completion, statsData] = await Promise.all([
        axiosSecure.get(`/api/analytics/weekly?email=${user.email}`),
        axiosSecure.get(`/api/analytics/subjects?email=${user.email}`),
        axiosSecure.get(`/api/analytics/completion?email=${user.email}`),
        axiosSecure.get(`/api/analytics/stats?email=${user.email}`)
      ]);
      
      setWeeklyData(weekly.data);
      setSubjectData(subjects.data);
      setCompletionData(completion.data);
      setStats(statsData.data);
      
    } catch (error) {
      console.error('Error fetching analytics:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to load analytics data',
        background: '#1f2937',
        color: '#fff'
      });
    } finally {
      setLoading(false);
    }
  };

  const getMaxHours = () => {
    if (weeklyData.length === 0) return 5;
    const max = Math.max(...weeklyData.map(d => d.hours));
    return max > 0 ? max : 5;
  };

  const totalWeeklyHours = weeklyData.reduce((sum, day) => sum + day.hours, 0);
  const avgDailyHours = weeklyData.length > 0 ? (totalWeeklyHours / weeklyData.length).toFixed(1) : 0;

  // Color generator for subject graph
  const getSubjectColor = (index) => {
    const colors = [
      'from-indigo-500 to-purple-600',
      'from-purple-500 to-pink-600',
      'from-pink-500 to-rose-600',
      'from-rose-500 to-orange-600',
      'from-orange-500 to-amber-600',
      'from-amber-500 to-yellow-600',
      'from-yellow-500 to-lime-600',
      'from-lime-500 to-green-600',
      'from-green-500 to-emerald-600',
      'from-emerald-500 to-teal-600'
    ];
    return colors[index % colors.length];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-gray-400 animate-pulse">Loading your analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 pt-20 px-3 sm:px-4 pb-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header with Gradient */}
        <div className="mb-6 sm:mb-8 text-center sm:text-left">
          <div className="inline-block p-3 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl mb-4">
            <span className="text-4xl">📊</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
            Analytics <span className="bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">Dashboard</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto sm:mx-0">
            Track your learning patterns, monitor progress, and boost productivity
          </p>
        </div>

        {/* Stats Cards - Responsive Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          
          <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-indigo-500/20 hover:border-indigo-500/40 transition-all group">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs sm:text-sm text-gray-400 mb-1">Total Plans</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">{stats?.totalPlans || 0}</h3>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center text-indigo-400 text-lg sm:text-xl group-hover:scale-110 transition-transform">
                📚
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-500">Active learning paths</div>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-yellow-500/20 hover:border-yellow-500/40 transition-all group">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs sm:text-sm text-gray-400 mb-1">Total Tasks</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">{stats?.totalTasks || 0}</h3>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center text-yellow-400 text-lg sm:text-xl group-hover:scale-110 transition-transform">
                📋
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-500">Across all plans</div>
          </div>
          
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-green-500/20 hover:border-green-500/40 transition-all group">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs sm:text-sm text-gray-400 mb-1">Completed</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">{stats?.completedTasks || 0}</h3>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500/20 rounded-lg flex items-center justify-center text-green-400 text-lg sm:text-xl group-hover:scale-110 transition-transform">
                ✅
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-500">Tasks done</div>
          </div>
          
          <div className="bg-gradient-to-br from-red-500/10 to-pink-500/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-red-500/20 hover:border-red-500/40 transition-all group">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs sm:text-sm text-gray-400 mb-1">Total Hours</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">{stats?.totalHours || 0}h</h3>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-500/20 rounded-lg flex items-center justify-center text-red-400 text-lg sm:text-xl group-hover:scale-110 transition-transform">
                ⏱️
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-500">Study time</div>
          </div>
        </div>

        {/* Mobile Tabs for better navigation */}
        <div className="flex sm:hidden gap-2 mb-4 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('weekly')}
            className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${
              activeTab === 'weekly' 
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white' 
                : 'bg-white/5 text-gray-400'
            }`}
          >
            Weekly Activity
          </button>
          <button
            onClick={() => setActiveTab('subjects')}
            className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${
              activeTab === 'subjects' 
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white' 
                : 'bg-white/5 text-gray-400'
            }`}
          >
            Subjects
          </button>
          <button
            onClick={() => setActiveTab('completion')}
            className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${
              activeTab === 'completion' 
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white' 
                : 'bg-white/5 text-gray-400'
            }`}
          >
            Completion
          </button>
          <button
            onClick={() => setActiveTab('insights')}
            className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${
              activeTab === 'insights' 
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white' 
                : 'bg-white/5 text-gray-400'
            }`}
          >
            Insights
          </button>
        </div>

        {/* Main Content Grid - Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
          
          {/* Weekly Activity Card - Full width on mobile, grid on desktop */}
          <div className={`bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 hover:border-indigo-500/30 transition-all ${
            activeTab !== 'weekly' ? 'hidden sm:block' : ''
          }`}>
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white">Weekly Activity</h2>
                <p className="text-xs sm:text-sm text-gray-400">Last 7 days performance</p>
              </div>
              <div className="px-3 py-1 bg-indigo-500/20 rounded-full text-indigo-400 text-xs sm:text-sm">
                {totalWeeklyHours}h total
              </div>
            </div>
            
            {/* Bar Graph for Weekly Activity */}
            <div className="space-y-3 sm:space-y-4">
              {weeklyData.map((day, index) => {
                const maxHours = getMaxHours();
                const percentage = maxHours > 0 ? (day.hours / maxHours) * 100 : 0;
                
                return (
                  <div key={index} className="group">
                    <div className="flex justify-between items-center mb-1 sm:mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-medium text-gray-400 w-8 sm:w-10">{day.day}</span>
                        <span className="text-xs text-gray-500">{day.tasks} tasks</span>
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-white">{day.hours}h</span>
                    </div>
                    <div className="relative w-full h-6 sm:h-8 bg-white/5 rounded-lg overflow-hidden">
                      <div 
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg transition-all duration-700 group-hover:opacity-90"
                        style={{ width: `${percentage}%` }}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                      </div>
                      <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[10px] sm:text-xs text-white/60">
                        {Math.round(percentage)}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-4 sm:mt-6 pt-4 border-t border-white/10">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-white/5 rounded-lg p-3 sm:p-4">
                  <p className="text-xs text-gray-400 mb-1">Total</p>
                  <p className="text-lg sm:text-xl font-bold text-white">{totalWeeklyHours}h</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 sm:p-4">
                  <p className="text-xs text-gray-400 mb-1">Daily Avg</p>
                  <p className="text-lg sm:text-xl font-bold text-white">{avgDailyHours}h</p>
                </div>
              </div>
            </div>
          </div>

          {/* Subject Distribution Card */}
          <div className={`bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 hover:border-purple-500/30 transition-all ${
            activeTab !== 'subjects' ? 'hidden sm:block' : ''
          }`}>
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white">Subject Distribution</h2>
                <p className="text-xs sm:text-sm text-gray-400">Time spent by subject</p>
              </div>
              <div className="px-3 py-1 bg-purple-500/20 rounded-full text-purple-400 text-xs sm:text-sm">
                {subjectData.length} subjects
              </div>
            </div>
            
            {subjectData.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <div className="text-5xl sm:text-6xl mb-4 opacity-50">📚</div>
                <p className="text-sm sm:text-base text-gray-400">No subjects data yet</p>
                <p className="text-xs text-gray-500 mt-2">Create plans with different subjects</p>
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-5">
                {subjectData.map((subject, index) => (
                  <div key={index} className="group">
                    <div className="flex justify-between items-center mb-1 sm:mb-2">
                      <span className="text-xs sm:text-sm text-gray-300 font-medium">{subject.name}</span>
                      <span className="text-xs sm:text-sm font-semibold text-white">
                        {subject.hours}h ({subject.percentage}%)
                      </span>
                    </div>
                    <div className="relative w-full h-6 sm:h-8 bg-white/5 rounded-lg overflow-hidden">
                      <div 
                        className={`absolute inset-y-0 left-0 bg-gradient-to-r ${getSubjectColor(index)} rounded-lg transition-all duration-700 group-hover:opacity-90`}
                        style={{ width: `${subject.percentage}%` }}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Second Row - Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          
          {/* Completion Rate Card */}
          <div className={`bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 hover:border-green-500/30 transition-all ${
            activeTab !== 'completion' ? 'hidden sm:block' : ''
          }`}>
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white">Completion Rate</h2>
                <p className="text-xs sm:text-sm text-gray-400">Task progress overview</p>
              </div>
              <div className="px-3 py-1 bg-green-500/20 rounded-full text-green-400 text-xs sm:text-sm">
                {completionData?.completionRate || 0}% done
              </div>
            </div>
            
            {completionData && (
              <>
                {/* Circular Progress - Responsive size */}
                <div className="flex justify-center mb-6 sm:mb-8">
                  <div className="relative w-28 h-28 sm:w-40 sm:h-40">
                    <svg className="w-28 h-28 sm:w-40 sm:h-40 transform -rotate-90">
                      <circle
                        cx={window.innerWidth < 640 ? "56" : "80"}
                        cy={window.innerWidth < 640 ? "56" : "80"}
                        r={window.innerWidth < 640 ? "50" : "70"}
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        className="text-white/10"
                      />
                      <circle
                        cx={window.innerWidth < 640 ? "56" : "80"}
                        cy={window.innerWidth < 640 ? "56" : "80"}
                        r={window.innerWidth < 640 ? "50" : "70"}
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * (window.innerWidth < 640 ? 50 : 70)}`}
                        strokeDashoffset={`${2 * Math.PI * (window.innerWidth < 640 ? 50 : 70) * (1 - completionData.completionRate / 100)}`}
                        className="text-green-500 transition-all duration-1000"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl sm:text-4xl font-bold text-white">{completionData.completionRate}%</span>
                      <span className="text-[10px] sm:text-xs text-gray-400">complete</span>
                    </div>
                  </div>
                </div>
                
                {/* Stats Grid - Responsive */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center mb-4 sm:mb-6">
                  <div className="bg-blue-500/10 rounded-lg p-2 sm:p-3">
                    <p className="text-lg sm:text-2xl font-bold text-blue-400">{completionData.pending || 0}</p>
                    <p className="text-[10px] sm:text-xs text-gray-400">Pending</p>
                  </div>
                  <div className="bg-yellow-500/10 rounded-lg p-2 sm:p-3">
                    <p className="text-lg sm:text-2xl font-bold text-yellow-400">{completionData.inProgress || 0}</p>
                    <p className="text-[10px] sm:text-xs text-gray-400">In Progress</p>
                  </div>
                  <div className="bg-green-500/10 rounded-lg p-2 sm:p-3">
                    <p className="text-lg sm:text-2xl font-bold text-green-400">{completionData.completed || 0}</p>
                    <p className="text-[10px] sm:text-xs text-gray-400">Completed</p>
                  </div>
                </div>
                
                {/* On Time vs Delayed - Responsive */}
                <div className="bg-white/5 rounded-lg p-3 sm:p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs sm:text-sm text-gray-400">On Time</span>
                    <span className="text-xs sm:text-sm font-semibold text-green-400">{completionData.onTime || 0}%</span>
                  </div>
                  <div className="w-full h-2 sm:h-3 bg-white/10 rounded-full overflow-hidden mb-3">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                      style={{ width: `${completionData.onTime || 0}%` }}
                    />
                  </div>
                  
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs sm:text-sm text-gray-400">Delayed</span>
                    <span className="text-xs sm:text-sm font-semibold text-red-400">{completionData.delayed || 0}%</span>
                  </div>
                  <div className="w-full h-2 sm:h-3 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-red-500 to-pink-500"
                      style={{ width: `${completionData.delayed || 0}%` }}
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Productivity Insights Card */}
          <div className={`bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 hover:border-yellow-500/30 transition-all ${
            activeTab !== 'insights' ? 'hidden sm:block' : ''
          }`}>
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white">Productivity Insights</h2>
                <p className="text-xs sm:text-sm text-gray-400">Smart analytics & tips</p>
              </div>
              <div className="px-3 py-1 bg-yellow-500/20 rounded-full text-yellow-400 text-xs sm:text-sm">
                💡 AI Insights
              </div>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              
              {/* Most Productive Day */}
              {stats?.mostProductiveDay && stats.mostProductiveDay !== 'N/A' && (
                <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl p-3 sm:p-4 border border-indigo-500/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center text-lg sm:text-xl">
                      📅
                    </div>
                    <div>
                      <p className="text-xs text-indigo-400">Most Productive Day</p>
                      <p className="text-base sm:text-lg font-bold text-white">{stats.mostProductiveDay}</p>
                    </div>
                  </div>
                  <p className="text-[10px] sm:text-xs text-gray-400 ml-11">You complete most tasks on this day</p>
                </div>
              )}
              
              {/* Average Daily Study */}
              {avgDailyHours > 0 && (
                <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl p-3 sm:p-4 border border-yellow-500/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center text-lg sm:text-xl">
                      ⏰
                    </div>
                    <div>
                      <p className="text-xs text-yellow-400">Average Daily Study</p>
                      <p className="text-base sm:text-lg font-bold text-white">{avgDailyHours} hours</p>
                    </div>
                  </div>
                  <p className="text-[10px] sm:text-xs text-gray-400 ml-11">Based on last 7 days activity</p>
                </div>
              )}
              
              {/* Task Completion Rate Insight */}
              {completionData?.completionRate > 0 && (
                <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl p-3 sm:p-4 border border-green-500/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500/20 rounded-lg flex items-center justify-center text-lg sm:text-xl">
                      🎯
                    </div>
                    <div>
                      <p className="text-xs text-green-400">Task Completion Rate</p>
                      <p className="text-base sm:text-lg font-bold text-white">{completionData.completionRate}%</p>
                    </div>
                  </div>
                  <p className="text-[10px] sm:text-xs text-gray-400 ml-11">
                    {completionData.completionRate > 70 
                      ? 'Excellent progress! Keep up the momentum! 🌟' 
                      : completionData.completionRate > 40
                      ? 'Good progress, you can do even better! 💪'
                      : 'Start completing more tasks to improve! 🚀'}
                  </p>
                </div>
              )}
              
              {/* Average Tasks per Plan */}
              {stats?.averageTasksPerPlan > 0 && (
                <div className="bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-xl p-3 sm:p-4 border border-red-500/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-500/20 rounded-lg flex items-center justify-center text-lg sm:text-xl">
                      📊
                    </div>
                    <div>
                      <p className="text-xs text-red-400">Tasks per Plan</p>
                      <p className="text-base sm:text-lg font-bold text-white">{stats.averageTasksPerPlan} tasks</p>
                    </div>
                  </div>
                  <p className="text-[10px] sm:text-xs text-gray-400 ml-11">Average across all your plans</p>
                </div>
              )}
              
              {/* Smart Tips Section */}
              <div className="bg-white/5 rounded-xl p-3 sm:p-4">
                <h3 className="text-sm sm:text-base font-semibold text-white mb-3 flex items-center gap-2">
                  <span className="text-yellow-400">✨</span> Smart Tips
                </h3>
                <div className="space-y-2">
                  {totalWeeklyHours < 10 && (
                    <div className="flex items-start gap-2 text-xs sm:text-sm text-gray-300">
                      <span className="text-yellow-400 mt-1">•</span>
                      <p>Try to study at least 2 hours daily to build consistency</p>
                    </div>
                  )}
                  {completionData?.completionRate < 50 && (
                    <div className="flex items-start gap-2 text-xs sm:text-sm text-gray-300">
                      <span className="text-yellow-400 mt-1">•</span>
                      <p>Break down large tasks into smaller, manageable chunks</p>
                    </div>
                  )}
                  {stats?.averageTasksPerPlan < 3 && (
                    <div className="flex items-start gap-2 text-xs sm:text-sm text-gray-300">
                      <span className="text-green-400 mt-1">•</span>
                      <p>Add more tasks to your plans for detailed progress tracking</p>
                    </div>
                  )}
                  <div className="flex items-start gap-2 text-xs sm:text-sm text-gray-300">
                    <span className="text-green-400 mt-1">•</span>
                    <p>Set realistic daily goals and take regular breaks</p>
                  </div>
                  <div className="flex items-start gap-2 text-xs sm:text-sm text-gray-300">
                    <span className="text-green-400 mt-1">•</span>
                    <p>Review your progress weekly to stay motivated</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions - Responsive */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          <Link to="/dashboard" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all text-sm sm:text-base">
              ← Back to Dashboard
            </button>
          </Link>
          <Link to="/plans" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all text-sm sm:text-base">
              View All Plans
            </button>
          </Link>
        </div>

        {/* Footer Note */}
        <p className="text-center text-xs text-gray-500 mt-6 sm:mt-8">
          Last updated: {new Date().toLocaleDateString()} • Data updates in real-time
        </p>
      </div>
    </div>
  );
};

export default Analytics;