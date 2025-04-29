import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, ButtonAppearance, Icon, IconName } from '@/kit';
import { GeneralBtnsWrapper } from './styles';

const BackSaveButtons: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <GeneralBtnsWrapper>
      <Button
        type="button"
        title={t(`account_page.back`)}
        appearance={ButtonAppearance.SECONDARY}
        testId="back"
        onClick={() => navigate('/profile')}
      />
      <Button
        type="submit"
        title={t(`account_page.save`)}
        appearance={ButtonAppearance.SECONDARY}
        testId="save"
        prependChild={
          <Icon
            styles={{
              color: 'currentColor',
              fill: 'transparent',
            }}
            name={IconName.CHECK_CONTAINED}
          />
        }
      />
    </GeneralBtnsWrapper>
  );
};

export default BackSaveButtons;
