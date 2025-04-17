import { FC } from 'react';
import { Icon, IconName } from '@/kit';
import { useTheme } from '@/hooks';

interface IEyeForPassword {
  isVisiblePassword: boolean;
  toggleVisibilityPassword: () => void;
}

const EyeForPassword: FC<IEyeForPassword> = ({
  isVisiblePassword,
  toggleVisibilityPassword,
}) => {
  const { theme } = useTheme();
  return (
    <div
      onClick={toggleVisibilityPassword}
      style={{ paddingRight: theme.pxs.x1, width: 'auto' }}
    >
      {isVisiblePassword ? (
        <Icon
          styles={{
            color: 'currentColor',
            // fill: 'transparent',
          }}
          name={IconName.EYE_CLOSE}
        />
      ) : (
        <Icon
          styles={{
            color: 'currentColor',
            // fill: 'transparent',
          }}
          name={IconName.EYE_OPEN}
        />
      )}
    </div>
  );
};

export default EyeForPassword;
