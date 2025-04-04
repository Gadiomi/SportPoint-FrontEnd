import { useGetUserProfileQuery } from '@/redux/user/userApi';
import buttonContent from './data/button-data.json';
import { AccountName, List, NameTitle } from './EditProfiles.style';
import { Button, ButtonAppearance, IconName, Icon } from '@/kit';
import { useNavigate } from 'react-router-dom';
import { Container } from './components/EditGeneral/EditGeneral.styled';

const EditProfile = () => {
  const navigate = useNavigate();

  const { data: userData } = useGetUserProfileQuery(undefined);

  return (
    <Container>
      <Button
        onClick={() => navigate('/profile')}
        title={'РЕДАГУВАННЯ'}
        appearance={ButtonAppearance.SECONDARY}
        testId="general"
        style={{ width: '100%', padding: '8px 18px' }}
        prependChild={
          <Icon
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
            userData?.userProfile?.avatar ||
            '/public/assets/images/png-transparent-neon-silver-pic-miscellaneous-cdr-angle-thumbnail.png'
          }
          alt=""
        />
        <NameTitle>
          {userData?.userProfile?.firstLastName ||
            (userData?.userProfile.description.email
              ? userData?.userProfile.description.email.split('@')[0]
              : 'No Name')}
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
                style={{ width: '100%', padding: '8px 18px' }}
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

export default EditProfile;
