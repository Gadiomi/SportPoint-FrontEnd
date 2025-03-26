import React from 'react';
import { ButtonAppearance, Icon, IconName } from '@/kit';
import { StyledHrButton, StyledHr, StyledButton } from './styles';

const HrButton: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <StyledHrButton>
      <StyledHr />
      <StyledButton
        testId="details_page.edit_button"
        title=""
        appearance={ButtonAppearance.PRIMARY}
        onClick={scrollToTop}
        appendChild={
          <Icon
            styles={{
              color: 'currentColor',
              fill: 'transparent',
            }}
            name={IconName.ARROW_UP}
          />
        }
      ></StyledButton>
    </StyledHrButton>
  );
};

export default HrButton;
