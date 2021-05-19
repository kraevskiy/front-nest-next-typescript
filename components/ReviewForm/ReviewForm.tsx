import {ReviewFormProps} from "./ReviewForm.props";
import cn from "classnames";
import styles from './ReviewForm.module.css';
import {Input} from "../Input/Input";
import {Rating} from "../Rating/Rating";
import {Textarea} from "../Textarea/Textarea";
import {Button} from "../Button/Button";
import CloseIcon from "./close.svg";
import {useForm, Controller} from "react-hook-form";
import {IReviewForm} from "./ReviewForm.interface";

export const ReviewForm = ({productId, className, ...props}: ReviewFormProps): JSX.Element => {
  const {register, control, handleSubmit} = useForm<IReviewForm>();

  const handleSubmitForm = (data: IReviewForm) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <div
        className={cn(styles.reviewForm, className)}
        {...props}
      >
        <div>
          <Input {...register('name')} placeholder="Имя"/>
        </div>
        <div>
          <Input {...register('title')} placeholder="Заголовок отзыва" className={styles.title}/>
        </div>
        <div className={styles.rating}>
          <span>Оценка:</span>
          <Controller
            control={control}
            name="rating"
            render={({field})=> (
              <Rating isEditable rating={field.value} ref={field.ref} setRating={field.onChange}/>
            )}
          />
        </div>
        <Textarea {...register('description')} placeholder="Текст отзыва" className={styles.description}/>
        <div className={styles.submit}>
          <Button appearance="primary">Отправить</Button>
          <span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
        </div>
      </div>
      <div className={styles.success}>
        <div className={styles.successTitle}>Ваш отзыв отправлен</div>
        <div>Спасибо, ваш отзыв будет лпубликован после проверки</div>
        <CloseIcon className={styles.close}/>
      </div>
    </form>
  );
};
