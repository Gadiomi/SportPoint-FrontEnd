import { Button } from '@/kit';
import styled from 'styled-components';
import { ModalContainerSetting } from '../../SettingModal/styles';

export const ModalContainerDetails = styled(ModalContainerSetting)(
  ({ theme }) => ({
    backgroundColor: theme.color.background,
  }),
);
export const DetailsStyledButton = styled(Button)(({ theme }) => ({
  padding: `${theme.pxs.x2}px ${theme.pxs.x2_5}px`,
  gap: theme.pxs.x2,
  border: `0.50px solid ${theme.color.mainOrange}`,
  backgroundColor: theme.color.background,
  '&:first-of-type': {
    backgroundColor: theme.color.mainOrange,
  },
}));
