import { FC } from 'react';
import { MenuWrapper, Overlay } from '../MobileMenu/styles';
import { NavBox } from '../styles';
import { Input, ModalContent } from './styles';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: FC<SearchModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <NavBox>
      <Overlay onClick={onClose} />
      <MenuWrapper isOpen={isOpen}>
        <ModalContent onClick={e => e.stopPropagation()}>
          <Input type="text" placeholder="Пошук..." autoFocus />
        </ModalContent>
      </MenuWrapper>
    </NavBox>
  );
};

export default SearchModal;
