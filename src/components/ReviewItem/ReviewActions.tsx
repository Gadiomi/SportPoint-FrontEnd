import React, { useState } from 'react';
import axios from 'axios';
import {
  saveReview,
  reportReview,
  replyToReview,
} from '@/redux/reviews/reviewsApi';
import { Icon } from '@/kit';
import { IconName } from '@/kit';
import { ButtonGroup, ActionButton, DeleteButton } from './styles';
import ReplyModal from './ReplyModal';

interface ReviewActionsProps {
  reviewId: string;
  userCommentId: string;
  onDelete: (id: string) => void;
  onEdit: () => void;
  userRole: 'customer' | 'coach' | 'adminClub';
  isFirstReview: boolean;
  createdAt: string;
  ownerId: string; // ID власника відгуку
  currentUserId: string; // ID поточного користувача
}

const ReviewActions: React.FC<ReviewActionsProps> = ({
  reviewId,
  onDelete,
  onEdit,
  userRole,
  isFirstReview,
  createdAt,
  ownerId,
  userCommentId,
  currentUserId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isOwner = currentUserId === ownerId;

  // const isCustomer = userRole === 'customer';
  // const isAdminOrCoach = userRole === 'coach' || userRole === 'adminClub';

  let actionText = isOwner ? 'Редагувати' : 'Відповісти';

  if (!isOwner && isFirstReview) {
    actionText = 'Зберігти';
  }

  // Визначаємо іконку для кнопки редагування/відповіді
  let actionIcon = IconName.EDIT_CONTAINED; // Стандартна іконка редагування
  if (!isOwner) {
    actionIcon = IconName.MAIL; // Якщо перший відгук, то іконка для публікації
  }

  //   Функція для обробки натискання на кнопку "Відповісти" або "Опублікувати"
  const handleAction = async () => {
    if (isOwner) {
      // Якщо користувач клієнт, ми викликаємо редагування
      onEdit();
    } else if (isFirstReview) {
      // Якщо це перший відгук і користувач не клієнт (тренер чи адміністратор)
      try {
        const response = await saveReview(
          null,
          '',
          {
            attitude: 5,
            service: 5,
            price: 5,
            cleanliness: 5,
          },
          reviewId,
          userCommentId,
        );

        console.log('Відгук успішно опубліковано', response);
        alert('Відгук опубліковано!');
      } catch (error) {
        console.error('Помилка при публікації відгуку:', error);
        alert('Не вдалося опублікувати відгук');
      }
    } else {
      setIsModalOpen(true); // Відкрити модалку відповіді
    }
  };

  // Функція для обробки натискання на кнопку "Поскаржитись"
  const handleReport = async () => {
    try {
      const response = await reportReview(reviewId);
      alert('Скарга надіслана!');
    } catch (error) {
      alert('Не вдалося надіслати скаргу');
    }
  };

  // Якщо користувач тренер чи адміністратор — надсилаємо відповідь
  const handleSubmitReply = async (replyText: string) => {
    try {
      const response = await replyToReview(reviewId, replyText);
      console.log('Відповідь успішно надіслана', response.data);
      alert('Відповідь надіслана!');
    } catch (error) {
      console.error('Помилка при надсиланні відповіді:', error);
      alert('Не вдалося надіслати відповідь');
    }
  };

  return (
    <>
      <ButtonGroup>
        {isOwner ? (
          <DeleteButton onClick={() => onDelete(reviewId)}>
            Видалити
          </DeleteButton>
        ) : (
          <DeleteButton onClick={handleReport}>Поскаржитись</DeleteButton>
        )}
        {isOwner && (
          <ActionButton onClick={handleAction}>
            <Icon
              name={actionIcon}
              styles={{ fill: 'none', stroke: 'none' }}
              size={24}
            />
            {actionText}
          </ActionButton>
        )}

        {/* Кнопка Відповісти доступна тільки для тренера або адміністратора */}
        {!isOwner && !isFirstReview && (
          <ActionButton onClick={() => setIsModalOpen(true)}>
            <Icon
              name={IconName.MAIL}
              styles={{ fill: 'none', stroke: 'none' }}
              size={24}
            />
            Відповісти
          </ActionButton>
        )}
      </ButtonGroup>

      <ReplyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitReply}
        reviewId={reviewId}
        createdAt={createdAt}
      />
    </>
  );
};

export default ReviewActions;
