import React, { useState, useEffect } from 'react';
import {
  Container,
  SelectStyled,
  Label,
  SelectedItem,
  SelectedItems,
} from './Selection.styled';

interface SelectionProps {
  content: string[];
  placeholder: string;
  labelName: string;
  onChange: (selectedItems: string[]) => void;
  userData: string[];
}

const Selection: React.FC<SelectionProps> = ({
  content,
  placeholder,
  labelName,
  onChange,
  userData,
}) => {
  const [selectedSports, setSelectedSports] = useState<string[]>([]);

  useEffect(() => {
    if (Array.isArray(userData)) {
      const parsedData = userData
        .map(item => {
          try {
            const parsedItem = JSON.parse(item);
            return Array.isArray(parsedItem) ? parsedItem : [parsedItem];
          } catch (error) {
            console.error('Помилка парсингу елемента:', error);
            return [];
          }
        })
        .flat()
        .map(item => {
          if (typeof item === 'string') {
            try {
              return JSON.parse(item);
            } catch (error) {
              return item;
            }
          }
          return item;
        })
        .flat();
      setSelectedSports(parsedData);
    }
  }, [userData]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;
    if (!selectedSports.includes(selectedOption) && selectedOption) {
      const newSelection = [...selectedSports, selectedOption];
      setSelectedSports(newSelection);
      onChange(newSelection);
    }
  };

  const handleRemove = (sport: string) => {
    const updatedSelection = selectedSports.filter(item => item !== sport);
    setSelectedSports(updatedSelection);
    onChange(updatedSelection);
  };

  return (
    <Container>
      <Label htmlFor="sports-select">{labelName}</Label>
      {selectedSports.length > 0 && (
        <SelectedItems>
          {selectedSports.map(sport => (
            <SelectedItem key={sport} onClick={() => handleRemove(sport)}>
              {sport}
            </SelectedItem>
          ))}
        </SelectedItems>
      )}
      <SelectStyled
        id="sports-select"
        value=""
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
    </Container>
  );
};

export default Selection;
