import React, { useRef, useState } from 'react';

// Опис типів пропсів для компонента
interface FileUploadProps {
  onFileSelect: (file: File | null) => void; // Функція, яка отримує вибраний файл
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Стан для збереження вибраного файлу
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file); // Зберігаємо вибраний файл у стані
      onFileSelect(file); // Передаємо файл у зовнішній обробник
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

      {/* Відображення обраного файлу */}
      {selectedFile && (
        <p className="text-white mt-4">Обраний файл: {selectedFile.name}</p>
      )}
    </div>
  );
};

export default FileUpload;
