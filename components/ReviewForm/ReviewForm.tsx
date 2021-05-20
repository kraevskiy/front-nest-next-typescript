import {ReviewFormProps} from "./ReviewForm.props";
import cn from "classnames";
import styles from './ReviewForm.module.css';
import {Input} from "../Input/Input";
import {Rating} from "../Rating/Rating";
import {Textarea} from "../Textarea/Textarea";
import {Button} from "../Button/Button";
import {useForm, Controller} from "react-hook-form";
import {AReviewSentResponse, IReviewForm} from "./ReviewForm.interface";
import axios from "axios";
import {API} from "../../helpers/api";
import {useState} from "react";
import {toast} from "react-toastify";
import CloseIcon from "./close.svg";

export const ReviewForm = ({productId, className, isOpened, ...props}: ReviewFormProps): JSX.Element => {
  const {register, control, handleSubmit, formState: {errors}, reset, clearErrors} = useForm<IReviewForm>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const handleSubmitForm = async (formData: IReviewForm) => {
    try {
      const {data} = await axios.post<AReviewSentResponse>(API.review.createDemo, {...formData, productId});
      if (data.message) {
        setIsSuccess(true);
        toast.success(<div>🙏 Спасибо <br/> 👍 Ваш отзыв отправлен. <br/> ✍Отзыв будет опубликован после проверки
        </div>);
        reset();
      } else {
        setError('😔 Что-то пошло не так');
        toast.error('😔 Что-то пошло не так');
      }
    } catch (err) {
      setError(err.message);
      toast.error('😔 Что-то пошло не так');
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <div
        className={cn(styles.reviewForm, className)}
        {...props}
      >
        <div>
          <Input
            {...register('name', {required: {value: true, message: 'Заполните имя'}})}
            error={errors.name}
            placeholder="Имя"
            tabIndex={isOpened ? 0 : -1}
            aria-invalid={!!errors.name}
          />
        </div>
        <div>
          <Input
            {...register('title', {required: {value: true, message: 'Заполните заголовок'}})}
            error={errors.title}
            placeholder="Заголовок отзыва"
            className={styles.title}
            tabIndex={isOpened ? 0 : -1}
            aria-invalid={!!errors.title}
          />
        </div>
        <div className={styles.rating}>
          <span>Оценка:</span>
          <Controller
            control={control}
            rules={{required: {value: true, message: 'Укажите рейтинг'}, max: 5, min: 1}}
            name="rating"
            render={({field}) => (
              <Rating
                isEditable
                error={errors.rating}
                rating={field.value}
                ref={field.ref}
                setRating={field.onChange}
                tabIndex={isOpened ? 0 : -1}
              />
            )}
          />
        </div>
        <Textarea
          {...register('description', {required: {value: true, message: 'Заполните описание'}})}
          error={errors.description}
          placeholder="Текст отзыва"
          className={styles.description}
          tabIndex={isOpened ? 0 : -1}
          aria-label={'текст отзыва'}
          aria-invalid={!!errors.description}
        />
        <div className={styles.submit}>
          <Button appearance="primary" tabIndex={isOpened ? 0 : -1} onClick={() => clearErrors()}>Отправить</Button>
          <span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
        </div>
      </div>
      {isSuccess && <div className={cn(styles.success, styles.panel)} role="alert">
        <div className={styles.successTitle}>Ваш отзыв отправлен</div>
        <div>Спасибо, ваш отзыв будет опубликован после проверки.</div>
        <button
          className={styles.close}
          onClick={() => setIsSuccess(false)}
          aria-label="Закрыть оповещение"
        >
          <CloseIcon/>
        </button>
      </div>}
      {error && <div className={cn(styles.error, styles.panel)} role="alert">
        Что-то пошло не так, попробуйте обновить страницу
        <button
          className={styles.close}
          onClick={() => setError('')}
          aria-label="Закрыть оповещение"
        >
          <CloseIcon/>
        </button>
      </div>}
    </form>
  );
};
