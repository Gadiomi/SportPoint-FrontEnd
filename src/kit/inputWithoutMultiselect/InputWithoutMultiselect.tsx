import React, { useState } from 'react';

interface InputProps {
  label: string;
}

export const InputWithoutMultiselect: React.FC<InputProps> = ({ label }) => {
  // Локальний стан для зберігання значення введеного в input
  const [inputValue, setInputValue] = useState<string>('');

  // Обробник зміни значення input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <label>{label}</label>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Enter text"
      />
    </div>
  );
};

export default InputWithoutMultiselect;

// src/App.tsx
// import React from "react";
// import Input from "./components/Input";

// const App: React.FC = () => {
//   return (
//     <div>
//       <h1>Input Component Example without Redux</h1>
//       <Input label="Your Input" />
//     </div>
//   );
// };

// export default App;
