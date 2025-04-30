import React, { useState, useEffect } from 'react';
import {
  Container,
  Label,
  DropdownItem,
  DropdownToggle,
  DropdownContent,
  DropdownLabel,
} from './Selection.styled';
import { Icon, IconName } from '@/kit';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { ButtonsHiddenText } from '../Schedule/components/CustomHeader/CustomHeader.styled';

interface SelectionProps {
  content: string[];
  labelName: string;
  onChange: (selectedItems: string[]) => void;
  userData: string[];
}

const Selection: React.FC<SelectionProps> = ({
  content = [],
  labelName,
  onChange,
  userData,
}) => {
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (Array.isArray(userData)) {
      setSelectedSports(
        userData.filter(item => typeof item === 'string') as string[],
      );
    }
  }, [userData]);

  const handleCheckboxChange = (conte: string) => {
    if (selectedSports.includes(conte)) {
      const updatedSports = selectedSports.filter(sport => sport !== conte);
      setSelectedSports(updatedSports);
      onChange(updatedSports);
    } else {
      const updatedSports = [...selectedSports, conte];
      setSelectedSports(updatedSports);
      onChange(updatedSports);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  return (
    <Container>
      <Label>{labelName}</Label>
      <DropdownToggle isOpen={isDropdownOpen} onClick={toggleDropdown}>
        <span>
          {selectedSports.length > 0
            ? `${selectedSports.join(' | ')}`
            : 'Оберіть елементи'}
          {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </DropdownToggle>

      {isDropdownOpen && (
        <DropdownContent>
          {Array.isArray(content) &&
            content.map((conte, index) => (
              <DropdownItem key={index}>
                <DropdownLabel>
                  <Icon
                    width="16px"
                    height="16px"
                    styles={{
                      color: selectedSports.includes(conte)
                        ? 'rgba(237, 119, 47, 1)'
                        : 'currentColor',
                    }}
                    name={
                      selectedSports.includes(conte)
                        ? IconName.CHECK_FILL
                        : IconName.CHECK_SQUARE_CONTAINED
                    }
                  />
                  <label>
                    <ButtonsHiddenText>selected</ButtonsHiddenText>
                    <input
                      type="checkbox"
                      value={conte}
                      checked={selectedSports.includes(conte)}
                      onChange={() => handleCheckboxChange(conte)}
                    />
                  </label>
                  <span> {conte}</span>
                </DropdownLabel>
              </DropdownItem>
            ))}
        </DropdownContent>
      )}
    </Container>
  );
};

export default Selection;
