import buttonContent from '../../data/button-data.json';
import { AccountName, List, NameTitle } from '../../EditProfiles.style';
import { Button, ButtonAppearance, IconName, Icon } from '@/kit';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../components/EditGeneral/EditGeneral.styled';
import { useAppSelector } from '@/hooks/hooks';

const EditCoach = () => {
  const navigate = useNavigate();
  const userProfile = useAppSelector(state => state.user.user);
  const isLoading = useAppSelector(state => state.user.isLoading);

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
      <AccountName>
        <img
          src={
            userProfile?.avatar ||
            '/public/assets/images/png-transparent-neon-silver-pic-miscellaneous-cdr-angle-thumbnail.png'
          }
          alt=""
        />
        <NameTitle>
          {userProfile?.firstName && userProfile?.lastName
            ? `${userProfile.firstName} ${userProfile.lastName}`
            : userProfile?.description?.email
              ? userProfile.description.email.split('@')[0]
              : 'Імʼя відсутнє'}
        </NameTitle>
      </AccountName>
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
                styles={{ width: '100%', padding: '8px 18px' }}
                textStyle={{
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
    </Container>
  );
};

export default EditCoach;
