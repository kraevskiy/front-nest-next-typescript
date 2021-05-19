import {TextareaProps} from "./Textarea.props";
import cn from "classnames";
import styles from "./Textarea.module.css";

export function Textarea ({className, ...props}: TextareaProps): JSX.Element {

  return (
    <textarea className={cn(className, styles.textarea)} {...props}/>
  );
}
