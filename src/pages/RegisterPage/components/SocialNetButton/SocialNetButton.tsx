import { t } from 'i18next';
import { useTheme } from '@/hooks';
import { Button, ButtonAppearance } from '@/kit';

const SocialNetButton = ({ name, act }: { name: string; act: string }) => {
  const { theme } = useTheme();

  return (
    <Button
      type="submit"
      testId="login_page.signup_google"
      title={t(`login_page.${act}_${name}`)}
      appearance={ButtonAppearance.SECONDARY}
      style={{
        width: '100%',
        borderColor: theme.color.mainOrange,
        marginBottom: theme.pxs.x4,
      }}
      textStyle={{
        fontSize: theme.pxs.x3,
        lineHeight: '16px',
        fontWeight: '300',
        color: theme.color.white,
      }}
      prependChild={
        <img
          style={{ width: 22, height: 22, marginRight: theme.pxs.x1 }}
          src={`/assets/images/icon_${name}.png`}
        />
      }
    />
  );
};

export default SocialNetButton;
