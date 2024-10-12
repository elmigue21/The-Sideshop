import React from 'react'

const LoadingSpinner = () => {
  return (
      <div className="flex justify-center items-center h-24">
          <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-gray-900 rounded-full animate-spin"></div>
      </div>
  );
}

export default LoadingSpinner
