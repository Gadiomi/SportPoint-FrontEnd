import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ChangeButton, HeaderBox, StyledButton, Title } from './styles';
import { Icon, IconName } from '@/kit';

interface HeaderTopProps {
  setIsChangeActive: React.Dispatch<React.SetStateAction<boolean>>;
  isChangeActive: boolean;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const HeaderTop: FC<HeaderTopProps> = ({
  setIsChangeActive,
  isChangeActive,
  isModalOpen,
  setIsModalOpen,
}) => {
  const { t } = useTranslation();
  const handleOpenModal = () => {
    setIsModalOpen(prev => !prev);
  };

  const handleChange = () => {
    setIsChangeActive(prev => !prev);
  };
  return (
    <HeaderBox>
      {isModalOpen ? (
        <ChangeButton></ChangeButton>
      ) : (
        <ChangeButton $changeActive={isChangeActive} onClick={handleChange}>
          {t('chat_page.change')}
        </ChangeButton>
      )}
      <Title>{t('chat_page.headerTitle')}</Title>

      <StyledButton
        onClick={handleOpenModal}
        testId="icon-button"
        $active={isModalOpen}
        prependChild={<Icon name={IconName.SLIDERS} />}
      />
    </HeaderBox>
  );
};
