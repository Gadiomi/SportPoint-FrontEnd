import React from 'react';

import { saveReview, reportReview } from '@/redux/reviews/reviewsApi';
import { Icon } from '@/kit';
import { IconName } from '@/kit';
import { ButtonGroup, ActionButton, DeleteButton } from './styles';

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
  const isOwner = currentUserId === ownerId;

  // Власник або якщо є adminReply → можна редагувати і видаляти
  const canEditAndDelete = isOwner || !!adminReply;

  const actionIcon = canEditAndDelete ? IconName.EDIT_CONTAINED : IconName.MAIL;
  const actionText = canEditAndDelete ? 'Редагувати' : 'Відповісти';

  const handleAction = async () => {
    if (canEditAndDelete) {
      if (onEdit) onEdit();
    } else {
      if (onReply) onReply();
    }
  };

  const handleReport = async () => {
    try {
      await reportReview(reviewId);
      alert('Скарга надіслана!');
    } catch (error) {
      alert('Не вдалося надіслати скаргу');
    }
  };

  return (
    <ButtonGroup>
      {canEditAndDelete ? (
        <DeleteButton onClick={() => onDelete?.(reviewId)}>
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
  );
};

export default ReviewActions;

// import React from 'react';

// import {
//   saveReview,
//   reportReview,
// } from '@/redux/reviews/reviewsApi';
// import { Icon } from '@/kit';
// import { IconName } from '@/kit';
// import { ButtonGroup, ActionButton, DeleteButton } from './styles';

// interface ReviewActionsProps {
//   reviewId: string;
//   userCommentId: string;
//   onDelete?: (id: string) => void;
//   onEdit?: () => void;
//   onReply?: () => void;
//   userRole: string;
//   isFirstReview: boolean;
//   adminReply?: string;
//   firstName?: string;
//   lastName?: string;
//   rating?: number;
//   createdAt: string;
//   ownerId: string; // ID власника відгуку
//   currentUserId: string; // ID поточного користувача
// }

// const ReviewActions: React.FC<ReviewActionsProps> = ({
//   reviewId,
//   onDelete,
//   onEdit,
//   onReply,
//   ownerId,
//   currentUserId,
//   userRole,
//   adminReply = false,
// }) => {
//   const isOwner = currentUserId === ownerId;
//   console.log(isOwner);

//   const role = userRole;
//   console.log(role);
//   const showEditControls = adminReply; // якщо є відповідь - редагувати/видалити
//   console.log(showEditControls);
//   const showReplyControls = !adminReply; // якщо немає відповіді - поскаржитись/відповісти

//   const actionIcon = showEditControls ? IconName.EDIT_CONTAINED : IconName.MAIL;

//   let actionText = '';
//   if (showEditControls) {
//     actionText = 'Редагувати';
//   } else if (showReplyControls) {
//     actionText = 'Відповісти';
//   }

//   const handleAction = async () => {
//     if (showEditControls) {
//       if (onEdit) onEdit();
//     } else if (showReplyControls) {
//       if (onReply) onReply();
//     }
//   };

//   const handleReport = async () => {
//     try {
//       await reportReview(reviewId);
//       alert('Скарга надіслана!');
//     } catch (error) {
//       alert('Не вдалося надіслати скаргу');
//     }
//   };

//   return (
//     <ButtonGroup>
//       {showEditControls && isOwner ? (
//           <DeleteButton onClick={() => onDelete?.(reviewId)}>
//             Видалити
//           </DeleteButton>

//       ) : (
//         <DeleteButton onClick={handleReport}>Поскаржитись</DeleteButton>
//       )}

//       {(showEditControls || showReplyControls) && (
//         <ActionButton onClick={handleAction}>
//           <Icon
//             name={actionIcon}
//             styles={{ fill: 'none', stroke: 'none' }}
//             size={24}
//           />
//           {actionText}
//         </ActionButton>
//       )}
//     </ButtonGroup>
//   );
// };

// export default ReviewActions;
