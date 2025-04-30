import { FC } from 'react';
import { Button, Icon, IconName } from '@/kit';
import {
  Backdrop,
  ModalContainer,
  ModalHeader,
  CloseButton,
  ModalContent,
} from './styles';
import { fonts } from '@/theme/fonts';
import { useNavigate } from 'react-router-dom';

interface IMessageModal {
  isModalOpen: boolean;
  handleClose: () => void;
  nextRoute: string;
  children: React.ReactNode;
}

const MessageModal: FC<IMessageModal> = ({
  isModalOpen,
  handleClose,
  nextRoute,
  children,
}) => {
  const navigate = useNavigate();
  const onClickHandler = async () => {
    handleClose();
    navigate(nextRoute ?? -1);
  };

  return (
    <>
      {isModalOpen ? (
        <Backdrop onClick={handleClose}>
          <ModalContainer onClick={e => e.stopPropagation()}>
            <ModalHeader>
              <CloseButton onClick={handleClose} type="button">
                <Icon name={IconName.X} />
              </CloseButton>
            </ModalHeader>
            <ModalContent>{children}</ModalContent>
            <Button
              testId="Далі"
              title={'Далі'}
              // appearance={ButtonAppearance.UNDERLINED}
              style={{
                ...fonts.secondManrope,
                padding: '6px 24px',
                marginBottom: '8px',
              }}
              onClick={onClickHandler}
            />
          </ModalContainer>
        </Backdrop>
      ) : null}
    </>
  );
};

export default MessageModal;
