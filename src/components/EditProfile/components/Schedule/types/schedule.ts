import React, { Ref } from 'react';

export interface Profile {
  id: string;
  value?: string;
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
export interface SearchWorkProfile {
  _id: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  description: {
    address?: string;
    city?: string;
  };
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

export interface MergedProps {
  searchTerm: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isFetching: boolean;
  view: boolean;
  searchResults?: SearchResults | null;
  setSelectedProfile: React.Dispatch<React.SetStateAction<Profile[]>>;
  selectedProfile: Profile[];
  label?: string;
  setIsCityOpen?: (isOpen: boolean) => void;
  height: string;
  contentRef: Ref<HTMLDivElement> | undefined;
  handler: () => void;
  isOpen: boolean;
  title: string;
  setIsClubOpen?: (isOpen: boolean) => void;
  setSearchTerm?: (value: string) => void;
}
