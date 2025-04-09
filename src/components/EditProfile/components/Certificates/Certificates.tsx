import { Button, ButtonAppearance, Icon, IconName } from '@/kit';
import { HiddenInput } from '../EditGeneral/EditGeneral.styled';
import React, { useEffect, useState } from 'react';
import {
  CertificatesIcon,
  CertificatesItem,
  CertificatesItemText,
  Container,
} from './Certificates.styled';
import { SelectedItems } from '../Selection/Selection.styled';

const Certificates = ({
  handleCertificatesChange,
  certificates,
}: {
  handleCertificatesChange: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  certificates: string[];
}) => {
  const [selectedCertificates, setSelectedCertificates] = useState<File[]>([]);

  useEffect(() => {
    if (certificates.length) {
      setSelectedCertificates(certificates.map(name => new File([], name)));
    }
  }, [certificates]);

  const handleClick = () => {
    document.getElementById('certificatesInput')?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    setSelectedCertificates(prev => [...prev, ...Array.from(files)]);
    handleCertificatesChange(event);
  };

  const handleRemove = (fileName: string) => {
    setSelectedCertificates(prev =>
      prev.filter(file => file.name !== fileName),
    );
  };

  return (
    <Container>
      {selectedCertificates.length > 0 && (
        <SelectedItems>
          {selectedCertificates.map(file => (
            <CertificatesItem
              key={file.name}
              onClick={() => handleRemove(file.name)}
            >
              <CertificatesItemText> {file.name}</CertificatesItemText>

              <CertificatesIcon>
                <Icon size={24} name={IconName.LINK_ANGLED} />
              </CertificatesIcon>
            </CertificatesItem>
          ))}
        </SelectedItems>
      )}

      <Button
        testId="addCertificates"
        onClick={handleClick}
        type="button"
        title="Додати сертифікати"
        customStyles={{ padding: '8px 18px' }}
        appearance={ButtonAppearance.PRIMARY}
        prependChild={
          <Icon
            styles={{
              color: 'currentColor',
              fill: 'transparent',
              marginRight: '8px',
            }}
            width="24px"
            name={IconName.PAPERCLIP}
          />
        }
      />

      <HiddenInput
        type="file"
        multiple
        id="certificatesInput"
        onChange={handleFileChange}
        accept="image/*"
      />
    </Container>
  );
};

export default Certificates;
