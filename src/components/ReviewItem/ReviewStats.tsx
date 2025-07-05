import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/redux/reviews/reviewsSelector';
import {
  fetchReviewsAboutUser,
  fetchAllUsers,
  replyToReview,
  fetchUserById,
  postFeedback,
} from '@/redux/reviews/reviewsApi';
import { Roles } from '@/constants';
import { useDeleteComment } from '@/hooks/useDeleteComment';
import { useUpdateReview } from '@/hooks/useUpdateReview';
import FeedbackSection from '@/components/ReviewItem/FeedbackSection';
import styled from 'styled-components';
import ReviewHeader from '@/components/ReviewItem/ReviewHeader';
import EditReviewPage from '@/pages/ReviewsPage/EditReviewPage';
import ReviewActions from '@/components/ReviewItem/ReviewActions';
import StyledHr from '../StyledHr/StyledHr';
import AverageRating from './AverageRating';
import ReplyModal from './ReplyModal';
import AuthPromptModal from './AuthPromptModal';
import { formatDate } from '@/kit/formatDate/formatDate';
import { Icon, IconName } from '@/kit';
import { useTheme } from 'styled-components';
import { ContainerButtonMore, ButtonMore } from '@/pages/ReviewsPage/styles';
import {
  Avatar,
  Name,
  UserInfo,
  ReviewCard,
  Title,
  Stars,
  Bar,
  RatingBar,
  RatingContainer,
  SportList,
  SportTag,
  StyledDate,
  Div,
  ReplyContainer,
  NameIcon,
  Badge,
} from './styles';

interface User {
  userId: string;
  avatar?: string;
  firstName?: string;
  lastName?: string;
  createdAt?: string;
  sport?: [];
  rating: number;
  role?: Roles;
  _id?: string;
}

interface UsefulnessEntry {
  user: string;
  useful: 'yes' | 'no';
  _id?: string;
}

interface CommentData {
  _id: string;
  average: number;
  owner: string;
  comment: string;
  adminReply?: string;
  sport?: [];
  ratings?: {
    [key: string]: number;
  };
  trainer?: string;
  club?: string;
  createdAt?: string;
  updatedAt?: string;
  rating?: number;
  description?: string;
  usefulness: UsefulnessEntry[];
  yes: number;
  no: number;
  isFirstReview?: boolean;
}

const CommentText = styled.div`
  margin: 8px 0;
`;

