"use client";
import { editProfile, profile } from "@/actions/actions";
import { BASE_URL } from "@/db/config/constant";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { HiX, HiPencil } from "react-icons/hi";
import { useAppContext } from "@/context";

const EditProfile = ({ getProfile }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const context = useAppContext();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  async function submitAction(formData) {
    setIsLoading(true);
    try {
      const fullname = formData.get("fullname");
      const bio = formData.get("bio");
      await editProfile({ fullname, bio });
      await getProfile();
      closeModal();
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  return (
    <>
      {/* Edit Profile Button */}
      <div className="w-full max-w-7xl flex justify-center">
        <button
          onClick={toggleModal}
          className="bg-primary hover:bg-blue-700 transition-colors duration-200 h-12 sm:h-14 w-full max-w-xs sm:max-w-sm rounded-lg text-white text-lg sm:text-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
          type="button"
        >
          <HiPencil size={20} />
          <span className="hidden sm:inline">Edit Profile</span>
          <span className="sm:hidden">Edit</span>
        </button>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={closeModal}
        >
          {/* Modal Container */}
          <div
            className={`relative w-full max-w-md sm:max-w-lg bg-white rounded-xl shadow-2xl transform transition-all duration-300 max-h-[90vh] overflow-hidden ${
              isModalOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <HiPencil className="text-blue-600" size={20} />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                    Edit Profile
                  </h3>
                  <p className="text-sm text-gray-600">
                    Update your basic information
                  </p>
                </div>
              </div>
              
              <button
                type="button"
                className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors"
                onClick={closeModal}
              >
                <HiX size={20} />
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
              <form action={submitAction} className="space-y-6">
                {/* Fullname Field */}
                <div>
                  <label
                    htmlFor="fullname"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullname"
                    id="fullname"
                    defaultValue={context?.state?.fullname || ""}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 placeholder-gray-500"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                {/* Bio Field */}
                <div>
                  <label
                    htmlFor="bio"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    defaultValue={context?.state?.bio || ""}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 placeholder-gray-500 resize-none"
                    placeholder="Tell us about yourself..."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    A brief description about yourself (optional)
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="w-full sm:w-auto px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 focus:ring-2 focus:ring-gray-200 transition-colors order-2 sm:order-1"
                  >
                    Cancel
                  </button>
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors flex items-center justify-center gap-2 order-1 sm:order-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <HiPencil size={16} />
                        <span>Save Changes</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;