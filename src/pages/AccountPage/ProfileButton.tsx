import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonAppearance, Icon, IconName } from '@/kit';
import { useTranslation } from 'react-i18next';
import { AccountButton } from './styles';

type Props = {
  title: string;
};

type TIconName = {
  [ttl: string]: IconName;
};

const ProfileButton: FC<Props> = ({ title }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const ThisIconName: TIconName = {
    edit: IconName.ACCOUNT,
    change_password: IconName.ID,
    reviews: IconName.MASSAGE_TYPING,
    favorites: IconName.HEART_NONE,
    online_appointment: IconName.EDIT_CONTAINED, // TEMP!!!
  };

  const correctedTitle = (ttl: string) => {
    return ttl.includes('-') ? ttl.replace('-', '_') : ttl;
  };

  console.log('ThisIconName -> ', ThisIconName[title]);

  return (
    <AccountButton
      onClick={() => navigate(`/profile/${title}`)}
      title={t(`account_page.${title}`)}
      appearance={ButtonAppearance.PRIMARY}
      testId={`${title}`}
      appendChild={
        <Icon
          styles={{
            color: 'currentColor',
            fill: 'transparent',
          }}
          name={IconName.ARROW_RIGHT}
        />
      }
      prependChild={
        <Icon
          styles={{
            color: 'currentColor',
            fill: 'transparent',
            marginRight: '8px',
          }}
          name={ThisIconName[correctedTitle(title)]}
        />
      }
    />
  );
};

export default ProfileButton;
