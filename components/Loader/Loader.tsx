import {LoaderProps} from "./Loader.props";
import styles from "./Loader.module.css";
import cn from "classnames";

const Loader = ({...props}: LoaderProps): JSX.Element => {

  return (
    <div
      {...props}
      className={styles.wrapper}
    >
      <div/>
      <div/>
      <div/>
      <div/>
      <div className={cn(styles.loader, styles.loader21)}>
        <div className={cn(styles.cssTimes, styles.times1)}/>
        <div className={cn(styles.cssTimes, styles.times2)}/>
        <div className={cn(styles.cssTimes, styles.times3)}/>
      </div>
      <div/>
      <div/>
      <div/>
    </div>
  );
};

export default Loader;
