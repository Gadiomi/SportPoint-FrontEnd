import React, { useState, useEffect } from 'react';
import {
  Container,
  Label,
  SelectedItem,
  SelectedItems,
  SelectStyled,
} from '../Selection/Selection.styled';
import { IconName, Icon, Button, ButtonAppearance } from '@/kit';
import { AddUrlContainer } from './SocialInput.styled';
import { Input } from '@/kit';

interface SocialInputProps {
  content: string[];
  placeholder: string;
  labelName: string;
  onChange: (selectedItems: { name: string; url: string }[]) => void;
  userData: { name: string; url: string }[]; // Expected format for userData
}

const SocialInput: React.FC<SocialInputProps> = ({
  content,
  placeholder,
  labelName,
  onChange,
  userData,
}) => {
  const [selectedSocials, setSelectedSocials] = useState<
    { name: string; url: string }[]
  >([]);
  const [currentSocial, setCurrentSocial] = useState('');
  const [currentUrl, setCurrentUrl] = useState('');

  // Populate the selectedSocials state with userData on component mount
  useEffect(() => {
    setSelectedSocials(userData);
  }, [userData]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentSocial(event.target.value);
  };

  const handleAddSocial = () => {
    if (currentSocial && currentUrl) {
      const newSelection = [
        ...selectedSocials,
        { name: currentSocial, url: currentUrl },
      ];
      setSelectedSocials(newSelection);
      onChange(newSelection);
      setCurrentSocial('');
      setCurrentUrl('');
    }
  };

  const handleRemove = (name: string) => {
    const updatedSelection = selectedSocials.filter(item => item.name !== name);
    setSelectedSocials(updatedSelection);
    onChange(updatedSelection);
  };

  return (
    <Container>
      <Label>{labelName}</Label>
      <SelectedItems>
        {selectedSocials.map(({ name, url }) => (
          <SelectedItem key={name}>
            {name}
            <button type="button" onClick={() => handleRemove(name)}>
              <a href={url} target="_blank" rel="noopener noreferrer">
                <Icon size={24} name={IconName.LINK_ANGLED} />
              </a>
            </button>
          </SelectedItem>
        ))}
      </SelectedItems>
      <SelectStyled
        value={currentSocial}
        onChange={handleSelectChange}
        aria-label={labelName}
      >
        <option value="">{placeholder}</option>
        {content.map(conte => (
          <option key={conte} value={conte}>
            {conte}
          </option>
        ))}
      </SelectStyled>
      {currentSocial && (
        <AddUrlContainer>
          <Input
            testId="social"
            type="url"
            placeholder="Введіть посилання"
            value={currentUrl}
            onChange={e => setCurrentUrl(e.target.value)}
          />
          <Button
            testId="addUrlButton"
            type="button"
            onClick={handleAddSocial}
            disabled={!currentSocial || !currentUrl}
            title={'Додати'}
            appearance={ButtonAppearance.PRIMARY}
          />
        </AddUrlContainer>
      )}
    </Container>
  );
};

export default SocialInput;
