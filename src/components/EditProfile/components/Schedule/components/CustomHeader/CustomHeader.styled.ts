import styled from 'styled-components';

export const NavContainer = styled.div`
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: 400;
  position: relative;
  text-align: left;

  span {
    text-align: left;
    padding-left: 22px;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  /* width: 296px; */
  justify-content: space-between;

  position: absolute;
  top: 15%;
`;
export const ButtonsHiddenText = styled.span`
  display: none;
`;
