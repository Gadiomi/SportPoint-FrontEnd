import { IconName } from '@/kit';

type TIconName = {
  [ttl: string]: IconName;
};

export const ThisIconName: TIconName = {
  general: IconName.ACCOUNT,
  change_password: IconName.ID,
  reviews: IconName.MASSAGE_TYPING,
  favorites: IconName.HEART_NONE,
  online_appointment: IconName.SCHEDULE,
  // ---
  chat: IconName.CHAT,
  class_schedule: IconName.CLASS_SCHEDULE,
  coaches_work_schedule: IconName.CALENDAR,
  club_reviews: IconName.Icon_message_chat_01,
  statistics: IconName.STATISTICS,
  add_coaches: IconName.TRAINER,
  add_coaches_to_gims: IconName.CLUB,
  add_club_services: IconName.SERVICES,
  payment_method: IconName.PAYMENT_METHOD,
  edit_profile: IconName.ACCOUNT,
};

export const buttonInfo = {
  general: {
    icon: IconName.ACCOUNT,
    link: '',
    name: '',
  },
};
