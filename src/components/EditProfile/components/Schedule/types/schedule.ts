export interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  address?: string;
  city?: string;
  avatar?: string;
}

export interface SearchResults {
  profiles: {
    _id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    description: {
      address?: string;
      city?: string;
    };
  }[];
}

export type ScheduleEntry = {
  _id?: string | undefined;
  day: Date;
  begin: string;
  end: string;
  profile: Profile;
  weekday: string;
  monthShort: string;
};
