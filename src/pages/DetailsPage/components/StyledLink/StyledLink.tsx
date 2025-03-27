import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from './styles';

const StyledLink: React.FC = () => {
  const { t } = useTranslation();
  return <Link href="#">{t('details_page.see_more')}</Link>;
};

export default StyledLink;
