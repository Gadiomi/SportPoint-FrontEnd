import React, { useRef, useState, useEffect } from 'react';
import { useTheme } from 'styled-components';
import { fonts } from '@/theme/fonts';
import ButtonLink from '../ButtonLink/ButtonLink';

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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        marginTop: '8px',
        marginBottom: '32px',
      }}
    >
      <p
        ref={textRef}
        style={{
          ...fonts.secondManrope,
          color: theme.color.secWhite,
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
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ShortDescriptionCard;
