import { FaRegClock } from 'react-icons/fa';
import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
`;

export const Label = styled.label`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 9px;
  display: block;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.375;
  color: #b7b7b9;
  margin-bottom: 0.25rem;
`;

export const InputWrapper = styled.div`
  position: relative;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 12px 8px;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background-color: transparent;
  color: white;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;

  &::-webkit-calendar-picker-indicator {
    display: none;
  }

  &::-webkit-inner-spin-button {
    display: none;
  }

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 1px #3b82f6;
  }
`;

export const IconWrapper = styled.div`
  position: absolute;
  right: 8.5px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: white;
  font-size: 1.5rem;
  pointer-events: auto;
  cursor: pointer;
  width: 24px;
  display: flex;
  align-items: center;
`;

export const TimeIcon = styled(FaRegClock)`
  fill: rgba(183, 183, 185, 1);
`;
