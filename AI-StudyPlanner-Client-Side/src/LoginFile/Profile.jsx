// frontend/src/LoginFile/Profile.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/UseAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { getAuth, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';

const Profile = () => {
  const { user, logOut } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [dbUser, setDbUser] = useState(null);
  const [stats, setStats] = useState({
    totalPlans: 0,
    totalTasks: 0,
    completedTasks: 0,
    studyHours: 0,
    streak: 0
  });
  const [editing, setEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showReauthModal, setShowReauthModal] = useState(false);
  const [reauthPassword, setReauthPassword] = useState('');
  const [pendingAction, setPendingAction] = useState(null);
  const [passwordData, setPasswordData] = useState({
    new: '',
    confirm: ''
  });

  // Email Reminder Settings
  const [reminderSettings, setReminderSettings] = useState({
    emailNotifications: false,
    reminderTime: '8',
    reminderEnabled: false
  });

  useEffect(() => {
    if (user?.email) {
      fetchUserData();
      fetchUserStats();
      fetchUserSettings();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      const { data } = await axiosSecure.get(`/users/${user.email}`);
      setDbUser(data);
      setEditedName(data?.name || user?.displayName || '');
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const fetchUserStats = async () => {
    try {
      const { data } = await axiosSecure.get(`/api/dashboard/stats?email=${user.email}`);
      setStats(data);
      console.log('Stats received:', data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user reminder settings
  const fetchUserSettings = async () => {
    try {
      const { data } = await axiosSecure.get(`/users/${user.email}/settings`);
      setReminderSettings(data);
      console.log('Reminder settings:', data);
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const handleUpdateProfile = async () => {
    if (!editedName.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Name cannot be empty',
        background: '#1f2937',
        color: '#fff',
        confirmButtonColor: '#6366f1'
      });
      return;
    }

    try {
      await axiosSecure.put(`/users/${user.email}`, { name: editedName });

      setDbUser({ ...dbUser, name: editedName });
      setEditing(false);

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Profile updated successfully',
        timer: 1500,
        showConfirmButton: false,
        background: '#1f2937',
        color: '#fff'
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to update profile',
        background: '#1f2937',
        color: '#fff',
        confirmButtonColor: '#6366f1'
      });
    }
  };

  // Toggle Email Notifications
  const handleToggleNotifications = async () => {
    try {
      const newValue = !reminderSettings.emailNotifications;
      console.log('Toggling notifications to:', newValue);

      const response = await axiosSecure.put(`/users/${user.email}/reminder`, {
        emailNotifications: newValue
      });

      console.log('Update response:', response.data);

      setReminderSettings(prev => ({
        ...prev,
        emailNotifications: newValue
      }));

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: `Email notifications ${newValue ? 'enabled' : 'disabled'}`,
        timer: 1500,
        showConfirmButton: false,
        background: '#1f2937',
        color: '#fff'
      });
    } catch (error) {
      console.error('Error updating notifications:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to update settings',
        background: '#1f2937',
        color: '#fff'
      });
    }
  };

  // Toggle Daily Reminder
  const handleToggleReminder = async () => {
    try {
      const newValue = !reminderSettings.reminderEnabled;
      console.log('Toggling reminder to:', newValue);

      const response = await axiosSecure.put(`/users/${user.email}/reminder`, {
        reminderEnabled: newValue
      });

      console.log('Update response:', response.data);

      setReminderSettings(prev => ({
        ...prev,
        reminderEnabled: newValue
      }));
    } catch (error) {
      console.error('Error updating reminder:', error);
    }
  };

  // Change Reminder Time
  const handleTimeChange = async (time) => {
    try {
      console.log('Changing time to:', time);

      const response = await axiosSecure.put(`/users/${user.email}/reminder`, {
        reminderTime: time
      });

      console.log('Update response:', response.data);

      setReminderSettings(prev => ({
        ...prev,
        reminderTime: time
      }));

      // Format display time
      const displayTime = time.includes('.')
        ? time.replace('.', ':')
        : `${time}:00`;

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: `Reminder time set to ${displayTime}:00`,
        timer: 1500,
        showConfirmButton: false,
        background: '#1f2937',
        color: '#fff'
      });
    } catch (error) {
      console.error('Error changing time:', error);
    }
  };

  // Re-authenticate user
  const handleReauthenticate = async () => {
    if (!reauthPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Password is required',
        background: '#1f2937',
        color: '#fff',
        confirmButtonColor: '#6366f1'
      });
      return;
    }

    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (!currentUser) {
        throw new Error('No user logged in');
      }

      const credential = EmailAuthProvider.credential(currentUser.email, reauthPassword);
      await reauthenticateWithCredential(currentUser, credential);

      setShowReauthModal(false);
      setReauthPassword('');

      if (pendingAction === 'password') {
        await updatePassword(currentUser, passwordData.new);
        setShowPasswordModal(false);
        setPasswordData({ new: '', confirm: '' });

        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Password changed successfully',
          timer: 1500,
          showConfirmButton: false,
          background: '#1f2937',
          color: '#fff'
        });
      } else if (pendingAction === 'delete') {
        await handleDeleteAccountAfterReauth();
      }

      setPendingAction(null);

    } catch (error) {
      console.error('Reauthentication error:', error);

      let errorMessage = 'Incorrect password. Please try again.';
      if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later.';
      }

      Swal.fire({
        icon: 'error',
        title: 'Authentication Failed',
        text: errorMessage,
        background: '#1f2937',
        color: '#fff',
        confirmButtonColor: '#6366f1'
      });
    }
  };

  // Password change request
  const handlePasswordChangeRequest = () => {
    if (!passwordData.new || !passwordData.confirm) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required',
        background: '#1f2937',
        color: '#fff',
        confirmButtonColor: '#6366f1'
      });
      return;
    }

    if (passwordData.new.length < 6) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Password must be at least 6 characters',
        background: '#1f2937',
        color: '#fff',
        confirmButtonColor: '#6366f1'
      });
      return;
    }

    if (passwordData.new !== passwordData.confirm) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Passwords do not match',
        background: '#1f2937',
        color: '#fff',
        confirmButtonColor: '#6366f1'
      });
      return;
    }

    setPendingAction('password');
    setShowPasswordModal(false);
    setShowReauthModal(true);
  };

  // Delete account after reauth
  const handleDeleteAccountAfterReauth = async () => {
    try {
      const userPlans = await axiosSecure.get(`/api/plans?email=${user.email}`);

      for (const plan of userPlans.data) {
        await axiosSecure.delete(`/api/tasks/${plan._id}`);
        await axiosSecure.delete(`/api/plans/${plan._id}`);
      }

      await axiosSecure.delete(`/users/${user.email}`);

      const auth = getAuth();
      await auth.currentUser.delete();

      await logOut();

      Swal.fire({
        icon: 'success',
        title: 'Account Deleted',
        text: 'Your account has been permanently deleted',
        background: '#1f2937',
        color: '#fff',
        confirmButtonColor: '#6366f1'
      });

      navigate('/');
    } catch (error) {
      console.error('Delete account error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to delete account. Please try again.',
        background: '#1f2937',
        color: '#fff',
        confirmButtonColor: '#6366f1'
      });
    }
  };

  // Delete request
  const handleDeleteRequest = () => {
    setPendingAction('delete');
    setShowDeleteModal(false);
    setShowReauthModal(true);
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 pt-16 sm:pt-20 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 sm:h-20 sm:w-20 border-t-4 border-b-4 border-indigo-500 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl sm:text-3xl">👤</span>
            </div>
          </div>
          <p className="text-gray-400 mt-4 animate-pulse text-sm sm:text-base">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 pt-16 sm:pt-20 px-3 sm:px-4 pb-10">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 mb-4">
            <div className="p-3 sm:p-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl sm:rounded-2xl shadow-lg shadow-indigo-500/25">
              <span className="text-2xl sm:text-3xl">👤</span>
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                My <span className="bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">Profile</span>
              </h1>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">Manage your account and view statistics</p>
            </div>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 mb-6">

          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
            {/* Profile Picture */}
            <div className="relative">
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 p-1">
                <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center overflow-hidden">
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={dbUser?.name || user?.displayName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                      {getInitials(dbUser?.name || user?.displayName)}
                    </span>
                  )}
                </div>
              </div>
              <div className="absolute bottom-1 right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-gray-900"></div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center sm:text-left w-full">
              {editing ? (
                <div className="space-y-3 max-w-sm mx-auto sm:mx-0">
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm sm:text-base focus:outline-none focus:border-indigo-500"
                    placeholder="Enter your name"
                  />
                  <div className="flex gap-2 justify-center sm:justify-start">
                    <button
                      onClick={handleUpdateProfile}
                      className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg text-xs sm:text-sm hover:from-green-600 hover:to-emerald-700 transition-all"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditing(false);
                        setEditedName(dbUser?.name || user?.displayName || '');
                      }}
                      className="px-3 sm:px-4 py-1.5 sm:py-2 bg-red-500/20 text-red-400 rounded-lg text-xs sm:text-sm hover:bg-red-500/30 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
                    {dbUser?.name || user?.displayName || 'User'}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-400 mb-3 break-all">{user?.email}</p>
                  <button
                    onClick={() => setEditing(true)}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 bg-indigo-500/20 text-indigo-400 rounded-lg text-xs sm:text-sm hover:bg-indigo-500/30 transition-all inline-flex items-center gap-2"
                  >
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit Profile
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Member Since */}
          <div className="bg-white/5 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
            <p className="text-xs text-gray-400 mb-1">Member Since</p>
            <p className="text-sm sm:text-base text-white font-semibold">
              {formatDate(dbUser?.createdAt)}
            </p>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
            <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
              <p className="text-xl sm:text-2xl font-bold text-indigo-400">{stats.totalPlans}</p>
              <p className="text-[10px] sm:text-xs text-gray-400">Total Plans</p>
            </div>

            <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
              <p className="text-xl sm:text-2xl font-bold text-yellow-400">{stats.totalTasks}</p>
              <p className="text-[10px] sm:text-xs text-gray-400">Total Tasks</p>
            </div>

            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
              <p className="text-xl sm:text-2xl font-bold text-green-400">{stats.completedTasks}</p>
              <p className="text-[10px] sm:text-xs text-gray-400">Completed</p>
            </div>

            <div className="bg-gradient-to-br from-red-500/10 to-pink-500/10 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
              <p className="text-xl sm:text-2xl font-bold text-red-400">{stats.studyHours || 0}</p>
              <p className="text-[10px] sm:text-xs text-gray-400">Study Hours</p>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center col-span-2 sm:col-span-1">
              <p className="text-xl sm:text-2xl font-bold text-purple-400">{stats.streak || 0}</p>
              <p className="text-[10px] sm:text-xs text-gray-400">Day Streak</p>
            </div>
          </div>

          {/* Account Actions */}
          <div className="border-t border-white/10 pt-4 sm:pt-6">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Account Settings</h3>

            <div className="space-y-2 sm:space-y-3">
              {/* Change Password Button */}
              <button
                onClick={() => setShowPasswordModal(true)}
                className="w-full p-3 sm:p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center text-yellow-400 text-sm sm:text-base">
                    🔒
                  </div>
                  <div className="text-left">
                    <p className="text-sm sm:text-base text-white font-medium">Change Password</p>
                    <p className="text-[10px] sm:text-xs text-gray-400">Update your password regularly</p>
                  </div>
                </div>
                <span className="text-gray-400 group-hover:translate-x-1 transition-transform text-sm">→</span>
              </button>

              {/* Delete Account Button */}
              <button
                onClick={() => setShowDeleteModal(true)}
                className="w-full p-3 sm:p-4 bg-red-500/10 rounded-lg hover:bg-red-500/20 transition-all flex items-center justify-between group border border-red-500/20"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-red-500/20 rounded-lg flex items-center justify-center text-red-400 text-sm sm:text-base">
                    🗑️
                  </div>
                  <div className="text-left">
                    <p className="text-sm sm:text-base text-red-400 font-medium">Delete Account</p>
                    <p className="text-[10px] sm:text-xs text-gray-400">Permanently delete your account</p>
                  </div>
                </div>
                <span className="text-red-400 group-hover:translate-x-1 transition-transform text-sm">→</span>
              </button>
            </div>
          </div>
        </div>


        {/* Email Reminder Settings */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span>📧</span> Email Reminders
          </h3>

          {/* Email Notifications Toggle */}
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg mb-3">
            <div>
              <p className="text-white font-medium">Email Notifications</p>
              <p className="text-xs text-gray-400">Receive daily task reminders</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={reminderSettings.emailNotifications}
                onChange={handleToggleNotifications}
              />
              <div className="w-11 h-6 bg-white/10 rounded-full peer peer-checked:bg-indigo-600 transition-all"></div>
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
            </label>
          </div>

          {/* Daily Reminder Toggle (only if notifications ON) */}
          {reminderSettings.emailNotifications && (
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg mb-3">
              <div>
                <p className="text-white font-medium">Daily Reminder</p>
                <p className="text-xs text-gray-400">Get reminder at selected time</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={reminderSettings.reminderEnabled}
                  onChange={handleToggleReminder}
                />
                <div className="w-11 h-6 bg-white/10 rounded-full peer peer-checked:bg-indigo-600 transition-all"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
              </label>
            </div>
          )}

          {/* Time Picker (only if reminder enabled) */}
          {reminderSettings.reminderEnabled && (
            <div className="p-4 bg-white/5 rounded-lg">
              <p className="text-white text-sm mb-3">Select Reminder Time:</p>

              <div className="grid grid-cols-3 gap-2">
                {['8', '9', '10', '17', '18', '19', '20', '21', '22'].map(time => (
                  <button
                    key={time}
                    onClick={() => handleTimeChange(time)}
                    className={`py-2 px-3 rounded-lg text-sm transition-all ${reminderSettings.reminderTime === time
                        ? 'bg-indigo-500 text-white'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                      }`}
                  >
                    {time}:00
                  </button>
                ))}
              </div>


              {/* Half Hours Grid */}
              <div className="border-t border-white/10 pt-3 mt-2">
                <p className="text-gray-400 text-xs mb-2">Half hours:</p>
                <div className="grid grid-cols-3 gap-2">
                  {['8:30', '9:30', '17:30', '18:30', '19:30', '20:30', '21:30', '22:30'].map(time => {
                    // ✅ সঠিক কনভার্শন
                    const [hours, minutes] = time.split(':');
                    const timeValue = (parseInt(hours) + (parseInt(minutes) / 60)).toFixed(2);
                    // "21:30" → "21.50" ✅

                    return (
                      <button
                        key={time}
                        onClick={() => handleTimeChange(timeValue)}
                        className={`py-2 px-3 rounded-lg text-sm transition-all ${reminderSettings.reminderTime === timeValue
                            ? 'bg-indigo-500 text-white'
                            : 'bg-white/10 text-gray-300 hover:bg-white/20'
                          }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>




              <p className="text-xs text-gray-400 mt-3">
                ⏰ You'll receive email at {reminderSettings.reminderTime}:00
              </p>
            </div>
          )}
        </div>








        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3">
          <Link to="/dashboard" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-white/5 border border-white/10 text-white rounded-lg sm:rounded-xl hover:bg-white/10 transition-all text-xs sm:text-base">
              ← Back to Dashboard
            </button>
          </Link>
          <Link to="/plans" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg sm:rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all text-xs sm:text-base">
              View My Plans
            </button>
          </Link>
        </div>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 rounded-xl sm:rounded-2xl w-full max-w-md mx-4 border border-white/10">
            <div className="p-4 sm:p-6 border-b border-white/10">
              <h3 className="text-lg sm:text-xl font-bold text-white">Change Password</h3>
            </div>
            <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
              <input
                type="password"
                placeholder="New Password"
                value={passwordData.new}
                onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                className="w-full p-2 sm:p-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm sm:text-base"
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={passwordData.confirm}
                onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                className="w-full p-2 sm:p-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm sm:text-base"
              />
              <p className="text-xs text-gray-400">Password must be at least 6 characters</p>
              <div className="flex gap-2 sm:gap-3 pt-2 sm:pt-4">
                <button
                  onClick={handlePasswordChangeRequest}
                  className="flex-1 py-2 sm:py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg text-sm sm:text-base hover:from-indigo-600 hover:to-purple-700 transition-all"
                >
                  Continue
                </button>
                <button
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPasswordData({ new: '', confirm: '' });
                  }}
                  className="px-4 sm:px-6 py-2 sm:py-3 bg-red-500/20 text-red-400 rounded-lg text-sm sm:text-base hover:bg-red-500/30 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 rounded-xl sm:rounded-2xl w-full max-w-md mx-4 border border-white/10">
            <div className="p-4 sm:p-6 border-b border-white/10">
              <h3 className="text-lg sm:text-xl font-bold text-red-400">Delete Account</h3>
            </div>
            <div className="p-4 sm:p-6">
              <p className="text-sm sm:text-base text-gray-300 mb-4">
                Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently lost.
              </p>
              <div className="flex gap-2 sm:gap-3">
                <button
                  onClick={handleDeleteRequest}
                  className="flex-1 py-2 sm:py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg text-sm sm:text-base hover:from-red-600 hover:to-pink-700 transition-all"
                >
                  Continue
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 py-2 sm:py-3 bg-white/5 border border-white/10 text-white rounded-lg text-sm sm:text-base hover:bg-white/10 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Re-authentication Modal */}
      {showReauthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 rounded-xl sm:rounded-2xl w-full max-w-md mx-4 border border-white/10">
            <div className="p-4 sm:p-6 border-b border-white/10">
              <h3 className="text-lg sm:text-xl font-bold text-white">Verify Password</h3>
            </div>
            <div className="p-4 sm:p-6">
              <p className="text-sm sm:text-base text-gray-300 mb-4">
                For security, please enter your current password to continue.
              </p>
              <input
                type="password"
                placeholder="Current Password"
                value={reauthPassword}
                onChange={(e) => setReauthPassword(e.target.value)}
                className="w-full p-2 sm:p-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm sm:text-base mb-4"
              />
              <div className="flex gap-2 sm:gap-3">
                <button
                  onClick={handleReauthenticate}
                  className="flex-1 py-2 sm:py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg text-sm sm:text-base hover:from-indigo-600 hover:to-purple-700 transition-all"
                >
                  Verify
                </button>
                <button
                  onClick={() => {
                    setShowReauthModal(false);
                    setReauthPassword('');
                    setPendingAction(null);
                  }}
                  className="flex-1 py-2 sm:py-3 bg-red-500/20 text-red-400 rounded-lg text-sm sm:text-base hover:bg-red-500/30 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;