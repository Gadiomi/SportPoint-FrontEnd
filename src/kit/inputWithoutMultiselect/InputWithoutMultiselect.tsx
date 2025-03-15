import React, { useRef } from 'react';

export const FileUpload: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      console.log('Selected file:', event.target.files[0]);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="relative">
        <button
          onClick={handleClick}
          className="w-20 h-20 border-2 border-orange-500 rounded-full flex items-center justify-center text-orange-500 hover:bg-orange-500 hover:text-white transition"
        >
          +
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          multiple={false}
        />
      </div>
    </div>
  );
};

export default FileUpload;
