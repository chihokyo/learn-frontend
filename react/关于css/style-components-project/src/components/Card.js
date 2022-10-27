import React, { memo } from 'react';
import { StyledCard } from './styles/Card.style';

const Card = memo(({ item: { id, title, body, image } }) => {
  return (
    // 在这里 如果是偶数传递一个layout变量row-reverse
    <StyledCard layout={id % 2 === 0 && 'row-reverse'}>
      <div>
        <h2>{title}</h2>
        <p>{body}</p>
      </div>

      <div>
        <img src={`./images/${image}`} alt="img" />
      </div>
    </StyledCard>
  );
});

export default Card;
