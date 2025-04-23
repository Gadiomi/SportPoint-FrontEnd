import React, { useRef, useState, useEffect } from 'react';
import { useTheme } from 'styled-components';
import { fonts } from '@/theme/fonts';
import StyledHr from '../../../../components/StyledHr/StyledHr';
import ButtonLink from '../ButtonLink/ButtonLink';
import { ShortDescriptionContainer } from './styles';

interface ShortDescriptionCardProps {
  short_desc: string | undefined;
  title: string;
}

const ShortDescriptionCard: React.FC<ShortDescriptionCardProps> = ({
  short_desc,
  title,
}) => {
  const theme = useTheme();
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const [isOverflowing, setIsOverflowing] = useState<boolean>(false);
  const [isFullTextVisible, setIsFullTextVisible] = useState<boolean>(false);

  useEffect(() => {
    if (textRef.current) {
      const element = textRef.current;
      if (element.scrollHeight > element.clientHeight) {
        setIsOverflowing(true);
      } else {
        setIsOverflowing(false);
      }
    }
  }, [short_desc]);

  const toggleFullText = () => {
    setIsFullTextVisible(true);
  };

  return (
    <ShortDescriptionContainer>
      <p
        ref={textRef}
        style={{
          ...fonts.secondManrope,
          color: theme.color.secWhite,
          marginBottom: '32px',
          display: '-webkit-box',
          overflow: 'hidden',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: isFullTextVisible ? 'none' : 4,
        }}
      >
        {short_desc}
      </p>
      {isOverflowing && !isFullTextVisible && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: '2px 8px',
          }}
        >
          <ButtonLink
            title={title}
            buttonText={title}
            onClick={toggleFullText}
            style={{
              ...fonts.secondManrope,
              color: theme.color.white,
              marginBottom: '32px',
            }}
          />
        </div>
      )}
      <StyledHr />
    </ShortDescriptionContainer>
  );
};

export default ShortDescriptionCard;
