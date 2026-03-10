// frontend/src/LoginFile/Calendar.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/UseAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const Calendar = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasksByDate, setTasksByDate] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateTasks, setSelectedDateTasks] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  useEffect(() => {
    if (user?.email) {
      fetchCalendarData();
    }
  }, [user, currentDate]);

  const fetchCalendarData = async () => {
    try {
      setLoading(true);
      const month = currentDate.getMonth();
      const year = currentDate.getFullYear();
      
      const { data } = await axiosSecure.get(
        `/api/calendar/tasks?email=${user.email}&month=${month}&year=${year}`
      );
      
      setTasksByDate(data.tasksByDate || {});
    } catch (error) {
      console.error('Error fetching calendar data:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to load calendar data',
        background: '#1f2937',
        color: '#fff',
        confirmButtonColor: '#6366f1'
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchTasksForDate = async (date) => {
    try {
      const { data } = await axiosSecure.get(
        `/api/calendar/tasks-by-date?email=${user.email}&date=${date}`
      );
      setSelectedDateTasks(data);
      setSelectedDate(date);
      setShowTaskModal(true);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to load tasks',
        background: '#1f2937',
        color: '#fff',
        confirmButtonColor: '#6366f1'
      });
    }
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    return { firstDay, daysInMonth };
  };

  const handleTaskStatusChange = async (taskId, newStatus) => {
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
      
      if (selectedDate) {
        await fetchTasksForDate(selectedDate);
      }
      await fetchCalendarData();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to update task',
        background: '#1f2937',
        color: '#fff',
        confirmButtonColor: '#6366f1'
      });
    }
  };

  const getTaskStatusIcon = (status) => {
    switch(status) {
      case 'Completed': return '✅';
      case 'In Progress': return '🔄';
      default: return '⭕';
    }
  };

  const getTaskStatusColor = (status) => {
    switch(status) {
      case 'Completed': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'In Progress': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      default: return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
    }
  };

  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split('-');
    return `${day} ${monthNames[parseInt(month)-1]}, ${year}`;
  };

  const { firstDay, daysInMonth } = getDaysInMonth();
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 pt-16 sm:pt-20 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 sm:h-20 sm:w-20 border-t-4 border-b-4 border-indigo-500 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl sm:text-3xl">📅</span>
            </div>
          </div>
          <p className="text-gray-400 mt-4 animate-pulse text-sm sm:text-base">Loading your calendar...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 pt-16 sm:pt-20 px-2 sm:px-4 lg:px-6 pb-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-4 sm:mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-2 sm:p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl sm:rounded-2xl shadow-lg shadow-indigo-500/25">
                <span className="text-2xl sm:text-3xl">📅</span>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                  Study <span className="bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">Calendar</span>
                </h1>
                <p className="text-xs sm:text-sm text-gray-400 mt-0.5 sm:mt-1">
                  Track your tasks and plan your study schedule
                </p>
              </div>
            </div>
            
            <button
              onClick={handleToday}
              className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg sm:rounded-xl text-sm sm:text-base hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2"
            >
              <span>📍</span>
              <span className="sm:hidden">Today</span>
              <span className="hidden sm:inline">Today</span>
            </button>
          </div>
        </div>

        {/* Calendar Controls */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-6 border border-white/10 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <div className="flex items-center justify-between w-full sm:w-auto gap-2">
              <button
                onClick={handlePrevMonth}
                className="w-9 h-9 sm:w-12 sm:h-12 bg-white/5 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center text-white transition-all border border-white/10"
              >
                <span className="text-lg sm:text-xl">←</span>
              </button>
              
              <h2 className="text-base sm:text-2xl lg:text-3xl font-bold text-white px-2 sm:px-4">
                <span className="sm:hidden">{monthNames[currentDate.getMonth()].slice(0,3)} {currentDate.getFullYear()}</span>
                <span className="hidden sm:inline">{monthNames[currentDate.getMonth()]} <span className="text-indigo-400">{currentDate.getFullYear()}</span></span>
              </h2>
              
              <button
                onClick={handleNextMonth}
                className="w-9 h-9 sm:w-12 sm:h-12 bg-white/5 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center text-white transition-all border border-white/10"
              >
                <span className="text-lg sm:text-xl">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-2 sm:p-6 border border-white/10">
          
          {/* Day Names */}
          <div className="grid grid-cols-7 gap-0.5 sm:gap-2 mb-1 sm:mb-4">
            {dayNames.map(day => (
              <div key={day} className="text-center">
                <span className="text-[10px] sm:text-sm font-semibold text-gray-400 bg-white/5 py-1 sm:py-2 px-0.5 sm:px-1 rounded block">
                  <span className="sm:hidden">{day[0]}</span>
                  <span className="hidden sm:inline">{day}</span>
                </span>
              </div>
            ))}
          </div>

          {/* Calendar Days Grid */}
          <div className="grid grid-cols-7 gap-0.5 sm:gap-2">
            {/* Empty cells */}
            {[...Array(firstDay)].map((_, index) => (
              <div key={`empty-${index}`} className="aspect-square p-0.5 sm:p-2 bg-white/5 rounded-lg sm:rounded-xl opacity-30" />
            ))}

            {/* Actual days */}
            {[...Array(daysInMonth)].map((_, index) => {
              const day = index + 1;
              const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const dayTasks = tasksByDate[dateStr] || [];
              const isToday = dateStr === todayStr;
              
              return (
                <button
                  key={day}
                  onClick={() => fetchTasksForDate(dateStr)}
                  className={`
                    aspect-square p-1 sm:p-2 lg:p-3 rounded-lg sm:rounded-xl border transition-all relative overflow-hidden
                    ${isToday 
                      ? 'border-indigo-500 bg-gradient-to-br from-indigo-500/20 to-purple-500/20' 
                      : 'border-white/10 hover:border-indigo-500/50 bg-white/5 hover:bg-white/10'
                    }
                  `}
                >
                  <div className="h-full w-full flex flex-col items-start justify-start">
                    {/* Day Number - Always visible and properly sized */}
                    <span className={`
                      text-xs sm:text-sm lg:text-base font-bold leading-tight
                      ${isToday ? 'text-indigo-400' : 'text-white'}
                    `}>
                      {day}
                    </span>
                    
                    {/* Task Indicators - Compact for mobile */}
                    {dayTasks.length > 0 && (
                      <div className="mt-0.5 sm:mt-1 w-full">
                        {/* Task dots - Always visible */}
                        <div className="flex flex-wrap gap-0.5 sm:gap-1">
                          {dayTasks.slice(0, 2).map((task, i) => (
                            <span
                              key={i}
                              className={`inline-block w-1 h-1 sm:w-1.5 sm:h-1.5 lg:w-2 lg:h-2 rounded-full ${
                                task.status === 'Completed' ? 'bg-green-500' :
                                task.status === 'In Progress' ? 'bg-yellow-500' : 'bg-blue-500'
                              }`}
                              title={task.title}
                            />
                          ))}
                          {dayTasks.length > 2 && (
                            <span className="text-[6px] sm:text-[8px] lg:text-[10px] text-gray-400 leading-none">
                              +{dayTasks.length - 2}
                            </span>
                          )}
                        </div>
                        
                        {/* Task count - Only visible on larger screens */}
                        <span className="hidden sm:inline-block text-[8px] lg:text-[10px] text-gray-400 mt-0.5">
                          {dayTasks.length} task{dayTasks.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 sm:mt-6 bg-white/5 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/10">
          <h3 className="text-xs sm:text-sm font-semibold text-white mb-2 sm:mb-3">Task Status</h3>
          <div className="grid grid-cols-3 gap-1 sm:gap-4">
            <div className="flex items-center gap-1 sm:gap-2 bg-blue-500/10 p-1.5 sm:p-2 rounded-lg">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full flex-shrink-0"></div>
              <span className="text-[8px] sm:text-xs text-gray-300 truncate">Pending</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 bg-yellow-500/10 p-1.5 sm:p-2 rounded-lg">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full flex-shrink-0"></div>
              <span className="text-[8px] sm:text-xs text-gray-300 truncate">In Progress</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 bg-green-500/10 p-1.5 sm:p-2 rounded-lg">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full flex-shrink-0"></div>
              <span className="text-[8px] sm:text-xs text-gray-300 truncate">Completed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Task Details Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-md">
          <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 rounded-xl sm:rounded-2xl w-full max-w-lg max-h-[90vh] sm:max-h-[80vh] overflow-hidden border border-white/10 shadow-2xl mx-2 sm:mx-0">
            
            {/* Modal Header */}
            <div className="p-3 sm:p-6 border-b border-white/10 bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
              <div className="flex justify-between items-center">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 sm:gap-2 mb-0.5 sm:mb-1">
                    <span className="text-xl sm:text-2xl flex-shrink-0">📅</span>
                    <h3 className="text-sm sm:text-lg md:text-xl font-bold text-white truncate">
                      {selectedDate && formatDate(selectedDate)}
                    </h3>
                  </div>
                  <p className="text-[10px] sm:text-xs text-gray-400">
                    {selectedDateTasks.length} task{selectedDateTasks.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <button
                  onClick={() => setShowTaskModal(false)}
                  className="w-7 h-7 sm:w-8 sm:h-8 bg-white/5 hover:bg-red-500/20 rounded-lg sm:rounded-xl flex items-center justify-center text-gray-400 hover:text-red-400 transition-all border border-white/10 flex-shrink-0"
                >
                  <span className="text-sm sm:text-base">✕</span>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-3 sm:p-6 overflow-y-auto max-h-[70vh] sm:max-h-[60vh]">
              {selectedDateTasks.length === 0 ? (
                <div className="text-center py-8 sm:py-12">
                  <div className="text-4xl sm:text-6xl mb-3 sm:mb-4 opacity-50">📅</div>
                  <p className="text-sm sm:text-base text-gray-400">No tasks for this day</p>
                  <p className="text-xs text-gray-500 mt-2">Enjoy your free time! ✨</p>
                </div>
              ) : (
                <div className="space-y-2 sm:space-y-4">
                  {selectedDateTasks.map(task => (
                    <div
                      key={task._id}
                      className="bg-white/5 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/10 hover:border-indigo-500/50 transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-3">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm sm:text-base font-semibold text-white mb-1 sm:mb-2 break-words">
                            {task.title}
                          </h4>
                          
                          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                            <span className="text-[10px] sm:text-xs text-gray-400 flex items-center gap-1">
                              <span className="flex-shrink-0">📚</span> 
                              <span className="truncate max-w-[120px] sm:max-w-[200px]">{task.planTitle}</span>
                            </span>
                            <span className="text-[10px] sm:text-xs text-gray-400 flex items-center gap-1 flex-shrink-0">
                              <span>⏱️</span> {task.estimatedTime}h
                            </span>
                          </div>
                          
                          <div className="flex items-center">
                            <span className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs border ${getTaskStatusColor(task.status)}`}>
                              {getTaskStatusIcon(task.status)} {task.status}
                            </span>
                          </div>
                        </div>
                        
                        {/* Action Buttons */}
                        {task.status !== 'Completed' && (
                          <div className="flex sm:flex-col gap-2 mt-2 sm:mt-0">
                            {task.status === 'Pending' && (
                              <button
                                onClick={() => handleTaskStatusChange(task._id, 'In Progress')}
                                className="flex-1 sm:flex-none px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg text-[10px] sm:text-xs hover:from-yellow-600 hover:to-orange-600 transition-all shadow-lg shadow-yellow-500/20 whitespace-nowrap"
                              >
                                Start
                              </button>
                            )}
                            {task.status === 'In Progress' && (
                              <button
                                onClick={() => handleTaskStatusChange(task._id, 'Completed')}
                                className="flex-1 sm:flex-none px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg text-[10px] sm:text-xs hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg shadow-green-500/20 whitespace-nowrap"
                              >
                                Complete
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                      
                      {task.notes && (
                        <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-white/10">
                          <p className="text-[10px] sm:text-xs text-gray-400 flex items-center gap-1 break-words">
                            <span className="flex-shrink-0">📝</span> 
                            <span>{task.notes}</span>
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 sm:p-6 border-t border-white/10 bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
              <button
                onClick={() => setShowTaskModal(false)}
                className="w-full py-2 sm:py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg sm:rounded-xl text-xs sm:text-sm hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg shadow-indigo-500/25"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 px-2 sm:px-0">
        <Link to="/dashboard" className="w-full sm:w-auto">
          <button className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-white/5 border border-white/10 text-white rounded-lg sm:rounded-xl hover:bg-white/10 transition-all text-xs sm:text-base flex items-center justify-center gap-2">
            <span>←</span>
            <span className="sm:hidden">Back</span>
            <span className="hidden sm:inline">Back to Dashboard</span>
          </button>
        </Link>
        <Link to="/plans" className="w-full sm:w-auto">
          <button className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg sm:rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all text-xs sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25">
            <span>📚</span>
            <span className="sm:hidden">Plans</span>
            <span className="hidden sm:inline">View Plans</span>
          </button>
        </Link>
      </div>

      {/* Footer */}
      <p className="text-center text-[8px] sm:text-xs text-gray-500 mt-4 sm:mt-6 px-2">
        Click any date to view and manage tasks • Colored dots show task status
      </p>
    </div>
  );
};

export default Calendar;