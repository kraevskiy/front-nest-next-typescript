import {ProductProps} from "./Product.props";
import cn from "classnames";
import styles from "./Product.module.css";
import {Card} from "../Card/Card";
import {Rating} from "../Rating/Rating";
import {Tag} from "../Tag/Tag";
import {Button} from "../Button/Button";
import {declOfNum, priceUa} from "../../helpers/helpers";
import {Divider} from "../Divider/Divider";
import Image from "next/image";
import {useRef, useState} from "react";
import {Review} from "../Review/Review";
import {ReviewForm} from "../ReviewForm/ReviewForm";

export function Product({product, className, ...props}: ProductProps): JSX.Element {
  const [isReviewOpen, setIsReviewOpen] = useState<boolean>(false);
  const reviewRef = useRef<HTMLDivElement>(null);

  const handleScrollToReview = () => {
    setIsReviewOpen(true);
    reviewRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div className={className} {...props}>
      <Card className={styles.product}>
        <div className={styles.logo}>
          <Image
            src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
            alt={product.title}
            width={70}
            height={70}
          />
        </div>
        <div className={styles.title}>{product.title}</div>
        <div className={styles.price}>
          {priceUa(product.price)}
          {product.oldPrice &&
          <Tag className={styles.oldPrice} color="green">{priceUa(product.price - product.oldPrice)}</Tag>}
        </div>
        <div className={styles.credit}>
          {priceUa(product.credit)}/<span className={styles.month}>мес</span>
        </div>
        <div className={styles.rating}><Rating rating={product.reviewAvg ?? product.initialRating}/></div>
        <div className={styles.tags}>{product.categories.map(c => <Tag key={c} color="ghost"
                                                                       className={styles.category}>{c}</Tag>)}</div>
        <div className={styles.priceTitle}>Цена</div>
        <div className={styles.creditTitle}>кредит</div>
        <div
          className={styles.rateTitle}><a href="#ref" onClick={handleScrollToReview}>{product.reviewCount} {declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}</a></div>
        <Divider className={styles.hr}/>
        <div className={styles.description}>{product.description}</div>
        <div className={styles.feature}>
          {product.characteristics.map(c => (
            <div className={styles.characteristics} key={c.name}>
              <span className={styles.characteristicsName}>{c.name}</span>
              <span className={styles.characteristicsDots}/>
              <span className={styles.characteristicsValue}>{c.value}</span>
            </div>
          ))}
        </div>
        <div className={styles.advBlock}>
          {product.advantages && (
            <div className={styles.advantages}>
              <div className={styles.advTitle}>Преимущества</div>
              <div className={styles.advText}>{product.advantages}</div>
            </div>
          )}
          {product.disAdvantages && (
            <div className={styles.disadvantages}>
              <div className={styles.advTitle}>Недостатки</div>
              <div className={styles.advText}>{product.disAdvantages}</div>
            </div>
          )}
        </div>
        <Divider className={cn(styles.hr, styles.hr2)}/>
        <div className={styles.actions}>
          <Button appearance="primary">Узнать подробней</Button>
          <Button
            appearance="ghost"
            arrow={isReviewOpen ? 'down' : 'right'}
            onClick={()=> setIsReviewOpen(!isReviewOpen)}
          >Читать отзывы</Button>
        </div>
      </Card>
      <Card color="blue" className={cn(styles.reviews, {
        [styles.opened]: isReviewOpen,
        [styles.closed]: !isReviewOpen
      })} ref={reviewRef}>
        {product.reviews.map(r => (
          <div key={r._id}>
            <Review review={r} />
            <Divider/>
          </div>
        ))}
        <ReviewForm productId={product._id}/>
      </Card>
    </div>
  );
}
