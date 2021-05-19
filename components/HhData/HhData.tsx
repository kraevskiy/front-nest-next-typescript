import {HhDataProps} from "./HhData.props";
import cn from 'classnames';
import styles from './HhData.module.css';
import {Card} from "../Card/Card";
import RateIcon from './rate.svg';
import { priceUa } from "../../helpers/helpers";

export const HhData = ({count, juniorSalary, middleSalary, seniorSalary}: HhDataProps): JSX.Element => {

  return (
    <div className={styles.hh}>
      <Card className={styles.count}>
        <div className={styles.title}>Всего Вакансий</div>
        <div className={styles.countValue}>{count}</div>
      </Card>
      <Card className={styles.salary}>
        <div>
          <div className={styles.title}>Начальный</div>
          <div className={styles.salaryValue}>{priceUa(juniorSalary)}</div>
          <div className={styles.rate}>
            <RateIcon className={styles.filled}/>
            <RateIcon/>
            <RateIcon/>
          </div>
        </div>
        <div>
          <div className={styles.title}>Средний</div>
          <div className={styles.salaryValue}>{priceUa(middleSalary)}</div>
          <div className={styles.rate}>
            <RateIcon className={styles.filled}/>
            <RateIcon className={styles.filled}/>
            <RateIcon/>
          </div>
        </div>
        <div>
          <div className={styles.title}>Профессионад</div>
          <div className={styles.salaryValue}>{priceUa(seniorSalary)}</div>
          <div className={styles.rate}>
            <RateIcon className={styles.filled}/>
            <RateIcon className={styles.filled}/>
            <RateIcon className={styles.filled}/>
          </div>
        </div>
      </Card>
    </div>
  );
};
