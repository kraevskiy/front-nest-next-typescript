import {TagProps} from "./Tag.props";
import cn from 'classnames';
import styles from './Tag.module.css';

export function Tag ({size = 's', children, color = 'ghost', href, className, ...props}: TagProps): JSX.Element {

  return (
    <div
      className={cn(styles.tag, className, {
        [styles.s]: size === 's',
        [styles.m]: size === 'm',
        [styles.ghost]: color === 'ghost',
        [styles.primary]: color === 'primary',
        [styles.red]: color === 'red',
        [styles.grey]: color === 'grey',
        [styles.green]: color === 'green',
      })}
    >
      {href
        ? <a href={href}>{children}</a>
        : <>{children}</>
      }
    </div>
  );
}
