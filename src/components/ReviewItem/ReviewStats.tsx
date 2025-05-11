import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/redux/reviews/reviewsSelector';
import {
  fetchReviewsByUserCommentId,
  fetchAllUsers,
  replyToReview,
} from '@/redux/reviews/reviewsApi';
import FeedbackSection from '@/components/ReviewItem/FeedbackSection';
import styled from 'styled-components';
import ReviewHeader from '@/components/ReviewItem/ReviewHeader';
import EditReviewPage from '@/pages/ReviewsPage/EditReviewPage';
import ReviewActions from '@/components/ReviewItem/ReviewActions';
import StyledHr from '../StyledHr/StyledHr';
import AverageRating from './AverageRating';
import ReplyModal from './ReplyModal';
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
  Loading,
  ErrorText,
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
  role?: string;
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
  likes?: number;
  dislikes?: number;
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
  // console.log('ReviewStat', user);
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
  const [firstComment, setFirstComment] = useState<any>(null);
  const [trainerData, setTrainerData] = useState<any>(null);
  const [authorProfiles, setAuthorProfiles] = useState<Record<string, any>>({});
  //  const [firstComment, setFirstComment] = useState<CommentData | null>(null);
  const [allComments, setAllComments] = useState<CommentData[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [replyModalData, setReplyModalData] = useState<{
    isOpen: boolean;
    author?: User;
    comment?: CommentData;
  } | null>(null);

  const reviewsToShow = showAll ? allComments : allComments.slice(0, 2);
  // const reviews = useSelector((state: RootState) => state.reviews.reviews);
  // console.log(reviews);

  const fetchReviews = async () => {
    const isTrainerOrClub = user?.role === 'trainer' || user?.role === 'club';
    const userCommentId = isTrainerOrClub
      ? user?.userId
      : user?.user_comments?.[0]?.userCommentId;
    // console.log(userCommentId);
    if (!userCommentId) {
      console.error('Не знайдено userCommentId');
      return;
    }
    try {
      const response = await fetchReviewsByUserCommentId(userCommentId);
      const commentsArray = Array.isArray(response.data)
        ? response.data
        : [response.data];
      const reversedComments = [...commentsArray].reverse();
      console.log('reversedComments', reversedComments);

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
      // console.log('uniqueOwnerIds',uniqueOwnerIds);

      const allUsers = await fetchAllUsers();
      const profilesMap: Record<string, any> = {};

      uniqueOwnerIds.forEach(ownerId => {
        // const reviewedUserId = firstComment?.trainer || firstComment?.club;
        const user = allUsers.find((u: User) => u.userId === ownerId);
        if (user) profilesMap[ownerId] = user;
        // console.log('user', user);
      });

      setAllComments(withAverages);
      setAuthorProfiles(profilesMap);
      setFirstComment(reversedComments[0]);

      setTrainerData({
        userRole: response.role || '',
        sport: response.sport || [],
      });

      // Ініціалізація об'єкта підрахунку оцінок
      const ratingsCount = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
      let total = 0;
      let sum = 0;

      // Перебір всіх коментарів і підрахунок оцінок
      commentsArray.forEach((data: CommentData) => {
        if (data.ratings) {
          Object.entries(data.ratings).forEach(([_, rating]) => {
            if (typeof rating === 'number' && rating >= 1 && rating <= 5) {
              ratingsCount[rating as keyof typeof ratingsCount] += 1;
              sum += rating;
              total += 1;
            }
          });
        }
      });

      setRatings(ratingsCount);
      setTotalReviews(commentsArray.length);
      setAverageRating(total > 0 ? sum / total : 0);
    } catch (error) {
      setError(translate('account_page.error_loading'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [user?.userId]);

  const handleFeedback = (id: string, type: 'like' | 'dislike') => {
    setAllComments(prev =>
      prev.map(allComments =>
        allComments._id === id
          ? {
              ...allComments,
              likes: type === 'like' ? (allComments.likes === 1 ? 0 : 1) : 0,
              dislikes:
                type === 'dislike' ? (allComments.dislikes === 1 ? 0 : 1) : 0,
            }
          : allComments,
      ),
    );
  };

  const handleOpenReplyModal = (comment: CommentData) => {
    const author = authorProfiles[comment.owner];
    setReplyModalData({
      isOpen: true,
      author,
      comment,
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

  // if (loading) return <Loading>Завантаження...</Loading>;
  // if (error) return <ErrorText>{error}</ErrorText>;

  const maxRatingCount = Math.max(...Object.values(ratings), 1); // щоб уникнути ділення на 0
  const targetId = firstComment?.trainer || firstComment?.club || '';
  const isClientProfile = user?.role === 'customer';

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
          <div onClick={() => setIsEditing(true)}>
            {isClientProfile && (
              <ReviewHeader
                title={translate('account_page.leave_review')}
                leftIcon={IconName.Icon_message_chat_01}
                rightIcon={IconName.ARROW_CORNER}
                leftIconStyles={{ opacity: 0 }}
                rightIconStyles={{ width: '32px', height: '32px' }}
              />
            )}
          </div>
        </>
      )}
      {/* Карточки всіх відгуків */}
      <>
        {reviewsToShow.map((comment, index) => {
          const author = authorProfiles[comment.owner];
          // console.log('author',author);
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
                  {' '}
                  {comment.createdAt || comment.updatedAt
                    ? new Date(
                        comment.createdAt ?? comment.updatedAt!,
                      ).toLocaleDateString('en-US', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })
                    : ''}
                </StyledDate>
              </UserInfo>
              <CommentText>{comment.comment}</CommentText>
              {location.pathname !== '/profile/edit/reviews' && (
                <FeedbackSection
                  reviewId={comment._id}
                  likes={comment.likes ?? 0}
                  dislikes={comment.dislikes ?? 0}
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
                        currentUser?.avatar ||
                        '../../../public/assets/images/pngtree-default-red-avatar-png-image_5939361.jpg'
                      }
                    />
                    <Div>
                      <NameIcon>
                        <Name>
                          {currentUser?.firstName} {currentUser?.lastName}
                        </Name>
                        <Icon name={IconName.Icon_ICON} size={12} />
                      </NameIcon>
                      {/* Блок з видами спорту */}
                      <SportList>
                        {currentUser?.role === 'adminClub' ? (
                          <Badge>{translate('account_page.sports-club')}</Badge>
                        ) : (
                          currentUser?.sport?.map(sport => (
                            <SportTag key={sport}>{sport}</SportTag>
                          ))
                        )}
                      </SportList>
                    </Div>
                  </UserInfo>
                  <ReplyContainer>{comment.adminReply}</ReplyContainer>
                  <StyledDate>
                    {comment.updatedAt
                      ? new Date(comment.updatedAt).toLocaleDateString(
                          'en-US',
                          {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          },
                        )
                      : 'Дата не вказана'}
                  </StyledDate>
                </>
              )}
              {!isClientProfile && (
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
      {isEditing && firstComment && trainerData && (
        <EditReviewPage
          review={{
            id: firstComment._id,
            userCommentId: trainerData.userCommentId,
            name: trainerData.name || '',
            surname: trainerData.surname || '',
            avatar: trainerData.avatar || '',
            userRole: trainerData.userRole,
            sport: trainerData.sport || [],
            comment: firstComment.text || '',
            createdAt: firstComment.createdAt,
            updatedAt: firstComment.updatedAt,
            averageRating,
            totalReviews,
            targetId,

            rating: firstComment.rating ?? 0,
            likes: firstComment.likes ?? 0,
            dislikes: firstComment.dislikes ?? 0,
            isFirstReview: firstComment.isFirstReview ?? false,
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
          avatar={
            replyModalData.author?.avatar ||
            '../../../public/assets/images/pngtree-default-red-avatar-png-image_5939361.jpg'
          }
          firstName={replyModalData.author?.firstName || ''}
          lastName={replyModalData.author?.lastName || ''}
          rating={replyModalData.comment.average || 0}
          createdAt={replyModalData.comment.createdAt || ''}
        />
      )}
    </div>
  );
};

export default ReviewStats;
