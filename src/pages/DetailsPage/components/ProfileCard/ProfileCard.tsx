import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { fonts } from '@/theme/fonts';
import { IconName } from '@/kit';
import { ButtonAppearance } from '@/kit';
import ButtonProfileIcon from '../ButtonProfileIcon/ButtonProfileIcon';
import EditButton from '../../components/EditButton/EditButton';
import ModalNotAnAuthorizedUser from '../ModalNotAnAuthorizedUser/ModalNotAnAuthorizedUser';
import { useFavorites } from '@/hooks/useFavorites';

import StyledHr from '../../../../components/StyledHr/StyledHr';
import {
  StyledProfileCard,
  Avatar,
  AvatarNone,
  Sport,
  SportEl,
} from './styles';

interface ProfileCardProps {
  _id: string | undefined;
  role: string;
  isLogin: boolean;
  iconNames: IconName[];
  firstName: string | undefined;
  lastName?: string | undefined;
  avatar: string | undefined;
  city: string | undefined;
  address?: string | undefined;
  age?: string;
  sport?: string[];
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  _id,
  role,
  isLogin,
  firstName,
  lastName,
  avatar,
  city,
  address,
  age,
  sport,
}) => {
  const [avatarError, setAvatarError] = useState(false);
  const [showButtons, setShowButtons] = useState(true);
  const [showEditButton, setShowEditButton] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');

  const { t } = useTranslation();
  const theme = useTheme();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    const hideIcons =
      path.includes('profile') || path.includes('account-admin-club');
    setShowButtons(!hideIcons);
    const showEdit =
      path.includes('profile') || path.includes('account-admin-club');
    setShowEditButton(showEdit);
  }, [location.pathname]);

  const getYearWord = (num: number): string => {
    const lastDigit = num % 10;
    const lastTwoDigits = num % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
      return 'років';
    }

    if (lastDigit === 1) return 'рік';
    if (lastDigit >= 2 && lastDigit <= 4) return 'роки';

    return 'років';
  };

  const openCommentModal = () => {
    setModalTitle('Тільки авторизовані користувачі можуть коментувати');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const openChooseModal = () => {
    setModalTitle('Тільки авторизовані користувачі можуть обирати');
    setIsModalOpen(true);
  };

  const { isFavorite, toggleFavorite } = useFavorites(
    _id,
    role,
    isLogin,
    openChooseModal,
  );

  const handleAvatarError = () => {
    setAvatarError(true);
  };

  const renderAvatar =
    avatar && !avatarError ? (
      <Avatar src={avatar} alt={firstName} onError={handleAvatarError} />
    ) : (
      <AvatarNone>
        {firstName ? firstName.charAt(0).toUpperCase() : ''}
      </AvatarNone>
    );

  return (
    <StyledProfileCard>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
        }}
      >
        {showButtons && (
          <ButtonProfileIcon
            iconName={IconName.MASSAGE_TYPING}
            text={t('details_page.comment')}
            onClick={openCommentModal}
          />
        )}

        {renderAvatar}

        {showButtons && (
          <ButtonProfileIcon
            appearance={ButtonAppearance.PRIMARY}
            iconName={isFavorite ? IconName.HEART_FILL : IconName.HEART_NONE}
            text={t('details_page.choose')}
            onClick={toggleFavorite}
            iconStyle={{
              fill: isFavorite ? '#F8F7F4' : 'transparent',
            }}
          />
        )}
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: `${theme.pxs.x1}px`,
          justifyContent: 'center',
          marginBottom: `${theme.pxs.x2}px`,
        }}
      >
        <h3 style={fonts.nameDetails}>{firstName} </h3>
        <h3 style={fonts.nameDetails}>{lastName} </h3>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: `${theme.pxs.x1}px`,
          justifyContent: 'center',
          marginBottom: `${theme.pxs.x2}px`,
          width: '100%',
          alignItems: 'center',
        }}
      >
        <p style={{ ...fonts.addressDetails, color: theme.color.secWhite }}>
          {city}
        </p>
        <p style={{ ...fonts.addressDetails, color: theme.color.secWhite }}>
          {address}
        </p>
        {age && (
          <p style={{ ...fonts.addressDetails, color: theme.color.secWhite }}>
            {age}
            <span
              style={{
                ...fonts.addressDetails,
                color: theme.color.secWhite,
                paddingLeft: '4px',
              }}
            >
              {getYearWord(Number(age))}
            </span>
          </p>
        )}
      </div>
      <Sport style={fonts.popUp}>
        {(sport || []).map((item, index) => (
          <SportEl key={index}>{item}</SportEl>
        ))}
      </Sport>
      {showEditButton && <EditButton _id={_id} role={role} />}
      {isModalOpen && (
        <ModalNotAnAuthorizedUser
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={modalTitle}
        />
      )}
      <StyledHr style={{ marginBottom: '16px' }} />
    </StyledProfileCard>
  );
};

export default ProfileCard;
