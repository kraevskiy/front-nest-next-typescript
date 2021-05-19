import {useEffect, useState, KeyboardEvent, forwardRef, ForwardedRef} from "react";
import {RatingProps} from "./Rating.props";
import cn from 'classnames';
import styles from './Rating.module.css';
import StarIcon from './star.svg';

export const Rating = forwardRef(({isEditable = false, rating, setRating, ...props}: RatingProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
  const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

  useEffect(() => {
    constructRating(rating);
  }, [rating]);

  const constructRating = (currentRating: number) => {
    const updatedArray = ratingArray.map((r: JSX.Element, i: number) => {
      return (
        <span
          className={cn(styles.star, {
            [styles.filled]: i < currentRating,
            [styles.editable]: isEditable
          })}
          onMouseEnter={() => handleChangeDisplay(i + 1)}
          onMouseLeave={() => handleChangeDisplay(rating)}
          onClick={() => handleClick(i + 1)}
        >
          <StarIcon
            tabIndex={isEditable ? 0 : -1}
            onKeyDown={(e: KeyboardEvent<SVGElement>) => isEditable && handleSpace(i + 1, e)}
          />
        </span>
      );
    });
    setRatingArray(updatedArray);
  };

  const handleClick = (i: number) => {
    if (!isEditable || !setRating) return;
    setRating(i);
  };

  const handleChangeDisplay = (i: number) => {
    if (!isEditable) return;
    constructRating(i);
  };

  const handleSpace = (i: number, e: KeyboardEvent<SVGElement>) => {
    if (e.code !== 'Space' || !setRating) return;
    setRating(i);
  };

  return (
    <div
      ref={ref}
      {...props}
    >
      {ratingArray.map((r, i) => (
        <span key={i}>
          {r}
        </span>
      ))}
    </div>
  );
});
