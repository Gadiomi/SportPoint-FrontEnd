import React from 'react';
import { InputsSection, SectionTitle } from '../EditGeneral/EditGeneral.styled';
import { Input } from '@/kit';
import { SelectedItem, SelectedItems } from '../Selection/Selection.styled';
import { SearchWorkItems, SearchWorkList } from './SearchWork.styled';

interface SearchWorkProps {
  searchTerm: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isFetching: boolean;
  searchResults: {
    profiles: {
      _id: string;
      firstName: string;
      lastName: string;
      description: {
        address?: string;
        city?: string;
      };
    }[];
  } | null;
  setSelectedProfile: (profile: {
    id: string;
    firstName: string;
    lastName: string;
    address?: string;
    city?: string;
  }) => void;
  selectedProfile:
    | {
        id: string;
        firstName: string;
        lastName: string;
        address?: string;
        city?: string;
      }[]
    | null;
  title: string;
}

const SearchWork: React.FC<SearchWorkProps> = ({
  searchTerm,
  handleSearchChange,
  isFetching,
  searchResults,
  setSelectedProfile,
  selectedProfile,
  title,
}) => {
  return (
    <div>
      <InputsSection>
        <SectionTitle>{title}</SectionTitle>
        <SelectedItems>
          {selectedProfile &&
            selectedProfile?.map(work => (
              <SelectedItem key={work.id}>
                {work.firstName}
                <span> {work.lastName}</span>
                <span>
                  ({work?.city}\{work.address})
                </span>
              </SelectedItem>
            ))}
        </SelectedItems>

        <Input
          testId="searchClubs"
          label="Пошук клубів"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Введіть назву клубу"
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
                    city: profile.description?.address,
                  })
                }
              >
                <strong>
                  {profile.firstName} {profile.lastName}
                </strong>
                -<span>{profile.description?.city}</span>(
                {profile.description?.address || 'Адреса відсутня'})
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
