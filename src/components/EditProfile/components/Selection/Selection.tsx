import React, { useState, useEffect } from 'react';
import {
  Container,
  SelectStyled,
  Label,
  SelectedItem,
  SelectedItems,
} from './Selection.styled';

interface SelectionProps {
  content:
    | { id: string; firstName: string; lastName: string; userId: string }[]
    | string[];
  placeholder: string;
  labelName: string;
  onChange: (selectedItems: string[] | { id: string }[]) => void;
  userData: string[];
}

const Selection: React.FC<SelectionProps> = ({
  content = [],
  placeholder,
  labelName,
  onChange,
  userData,
}) => {
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [selectedWorks, setSelectedWorks] = useState<
    {
      userId: string;
      firstName: string;
      lastName: string;
      description?: {
        address?: string;
      };
    }[]
  >([]);

  useEffect(() => {
    if (Array.isArray(userData)) {
      const parsedData = userData
        .filter(item => item !== null)
        .map(item => {
          if (typeof item === 'string') {
            return item;
          }
          if (typeof item === 'object') {
            return item;
          }
          return null;
        })
        .filter(item => item !== null);

      setSelectedSports(
        parsedData.filter(item => typeof item === 'string') as string[],
      );
      setSelectedWorks(
        parsedData.filter(item => typeof item === 'object') as any[],
      );
    }
  }, [userData, setSelectedSports, setSelectedWorks]);

  const handleRemove = (userId: string) => {
    setSelectedWorks(prev => {
      const updatedWorks = prev.filter(item => item.userId !== userId);
      return updatedWorks;
    });
    setSelectedSports(prev => {
      const updatedSports = prev.filter(item => item !== userId);
      return updatedSports;
    });
    onChange([...selectedSports, ...selectedWorks.map(item => item.userId)]);
  };

  return (
    <Container>
      <Label id="sports-select-label" htmlFor="sports-select">
        {labelName}
      </Label>
      <SelectedItems>
        {selectedSports.length > 0 &&
          selectedSports.map((sport, index) => (
            <SelectedItem key={index} onClick={() => handleRemove(sport)}>
              {sport}
            </SelectedItem>
          ))}
        {selectedWorks.length > 0 &&
          selectedWorks.map(work => (
            <SelectedItem
              key={work.userId}
              onClick={() => handleRemove(work.userId)}
            >
              {work.firstName} {work.lastName}
              <span>
                {work.description?.address && `(${work.description?.address})`}
              </span>
            </SelectedItem>
          ))}
      </SelectedItems>
      <SelectStyled
        id="sports-select"
        value=""
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
          const selectedOption = event.target.value;
          if (!selectedSports.includes(selectedOption) && selectedOption) {
            setSelectedSports([...selectedSports, selectedOption]);
            onChange([...selectedSports, selectedOption]);
          }
        }}
        aria-labelledby="sports-select-label"
        title={labelName}
      >
        <option value="">{placeholder}</option>
        {Array.isArray(content) &&
          content.map((conte, index) => {
            if (typeof conte === 'string') {
              return (
                <option key={index} value={conte}>
                  {conte}
                </option>
              );
            } else {
              return (
                <option key={conte.id} value={conte.id}>
                  {conte.firstName} {conte.lastName}
                </option>
              );
            }
          })}
      </SelectStyled>
    </Container>
  );
};

export default Selection;
