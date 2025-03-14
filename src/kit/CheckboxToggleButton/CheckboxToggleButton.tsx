import React from 'react';
import styled from 'styled-components';

interface CheckboxToggleButtonProps {
  isChecked: boolean;
  onChange: (checked: boolean) => void;
}

export const CheckboxToggleButton: React.FC<CheckboxToggleButtonProps> = ({
  isChecked,
  onChange,
}) => {
  const handleToggle = () => {
    onChange(!isChecked);
  };

  return (
    <CheckboxToggleWrapper onClick={handleToggle} isChecked={isChecked}>
      <CheckboxToggleCircle isChecked={isChecked} />
    </CheckboxToggleWrapper>
  );
};

const CheckboxToggleWrapper = styled.div<{ isChecked: boolean }>`
  display: inline-block;
  width: ${({ theme }) => `${theme.pxs.x9}px`}
  height: ${({ theme }) => `${theme.pxs.x5}px`};
  border-radius: ${({ theme }) => `${theme.pxs.x4}px`};
  border: 2px solid ${({ theme }) => theme.color.mainOrange};
  background: transparent;
  position: relative;
  cursor: pointer;
`;

const CheckboxToggleCircle = styled.div<{ isChecked: boolean }>`
  width: ${({ theme }) => `${theme.pxs.x4}px`};
  height: ${({ theme }) => `${theme.pxs.x4}px`};
  border-radius: 50%;
  background: ${({ theme }) => theme.color.mainOrange};
  position: absolute;
  top: 0;
  left: ${props => (props.isChecked ? 'calc(100% - 16px)' : '0px')};
  transition: left 0.3s;
`;
