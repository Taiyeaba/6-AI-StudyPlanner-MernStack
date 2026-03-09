// frontend/src/pages/Plans/Plans.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/UseAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const MyPlans = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('All');

  // 📌 API Call করে MongoDB থেকে plans আনবে
  useEffect(() => {
    if (user?.email) {
      fetchPlans();
    }
  }, [user]);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      // এই API call টা backend এ যাবে
      const { data } = await axiosSecure.get(`/api/plans?email=${user.email}`);
      setPlans(data);
      console.log('MongoDB থেকে আসা plans:', data);
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Error!', 'Failed to load plans', 'error');
    } finally {
      setLoading(false);
    }
  };

  // 📌 Delete plan
  const handleDelete = async (id, title) => {
    const result = await Swal.fire({
      title: 'Delete Plan?',
      text: `Are you sure you want to delete "${title}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6366f1',
      confirmButtonText: 'Yes, delete'
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/api/plans/${id}`);
        setPlans(plans.filter(plan => plan._id !== id));
        Swal.fire('Deleted!', 'Plan has been deleted.', 'success');
      } catch (error) {
        Swal.fire('Error!', 'Failed to delete plan.', 'error');
      }
    }
  };

  // 📌 Search & Filter
  const filteredPlans = plans.filter(plan => {
    const matchesSearch = plan.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.subject?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority === 'All' || plan.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });

  // Helper functions
  const getPriorityIcon = (priority) => {
    switch(priority) {
      case 'High': return '🔴';
      case 'Medium': return '🟡';
      case 'Low': return '🟢';
      default: return '⚪';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 pt-20 flex items-center justify-center">
        <div className="text-white text-xl">Loading plans...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 pt-20 px-4 pb-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">My Study Plans</h1>
            <p className="text-gray-400">Manage and track your learning journey</p>
          </div>
          <Link to="/plan/new">
            <button className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all transform hover:scale-105 shadow-lg shadow-indigo-500/25 flex items-center gap-2">
              <span>+</span> Create New Plan
            </button>
          </Link>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <input
              type="text"
              placeholder="🔍 Search plans by title or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-all"
            />
          </div>
          <div className="sm:w-48">
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition-all"
            >
              <option value="All">🎯 All Priorities</option>
              <option value="High">🔴 High</option>
              <option value="Medium">🟡 Medium</option>
              <option value="Low">🟢 Low</option>
            </select>
          </div>
        </div>

        {/* Plans Grid */}
        {filteredPlans.length === 0 ? (
          <div className="text-center py-16 bg-white/5 rounded-xl border border-white/10">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl text-white mb-2">No plans found</h3>
            <p className="text-gray-400 mb-6">
              {searchTerm || filterPriority !== 'All' 
                ? 'Try adjusting your search or filter'
                : 'Create your first study plan to get started'}
            </p>
            {!searchTerm && filterPriority === 'All' && (
              <Link to="/plan/new">
                <button className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg">
                  Create First Plan
                </button>
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlans.map((plan) => (
              <div
                key={plan._id}
                className="group bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-indigo-500/50 transition-all hover:transform hover:scale-[1.02]"
              >
                {/* Priority Badge & Subject */}
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-3 py-1 text-xs rounded-full border ${getPriorityColor(plan.priority)}`}>
                    {getPriorityIcon(plan.priority)} {plan.priority}
                  </span>
                  <span className="text-xs text-gray-500">
                    {plan.subject}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-white mb-3">
                  {plan.title}
                </h3>

                {/* Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">⏱️ Total Hours:</span>
                    <span className="text-white font-medium">{plan.totalHours}h</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">📅 Target Date:</span>
                    <span className="text-white font-medium">{formatDate(plan.targetDate)}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-400 mb-1">
                    <span>Progress</span>
                    <span>{plan.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-500"
                      style={{ width: `${plan.progress}%` }}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Link to={`/plan/${plan._id}`} className="flex-1">
                    <button className="w-full px-3 py-2 bg-indigo-500/20 text-indigo-400 rounded-lg hover:bg-indigo-500/30 transition-all">
                      View
                    </button>
                  </Link>
                  <Link to={`/plan/${plan._id}/edit`} className="flex-1">
                    <button className="w-full px-3 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-all">
                      Edit
                    </button>
                  </Link>
                  <button 
                    onClick={() => handleDelete(plan._id, plan.title)}
                    className="px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPlans;