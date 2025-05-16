import { FC } from 'react';
import GroupTitle from '../GroupTitle/GroupTitle';
import { AddressWrapper, PlaceWrapper } from './styles';
import { IAddressWidget } from '../types';

const AddressWidget: FC<IAddressWidget> = ({
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

export default AddressWidget;
