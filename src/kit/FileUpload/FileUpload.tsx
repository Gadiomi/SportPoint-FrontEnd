import React, { useRef, useState } from 'react';
import { XCircle } from 'lucide-react'; // Іконка для видалення файлу

// Опис типів пропсів для компонента
interface FileUploadProps {
  onFileSelect: (file: File | null) => void; // Функція, яка отримує вибраний файл
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Стан для збереження вибраного файлу
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file); // Зберігаємо вибраний файл у стані
      onFileSelect(file); // Передаємо файл у зовнішній обробник

      // Створюємо URL для попереднього перегляду зображення
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    onFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Очищення значення input
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="relative">
        {!selectedFile ? (
          <button
            onClick={handleClick}
            className="w-20 h-20 border-2 border-orange-500 rounded-full flex items-center justify-center text-orange-500 hover:bg-orange-500 hover:text-white transition"
          >
            +
          </button>
        ) : (
          <div className="relative w-32 h-32 border border-gray-700 rounded-lg overflow-hidden">
            <img
              src={previewUrl!}
              alt="Selected file"
              className="w-full h-full object-cover"
            />
            <button
              onClick={handleRemoveFile}
              className="absolute top-1 right-1 bg-gray-800 text-white rounded-full p-1 hover:bg-red-600"
            >
              <XCircle size={20} />
            </button>
          </div>
        )}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
          multiple={false}
        />
      </div>
    </div>
  );
};

export default FileUpload;
