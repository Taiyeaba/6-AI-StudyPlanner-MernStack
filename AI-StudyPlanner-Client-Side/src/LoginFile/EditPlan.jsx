// frontend/src/LoginFile/EditPlan.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const EditPlan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlanDetails();
  }, [id]);

  const fetchPlanDetails = async () => {
    try {
      const { data } = await axiosSecure.get(`/api/plans/${id}`);
      // ফর্মে existing data set করো
      setValue('title', data.title);
      setValue('subject', data.subject);
      setValue('priority', data.priority);
      setValue('totalHours', data.totalHours);
      setValue('targetDate', data.targetDate.split('T')[0]);
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Error!', 'Failed to load plan', 'error');
      navigate('/plans');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      const updatedData = {
        ...data,
        totalHours: Number(data.totalHours)
      };

      await axiosSecure.put(`/api/plans/${id}`, updatedData);
      
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Plan updated successfully',
        timer: 1500,
        showConfirmButton: false
      });
      
      navigate(`/plan/${id}`);
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Error!', 'Failed to update plan', 'error');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 pt-20 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 pt-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Edit Study Plan</h1>
          <p className="text-gray-400">Update your plan details</p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Title */}
            <div>
              <label className="text-gray-300 text-sm mb-1 block">Plan Title *</label>
              <input
                type="text"
                {...register("title", { required: "Title is required" })}
                className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white"
              />
              {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>}
            </div>

            {/* Subject */}
            <div>
              <label className="text-gray-300 text-sm mb-1 block">Subject *</label>
              <input
                type="text"
                {...register("subject", { required: "Subject is required" })}
                className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white"
              />
              {errors.subject && <p className="text-red-400 text-sm mt-1">{errors.subject.message}</p>}
            </div>

            {/* Priority */}
            <div>
              <label className="text-gray-300 text-sm mb-2 block">Priority *</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input type="radio" {...register("priority", { required: true })} value="High" />
                  <span className="text-red-400">🔴 High</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" {...register("priority", { required: true })} value="Medium" />
                  <span className="text-yellow-400">🟡 Medium</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" {...register("priority", { required: true })} value="Low" />
                  <span className="text-green-400">🟢 Low</span>
                </label>
              </div>
            </div>

            {/* Total Hours */}
            <div>
              <label className="text-gray-300 text-sm mb-1 block">Total Hours *</label>
              <input
                type="number"
                {...register("totalHours", { required: true, min: 1 })}
                className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white"
              />
            </div>

            {/* Target Date */}
            <div>
              <label className="text-gray-300 text-sm mb-1 block">Target Date *</label>
              <input
                type="date"
                {...register("targetDate", { required: true })}
                className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-medium hover:from-indigo-600 hover:to-purple-700 transition-all"
              >
                Update Plan
              </button>
              <button
                type="button"
                onClick={() => navigate(`/plan/${id}`)}
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

export default EditPlan;