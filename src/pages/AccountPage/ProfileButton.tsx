import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonAppearance, Icon, IconName } from '@/kit';
import { useTranslation } from 'react-i18next';
import { AccountButton } from './styles';

type Props = {
  title: string;
  arrowDirection?: string;
};

type TIconName = {
  [ttl: string]: IconName;
};

const ThisIconName: TIconName = {
  general: IconName.ACCOUNT,
  change_password: IconName.ID,
  reviews: IconName.MASSAGE_TYPING,
  favorites: IconName.HEART_NONE,
  online_appointment: IconName.SCHEDULE,
};

const ProfileButton: FC<Props> = ({ title, arrowDirection = 'right' }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const correctedTitle = (ttl: string) => {
    return ttl.includes('-') ? ttl.replace('-', '_') : ttl;
  };

  // console.log('ThisIconName -> ', ThisIconName[correctedTitle(title)]);

  return (
    <AccountButton
      onClick={() =>
        navigate(
          arrowDirection === 'right' ? `/profile/edit/${title}` : '/profile',
        )
      }
      title={t(`account_page.${title}`)}
      appearance={ButtonAppearance.PRIMARY}
      testId={`${title}`}
      appendChild={
        <Icon
          styles={{
            color: 'currentColor',
            fill: 'transparent',
          }}
          name={
            arrowDirection === 'right'
              ? IconName.ARROW_RIGHT
              : IconName.ARROW_LEFT
          }
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
