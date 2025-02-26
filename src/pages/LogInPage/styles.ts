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
