import { IAddressWidget } from '@/pages/RegisterPage/components/types';
import { FC } from 'react';
import { AddressWrapper, PlaceWrapper } from './WorkWrapper.styled';
import GroupTitle from '@/pages/RegisterPage/components/GroupTitle/GroupTitle';

const WorkWrapper: FC<IAddressWidget> = ({
  handler,
  isOpen,
  title,
  contentRef,
  height,
  $marginBottom,
  children,
}) => {
  return (
    <PlaceWrapper $marginBottom={$marginBottom}>
      <GroupTitle handler={handler} isOpen={isOpen} title={title} />
      <AddressWrapper
        ref={contentRef}
        style={{
          height: height,
          paddingTop: isOpen ? '10px' : '0px',
        }}
      >
        {children}
      </AddressWrapper>
    </PlaceWrapper>
  );
};

export default WorkWrapper;
