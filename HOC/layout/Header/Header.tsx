import {HeaderProps} from "./Header.props";
import styles from './Header.module.css';

export function Header({...props}: HeaderProps): JSX.Element {

  return (
    <header {...props}>
     header
    </header>
  );
}
