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
};

export const buttonInfo = {
  general: {
    icon: IconName.ACCOUNT,
    link: '',
    name: '',
  },
};
