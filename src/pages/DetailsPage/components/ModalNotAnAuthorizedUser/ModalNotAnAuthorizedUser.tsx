import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Icon, IconName } from '@/kit';
import { Button, ButtonAppearance } from '@/kit';
import { fonts } from '@/theme/fonts';
import { useTheme } from 'styled-components';
import {
  Backdrop,
  ModalContainer,
  ModalHeader,
  ModalContent,
  ModalFooter,
} from './styles';

interface ModalNotAnAuthorizedUserProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const ModalNotAnAuthorizedUser: React.FC<ModalNotAnAuthorizedUserProps> = ({
  isOpen,
  onClose,
  title,
}: ModalNotAnAuthorizedUserProps) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { t } = useTranslation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClick = () => {
    navigate('/register');
  };

  return (
    <Backdrop onClick={onClose}>
      <ModalContainer onClick={e => e.stopPropagation()}>
        <ModalHeader style={{ ...fonts.modalTitle }}>{title}</ModalHeader>
        <ModalContent>Бажаєте авторизуватись?</ModalContent>
        <ModalFooter>
          <Button
            testId="details_page.no"
            title={t('details_page.no')}
            onClick={onClose}
            appearance={ButtonAppearance.UNDERLINED}
            style={{
              ...fonts.secondManrope,
              color: 'currentcolor',
              textDecoration: 'none',
              border: '0.5px solid rgba(237, 119, 47, 1)',
              padding: `${theme.pxs.x2}px ${theme.pxs.x10_5}px`,
            }}
          />
          <Button
            testId="details_page.yes"
            title={t('details_page.yes')}
            onClick={handleClick}
            appearance={ButtonAppearance.PRIMARY}
            style={{
              ...fonts.secondManrope,
              padding: `${theme.pxs.x2}px ${theme.pxs.x11_5}px`,
            }}
          />
        </ModalFooter>
        <Button
          testId="details_page.close_modal"
          title=""
          onClick={onClose}
          style={{
            position: 'absolute',
            top: `${theme.pxs.x4}px`,
            right: `${theme.pxs.x4}px`,
            border: 'none',
            padding: `${theme.pxs.x0}px`,
          }}
          appearance={ButtonAppearance.UNDERLINED}
          appendChild={
            <Icon
              styles={{
                ...fonts.secondManrope,
                color: theme.color.mainWhite,
                fill: 'transparent',
                width: `${theme.pxs.x6}px`,
                height: `${theme.pxs.x6}px`,
              }}
              name={IconName.X}
            />
          }
        ></Button>
      </ModalContainer>
    </Backdrop>
  );
};

export default ModalNotAnAuthorizedUser;
