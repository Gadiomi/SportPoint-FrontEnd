import css from './AccountPage.module.css';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Icon, IconName, ButtonAppearance } from '@/kit';
import { useNavigate } from 'react-router-dom';
import { Container, Section } from '@/components/ContainerAndSection';

const AccountPage: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className={css.accountCont}>
      <Button
        onClick={() => navigate('/account/general')}
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
        onClick={() => navigate('/account/change-password')}
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
            name={IconName.ID}
          />
        }
      />
      <Button
        onClick={() => navigate('/account/my-reviews')}
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
        onClick={() => navigate('/account/favorites')}
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
    </div>
  );
};

export default AccountPage;
