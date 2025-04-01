import React from 'react';
import { useTranslation } from 'react-i18next';
import { fonts } from '@/theme/fonts';
import { StyledButtonLink } from './styles';

// interface ButtonLinkProps {
//   onClick: () => void;
//   disabled: boolean;
// }

// const ButtonLink: React.FC<ButtonLinkProps> = () => {
//   onClick, disabled;
// };

const ButtonLink: React.FC = () => {
  const { t } = useTranslation();

  return (
    <StyledButtonLink
      style={fonts.priceAmount}
      // onClick={onClick}
      // disabled={disabled}
      title={t('details_page.see_more')}
    >
      {t('details_page.see_more')}
    </StyledButtonLink>
  );
};

export default ButtonLink;
