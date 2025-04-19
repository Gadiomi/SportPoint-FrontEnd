import { Container } from '@/components/ContainerAndSection';
import React from 'react';
import { ClubCard } from '@/components/ClubCard/ClubCard';
import {
  Loading,
  StyledButtonBack,
} from '../HomePage/components/TrainersList/styles';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ButtonAppearance, Icon, IconName } from '@/kit';

import { t } from 'i18next';
import { SearchResultParams } from '@/types';
import { StyledClubsList } from '../HomePage/components/ClubsList/styles';
import { useLazySearchQuery } from '@/redux/search/searchApi';

import { useEffect } from 'react';
import CoachCard from '@/components/CoachCard/CoachCard';

export const ResultList: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const [trigger, { data, isLoading }] = useLazySearchQuery();

  useEffect(() => {
    if (query) {
      trigger(query);
    }
  }, [query, trigger]);

  return (
    <Container styles={{ alignItems: 'flex-end', padding: '16px 0px' }}>
      {isLoading ? (
        <Loading>{t('home_page.loading')}...</Loading>
      ) : (
        <>
          <StyledButtonBack
            onClick={() => navigate(`/`)}
            testId="resultBack"
            title={t('resultBack')}
            appearance={ButtonAppearance.UNDERLINED}
            appendChild={<Icon name={IconName.ARROW_LEFT} />}
          />

          {data?.profiles?.length ? (
            <StyledClubsList>
              {data?.profiles?.map((profile: SearchResultParams) => {
                if (profile.role === 'coach') {
                  return <CoachCard key={profile._id} coachData={profile} />;
                }

                if (profile.role === 'adminClub') {
                  return <ClubCard key={profile._id} clubData={profile} />;
                }

                return null;
              })}
            </StyledClubsList>
          ) : (
            <Loading>{`Не зайдено результатів за запитом "${query}"`}</Loading>
          )}
        </>
      )}
    </Container>
  );
};
