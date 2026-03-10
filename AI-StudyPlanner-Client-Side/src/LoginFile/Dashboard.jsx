// frontend/src/LoginFile/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/UseAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const Dashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState({
    totalPlans: 0,
    todayTasks: 0,
    completedToday: 0,
    studyHours: 0,
    streak: 0,
    recentPlans: [],
    todayTasksList: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetchDashboardStats();
    }
  }, [user]);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const { data } = await axiosSecure.get(`/api/dashboard/stats?email=${user.email}`);
      setStats(data);
      console.log('Dashboard Stats:', data);
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to load dashboard data',
        background: '#1f2937',
        color: '#fff'
      });
    } finally {
      setLoading(false);
    }
  };

  // Task Status Change
  const handleTaskStatusChange = async (taskId, currentStatus) => {
    const newStatus = currentStatus === 'Pending' ? 'In Progress' : 'Completed';
    
    try {
      await axiosSecure.put(`/api/tasks/${taskId}`, { status: newStatus });
      
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: `Task ${newStatus === 'Completed' ? 'completed' : 'started'}!`,
        timer: 1500,
        showConfirmButton: false,
        background: '#1f2937',
        color: '#fff'
      });
      
      fetchDashboardStats(); // রিলোড ডাটা
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to update task',
        background: '#1f2937',
        color: '#fff'
      });
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'bg-red-500/20 text-red-400';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'Low': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getPriorityIcon = (priority) => {
    switch(priority) {
      case 'High': return '🔴';
      case 'Medium': return '🟡';
      case 'Low': return '🟢';
      default: return '⚪';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 pt-16 sm:pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 pt-16 sm:pt-20 px-3 sm:px-4 pb-8 sm:pb-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Welcome Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white break-words">
              Welcome back, {user?.displayName?.split(' ')[0] || 'Student'}!
            </h1>
            <span className="text-2xl sm:text-3xl md:text-4xl animate-wave">👋</span>
          </div>
          <p className="text-sm sm:text-base text-gray-400">Here's your study overview for today</p>
        </div>

        {/* Stats Cards - Responsive Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          
          {/* Total Plans Card */}
          <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-indigo-500/20 hover:border-indigo-500/40 transition-all group">
            <div className="flex justify-between items-start mb-3 sm:mb-4">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm">Total Plans</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">{stats.totalPlans}</h3>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center text-indigo-400 text-lg sm:text-xl group-hover:scale-110 transition-transform">
                📚
              </div>
            </div>
            <Link to="/plans" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
              View all plans →
            </Link>
          </div>

          {/* Today's Tasks Card */}
          <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-yellow-500/20 hover:border-yellow-500/40 transition-all group">
            <div className="flex justify-between items-start mb-3 sm:mb-4">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm">Today's Tasks</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">{stats.todayTasks}</h3>
                <p className="text-xs text-gray-400 mt-1">{stats.completedToday} completed</p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center text-yellow-400 text-lg sm:text-xl group-hover:scale-110 transition-transform">
                ✅
              </div>
            </div>
            <div className="w-full h-1 sm:h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 transition-all duration-500"
                style={{ width: stats.todayTasks > 0 ? `${(stats.completedToday / stats.todayTasks) * 100}%` : '0%' }}
              />
            </div>
          </div>

          {/* Study Hours Card */}
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-green-500/20 hover:border-green-500/40 transition-all group">
            <div className="flex justify-between items-start mb-3 sm:mb-4">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm">Study Hours</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">{stats.studyHours}</h3>
                <p className="text-xs text-gray-400 mt-1">Total completed</p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500/20 rounded-lg flex items-center justify-center text-green-400 text-lg sm:text-xl group-hover:scale-110 transition-transform">
                ⏱️
              </div>
            </div>
          </div>

          {/* Streak Card */}
          <div className="bg-gradient-to-br from-red-500/10 to-pink-500/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-red-500/20 hover:border-red-500/40 transition-all group">
            <div className="flex justify-between items-start mb-3 sm:mb-4">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm">Current Streak</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">{stats.streak} days</h3>
                <p className="text-xs text-gray-400 mt-1">Keep it up! 🔥</p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-500/20 rounded-lg flex items-center justify-center text-red-400 text-lg sm:text-xl group-hover:scale-110 transition-transform">
                🔥
              </div>
            </div>
          </div>
        </div>

        {/* Recent Plans & Today's Tasks Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          
          {/* Recent Plans */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10">
            <div className="flex justify-between items-center mb-3 sm:mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-white">Recent Plans</h2>
              <Link to="/plans" className="text-xs sm:text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
                View all →
              </Link>
            </div>
            
            {stats.recentPlans.length === 0 ? (
              <div className="text-center py-6 sm:py-8">
                <p className="text-sm sm:text-base text-gray-400 mb-3">No plans yet</p>
                <Link to="/plan/new">
                  <button className="px-3 sm:px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg text-xs sm:text-sm">
                    Create First Plan
                  </button>
                </Link>
              </div>
            ) : (
              <div className="space-y-2 sm:space-y-3">
                {stats.recentPlans.map(plan => (
                  <Link to={`/plan/${plan._id}`} key={plan._id}>
                    <div className="group flex flex-col xs:flex-row items-start xs:items-center justify-between p-2 sm:p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all cursor-pointer gap-2 xs:gap-0">
                      <div className="flex-1 w-full xs:w-auto">
                        <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1">
                          <span className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full ${getPriorityColor(plan.priority)}`}>
                            {getPriorityIcon(plan.priority)} {plan.priority}
                          </span>
                          <span className="text-[10px] sm:text-xs text-gray-400">{plan.subject}</span>
                        </div>
                        <h3 className="text-sm sm:text-base text-white font-medium truncate">{plan.title}</h3>
                        <p className="text-[10px] sm:text-xs text-gray-400 mt-1">Due: {formatDate(plan.targetDate)}</p>
                      </div>
                      <div className="text-right w-full xs:w-auto">
                        <div className="text-xs sm:text-sm text-white font-semibold mb-1">{plan.progress}%</div>
                        <div className="w-full xs:w-20 h-1 sm:h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-600"
                            style={{ width: `${plan.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Today's Tasks */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10">
            <div className="flex justify-between items-center mb-3 sm:mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-white">Today's Tasks</h2>
              <span className="text-xs sm:text-sm text-gray-400">
                {stats.completedToday}/{stats.todayTasks} completed
              </span>
            </div>
            
            {stats.todayTasksList.length === 0 ? (
              <div className="text-center py-6 sm:py-8">
                <p className="text-sm sm:text-base text-gray-400">No tasks for today</p>
                <p className="text-xs text-gray-500 mt-2">Take a break or plan ahead! 🌟</p>
              </div>
            ) : (
              <div className="space-y-2 sm:space-y-3">
                {stats.todayTasksList.map(task => (
                  <div key={task._id} className="flex flex-col xs:flex-row items-start xs:items-center justify-between p-2 sm:p-3 bg-white/5 rounded-lg group hover:bg-white/10 transition-all gap-2 xs:gap-0">
                    <div className="flex-1 w-full xs:w-auto">
                      <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1">
                        <span className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full ${
                          task.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                          task.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {task.status === 'Completed' ? '✓' : 
                           task.status === 'In Progress' ? '►' : '○'} {task.status}
                        </span>
                        <span className="text-[10px] sm:text-xs text-gray-400">⏱️ {task.estimatedTime}h</span>
                      </div>
                      <h3 className="text-xs sm:text-sm text-white">{task.title}</h3>
                    </div>
                    
                    {task.status !== 'Completed' && (
                      <button
                        onClick={() => handleTaskStatusChange(task._id, task.status)}
                        className={`w-full xs:w-auto px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm transition-all xs:opacity-0 xs:group-hover:opacity-100 ${
                          task.status === 'Pending' 
                            ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30' 
                            : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                        }`}
                      >
                        {task.status === 'Pending' ? 'Start' : 'Complete'}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions - Responsive Grid */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          <Link to="/plan/new">
            <button className="w-full p-3 sm:p-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all flex items-center justify-center gap-2 text-xs sm:text-sm">
              <span className="text-base sm:text-lg">+</span> Create New Plan
            </button>
          </Link>
          <Link to="/analytics">
            <button className="w-full p-3 sm:p-4 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2 text-xs sm:text-sm">
              <span className="text-base sm:text-lg">📊</span> View Analytics
            </button>
          </Link>
          <Link to="/calendar">
            <button className="w-full p-3 sm:p-4 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2 text-xs sm:text-sm col-span-1 xs:col-span-2 sm:col-span-1">
              <span className="text-base sm:text-lg">📅</span> Open Calendar
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;