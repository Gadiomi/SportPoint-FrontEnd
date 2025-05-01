import React from 'react';
import { Icon, IconName } from '@/kit';
import { Button, ButtonAppearance } from '@/kit';
import { fonts } from '@/theme/fonts';
import { useTheme } from 'styled-components';

interface ButtonProfileIconProps {
  iconName: IconName;
  iconStyle?: React.CSSProperties;
  onClick: () => void;
  text: string;
  style?: React.CSSProperties;
  appearance?: ButtonAppearance;
}

const ButtonProfileIcon: React.FC<ButtonProfileIconProps> = ({
  iconName,
  iconStyle,
  onClick,
  text,
  appearance,
}) => {
  const theme = useTheme();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: `${theme.pxs.x2}px`,
      }}
    >
      <Button
        testId="details_page.edit_button"
        title=""
        style={{
          width: '62px',
          height: `${theme.pxs.x10}px`,
          borderRadius: `${theme.pxs.x5}px`,
        }}
        appearance={appearance}
        onClick={onClick}
        appendChild={
          <Icon
            styles={{
              color: 'currentColor',
              fill: 'transparent',
              ...iconStyle,
            }}
            name={iconName}
          />
        }
      ></Button>
      <span style={{ ...fonts.smallText, color: theme.color.secWhite }}>
        {text}
      </span>
    </div>
  );
};

export default ButtonProfileIcon;
