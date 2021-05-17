import {FooterProps} from "./Footer.props";
import styles from './Footer.module.css';

export function Footer({...props}: FooterProps): JSX.Element {

  return (
    <header {...props}>
     footer
    </header>
  );
}
