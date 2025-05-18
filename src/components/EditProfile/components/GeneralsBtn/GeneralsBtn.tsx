import { FC } from 'react';
import { GeneralBtns } from '../EditGeneral/EditGeneral.styled';
import { Button, ButtonAppearance, Icon, IconName } from '@/kit';
import { useNavigate } from 'react-router-dom';
interface GeneralsBtnProps {
  t: (key: string) => string;
  navigateTo: string;
}

const GeneralsBtn: FC<GeneralsBtnProps> = ({ t, navigateTo }) => {
  const navigate = useNavigate();

  return (
    <GeneralBtns>
      <Button
        type="button"
        title={t('account_page.back')}
        appearance={ButtonAppearance.PRIMARY}
        testId="back"
        onClick={() => navigate(navigateTo)}
        styles={{
          width: '50%',
          padding: '8px 18px',
          fontWeight: 500,
          fontSize: 16,
        }}
      />
      <Button
        type="submit"
        title={t('account_page.save')}
        appearance={ButtonAppearance.BORDER}
        testId="save"
        styles={{
          width: '50%',
          padding: '8px 18px',
          fontWeight: 500,
          fontSize: 16,
        }}
        prependChild={
          <Icon
            styles={{
              color: 'currentColor',
              fill: 'transparent',
              marginRight: '8px',
            }}
            width="24"
            name={IconName.CHECK_CONTAINED}
          />
        }
      />
    </GeneralBtns>
  );
};

export default GeneralsBtn;
