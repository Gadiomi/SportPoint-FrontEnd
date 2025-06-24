import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Icon, IconName } from '@/kit';
import { useNavigate } from 'react-router-dom';
import { BackdropSetting } from '../../SettingModal/styles';
import { DetailsStyledButton, ModalContainerDetails } from './styles';
import { ComplaintModal } from '../Complaint/Complaint';

interface PropsFiltersModal {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}
export const DetailsModal: React.FC<PropsFiltersModal> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const [isComplaintOpen, setIsComplaintOpen] = useState(false);

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
    <>
      <BackdropSetting onClick={handleClose}>
        <ModalContainerDetails onClick={e => e.stopPropagation()}>
          <DetailsStyledButton
            onClick={() => {
              navigate('/login');
            }}
            testId="icon-button"
            title={t('chat_page.book')}
            prependChild={<Icon name={IconName.CALENDAR} />}
          />
          <DetailsStyledButton
            onClick={() => setIsComplaintOpen(true)}
            testId="icon-button"
            title={t('chat_page.complaint')}
            prependChild={<Icon name={IconName.ALERT_CIRCLE} />}
          />
          <DetailsStyledButton
            onClick={() => {
              navigate('/login');
            }}
            title={t('chat_page.block')}
            testId="icon-button"
            prependChild={<Icon name={IconName.BLOCKUSER} />}
          />
        </ModalContainerDetails>
      </BackdropSetting>
      {isComplaintOpen && (
        <ComplaintModal onClose={() => setIsComplaintOpen(false)} />
      )}
    </>
  );
};
