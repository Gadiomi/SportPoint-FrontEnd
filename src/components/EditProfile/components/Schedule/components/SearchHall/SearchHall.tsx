// import React from 'react';
// import { Input } from '@/kit';
// import {
//   CitySpan,
//   DescSpan,
//   NameSpan,
//   SearchWorkItems,
//   SearchWorkList,
// } from './SearchHall.styled';
// import {
//   InputsSection,
//   SectionTitle,
// } from '../../../EditGeneral/EditGeneral.styled';
// import {
//   SelectedItem,
//   SelectedItems,
// } from '../../../Selection/Selection.styled';

// interface SearchHallProps {
//   searchTerm: string;
//   handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   isFetching: boolean;
//   view: boolean;
//   searchResults?: {
//     profiles: {
//       _id: string;
//       firstName: string;
//       lastName: string;
//       description: {
//         address?: string;
//         city?: string;
//       };
//     }[];
//   } | null;
//   setSelectedProfile: (profile: {
//     id: string;
//     firstName: string;
//     lastName: string;
//     address?: string;
//     city?: string;
//   }) => void;
//   selectedProfile?:
//     | {
//         id: string;
//         firstName: string;
//         lastName: string;
//         address?: string;
//         city?: string;
//       }[]
//     | null;
//   title: string;
//   label?: string;
// }

// const SearchHall: React.FC<SearchHallProps> = ({
//   searchTerm,
//   handleSearchChange,
//   isFetching,
//   searchResults,
//   setSelectedProfile,
//   selectedProfile,
//   title,
//   view,
//   label,
// }) => {
//   return (
//     <div>
//       <InputsSection view={view}>
//         <SectionTitle>{title}</SectionTitle>
//         {selectedProfile &&
//           selectedProfile?.map(work => (
//             <SelectedItems key={work.id}>
//               <SelectedItem>
//                 {work.firstName}
//                 <span> {work.lastName}</span>
//                 <CitySpan>
//                   ({work?.city}
//                   <span>{work.address}</span>)
//                 </CitySpan>
//               </SelectedItem>
//             </SelectedItems>
//           ))}

//         <Input
//           testId="searchClubs"
//           label={label}
//           value={searchTerm}
//           onChange={handleSearchChange}
//         />
//         {isFetching && <div>Завантаження...</div>}
//         {searchResults?.profiles && searchResults?.profiles?.length > 0 && (
//           <SearchWorkList>
//             {searchResults?.profiles.map(profile => (
//               <SearchWorkItems
//                 key={profile._id}
//                 onClick={() =>
//                   setSelectedProfile({
//                     id: profile._id,
//                     name: profile.name,
//                   })
//                 }
//               >
//                 <CitySpan>
//                   <NameSpan>{profile.name}</NameSpan>( )
//                 </CitySpan>
//               </SearchWorkItems>
//             ))}
//           </SearchWorkList>
//         )}
//         {searchResults?.profiles?.length === 0 && !isFetching && (
//           <div>Нічого не знайдено</div>
//         )}
//       </InputsSection>
//     </div>
//   );
// };

// export default SearchHall;
