import { FC, useState } from 'react';
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

interface IAuthWrapperProps {
  title: string;
  children: React.ReactNode;
}

const AuthWrapper: FC<IAuthWrapperProps> = ({ children }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [currentRole, setCurrentRole] = useState<string>(Roles.CUSTOMER);

  return (
    <Section>
      {/* <Container styles={{ maxWidth: '375px' }}> */}
      <Container maxWidth={'375px'}>
        <Image
          srcSet="/public/assets/images/logo@1.png 1x, /public/assets/images/logo@2.png 2x"
          src="/public/assets/images/logo@1.png"
          alt="Logo"
        />
        <TextWrapper>
          <Title>{t('login_page.title')}</Title>
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
                setCurrentRole(role);
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
        {/* <Form onSubmit={handleSubmit(onSubmitForm)}>
            <Controller
              name={'email'}
              control={control}
              render={({ field, fieldState }) => {
                return (
                  <Input
                    {...field}
                    label={t('login_page.form.email') + '*'}
                    testId="login_page.form.email"
                    errorMessage={fieldState.error?.message}
                    containerStyles={{ marginBottom: theme.pxs.x4 }}
                    inputStyles={{ fontSize: '14px', fontWeight: 400 }}
                    autoFocus
                  />
                );
              }}
            />
            <Controller
              name={'password'}
              control={control}
              render={({ field, fieldState }) => {
                return (
                  <Input
                    {...field}
                    label={t('login_page.form.password') + '*'}
                    testId="login_page.form.password"
                    errorMessage={fieldState.error?.message}
                    containerStyles={{
                      marginBottom: theme.pxs.x8,
                      alignItems: 'center',
                    }}
                    inputStyles={{ fontSize: '14px', fontWeight: 400 }}
                    type={isVisiblePassword ? 'text' : 'password'}
                    appendChild={
                      <EyeForPassword
                        isVisiblePassword={isVisiblePassword}
                        toggleVisibilityPassword={toggleVisibilityPassword}
                      />
                    }
                  />
                );
              }}
            />
           
            {isIncorrectData ? (
              <WrongDataMessage>
                Невірно введено email або пароль
              </WrongDataMessage>
            ) : null}
            
            <CallToActionWrapper style={{ marginBottom: theme.pxs.x8 }}>
              <Text>{t('login_page.forgott_pass')}</Text>
              <Button
                testId="login_page.forgott_button"
                title={t('login_page.forgott_button')}
                appearance={ButtonAppearance.UNDERLINED}
                style={{ fontWeight: 500 }}
              />
            </CallToActionWrapper>
            <Button
              testId="login_page.form.submit_button"
              title={t('login_page.form.submit_button')}
              type="submit"
              style={{ width: '100%', height: '32px' }}
              disabled={!isValid || isLoading}
              appendChild={
                isSubmitting || isLoading ? (
                  <Loader
                    size={'16px'}
                    stroke={'#f0f0f0'}
                    strokeWidth={'1'}
                    style={{ marginLeft: '4px' }}
                  />
                ) : null
              }
            />
          </Form> */}
        <SocialNetButtonWrapper>
          <SocialNetButton name={'google'} act={'login'} />
          <SocialNetButton name={'facebook'} act={'login'} />
        </SocialNetButtonWrapper>
        <CallToActionWrapper>
          <Subtitle>{t('login_page.have_not_yet')}</Subtitle>
          <Button
            testId="login_page.have_not_yet"
            title={t('login_page.button_title_reg')}
            appearance={ButtonAppearance.UNDERLINED}
            style={{ fontWeight: 500 }}
            onClick={() => navigate('/register')}
          />
        </CallToActionWrapper>
      </Container>
    </Section>
  );
};

export default AuthWrapper;
