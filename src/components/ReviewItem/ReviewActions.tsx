import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { reportReview } from '@/redux/reviews/reviewsApi';
import { Icon, IconName } from '@/kit';
import { ButtonGroup, ActionButton, DeleteButton } from './styles';
import ReportMoal from './ReportModal';

interface ReviewActionsProps {
  reviewId: string;
  userCommentId: string;
  onDelete?: (id: string) => void;
  onEdit?: () => void;
  onReply?: () => void;
  userRole: string;
  isFirstReview: boolean;
  adminReply?: string;
  firstName?: string;
  lastName?: string;
  rating?: number;
  createdAt: string;
  ownerId: string; // ID власника відгуку
  currentUserId: string; // ID поточного користувача
}

const ReviewActions: React.FC<ReviewActionsProps> = ({
  reviewId,
  onDelete,
  onEdit,
  onReply,
  ownerId,
  currentUserId,
  userRole,
  adminReply = '',
}) => {
  const { t } = useTranslation();
  const translate: (key: string, options?: Record<string, any>) => string = t;
  const [isReportOpen, setReportOpen] = useState(false);

  const isOwner = currentUserId === ownerId;
  // Власник або якщо є adminReply → можна редагувати і видаляти
  const canEditAndDelete = isOwner || !!adminReply;
  const actionIcon = canEditAndDelete
    ? IconName.EDIT_CONTAINED
    : IconName.Icon_send_02;
  const actionText = canEditAndDelete
    ? translate('account_page.edit')
    : translate('details_page.respond');

  const handleAction = async () => {
    if (canEditAndDelete) {
      if (onEdit) onEdit();
    } else {
      if (onReply) onReply();
    }
  };

  const handleReport = () => setReportOpen(true);
  const submitReport = async (reason: string) => {
    try {
      await reportReview(reviewId);
      alert('Скарга надіслана!');
    } catch {
      alert('Не вдалося надіслати скаргу');
    }
  };

  return (
    <>
      <ButtonGroup>
        {canEditAndDelete ? (
          <DeleteButton onClick={() => onDelete?.(reviewId)}>
            {translate('account_page.delete-btn')}
          </DeleteButton>
        ) : (
          <DeleteButton onClick={handleReport}>
            {translate('details_page.complain')}
          </DeleteButton>
        )}

        <ActionButton onClick={handleAction}>
          <Icon
            name={actionIcon}
            styles={{ fill: 'none', stroke: 'none' }}
            size={24}
          />
          {actionText}
        </ActionButton>
      </ButtonGroup>
      {isReportOpen && (
        <ReportMoal
          onClose={() => setReportOpen(false)}
          onSubmit={submitReport}
        />
      )}
    </>
  );
};

export default ReviewActions;
