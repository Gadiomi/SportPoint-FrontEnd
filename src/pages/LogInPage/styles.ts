import styled from 'styled-components';

interface IButtonProps {
  width?: string;
  height?: string;
  fontSize?: string;
}

export const PageTitle = styled.h1`
  color: rgba(40, 41, 42, 0.65);
  margin-bottom: 24px;
`;

export const LogInForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 16px;

  & label {
    display: flex;
    flex-direction: column;
  }
`;

export const SubmitButton = styled.button<IButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => (props.width ? props.width : '210px')};
  height: ${props => (props.height ? props.height : '50px')};
  font-size: ${props => (props.fontSize ? props.fontSize : '20px')};
  font-weight: 600;
  color: #35aad7;
  background: rgba(237, 241, 242, 0.4);
  border: 1px solid #35aad7;
  border-radius: 32px;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 140px;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
  }

  &:hover {
    color: #ffffff;
    border: 1px solid #35aad7;
    background-color: #35aad7;
  }

  &:disabled {
    color: #dd7755;
    border: 1px solid #ccc;
    background-color: #f0f0f0;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.span`
  height: 16px;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  color: rgba(220, 12, 49, 1);
`;

export const PasswordBlock = styled.div`
  position: relative;
  & div {
    position: absolute;
    top: 11px;
    right: 6px;
    cursor: pointer;
  }
`;
