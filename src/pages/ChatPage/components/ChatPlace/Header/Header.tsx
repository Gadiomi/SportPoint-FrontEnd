import { Section } from '@/components/ContainerAndSection';
import { Icon, IconName } from '@/kit';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';
import { Avatar, UserName } from '../../User/styles';
import { StyledButton } from '../../HeaderChats/styles';
import { useNavigate } from 'react-router-dom';
import { Button } from './styles';
import { useState } from 'react';
import { DetailsModal } from '../DetailsModal/DetailsModal';

export const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(prev => !prev);
  };
  return (
    <>
      <Section
        styles={{
          backgroundColor: theme.color.inputBar,
          paddingBottom: '0px',
          borderBottom: `1px solid ${theme.color.mainBlue}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          padding: '8px 16px',
          position: 'relative',
          zIndex: '1300',
        }}
      >
        <Button onClick={() => navigate(-1)}>
          <Icon
            name={IconName.DOWN_ARROW}
            size={24}
            styles={{ transform: 'rotate(90deg)' }}
          />
        </Button>

        <UserName>Максим Бондаренко</UserName>
        <Avatar
          src="../../../../../public/assets/images/baseClub.png"
          alt="userAvatar"
        />
        <StyledButton
          testId="icon-button"
          onClick={handleOpenModal}
          prependChild={<Icon name={IconName.SLIDERS} />}
        />
      </Section>
      <DetailsModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};
