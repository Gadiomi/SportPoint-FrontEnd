import React, { ReactNode } from 'react';
import '../../fonts.css';
import { FontWeights, FontSizes, LineHeights, FontFamily } from './constants';
import { useTheme } from 'styled-components';

type TypographyProps = {
  children: ReactNode;
  style?: React.CSSProperties;
  className?: string;
};

const Title: React.FC<TypographyProps> = ({ children, style, className }) => {
  const theme = useTheme();
  return (
    <h2
      className={className}
      style={{
        fontSize: FontSizes.XX_LARGE,
        fontWeight: FontWeights.BOLD,
        fontFamily: FontFamily,
        lineHeight: LineHeights.LARGE,
        color: theme.color.white,
        ...style,
      }}
    >
      {children}
    </h2>
  );
};

const Subtitle: React.FC<TypographyProps> = ({
  children,
  style,
  className,
}) => {
  const theme = useTheme();
  return (
    <h3
      className={className}
      style={{
        fontSize: FontSizes.LARGE,
        fontWeight: FontWeights.EXTRA_BOLD,
        fontFamily: FontFamily,
        lineHeight: LineHeights.MEDIUM,
        color: theme.color.white,
        ...style,
      }}
    >
      {children}
    </h3>
  );
}; //  заголовки2

const Name: React.FC<TypographyProps> = ({ children, style, className }) => {
  const theme = useTheme();
  return (
    <h2
      className={className}
      style={{
        fontSize: FontSizes.X_LARGE,
        fontWeight: FontWeights.BOLD,
        fontFamily: FontFamily,
        color: theme.color.white,
        ...style,
      }}
    >
      {children}
    </h2>
  );
}; // імена

const Main: React.FC<TypographyProps> = ({ children, style, className }) => {
  const theme = useTheme();
  return (
    <p
      className={className}
      style={{
        fontSize: FontSizes.LARGE,
        fontWeight: FontWeights.BOLD,
        fontFamily: FontFamily,
        lineHeight: LineHeights.X_LARGE,
        color: theme.color.white,
        ...style,
      }}
    >
      {children}
    </p>
  );
}; //  Main_Manrope_16B

const Medium: React.FC<TypographyProps> = ({ children, style, className }) => {
  const theme = useTheme();
  return (
    <p
      className={className}
      style={{
        fontSize: FontSizes.LARGE,
        fontWeight: FontWeights.MEDIUM,
        fontFamily: FontFamily,
        lineHeight: LineHeights.X_LARGE,
        color: theme.color.white,
        ...style,
      }}
    >
      {children}
    </p>
  );
}; //  Second_Manrope_16Med

const Light: React.FC<TypographyProps> = ({ children, style, className }) => {
  const theme = useTheme();
  return (
    <p
      className={className}
      style={{
        fontSize: FontSizes.MEDIUM,
        fontWeight: FontWeights.LIGHT,
        fontFamily: FontFamily,
        lineHeight: LineHeights.MEDIUM,
        color: theme.color.white,
        ...style,
      }}
    >
      {children}
    </p>
  );
}; //  Manrope_12Light

const ButtonTypogr: React.FC<TypographyProps> = ({
  children,
  style,
  className,
}) => {
  const theme = useTheme();
  return (
    <button
      className={className}
      style={{
        fontSize: FontSizes.BASE,
        fontWeight: FontWeights.REGULAR,
        fontFamily: FontFamily,
        lineHeight: LineHeights.BASE,
        color: theme.color.white,
        ...style,
      }}
    >
      {children}
    </button>
  );
}; //  main_button

const Card: React.FC<TypographyProps> = ({ children, style, className }) => {
  const theme = useTheme();
  return (
    <p
      className={className}
      style={{
        fontSize: FontSizes.MEDIUM,
        fontWeight: FontWeights.REGULAR,
        fontFamily: FontFamily,
        lineHeight: LineHeights.LARGE,
        color: theme.color.white,
        ...style,
      }}
    >
      {children}
    </p>
  );
}; //  опис в карточки

const Small: React.FC<TypographyProps> = ({ children, style, className }) => {
  const theme = useTheme();
  return (
    <p
      className={className}
      style={{
        fontSize: FontSizes.SMALL,
        fontWeight: FontWeights.MEDIUM,
        fontFamily: FontFamily,
        lineHeight: LineHeights.SMALL,
        color: theme.color.white,
        ...style,
      }}
    >
      {children}
    </p>
  );
}; //  small_text

const About: React.FC<TypographyProps> = ({ children, style, className }) => {
  const theme = useTheme();
  return (
    <p
      className={className}
      style={{
        fontSize: FontSizes.LARGE,
        fontWeight: FontWeights.REGULAR,
        fontFamily: FontFamily,
        lineHeight: LineHeights.X_LARGE,
        color: theme.color.white,
        ...style,
      }}
    >
      {children}
    </p>
  );
}; //  about_text

const PopUp: React.FC<TypographyProps> = ({ children, style, className }) => {
  const theme = useTheme();
  return (
    <p
      className={className}
      style={{
        fontSize: FontSizes.MEDIUM,
        fontWeight: FontWeights.REGULAR,
        fontFamily: FontFamily,
        lineHeight: LineHeights.X_SMALL,
        color: theme.color.white,
        ...style,
      }}
    >
      {children}
    </p>
  );
}; //  поп-ап(зв'язатися)

export {
  Title,
  Subtitle,
  Name,
  Main,
  Medium,
  Light,
  ButtonTypogr,
  Card,
  Small,
  About,
  PopUp,
};
