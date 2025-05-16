import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container, Section } from '../ContainerAndSection';
import { useTheme } from '@/hooks';
import { Roles } from '@/constants';
import { Button, ButtonAppearance } from '@/kit';
import SocialNetButton from './SocialNetButton/SocialNetButton';
import {
  CallToActionWrapper,
  Image,
  SocialNetButtonWrapper,
  Subtitle,
  TabsWrapper,
  TextWrapper,
  Title,
} from './styles';

type ActionType = 'login' | 'register';

interface IActionData {
  nextRoute: string;
  subtitle: string;
  buttonTitle: string;
}

interface IAuthWrapperProps {
  action: ActionType;
  children: React.ReactNode;
  currentRole: string;
  changeRole: (role: string) => void;
}

const AuthWrapper: FC<IAuthWrapperProps> = ({
  children,
  action,
  currentRole,
  changeRole,
}) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const actionDataMap: Record<ActionType, IActionData> = {
    login: {
      nextRoute: '/register',
      subtitle: 'login_page.have_not_yet',
      buttonTitle: 'login_page.button_title_reg',
    },
    register: {
      nextRoute: '/login',
      subtitle: 'login_page.already_have',
      buttonTitle: 'login_page.button_title',
    },
  };

  const actionData = actionDataMap[action] || actionDataMap['login'];

  return (
    <Section>
      <Container maxWidth={'375px'}>
        <Image
          srcSet="/public/assets/images/logo@1.png 1x, /public/assets/images/logo@2.png 2x"
          src="/public/assets/images/logo@1.png"
          alt="Logo"
        />
        <TextWrapper>
          <Title>
            {t(action === 'login' ? 'login_page.title' : 'register_page.title')}
          </Title>
          <Subtitle>{t('login_page.description')}</Subtitle>
        </TextWrapper>
        <TabsWrapper>
          {Object.values(Roles).map(role => (
            <Button
              key={role}
              title={t(`login_page.tabs.${role}`)}
              testId={role}
              styles={{ borderRadius: '4px', fontWeight: 500 }}
              onClick={() => {
                changeRole(role);
              }}
              {...(currentRole !== role
                ? {
                    style: {
                      backgroundColor: theme.color.inputBar,
                      color: '#B7B7B9',
                    },
                  }
                : {})}
            />
          ))}
        </TabsWrapper>
        {children}
        <SocialNetButtonWrapper>
          <SocialNetButton name={'google'} act={action} />
          <SocialNetButton name={'facebook'} act={action} />
        </SocialNetButtonWrapper>
        <CallToActionWrapper>
          <Subtitle>{t(actionData.subtitle)}</Subtitle>
          <Button
            testId={`${actionData.buttonTitle}`}
            title={t(actionData.buttonTitle)}
            appearance={ButtonAppearance.UNDERLINED}
            style={{ fontWeight: 500 }}
            onClick={() => navigate(actionData.nextRoute)}
          />
        </CallToActionWrapper>
      </Container>
    </Section>
  );
};

export default AuthWrapper;
