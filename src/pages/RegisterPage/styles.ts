import styled from 'styled-components';

export const Image = styled.img`
  margin: auto;
  margin-bottom: ${({ theme }) => theme.pxs.x5}px;
  margin-top: ${({ theme }) => theme.pxs.x2}px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.pxs.x2}px;
  margin-bottom: ${({ theme }) => theme.pxs.x3}px;
`;

export const Title = styled.h2(({ theme }) => ({
  ...theme.fonts.secondTitle,
  color: theme.color.mainWhite,
}));

export const Subtitle = styled.p(({ theme }) => ({
  ...theme.fonts.lightManrope,
  color: theme.color.secWhite,
}));

export const TabsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: ${({ theme }) => theme.pxs.x1_5}px;
  margin-bottom: ${({ theme }) => theme.pxs.x4}px;
`;

export const Form = styled.form`
  margin-bottom: ${({ theme }) => theme.pxs.x8}px;
  width: 100%;
`;

export const CallToActionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Line = styled.div<{ margin?: string }>`
  width: 100%;
  height: 1px;
  margin-bottom: ${({ theme }) => theme.pxs.x8}px;
  background-color: ${({ theme }) => theme.color.secWhite};
  margin: ${({ margin }) => margin};
`;

// export const PlaceWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 100%;
//   height: auto;
//   margin-bottom: ${({ theme }) => theme.pxs.x4}px;
//   padding: 6px 12px;
//   font-size: 14px;
//   font-weight: 400;
//   line-height: 18px;
//   color: ${({ theme }) => theme.color.secWhite};
//   border: 1px solid ${({ theme }) => theme.color.secWhite};
//   border-radius: 6px;

//   & > div:first-of-type {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//   }
// `;

// export const AddressWrapper = styled.div`
//   padding-top: 10px;
//   & > div {
//     margin-bottom: ${({ theme }) => theme.pxs.x2_5}px;
//   }
// `;

export const AbilitiesWrapper = styled.div`
  padding-top: 10px;
  & > div {
    margin-bottom: ${({ theme }) => theme.pxs.x2_5}px;
  }
`;

export const SportsListWrapper = styled.ul`
  padding-top: 10px;
  background-color: #f8f7f4;
  border-radius: 5px;
  transition: 'all 0.3s ease';
  & label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 24px;
    padding-bottom: 1px;
    margin: 0 6px 16px;
    font-size: 14px;
    font-weight: 400;
    line-height: 19px;
    color: #1c1b20;
    border-bottom: 1px solid rgba(28, 27, 32, 0.28);
    cursor: pointer;
  }

  & input {
    width: 0;
    height: 0;

    &:checked + label {
      color: rgba(237, 119, 47, 1);
    }
  }
`;

export const SimpleInput = styled.input`
  padding: 6px 22px;
  line-height: 20px;
  color: ${({ theme }) => theme.color.secWhite};
  border: 1px solid ${({ theme }) => theme.color.secWhite};
  border-radius: 6px;
  background-color: transparent;
  &:focus {
    color: ${({ theme }) => theme.color.writing};
    border-color: ${({ theme }) => theme.color.writing};
  }
`;
