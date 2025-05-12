import styled from 'styled-components';

// export const PageTitle = styled.h1`
//   color: rgba(40, 41, 42, 0.65);
//   margin-bottom: 24px;
// `;

// export const LogInForm = styled.form`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
//   gap: 16px;

//   & label {
//     display: flex;
//     flex-direction: column;
//   }
// `;

// export const ErrorMessage = styled.span`
//   height: 16px;
//   font-size: 12px;
//   font-weight: 400;
//   line-height: 16px;
//   color: rgba(220, 12, 49, 1);
// `;

export const PasswordBlock = styled.div`
  position: relative;
  & div {
    position: absolute;
    top: 11px;
    right: 6px;
    cursor: pointer;
  }
`;

export const WrongDataMessage = styled.div`
  color: #f00;
  text-align: center;
`;
