// frontend/src/LoginFile/CreatePlan.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../hooks/UseAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CreatePlan = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const planData = {
        title: data.title,
        subject: data.subject,
        priority: data.priority || 'Medium',
        totalHours: Number(data.totalHours),
        targetDate: data.targetDate,
        userEmail: user.email,
        progress: 0
      };

      const response = await axiosSecure.post('/api/plans', planData);
      
      if (response.data.insertedId) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Plan created successfully',
          timer: 1500,
          showConfirmButton: false
        });
        navigate('/plans');
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: error.response?.data?.message || 'Failed to create plan'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 pt-20 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Create New Study Plan</h1>
          <p className="text-gray-400">Plan your learning journey</p>
        </div>

        {/* Form */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            {/* Title */}
            <div>
              <label className="text-gray-300 text-sm mb-1 block">Plan Title *</label>
              <input
                type="text"
                {...register("title", { required: "Title is required" })}
                className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                placeholder="e.g., React Mastery"
              />
              {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>}
            </div>

            {/* Subject */}
            <div>
              <label className="text-gray-300 text-sm mb-1 block">Subject *</label>
              <input
                type="text"
                {...register("subject", { required: "Subject is required" })}
                className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                placeholder="e.g., Web Development"
              />
              {errors.subject && <p className="text-red-400 text-sm mt-1">{errors.subject.message}</p>}
            </div>

            {/* Priority */}
            <div>
              <label className="text-gray-300 text-sm mb-2 block">Priority *</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input 
                    type="radio" 
                    {...register("priority", { required: "Priority is required" })} 
                    value="High" 
                    className="accent-red-500"
                  />
                  <span className="text-red-400">🔴 High</span>
                </label>
                <label className="flex items-center gap-2">
                  <input 
                    type="radio" 
                    {...register("priority", { required: "Priority is required" })} 
                    value="Medium" 
                    className="accent-yellow-500"
                  />
                  <span className="text-yellow-400">🟡 Medium</span>
                </label>
                <label className="flex items-center gap-2">
                  <input 
                    type="radio" 
                    {...register("priority", { required: "Priority is required" })} 
                    value="Low" 
                    className="accent-green-500"
                  />
                  <span className="text-green-400">🟢 Low</span>
                </label>
              </div>
              {errors.priority && <p className="text-red-400 text-sm mt-1">{errors.priority.message}</p>}
            </div>

            {/* Total Hours */}
            <div>
              <label className="text-gray-300 text-sm mb-1 block">Total Hours *</label>
              <input
                type="number"
                {...register("totalHours", { 
                  required: "Total hours is required", 
                  min: { value: 1, message: "Minimum 1 hour" }
                })}
                className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                placeholder="e.g., 50"
              />
              {errors.totalHours && <p className="text-red-400 text-sm mt-1">{errors.totalHours.message}</p>}
            </div>

            {/* Target Date */}
            <div>
              <label className="text-gray-300 text-sm mb-1 block">Target Date *</label>
              <input
                type="date"
                {...register("targetDate", { required: "Target date is required" })}
                className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-indigo-500"
              />
              {errors.targetDate && <p className="text-red-400 text-sm mt-1">{errors.targetDate.message}</p>}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-medium hover:from-indigo-600 hover:to-purple-700 transition-all"
              >
                Create Plan
              </button>
              <button
                type="button"
                onClick={() => navigate('/plans')}
                className="px-6 py-3 bg-white/5 border border-white/10 text-gray-300 rounded-lg font-medium hover:bg-white/10 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePlan;