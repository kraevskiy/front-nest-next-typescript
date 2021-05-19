import {DividerProps} from "./Divider.props";
import cn from "classnames";
import styles from "./Divider.module.css";

export function Divider({className, ...props}: DividerProps): JSX.Element {
  return <hr {...props} className={cn(className, styles.hr)}/>;
}
