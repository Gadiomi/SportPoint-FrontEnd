import React from 'react';
import { InputsSection, SectionTitle } from '../EditGeneral/EditGeneral.styled';
import { Input } from '@/kit';
import { SelectedItem, SelectedItems } from '../Selection/Selection.styled';
import {
  CitySpan,
  DescSpan,
  NameSpan,
  SearchWorkItems,
  SearchWorkList,
} from './SearchWork.styled';
import { SearchResults } from '../Schedule/types/schedule';

interface SearchWorkProps {
  searchTerm: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isFetching: boolean;
  view: boolean;
  searchResults?: SearchResults | null;

  setSelectedProfile: (profile: {
    id: string;
    firstName: string;
    lastName: string;
    address?: string;
    city?: string;
    avatar?: string;
  }) => void;
  selectedProfile?:
    | {
        id: string;
        firstName: string;
        lastName: string;
        address?: string;
        city?: string;
        avatar?: string;
      }[]
    | null;
  title: string;
  label?: string;
}

const SearchWork: React.FC<SearchWorkProps> = ({
  searchTerm,
  handleSearchChange,
  isFetching,
  searchResults,
  setSelectedProfile,
  selectedProfile,
  title,
  view,
  label,
}) => {
  return (
    <div>
      <InputsSection view={view}>
        <SectionTitle>{title}</SectionTitle>
        {selectedProfile &&
          selectedProfile?.map(work => (
            <SelectedItems key={work.id}>
              <SelectedItem>
                {work.firstName}
                <span> {work.lastName}</span>
                <CitySpan>
                  ({work?.city}
                  <span>{work.address}</span>)
                </CitySpan>
              </SelectedItem>
            </SelectedItems>
          ))}

        <Input
          testId="searchClubs"
          label={label}
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {isFetching && <div>Завантаження...</div>}
        {searchResults?.profiles && searchResults?.profiles?.length > 0 && (
          <SearchWorkList>
            {searchResults?.profiles.map(profile => (
              <SearchWorkItems
                key={profile._id}
                onClick={() =>
                  setSelectedProfile({
                    id: profile._id,
                    firstName: profile.firstName,
                    lastName: profile.lastName,
                    address: profile.description?.address || 'Адреса відсутня',
                    city: profile.description?.city || 'Місто відсутнє',
                    avatar: profile.avatar,
                  })
                }
              >
                <CitySpan>
                  <NameSpan>
                    {profile.firstName} {profile.lastName}
                  </NameSpan>
                  (
                  <DescSpan>
                    {profile.description?.city || 'Місто відсутнє'}
                    <span>
                      {profile.description?.address || 'Адреса відсутня'}
                    </span>
                  </DescSpan>
                  )
                </CitySpan>
              </SearchWorkItems>
            ))}
          </SearchWorkList>
        )}
        {searchResults?.profiles?.length === 0 && !isFetching && (
          <div>Нічого не знайдено</div>
        )}
      </InputsSection>
    </div>
  );
};

export default SearchWork;
