import { CSSProperties, FC } from 'react';
import { RingLoader } from 'react-spinners';
import { LoaderWrapper } from './styles';

interface IBigLoaderProps {
  isLoading: boolean;
}

const BigLoader: FC<IBigLoaderProps> = ({ isLoading }) => {
  const override: CSSProperties = {
    display: 'block',
    margin: '0 auto',
    borderColor: 'red',
  };

  return (
    <LoaderWrapper>
      <RingLoader
        size={280}
        color={'#ed772f'}
        cssOverride={override}
        loading={isLoading}
        aria-label="Loading Spinner"
      />
    </LoaderWrapper>
  );
};

export default BigLoader;
