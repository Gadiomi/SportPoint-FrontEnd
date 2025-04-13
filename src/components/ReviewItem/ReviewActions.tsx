import React, { useState } from 'react';
import axios from 'axios';
import { Icon } from '@/kit';
import { IconName } from '@/kit';
import { ButtonGroup, ActionButton, DeleteButton } from './styles';
import ReplyModal from './ReplyModal';

interface ReviewActionsProps {
  reviewId: string;
  onDelete: (id: string) => void;
  onEdit: () => void;
  userRole: 'customer' | 'coach' | 'adminClub';
  isFirstReview: boolean;
  reviewDate: string;
}

const ReviewActions: React.FC<ReviewActionsProps> = ({
  reviewId,
  onDelete,
  onEdit,
  userRole,
  isFirstReview,
  reviewDate,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isCustomer = userRole === 'customer';

  let actionText = isCustomer ? 'Редагувати' : 'Відповісти';

  if (!isCustomer && isFirstReview) {
    actionText = 'Опублікувати';
  }

  // Визначаємо іконку для кнопки редагування/відповіді
  let actionIcon = IconName.EDIT_CONTAINED; // Стандартна іконка редагування
  if (!isCustomer) {
    actionIcon = IconName.MAIL; // Якщо перший відгук, то іконка для публікації
  }

  // Функція для обробки натискання на кнопку "Поскаржитись"
  const handleReport = async () => {
    try {
      const response = await axios.post(
        `https://sportpoint-backend.onrender.com/${reviewId}/report`,
        { reviewId },
      );
      console.log('Скарга на відгук успішно надіслана', response.data);
      alert('Скарга надіслана!');
    } catch (error) {
      console.error('Помилка при надсиланні скарги:', error);
      alert('Не вдалося надіслати скаргу');
    }
  };

  //   Функція для обробки натискання на кнопку "Відповісти" або "Опублікувати"
  const handleAction = async () => {
    if (isCustomer) {
      // Якщо користувач клієнт, ми викликаємо редагування
      onEdit();
    } else if (isFirstReview) {
      // Якщо це перший відгук і користувач не клієнт (тренер чи адміністратор)
      try {
        const response = await axios.post(
          `https://sportpoint-backend.onrender.com/reviews`,
          { reviewId },
        );
        console.log('Відгук успішно опубліковано', response.data);
        alert('Відгук опубліковано!');
      } catch (error) {
        console.error('Помилка при публікації відгуку:', error);
        alert('Не вдалося опублікувати відгук');
      }
    } else {
      setIsModalOpen(true); // Відкрити модалку відповіді
    }
  };
  // Якщо користувач тренер чи адміністратор — надсилаємо відповідь
  const handleSubmitReply = async (replyText: string) => {
    try {
      const response = await axios.post(
        `https://sportpoint-backend.onrender.com/reviews/${reviewId}/reply`,
        {
          reviewId,
          replyText: 'Ваша відповідь',
        },
      ); // Відповідь можна передавати з форми
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
        {isCustomer ? (
          <DeleteButton onClick={() => onDelete(reviewId)}>
            Видалити
          </DeleteButton>
        ) : (
          <DeleteButton onClick={handleReport}>Поскаржитись</DeleteButton>
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

      <ReplyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitReply}
        reviewId={reviewId}
        reviewDate={reviewDate}
      />
    </>
  );
};

export default ReviewActions;