const ReviewStats: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const translate: (key: string, options?: Record<string, any>) => string = t;
  const user = useAppSelector(state => state.user.user);
  const currentUser = user;
  console.log('ReviewStatUser', user?.userId);
  const location = useLocation();
  const [ratings, setRatings] = useState<{ [key: number]: number }>({
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  });
  const [averageRating, setAverageRating] = useState<number>(0);
  const [totalReviews, setTotalReviews] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [firstComment, setFirstComment] = useState<any>(null);
  const [targetUserData, setTargetUserData] = useState<User | null>(null);
  const [authorProfiles, setAuthorProfiles] = useState<Record<string, any>>({});
  const [allComments, setAllComments] = useState<CommentData[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [replyModalData, setReplyModalData] = useState<{
    isOpen: boolean;
    author?: User;
    comment?: CommentData;
  } | null>(null);

  const reviewsToShow = showAll ? allComments : allComments.slice(0, 2);
  const { id: userId } = useParams();
  // console.log('id: userCommentId', userId);

  // Використання хука для видалення відгуків
  const { handleDeleteReview, error: deleteError } = useDeleteComment();

  const fetchReviews = async () => {
    try {
      const isTrainerOrClub =
        user?.role === 'coach' || user?.role === 'adminClub';
      const userCommentId = isTrainerOrClub
        ? user?.userId
        : user?.user_comments?.[0]?.userCommentId;

      const isProfilePage = location.pathname === '/profile';
      const isEditPage = location.pathname === '/profile/edit/reviews';

      const isViewingOwnProfile = userId === user?.userId;
      const isNotProfileOrEdit = !isProfilePage && !isEditPage;

      let commentsArray: CommentData[] = [];

      if (!isViewingOwnProfile && userId && isNotProfileOrEdit) {
        // Гостьова сторінка перегляду відгуків іншого користувача
        const response = await fetchUserById(userId); //запит на картку
        console.log('responseState', response);
        const comments = response.data?.userComments;
        setTargetUserData(response.data.data);
        if (Array.isArray(comments)) {
          commentsArray = comments;
        } else if (comments) {
          commentsArray = [comments];
        }
      } else {
        // Звичайна сторінка профілю (авторизований)
        if (!user?.userId) {
          console.error('Не знайдено userCommentId');
          return;
        }
        const response = await fetchReviewsAboutUser(user?.userId);
        commentsArray = Array.isArray(response.data)
          ? response.data
          : [response.data];
      }
      console.log('commentsArray', commentsArray);
      const reversedComments = [...commentsArray].reverse();

      const withAverages = reversedComments.map(comment => {
        const ratings = comment.ratings || {};
        const values = Object.values(ratings).filter(
          r => typeof r === 'number',
        ) as number[];
        const average = values.length
          ? values.reduce((sum, r) => sum + r, 0) / values.length
          : 0;
        return { ...comment, average };
      });

      const uniqueOwnerIds = Array.from(
        new Set(withAverages.map(c => c.owner)),
      );

      const allUsers = await fetchAllUsers();
      const profilesMap: Record<string, any> = {};
      uniqueOwnerIds.forEach(ownerId => {
        const user = allUsers.find((u: User) => u.userId === ownerId);
        if (user) profilesMap[ownerId] = user;
      });

      const allRatings = withAverages.flatMap(
        comment =>
          Object.values(comment.ratings || {}).filter(
            r => typeof r === 'number',
          ) as number[],
      );

      const total = allRatings.reduce((sum, r) => sum + r, 0);
      const avg = allRatings.length ? total / allRatings.length : 0;

      const ratingCounts: { [key: number]: number } = {
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0,
      };
      allRatings.forEach(r => {
        const rounded = Math.round(r);
        if (ratingCounts[rounded] !== undefined) {
          ratingCounts[rounded]++;
        }
      });

      const totalReviewsCount = withAverages.length;

      setAllComments(withAverages);
      setAuthorProfiles(profilesMap);
      setFirstComment(withAverages[0]);
      setRatings(ratingCounts);
      setAverageRating(avg);
      setTotalReviews(totalReviewsCount);
    } catch (err) {
      console.error('Помилка при завантаженні відгуків:', err);
      setError('Не вдалося завантажити відгуки');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const safeFetch = async () => {
      await fetchReviews();
      if (!isMounted) return;
    };

    safeFetch();

    return () => {
      isMounted = false;
      setAllComments([]);
    };
  }, [user?.userId]);

  const { handleReviewUpdate } = useUpdateReview({
    fetchReviews,
    setIsEditing,
  });

  const handleFeedback = async (cardId: string, useful: 'yes' | 'no') => {
    console.log('cardId', cardId);
    if (!userId) {
      console.error('Користувач не авторизований');
      return;
    }

    // 🟢 1. Оптимістичне оновлення
    setAllComments(prev =>
      prev.map(card => {
        if (card._id !== cardId) return card;
        const newYes = useful === 'yes' ? card.yes + 1 : card.yes;
        const newNo = useful === 'no' ? card.no + 1 : card.no;

        return {
          ...card,
          yes: newYes,
          no: newNo,
          usefulness: [...card.usefulness, { user: userId, useful }],
        };
      }),
    );
    try {
      // 🟢 2. Відправляємо запит на бекенд
      await postFeedback(cardId, useful);
    } catch (err) {
      console.error('Помилка фідбеку:', err);

      // 🔁 Rollback (опційно, якщо запит не вдався)
      setAllComments(prev =>
        prev.map(card => {
          if (card._id !== cardId) return card;

          const newYes = useful === 'yes' ? card.yes - 1 : card.yes;
          const newNo = useful === 'no' ? card.no - 1 : card.no;

          return {
            ...card,
            yes: newYes,
            no: newNo,
            usefulness: card.usefulness.filter(u => u.user !== userId),
          };
        }),
      );
    }
  };

  const handleOpenReplyModal = (comment: CommentData) => {
    const author = authorProfiles[comment.owner];
    setReplyModalData({
      isOpen: true,
      author,
      comment,
    });
  };

  const handleEditReply = (comment: CommentData, author: User) => {
    setReplyModalData({
      isOpen: true,
      comment,
      author,
    });
  };

  const handleCloseReplyModal = () => {
    setReplyModalData(null);
  };

  const handleReplySubmit = async (replyText: string) => {
    console.log('Виклик handleReplySubmit з текстом:', replyText);
    const commentId = replyModalData?.comment?._id;
    console.log('replyModalData.comment', replyModalData?.comment);
    // console.log('commentId', commentId);
    if (!commentId) {
      alert('Не вдалося знайти ID користувача');
      return;
    }
    try {
      const response = await replyToReview(commentId, replyText);
      console.log('Отримана відповідь від сервера:', response);

      // Оновлюємо коментарі з новою відповіддю
      const updatedComments = allComments.map(comment => {
        if (comment._id === commentId) {
          return { ...comment, adminReply: replyText }; // Додаємо нову відповідь до коментаря
        }
        return comment;
      });
      console.log('updatedComments', updatedComments);

      setAllComments(updatedComments);

      handleCloseReplyModal();
      alert('Відповідь надіслана!');
    } catch (error) {
      alert('Не вдалося надіслати відповідь');
    }
  };

  const handleClick = () => {
    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }
    setIsEditing(true);
  };

  const maxRatingCount = Math.max(...Object.values(ratings), 1); // щоб уникнути ділення на 0
  const targetId = firstComment?.coach || firstComment?.admiClub || '';

  return (
    <div>
      {location.pathname !== '/profile/edit/reviews' && (
        <>
          <Title>
            <Icon name={IconName.ARROW_RIGHT} />
            {translate('details_page.reviews')}
          </Title>
          <RatingContainer>
            <div>
              {[5, 4, 3, 2, 1].map(star => (
                <RatingBar key={star}>
                  <span>{star}</span>
                  <Bar width={((ratings[star] || 0) / maxRatingCount) * 100} />
                </RatingBar>
              ))}
            </div>
            <div>
              <AverageRating
                averageRating={averageRating}
                totalReviews={totalReviews}
              />
            </div>
          </RatingContainer>
          <div onClick={handleClick}>
            <ReviewHeader
              title={translate('account_page.leave_review')}
              leftIcon={IconName.Icon_message_chat_01}
              rightIcon={IconName.ARROW_CORNER}
              leftIconStyles={{ opacity: 0 }}
              rightIconStyles={{ width: '32px', height: '32px' }}
            />
          </div>
          {showAuthModal && (
            <AuthPromptModal onClose={() => setShowAuthModal(false)} />
          )}
        </>
      )}
      {/* Карточки всіх відгуків */}
      <>
        {reviewsToShow.map((comment, index) => {
          const author = authorProfiles[comment.owner];
          const avatarSrc =
            author?.avatar ||
            '../../../public/assets/images/pngtree-default-red-avatar-png-image_5939361.jpg';
          const fullName = author
            ? `${author.firstName} ${author.lastName}`
            : translate('account_page.profile-deleted');

          return (
            <ReviewCard key={comment._id} isEven={index % 2 === 0}>
              <UserInfo>
                <Avatar src={avatarSrc} />
                <Div>
                  <Name>{fullName} </Name>
                  <Stars>
                    {[1, 2, 3, 4, 5].map(star => (
                      <Icon
                        key={`${comment._id}-star-${star}`}
                        name={IconName.STAR_DEFAULT}
                        styles={{
                          fill:
                            star <= Math.round(comment.average ?? 0) // Перевірка на undefined
                              ? theme.color.mainOrange
                              : theme.color.secWhite,
                          color: 'transparent',
                        }}
                        size={16}
                      />
                    ))}
                  </Stars>
                </Div>
                <StyledDate>
                  {formatDate(comment.createdAt, comment.updatedAt)}
                </StyledDate>
              </UserInfo>
              <CommentText>{comment.comment}</CommentText>
              {location.pathname !== '/profile/edit/reviews' && (
                <FeedbackSection
                  reviewId={comment._id}
                  yes={comment.yes ?? 0}
                  no={comment.no ?? 0}
                  onLike={handleFeedback}
                  onDislike={handleFeedback}
                />
              )}
              {comment.adminReply && (
                <>
                  <StyledHr />
                  <UserInfo>
                    <Avatar
                      src={
                        targetUserData?.avatar ||
                        currentUser?.avatar ||
                        '../../../public/assets/images/pngtree-default-red-avatar-png-image_5939361.jpg'
                      }
                    />
                    <Div>
                      <NameIcon>
                        <Name>
                          {targetUserData?.firstName || currentUser?.firstName}{' '}
                          {targetUserData?.lastName || currentUser?.lastName}
                        </Name>
                        <Icon name={IconName.Icon_ICON} size={12} />
                      </NameIcon>
                      {/* Блок з видами спорту */}
                      <SportList>
                        {targetUserData?.role &&
                        currentUser?.role === Roles.ADMIN_CLUB ? (
                          <Badge>{translate('account_page.sports-club')}</Badge>
                        ) : (
                          (
                            targetUserData?.sport ||
                            currentUser?.sport ||
                            []
                          ).map(sport => (
                            <SportTag key={sport}>{sport}</SportTag>
                          ))
                        )}
                      </SportList>
                    </Div>
                  </UserInfo>
                  <ReplyContainer>{comment.adminReply}</ReplyContainer>
                  <StyledDate>{formatDate(comment.updatedAt)}</StyledDate>
                </>
              )}
              {location.pathname === '/profile/edit/reviews' && (
                <ReviewActions
                  reviewId={comment._id}
                  userCommentId={user?.userId || ''}
                  userRole={user?.role ?? ''}
                  adminReply={comment.adminReply || ''}
                  isFirstReview={index === 0}
                  createdAt={comment.createdAt ?? ''}
                  currentUserId={currentUser?.userId ?? ''}
                  ownerId={comment.owner}
                  onReply={() => handleOpenReplyModal(comment)}
                  onDelete={handleDeleteReview}
                  onEdit={() => handleEditReply(comment, author)}
                />
              )}
            </ReviewCard>
          );
        })}

        <ContainerButtonMore>
          {allComments.length > 1 && (
            <ButtonMore onClick={() => setShowAll(prev => !prev)}>
              {showAll ? translate('hide') : translate('show_more')}
            </ButtonMore>
          )}
        </ContainerButtonMore>
      </>

      {/* Якщо isEditing true, відображаємо сторінку редагування */}
      {isEditing && targetUserData && (
        <EditReviewPage
          review={{
            id: targetUserData._id || '',
            userCommentId: targetUserData.userId || '',
            name: targetUserData.firstName || '',
            surname: targetUserData.lastName || '',
            avatar: targetUserData.avatar || '',
            userRole: targetUserData.role as Roles,
            sport: targetUserData.sport || [],
            comment: firstComment?.text ?? '', // додано
            createdAt: targetUserData.createdAt || '',
            averageRating,
            totalReviews,
            targetId,

            rating: targetUserData.rating ?? 0,
          }}
          onCancel={() => setIsEditing(false)} // Кнопка для скасування редагування
          onSave={fetchReviews}
        />
      )}

      {replyModalData?.isOpen && replyModalData.comment && (
        <ReplyModal
          isOpen={replyModalData.isOpen}
          onClose={handleCloseReplyModal}
          onSubmit={handleReplySubmit}
          _id={replyModalData.author?._id || ''}
          avatar={
            replyModalData.author?.avatar ||
            '../../../public/assets/images/pngtree-default-red-avatar-png-image_5939361.jpg'
          }
          firstName={replyModalData.author?.firstName || ''}
          lastName={replyModalData.author?.lastName || ''}
          rating={replyModalData.comment.average || 0}
          createdAt={replyModalData.comment.createdAt || ''}
          commentId={replyModalData.comment._id}
        />
      )}
    </div>
  );
};

export default ReviewStats;
