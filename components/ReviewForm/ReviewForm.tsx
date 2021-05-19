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

export const ReviewForm = ({productId, className, ...props}: ReviewFormProps): JSX.Element => {
  const {register, control, handleSubmit, formState: {errors}, reset} = useForm<IReviewForm>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const handleSubmitForm = async (formData: IReviewForm) => {
    try {
      const {data} = await axios.post<AReviewSentResponse>(API.review.createDemo, {...formData, productId});
      if (data.message) {
        // setIsSuccess(true);
        toast.success(<div>🙏 Спасибо <br/> 👍 Ваш отзыв отправлен. <br/> ✍Отзыв будет опубликован после проверки</div>);
        reset();
      } else {
        // setError('😔 Что-то пошло не так');
        toast.error('😔 Что-то пошло не так');
      }
    } catch (err) {
      // setError(err.message);
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
            placeholder="Имя"/>
        </div>
        <div>
          <Input
            {...register('title', {required: {value: true, message: 'Заполните заголовок'}})}
            error={errors.title}
            placeholder="Заголовок отзыва"
            className={styles.title}/>
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
                setRating={field.onChange}/>
            )}
          />
        </div>
        <Textarea
          {...register('description', {required: {value: true, message: 'Заполните описание'}})}
          error={errors.description}
          placeholder="Текст отзыва"
          className={styles.description}/>
        <div className={styles.submit}>
          <Button appearance="primary">Отправить</Button>
          <span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
        </div>
      </div>
    </form>
  );
};
