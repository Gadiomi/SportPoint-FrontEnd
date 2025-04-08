import React from 'react';
import { StyledButtonLink } from './styles';

interface ButtonLinkProps {
  onClick?: () => void;
  disabled?: boolean;
  title?: string;
  buttonText?: string;
  style?: React.CSSProperties;
}

const ButtonLink: React.FC<ButtonLinkProps> = ({
  onClick,
  disabled,
  title,
  buttonText,
  style,
}) => {
  return (
    <StyledButtonLink
      style={style}
      onClick={onClick}
      disabled={disabled}
      title={title}
    >
      {buttonText}
    </StyledButtonLink>
  );
};

export default ButtonLink;
