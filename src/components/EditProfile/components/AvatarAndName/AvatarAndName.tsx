import React from 'react';
import { AccountName, NameTitle } from '../../EditProfiles.style';
import { AvatarName, HiddenInput } from '../EditGeneral/EditGeneral.styled';
import { Button, ButtonAppearance, Icon, IconName } from '@/kit';
import { UserProfile } from '@/types/userProfile';
import { AvatarImg, FirstLatter } from './AvatarAndName.styled';
import { useLocation, useNavigate } from 'react-router-dom';

interface AvatarAndNameProps {
  selectedAvatar: string | null;
  userProfile: UserProfile | null;
  t?: (key: string) => string;
  handleFileChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AvatarAndName: React.FC<AvatarAndNameProps> = ({
  selectedAvatar,
  userProfile,
  t,
  handleFileChange,
}) => {
  const location = useLocation();
  const isEditGeneralPage = location.pathname === '/profile/edit/general';

  return (
    <AccountName>
      <AvatarName>
        {selectedAvatar ? (
          <AvatarImg>
            <img src={selectedAvatar} alt="avatar" />
          </AvatarImg>
        ) : (
          <FirstLatter>
            {userProfile?.firstName
              ? userProfile?.firstName.charAt(0).toUpperCase()
              : ''}
          </FirstLatter>
        )}
        <NameTitle>
          {userProfile?.firstName && userProfile?.lastName
            ? `${userProfile.firstName} ${userProfile.lastName}`
            : userProfile?.description?.email
              ? userProfile.description.email.split('@')[0]
              : 'Імʼя відсутнє'}
        </NameTitle>
      </AvatarName>

      {isEditGeneralPage && (
        <>
          <Button
            onClick={() => document.getElementById('avatarInput')?.click()}
            title={t ? t('account_page.change-profile-photo') : 'Змінити фото'}
            appearance={ButtonAppearance.PRIMARY}
            styles={{ padding: '6px 16px', gap: '8px' }}
            testId="general"
            prependChild={
              <Icon
                styles={{
                  color: 'currentColor',
                  fill: 'transparent',
                }}
                name={IconName.ARROW_REFRESH}
              />
            }
          />
          <HiddenInput
            type="file"
            id="avatarInput"
            accept="image/*"
            onChange={handleFileChange}
          />
        </>
      )}
    </AccountName>
  );
};

export default AvatarAndName;
