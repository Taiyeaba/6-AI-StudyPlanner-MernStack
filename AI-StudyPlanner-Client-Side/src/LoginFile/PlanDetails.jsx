// frontend/src/LoginFile/PlanDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const PlanDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [plan, setPlan] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddTask, setShowAddTask] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [newTask, setNewTask] = useState({
    title: '',
    estimatedTime: '',
    dueDate: ''
  });

  useEffect(() => {
    fetchPlanDetails();
    fetchTasks();
  }, [id]);

  const fetchPlanDetails = async () => {
    try {
      const { data } = await axiosSecure.get(`/api/plans/${id}`);
      setPlan(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchTasks = async () => {
    try {
      const { data } = await axiosSecure.get(`/api/tasks/${id}`);
      setTasks(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Plan Progress আপডেট করবে
  const updatePlanProgress = async () => {
    try {
      const { data } = await axiosSecure.get(`/api/tasks/${id}`);
      const totalTasks = data.length;
      const completedTasks = data.filter(t => t.status === 'Completed').length;
      
      // Progress calculate: 0 tasks = 0%, otherwise (completed/total)*100
      const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
      
      await axiosSecure.put(`/api/plans/${id}`, { progress });
      fetchPlanDetails();
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  // নতুন Task যোগ করবে
  const handleAddTask = async () => {
    if (!newTask.title || !newTask.estimatedTime || !newTask.dueDate) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required',
        background: '#1f2937',
        color: '#fff'
      });
      return;
    }

    try {
      const taskData = {
        planId: id,
        title: newTask.title,
        estimatedTime: Number(newTask.estimatedTime),
        dueDate: newTask.dueDate,
        status: 'Pending',
        notes: ''
      };

      const response = await axiosSecure.post('/api/tasks', taskData);
      
      if (response.data.insertedId) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Task added successfully',
          timer: 1500,
          showConfirmButton: false,
          background: '#1f2937',
          color: '#fff'
        });
        setShowAddTask(false);
        setNewTask({ title: '', estimatedTime: '', dueDate: '' });
        await fetchTasks();
        await updatePlanProgress();
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to add task',
        background: '#1f2937',
        color: '#fff'
      });
    }
  };

  // Task Status Change
  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await axiosSecure.put(`/api/tasks/${taskId}`, { status: newStatus });
      await fetchTasks();
      await updatePlanProgress();
      
      if (newStatus === 'Completed') {
        Swal.fire({
          icon: 'success',
          title: 'Good job!',
          text: 'Task completed!',
          timer: 1500,
          showConfirmButton: false,
          background: '#1f2937',
          color: '#fff'
        });
      }
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

  // Task Edit
  const handleEditTask = async () => {
    if (!editingTask.title || !editingTask.estimatedTime || !editingTask.dueDate) {
      Swal.fire('Error!', 'All fields are required', 'error');
      return;
    }

    try {
      await axiosSecure.put(`/api/tasks/${editingTask._id}`, {
        title: editingTask.title,
        estimatedTime: Number(editingTask.estimatedTime),
        dueDate: editingTask.dueDate
      });
      
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Task updated successfully',
        timer: 1500,
        showConfirmButton: false,
        background: '#1f2937',
        color: '#fff'
      });
      
      setEditingTask(null);
      await fetchTasks();
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

  // Task Delete
  const handleDeleteTask = async (taskId, title) => {
    const result = await Swal.fire({
      title: 'Delete Task?',
      text: `Are you sure you want to delete "${title}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6366f1',
      confirmButtonText: 'Yes, delete',
      background: '#1f2937',
      color: '#fff'
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/api/tasks/${taskId}`);
        await fetchTasks();
        await updatePlanProgress();
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Task has been deleted.',
          timer: 1500,
          showConfirmButton: false,
          background: '#1f2937',
          color: '#fff'
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to delete task',
          background: '#1f2937',
          color: '#fff'
        });
      }
    }
  };

  // Tasks status অনুযায়ী分组
  const pendingTasks = tasks.filter(t => t.status === 'Pending');
  const inProgressTasks = tasks.filter(t => t.status === 'In Progress');
  const completedTasks = tasks.filter(t => t.status === 'Completed');

  // Progress calculate for display
  const totalTasks = tasks.length;
  const completedCount = completedTasks.length;
  const progressPercentage = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 pt-20 px-4 pb-10">
      <div className="max-w-4xl mx-auto">
        
        {/* Back Button */}
        <button
          onClick={() => navigate('/plans')}
          className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          Back to Plans
        </button>

        {/* Plan Details Card */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className={`px-3 py-1 rounded-full text-sm border ${getPriorityColor(plan?.priority)}`}>
                  {getPriorityIcon(plan?.priority)} {plan?.priority} Priority
                </span>
                <span className="text-gray-400 text-sm">{plan?.subject}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{plan?.title}</h1>
            </div>
            <Link to={`/plan/${id}/edit`}>
              <button className="px-6 py-2.5 bg-purple-500/20 text-purple-400 rounded-xl hover:bg-purple-500/30 transition-all flex items-center gap-2 border border-purple-500/30">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Plan
              </button>
            </Link>
          </div>

          {/* Plan Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-white/5 rounded-xl p-4">
              <p className="text-gray-400 text-sm mb-1">Total Hours</p>
              <p className="text-2xl text-white font-bold">{plan?.totalHours}h</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <p className="text-gray-400 text-sm mb-1">Target Date</p>
              <p className="text-2xl text-white font-bold">{formatDate(plan?.targetDate)}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <p className="text-gray-400 text-sm mb-1">Total Tasks</p>
              <p className="text-2xl text-white font-bold">{totalTasks}</p>
            </div>
          </div>

          {/* Progress Section */}
          <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl p-6">
            <div className="flex justify-between items-center mb-3">
              <div>
                <h3 className="text-white font-semibold">Overall Progress</h3>
                <p className="text-gray-400 text-sm">{completedCount} of {totalTasks} tasks completed</p>
              </div>
              <span className="text-3xl font-bold text-white">{progressPercentage}%</span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-700 ease-out relative"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>

            {/* Progress Message */}
            <p className="text-right text-sm text-gray-400 mt-2">
              {progressPercentage === 100 ? '🎉 All tasks completed!' : 
               progressPercentage > 50 ? '👍 Great progress!' : 
               progressPercentage > 0 ? '💪 Keep going!' : '🚀 Start adding tasks!'}
            </p>
          </div>
        </div>

        {/* Tasks Section */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          
          {/* Tasks Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Tasks</h2>
              <p className="text-gray-400 text-sm">Manage your learning tasks</p>
            </div>
            <button
              onClick={() => setShowAddTask(true)}
              className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/25"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Task
            </button>
          </div>

          {/* Add Task Form */}
          {showAddTask && (
            <div className="mb-8 p-6 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl border border-indigo-500/30">
              <h3 className="text-white font-semibold mb-4">Create New Task</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Task title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="number"
                    placeholder="Estimated hours"
                    value={newTask.estimatedTime}
                    onChange={(e) => setNewTask({...newTask, estimatedTime: e.target.value})}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                  />
                  <input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleAddTask}
                    className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all"
                  >
                    Save Task
                  </button>
                  <button
                    onClick={() => setShowAddTask(false)}
                    className="px-6 py-2.5 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Edit Task Form */}
          {editingTask && (
            <div className="mb-8 p-6 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl border border-yellow-500/30">
              <h3 className="text-white font-semibold mb-4">Edit Task</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Task title"
                  value={editingTask.title}
                  onChange={(e) => setEditingTask({...editingTask, title: e.target.value})}
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="number"
                    placeholder="Estimated hours"
                    value={editingTask.estimatedTime}
                    onChange={(e) => setEditingTask({...editingTask, estimatedTime: e.target.value})}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500"
                  />
                  <input
                    type="date"
                    value={editingTask.dueDate?.split('T')[0]}
                    onChange={(e) => setEditingTask({...editingTask, dueDate: e.target.value})}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-yellow-500"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleEditTask}
                    className="px-6 py-2.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl hover:from-yellow-600 hover:to-orange-600 transition-all"
                  >
                    Update Task
                  </button>
                  <button
                    onClick={() => setEditingTask(null)}
                    className="px-6 py-2.5 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tasks Lists */}
          <div className="space-y-6">
            
            {/* Pending Tasks */}
            {pendingTasks.length > 0 && (
              <div>
                <h3 className="text-blue-400 font-semibold mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                  Pending ({pendingTasks.length})
                </h3>
                <div className="space-y-3">
                  {pendingTasks.map(task => (
                    <div key={task._id} className="group flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all border border-white/5 hover:border-blue-500/30">
                      <div className="flex-1">
                        <p className="text-white font-medium">{task.title}</p>
                        <div className="flex gap-4 mt-1">
                          <span className="text-xs text-gray-400">⏱️ {task.estimatedTime}h</span>
                          <span className="text-xs text-gray-400">📅 {formatDate(task.dueDate)}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 
                        opacity-100 
                       transition-opacity">
                        <button
                          onClick={() => handleStatusChange(task._id, 'In Progress')}
                          className="px-3 py-1.5 bg-yellow-500/20 text-yellow-400 rounded-lg text-sm hover:bg-yellow-500/30 transition-all"
                          title="Start Task"
                        >
                          Start
                        </button>
                        <button
                          onClick={() => setEditingTask(task)}
                          className="p-1.5 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-all"
                          title="Edit Task"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task._id, task.title)}
                          className="p-1.5 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all"
                          title="Delete Task"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* In Progress Tasks */}
            {inProgressTasks.length > 0 && (
              <div>
                <h3 className="text-yellow-400 font-semibold mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                  In Progress ({inProgressTasks.length})
                </h3>
                <div className="space-y-3">
                  {inProgressTasks.map(task => (
                    <div key={task._id} className="group flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all border border-white/5 hover:border-yellow-500/30">
                      <div className="flex-1">
                        <p className="text-white font-medium">{task.title}</p>
                        <div className="flex gap-4 mt-1">
                          <span className="text-xs text-gray-400">⏱️ {task.estimatedTime}h</span>
                          <span className="text-xs text-gray-400">📅 {formatDate(task.dueDate)}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 opacity-100 transition-opacity">
                        <button
                          onClick={() => handleStatusChange(task._id, 'Completed')}
                          className="px-3 py-1.5 bg-green-500/20 text-green-400 rounded-lg text-sm hover:bg-green-500/30 transition-all"
                          title="Complete Task"
                        >
                          Complete
                        </button>
                        <button
                          onClick={() => setEditingTask(task)}
                          className="p-1.5 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-all"
                          title="Edit Task"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Completed Tasks */}
            {completedTasks.length > 0 && (
              <div>
                <h3 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  Completed ({completedTasks.length})
                </h3>
                <div className="space-y-3">
                  {completedTasks.map(task => (
                    <div key={task._id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl opacity-75 border border-white/5">
                      <div className="flex-1">
                        <p className="text-white font-medium line-through">{task.title}</p>
                        <div className="flex gap-4 mt-1">
                          <span className="text-xs text-green-400">✓ Completed</span>
                          <span className="text-xs text-gray-400">⏱️ {task.estimatedTime}h</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No Tasks */}
            {tasks.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-xl text-white mb-2">No tasks yet</h3>
                <p className="text-gray-400 mb-6">Start by adding your first task!</p>
                <button
                  onClick={() => setShowAddTask(true)}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all"
                >
                  + Add Your First Task
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanDetails;