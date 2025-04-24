import { FC } from 'react';
import { GeneralBtns } from '../EditGeneral/EditGeneral.styled';
import { Button, ButtonAppearance, Icon, IconName } from '@/kit';
import { useNavigate } from 'react-router-dom';
interface GeneralsBtnProps {
  t: (key: string) => string;
}

const GeneralsBtn: FC<GeneralsBtnProps> = ({ t }) => {
  const navigate = useNavigate();

  return (
    <GeneralBtns>
      <Button
        type="button"
        title={t('account_page.back')}
        appearance={ButtonAppearance.SECONDARY}
        testId="back"
        onClick={() => navigate('/profile')}
        styles={{
          width: '50%',
          padding: '8px 18px',
          fontWeight: 500,
          fontSize: 16,
          color: '#B7B7B9',
        }}
      />
      <Button
        type="submit"
        title={t('account_page.save')}
        appearance={ButtonAppearance.SECONDARY}
        testId="save"
        styles={{
          width: '50%',
          padding: '8px 18px',
          fontWeight: 500,
          fontSize: 16,
          color: '#B7B7B9',
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
