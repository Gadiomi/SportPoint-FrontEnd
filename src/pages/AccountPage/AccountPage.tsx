import css from './AccountPage.module.css';
import { Container, Section } from '@/components/ContainerAndSection';
import styled from 'styled-components';
import { useTheme } from '@/hooks';
import { useTranslation } from 'react-i18next';
import { Button, Icon, IconName, Input, Loader, ButtonAppearance } from '@/kit';

const AccountPage: FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  return (
    <Section>
      <Container maxWidth="320px">
        <Image
          srcSet="/public/assets/images/logo@1.png 1x, /public/assets/images/logo@2.png 2x"
          src="/public/assets/images/logo@1.png"
          alt="Logo"
        />
        <Button
          title={t(`account_page.general`)}
          appearance={ButtonAppearance.PRIMARY}
          testId="general"
          className={css.accountBtn}
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
              name={IconName.ACCOUNT}
            />
          }
        />
        <Button
          title={t(`account_page.change-password`)}
          appearance={ButtonAppearance.PRIMARY}
          testId="change-password"
          className={css.accountBtn}
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
              name={IconName.ACCOUNT}
            />
          }
        />
        <Button
          title={t(`account_page.my-reviews`)}
          appearance={ButtonAppearance.PRIMARY}
          testId="my-reviews"
          className={css.accountBtn}
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
              name={IconName.MASSAGE_TYPING}
            />
          }
        />
        <Button
          title={t(`account_page.favorites`)}
          appearance={ButtonAppearance.PRIMARY}
          testId="favorites"
          className={css.accountBtn}
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
              name={IconName.HEART_NONE}
            />
          }
        />
      </Container>
    </Section>
  );
};

export default AccountPage;

const Image = styled.img(({ theme }) => ({
  margin: 'auto',
  marginBottom: theme.pxs.x5,
  marginTop: theme.pxs.x2,
}));
