import { fonts } from '@/theme/fonts';
import styled from 'styled-components';

export const ClubCardBox = styled.div(({ theme }) => ({
  boxShadow: '0 0 10px 0 rgba(43, 54, 149, 0.9)',
  borderRadius: theme.pxs.x1_5,
  backgroundColor: theme.color.inputBar,
  padding: theme.pxs.x2_5,
  paddingTop: '164px',
  position: 'relative',
}));
export const ClubImage = styled.div<{ image?: string }>(({ image, theme }) => ({
  height: '156px',
  maxHeight: '156px',
  width: '100%',
  borderTopLeftRadius: theme.pxs.x1_5,
  borderTopRightRadius: theme.pxs.x1_5,
  backgroundImage: image
    ? `url(${image})`
    : `url('/public/assets/images/baseClub.png')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'absolute',
  top: theme.pxs.x0,
  left: theme.pxs.x0,
}));

export const LightText = styled.p(({ theme }) => ({
  ...fonts.lightManrope,
  letterSpacing: '-0.01em',
  color: theme.color.disabled,
  marginLeft: theme.pxs.x0_5,
}));
export const ClubInfo = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});
export const InfoWrap = styled.div({
  width: 'auto',
});
export const InfoWrapReviews = styled.div({
  width: 'auto',
});

export const HeartButton = styled.button(({ theme }) => ({
  position: 'absolute',
  top: theme.pxs.x2,
  right: theme.pxs.x2,
  '& svg': {
    color: '#EC4033',
  },
}));
export const ClubDetail = styled.div(({ theme }) => ({
  display: 'flex',
  gap: theme.pxs.x2,
  marginTop: theme.pxs.x1,
  marginBottom: theme.pxs.x2,
}));
export const IconWrap = styled.div(({ theme }) => ({
  display: 'flex',
  gap: theme.pxs.x0_5,
  alignItems: 'center',
  width: 'auto',
}));
export const IconWrapRating = styled(IconWrap)(({ theme }) => ({
  justifyContent: 'center',
  gap: theme.pxs.x2_5,
  marginBottom: theme.pxs.x0_5,
  alignItems: 'normal',
}));
export const RatingText = styled.p({
  ...fonts.mainButton,
  fontWeight: '500',
});
