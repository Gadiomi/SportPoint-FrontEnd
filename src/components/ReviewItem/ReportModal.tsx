import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon, IconName } from '@/kit';
import {
  ModalOverlay,
  ModalContent,
  TitleR,
  RadioGroup,
  RadioOption,
  TextArea,
  SubmitButton,
  BackButton,
} from './styles';

interface ReportModalProps {
  onClose: () => void;
  onSubmit: (reason: string) => void;
}

const reportOptionKeys = [
  'report.reason1',
  'report.reason2',
  'report.reason3',
  'report.reason4',
];

const ReportModal: React.FC<ReportModalProps> = ({ onClose, onSubmit }) => {
  const { t } = useTranslation();
  const translate: (key: string, options?: Record<string, any>) => string = t;

  const reportOptions = reportOptionKeys.map(key => translate(key));

  const [selectedReason, setSelectedReason] = useState('');
  const [customReason, setCustomReason] = useState('');

  const handleSubmit = () => {
    const reason =
      selectedReason === translate('account_page.another-reason')
        ? customReason
        : selectedReason;
    if (reason.trim()) {
      onSubmit(reason.trim());
      onClose();
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <BackButton onClick={onClose}>
          <Icon name={IconName.ARROW_LEFT} />
        </BackButton>
        <TitleR>{translate('account_page.reason-for-complaint')}</TitleR>
        <RadioGroup>
          {reportOptions.map(option => (
            <RadioOption
              key={option}
              selected={selectedReason === option}
              onClick={() => setSelectedReason(option)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <label
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <input
                  type="radio"
                  checked={selectedReason === option}
                  readOnly
                />
                {option}
              </label>

              {/* TextArea під "Інше" всередині RadioOption */}
              {selectedReason === translate('account_page.another-reason') &&
                option === translate('account_page.another-reason') && (
                  <TextArea
                    placeholder={translate('account_page.what-happened')}
                    value={customReason}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setCustomReason(e.target.value)
                    }
                    // style={{ marginTop: '8px', width: '100%', borderColor: customReason ? '#B7B7B9' : undefined }}
                  />
                )}
            </RadioOption>
          ))}
        </RadioGroup>

        <SubmitButton
          onClick={handleSubmit}
          disabled={
            !selectedReason ||
            (selectedReason === translate('account_page.another-reason') &&
              !customReason)
          }
        >
          <>
            <Icon
              name={IconName.BACK_ARROW}
              styles={{ width: 24, height: 24 }}
            />
            {translate('account_page.send-complaint')}
          </>
        </SubmitButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ReportModal;
