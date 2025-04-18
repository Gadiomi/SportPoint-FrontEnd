import { FC } from 'react';
import { Button, Icon, IconName } from '@/kit';
import {
  Backdrop,
  ModalContainer,
  ModalContent,
  ModalHeader,
  CloseButton,
} from './styles';
import { useNavigate } from 'react-router-dom';
import { fonts } from '@/theme/fonts';

interface ILocalModal {
  isModalOpen: boolean;
  handleClose: () => void;
}

const LocalModal: FC<ILocalModal> = ({ isModalOpen, handleClose }) => {
  const navigate = useNavigate();
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

            <ModalContent>
              <p>Перейдіть за посиланням, яке надіслано листом на Ваш email.</p>
              <p>Потім натисніть кнопку "Далі", щоб перейти у Ваш акаунт.</p>
            </ModalContent>
            <Button
              testId="Далі"
              title={'Далі'}
              // appearance={ButtonAppearance.UNDERLINED}
              style={{
                ...fonts.secondManrope,
                padding: '6px 24px',
                marginBottom: '8px',
              }}
              onClick={() => {
                handleClose;
                navigate('/');
                // navigate('/profile');
              }}
            />
          </ModalContainer>
        </Backdrop>
      ) : null}
    </>
  );
};

export default LocalModal;
