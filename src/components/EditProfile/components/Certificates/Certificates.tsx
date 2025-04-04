import { Button, ButtonAppearance } from '@/kit';
import { HiddenInput } from '../EditGeneral/EditProfile.styled';
import React, { useEffect, useState } from 'react';

const Certificates = ({
  handleCertificatesChange,
  certificates,
}: {
  handleCertificatesChange: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  certificates: string[]; // Масив URL або назв сертифікатів
}) => {
  const [selectedCertificates, setSelectedCertificates] = useState<File[]>([]);

  // Оновлюємо сертифікати при зміні `certificates`
  useEffect(() => {
    if (certificates.length) {
      setSelectedCertificates(certificates.map(name => new File([], name)));
    }
  }, [certificates]);

  const handleClick = () => {
    document.getElementById('certificatesInput')?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedCertificates(prev => [
        ...prev,
        ...Array.from(event.target.files),
      ]);
    }
    handleCertificatesChange(event);
  };

  const handleRemove = (fileName: string) => {
    setSelectedCertificates(prev =>
      prev.filter(file => file.name !== fileName),
    );
  };

  return (
    <div>
      {selectedCertificates.length > 0 && (
        <div>
          {selectedCertificates.map(file => (
            <div key={file.name} onClick={() => handleRemove(file.name)}>
              {file.name}
            </div>
          ))}
        </div>
      )}

      <Button
        testId="addCertificates"
        onClick={handleClick}
        type="button"
        title="Додати сертифікати"
        appearance={ButtonAppearance.SECONDARY}
      />

      <HiddenInput
        type="file"
        multiple
        id="certificatesInput"
        onChange={handleFileChange}
        accept="image/*"
      />
    </div>
  );
};

export default Certificates;
