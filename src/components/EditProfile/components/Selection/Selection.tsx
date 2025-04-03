import React, { useState } from 'react';
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
}

const Selection: React.FC<SelectionProps> = ({
  content,
  placeholder,
  labelName,
  onChange,
}) => {
  const [selectedSports, setSelectedSports] = useState<string[]>([]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;
    if (!selectedSports.includes(selectedOption) && selectedOption) {
      const newSelection = [...selectedSports, selectedOption];
      setSelectedSports(newSelection);
      onChange(newSelection);
    }
  };
  const handleRemove = (sport: string) => {
    setSelectedSports(prev => prev.filter(item => item !== sport));
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
