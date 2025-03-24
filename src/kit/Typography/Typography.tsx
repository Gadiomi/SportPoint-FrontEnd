import React, { ReactNode } from 'react';
import '../../fonts.css';
import { FontWeights, FontSizes, LineHeights, FontFamily } from './constants';

type TypographyProps = {
  children: ReactNode;
  style?: React.CSSProperties;
  className?: string;
};

const Title: React.FC<TypographyProps> = ({ children, style, className }) => {
  return (
    <h1
      className={className}
      style={{
        fontSize: FontSizes.XX_LARGE,
        fontWeight: FontWeights.BOLD,
        fontFamily: FontFamily,
        lineHeight: LineHeights.LARGE,
        ...style,
      }}
    >
      {children}
    </h1>
  );
};

const Subtitle: React.FC<TypographyProps> = ({
  children,
  style,
  className,
}) => {
  return (
    <h3
      className={className}
      style={{
        fontSize: FontSizes.LARGE,
        fontWeight: FontWeights.EXTRA_BOLD,
        fontFamily: FontFamily,
        lineHeight: LineHeights.MEDIUM,
        ...style,
      }}
    >
      {children}
    </h3>
  );
}; //  заголовки2

const Name: React.FC<TypographyProps> = ({ children, style, className }) => {
  return (
    <h2
      className={className}
      style={{
        fontSize: FontSizes.X_LARGE,
        fontWeight: FontWeights.BOLD,
        fontFamily: FontFamily,
        ...style,
      }}
    >
      {children}
    </h2>
  );
}; // імена

const Main: React.FC<TypographyProps> = ({ children, style, className }) => {
  return (
    <p
      className={className}
      style={{
        fontSize: FontSizes.LARGE,
        fontWeight: FontWeights.BOLD,
        fontFamily: FontFamily,
        lineHeight: LineHeights.X_LARGE,
        ...style,
      }}
    >
      {children}
    </p>
  );
}; //  Main_Manrope_16B

const Medium: React.FC<TypographyProps> = ({ children, style, className }) => {
  return (
    <p
      className={className}
      style={{
        fontSize: FontSizes.LARGE,
        fontWeight: FontWeights.MEDIUM,
        fontFamily: FontFamily,
        lineHeight: LineHeights.X_LARGE,
        ...style,
      }}
    >
      {children}
    </p>
  );
}; //  Second_Manrope_16Med

const Light: React.FC<TypographyProps> = ({ children, style, className }) => {
  return (
    <p
      className={className}
      style={{
        fontSize: FontSizes.MEDIUM,
        fontWeight: FontWeights.LIGHT,
        fontFamily: FontFamily,
        lineHeight: LineHeights.MEDIUM,
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
  return (
    <button
      className={className}
      style={{
        fontSize: FontSizes.BASE,
        fontWeight: FontWeights.REGULAR,
        fontFamily: FontFamily,
        lineHeight: LineHeights.BASE,
        ...style,
      }}
    >
      {children}
    </button>
  );
}; //  main_button

const Card: React.FC<TypographyProps> = ({ children, style, className }) => {
  return (
    <p
      className={className}
      style={{
        fontSize: FontSizes.MEDIUM,
        fontWeight: FontWeights.REGULAR,
        fontFamily: FontFamily,
        lineHeight: LineHeights.LARGE,
        ...style,
      }}
    >
      {children}
    </p>
  );
}; //  опис в карточки

const Small: React.FC<TypographyProps> = ({ children, style, className }) => {
  return (
    <p
      className={className}
      style={{
        fontSize: FontSizes.SMALL,
        fontWeight: FontWeights.MEDIUM,
        fontFamily: FontFamily,
        lineHeight: LineHeights.SMALL,
        ...style,
      }}
    >
      {children}
    </p>
  );
}; //  small_text

const About: React.FC<TypographyProps> = ({ children, style, className }) => {
  return (
    <p
      className={className}
      style={{
        fontSize: FontSizes.LARGE,
        fontWeight: FontWeights.REGULAR,
        fontFamily: FontFamily,
        lineHeight: LineHeights.X_LARGE,
        ...style,
      }}
    >
      {children}
    </p>
  );
}; //  about_text

const PopUp: React.FC<TypographyProps> = ({ children, style, className }) => {
  return (
    <p
      className={className}
      style={{
        fontSize: FontSizes.MEDIUM,
        fontWeight: FontWeights.REGULAR,
        fontFamily: FontFamily,
        lineHeight: LineHeights.X_SMALL,
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
