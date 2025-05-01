import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding-bottom: 74px;
  padding-top: 6px;
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media screen and (min-width: 375px) {
  }
`;

export const AvatarName = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

export const GeneralForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
`;

export const GeneralBtns = styled.div`
  display: flex;
  gap: 16px;
  padding-top: 53px;
  font-size: 14px;
  width: 100%;
`;

export const SelectedContainer = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SelectStyled = styled.select`
  width: 100%;
  padding: 6px 12px;
  border-radius: 6px;
  border: 0.5px solid #b7b7b9;
  background-color: transparent;
  cursor: pointer;
  font-weight: 400;
  font-size: 14px;
  color: #b7b7b9;
  height: 36px;

  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>');
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 24px;

  &::-ms-expand {
    display: none;
  }
`;

export const InputsSection = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'view',
})<{ view?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${({ view }) => (view ? '8px' : '16px')};

  width: 100%;
`;

export const SectionTitle = styled.h4`
  font-weight: 500;
  font-size: 16px;
`;

export const HiddenInput = styled.input`
  display: none;
`;
