import { BackdropSetting } from '../../SettingModal/styles';
import { FC, useState } from 'react';
import {
  BackBox,
  BackTitle,
  ComplaintModalBox,
  ComplaintTitle,
  CustomRadio,
  HiddenRadio,
  RadioWrapper,
  StyledTextarea,
} from './styles';

import { Logo } from '@/components/Logo/Logo';
import { Container, Section } from '@/components/ContainerAndSection';
import { useTranslation } from 'react-i18next';
import { Icon, IconName } from '@/kit';
import { Hr } from '@/components/StyledHr/styled';

interface ComplaintProps {
  onClose: () => void;
}

export const ComplaintModal: FC<ComplaintProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [comment, setComment] = useState('');
  const reasons = [
    { value: 'spam', label: t('chat_page.reasonOne') },
    { value: 'offensive', label: t('chat_page.reasonTwo') },
    { value: 'fake', label: t('chat_page.reasonThree') },
    { value: 'other', label: t('chat_page.reasonFour') },
  ];
  const handleSubmit = () => {
    const finalReason = selectedReason === 'other' ? comment : selectedReason;

    if (!finalReason || finalReason.trim() === '') {
      alert('Будь ласка, вкажіть причину');
      return;
    }

    console.log('Скарга надіслана:', finalReason);
    onClose();
  };
  return (
    <BackdropSetting style={{ zIndex: 1400 }} onClick={onClose}>
      <Container>
        <Logo />
        <BackBox>
          <Icon name={IconName.ARROW_LEFT} size={32} />
          <BackTitle>{t('account_page.back')}</BackTitle>
        </BackBox>
        <Hr />
        <ComplaintModalBox onClick={e => e.stopPropagation()}>
          <ComplaintTitle>{t('chat_page.please')}</ComplaintTitle>

          {reasons.map(({ value, label }) => (
            <RadioWrapper key={value}>
              <HiddenRadio
                name="reason"
                value={value}
                checked={selectedReason === value}
                onChange={() => setSelectedReason(value)}
              />
              <CustomRadio checked={selectedReason === value} />
              {label}
            </RadioWrapper>
          ))}

          {selectedReason === 'other' && (
            <StyledTextarea
              placeholder="Опишіть проблему..."
              value={comment}
              onChange={e => setComment(e.target.value)}
            />
          )}

          <button onClick={handleSubmit}>Надіслати</button>
        </ComplaintModalBox>
      </Container>
    </BackdropSetting>
  );
};
