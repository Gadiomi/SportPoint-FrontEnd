import { useState } from 'react';
import { Container, Section } from '@/components/ContainerAndSection';
import { Logo } from '@/components/Logo/Logo';
import { Button, ButtonAppearance, Icon, IconName } from '@/kit';
import { t } from 'i18next';
import { FavoritesPageWrapper, ToggleWrapper } from './styles';
import CoachCard from './CoachCard/CoachCard';

const FavoritesPage = () => {
  const [isActive, setIsActive] = useState<boolean>(true);

  const isActiveHandler = () => setIsActive(!isActive);

  console.log('isActive -> ', isActive);

  return (
    <Section>
      <Container maxWidth="320px">
        <FavoritesPageWrapper>
          <Logo />
          <Button
            // testId="login_page.form.submit_button"
            // title={t('login_page.form.submit_button')}
            testId="Збережені"
            title={'Збережені'}
            type="submit"
            style={{
              justifyContent: 'flex-start',
              width: '296px',
              position: 'relative',
              height: '40px',
              paddingLeft: '40px',
            }}
            prependChild={
              <Icon
                name={IconName.HEART_NONE}
                styles={{
                  position: 'absolute',
                  left: '8',
                }}
              />
            }
            appendChild={
              <Icon
                name={IconName.ARROW_LEFT}
                styles={{
                  position: 'absolute',
                  right: '18',
                }}
              />
            }
          />
          <ToggleWrapper>
            <Button
              testId="Тренери"
              title={'Тренери'}
              style={{
                width: '50%',
                borderTopRightRadius: '0px',
                borderBottomRightRadius: '0px',
              }}
              appearance={
                isActive ? ButtonAppearance.PRIMARY : ButtonAppearance.SECONDARY
              }
              onClick={isActiveHandler}
            />
            <Button
              testId="Клуби"
              title={'Клуби'}
              style={{
                width: '50%',
                borderTopLeftRadius: '0px',
                borderBottomLeftRadius: '0px',
              }}
              appearance={
                !isActive
                  ? ButtonAppearance.PRIMARY
                  : ButtonAppearance.SECONDARY
              }
              onClick={isActiveHandler}
            />
          </ToggleWrapper>
          {/* --- - --- */}
          <ul>
            <CoachCard />
            <CoachCard />
          </ul>
        </FavoritesPageWrapper>
      </Container>
    </Section>
  );
};

export default FavoritesPage;
