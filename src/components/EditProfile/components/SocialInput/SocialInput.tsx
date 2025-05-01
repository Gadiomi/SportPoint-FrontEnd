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
import React, { useState, useEffect } from 'react';

interface SocialInputProps {
  content: string[];
  placeholder: string;
  labelName: string;
  onChange: (selectedItems: { name: string; url: string }[]) => void;
  userData: { name: string; url: string }[];
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

  return (
    <Container>
      <Label id="socialSelect-label">{labelName}</Label>
      <SelectedItems>
        {selectedSocials.map(({ name }) => (
          <SelectedItem key={name}>
            {name}
            <Icon
              size={24}
              styles={{ position: 'absolute', right: '12px', top: '14%' }}
              name={IconName.LINK_ANGLED}
            />
          </SelectedItem>
        ))}
      </SelectedItems>
      <div>
        <SelectStyled
          id="socialSelect"
          value={currentSocial}
          onChange={handleSelectChange}
          aria-labelledby="socialSelect-label"
          title="Виберіть соціальну мережу"
          name="social"
        >
          <option value="">{placeholder}</option>
          {content.map(conte => (
            <option key={conte} value={conte}>
              {conte}
            </option>
          ))}
        </SelectStyled>
      </div>
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
