import React from 'react';
import { Icon, IconName } from '@/kit';
import { Button, ButtonAppearance } from '@/kit';
import { fonts } from '@/theme/fonts';
import { useTheme } from 'styled-components';

interface ButtonProfileIconProps {
  iconName: IconName;
  onClick: () => void;
  text: string;
}

const ButtonProfileIcon: React.FC<ButtonProfileIconProps> = ({
  iconName,
  onClick,
  text,
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
        appearance={ButtonAppearance.PRIMARY}
        onClick={onClick}
        appendChild={
          <Icon
            styles={{
              color: 'currentColor',
              fill: 'transparent',
            }}
            name={iconName}
          />
        }
      ></Button>
      <span style={{ ...fonts.addressDetails, color: theme.color.secWhite }}>
        {text}
      </span>
    </div>
  );
};

export default ButtonProfileIcon;
