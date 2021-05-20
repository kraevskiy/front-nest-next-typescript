import styles from './Up.module.css';
import {useScrollY} from "../../hooks/useScrollY";
import {motion, useAnimation} from "framer-motion";
import {useEffect} from "react";
import {ButtonIcon} from "../ButtonIcon/ButtonIcon";

export const Up = (): JSX.Element => {
  const controls = useAnimation();
  const y = useScrollY();

  useEffect(() => {
    controls.start({opacity: y / document.body.scrollHeight});
  }, [y, controls]);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <motion.div
      animate={controls}
      initial={{opacity: 0}}
      className={styles.up}>
      <ButtonIcon onClick={handleClick} appearance="primary" icon="up"/>
    </motion.div>
  );
};
