import React, { ChangeEvent } from 'react';
import { FaRegClock } from 'react-icons/fa';
import {
  IconWrapper,
  InputWrapper,
  Label,
  StyledInput,
  TimeIcon,
  Wrapper,
} from './TimeInput.styled';

interface TimeInputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  testId?: string;
}

const TimeInput: React.FC<TimeInputProps> = ({
  value,
  onChange,
  label,
  testId,
}) => {
  return (
    <Wrapper>
      <Label htmlFor={testId}>{label}</Label>
      <InputWrapper>
        <StyledInput
          id={testId}
          data-testid={testId}
          value={value}
          onChange={onChange}
          type="time"
        />
        <IconWrapper
          onClick={() => {
            const input = document.getElementById(
              testId ?? '',
            ) as HTMLInputElement & {
              showPicker?: () => void;
            };
            input?.showPicker?.();
          }}
        >
          <TimeIcon />
        </IconWrapper>
      </InputWrapper>
    </Wrapper>
  );
};

export default TimeInput;
