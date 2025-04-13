import React, { useState, useEffect } from 'react';
import {
  Container,
  Label,
  DropdownContainer,
  DropdownItem,
  DropdownToggle,
  DropdownContent,
  DropdownLabel,
  DropdownInput,
} from './Selection.styled';
import { Input } from '@/kit';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

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
                  <input
                    type="checkbox"
                    value={conte}
                    checked={selectedSports.includes(conte)}
                    onChange={() => handleCheckboxChange(conte)}
                  />
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
