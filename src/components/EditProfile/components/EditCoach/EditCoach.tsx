import buttonContent from '../../data/button-data.json';
import { List } from '../../EditProfiles.style';
import { Button, ButtonAppearance, IconName, Icon } from '@/kit';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../components/EditGeneral/EditGeneral.styled';
import { useAppSelector } from '@/hooks/hooks';
import { AccountDeleteCont } from '@/pages/AccountPage/styles';
import { useDeleteAccountMutation } from '@/redux/auth/authApi';
import { CookiesKey } from '@/constants';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import AvatarAndName from '../AvatarAndName/AvatarAndName';

const EditCoach = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const userProfile = useAppSelector(state => state.user.user);
  const isLoading = useAppSelector(state => state.user.isLoading);
  const [deleteAccount] = useDeleteAccountMutation();

  const deleteHandler = async () => {
    try {
      await deleteAccount('').unwrap();
      Cookies.remove(CookiesKey.TOKEN, { path: '' });
      Cookies.remove(CookiesKey.REFRESH_TOKEN, { path: '' });
      localStorage.clear();
      navigate('/');
    } catch (err) {
      console.error('Не вдалося видалити акаунт: ', err);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Container>
      <Button
        onClick={() => navigate('/profile')}
        title={'РЕДАГУВАННЯ'}
        appearance={ButtonAppearance.SECONDARY}
        testId="general"
        styles={{
          width: '100%',
          padding: '8px 0',
          display: 'flex',
          justifyContent: 'flex-start',
          gap: '2px',
          border: 'none',
          fontWeight: 800,
          fontSize: '24px',
        }}
        prependChild={
          <Icon
            width="32"
            height="32"
            styles={{
              color: 'currentColor',
              fill: 'transparent',
            }}
            name={IconName.ARROW_RIGHT}
          />
        }
      />

      <AvatarAndName
        selectedAvatar={userProfile?.avatar ? userProfile?.avatar : null}
        userProfile={userProfile}
      />

      <List>
        {buttonContent.map((content, index) => {
          const iconName =
            content.icon && IconName[content.icon as keyof typeof IconName]
              ? IconName[content.icon as keyof typeof IconName]
              : IconName.CLUB;

          return (
            <li key={index}>
              <Button
                onClick={() =>
                  navigate(`/profile/${content.route?.toLowerCase()}`)
                }
                title={content.name}
                appearance={ButtonAppearance.PRIMARY}
                testId="general"
                styles={{
                  width: '100%',
                  padding: '8px 16px',
                }}
                textStyle={{
                  lineHeight: '22px',
                  fontWeight: '600',
                  fontSize: '16px',
                  width: '100%',
                  paddingLeft: '8px',
                  textAlign: 'start',
                }}
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
                    }}
                    name={iconName}
                  />
                }
              />
            </li>
          );
        })}
      </List>
      <AccountDeleteCont>
        <h4>{t(`account_page.zone`)}</h4>
        <Button
          title={t(`account_page.delete`)}
          appearance={ButtonAppearance.UNDERLINED}
          testId="delete"
          onClick={() => deleteHandler()}
        ></Button>
      </AccountDeleteCont>
    </Container>
  );
};

export default EditCoach;
