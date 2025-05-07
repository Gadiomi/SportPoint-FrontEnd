import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonAppearance, Icon, IconName } from '@/kit';
import { GeneralBtnsWrapper } from './styles';

interface IGeneralBtnsProps {
  t: (key: string) => string;
}

const BackSaveButtons: FC<IGeneralBtnsProps> = ({ t }) => {
  const navigate = useNavigate();

  return (
    <GeneralBtnsWrapper>
      <Button
        type="button"
        title={t(`account_page.back`)}
        appearance={ButtonAppearance.PRIMARY}
        testId="back"
        onClick={() => navigate(-1)}
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
