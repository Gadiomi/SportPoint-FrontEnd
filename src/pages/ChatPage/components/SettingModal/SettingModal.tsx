import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';
import { BackdropSetting, ModalContainerSetting, StyledButton } from './styles';
import { Icon, IconName } from '@/kit';
import { useNavigate } from 'react-router-dom';

interface PropsFiltersModal {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}
export const SettingModal: React.FC<PropsFiltersModal> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const theme = useTheme();

  const navigate = useNavigate();
  const { t } = useTranslation();
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);
  if (!isModalOpen) return null;

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <BackdropSetting onClick={handleClose}>
      <ModalContainerSetting onClick={e => e.stopPropagation()}>
        <StyledButton
          onClick={() => {
            navigate('/login');
          }}
          testId="icon-button"
          title={t('chat_page.archive')}
          prependChild={<Icon name={IconName.MESSAGE} />}
        />
        <StyledButton
          onClick={() => {
            navigate('/login');
          }}
          title={t('chat_page.blocked')}
          testId="icon-button"
          prependChild={<Icon name={IconName.BLOCKUSER} />}
        />
      </ModalContainerSetting>
    </BackdropSetting>
  );
};
