import {TopCategoryComponentProps} from "./TopCategoryComponent.props";
import {Htag} from "../../components";
import Link from 'next/link';
import {firstLevelMenu} from "../../helpers/helpers";
import styles from "./TopCategoryComponent.module.css";

const TopCategoryComponent = ({firstCategory, pages}:TopCategoryComponentProps):JSX.Element => {
  const categoryType = firstLevelMenu[firstCategory];

  if(!pages.length) {
    return (
      <div>
        <Htag tag="h3">Простите данной категории пока нету</Htag>
      </div>
    );
  }
  return (
    <div>
      {pages.map(p=>(
        <div key={p._id.secondCategory}>
          <Htag tag="h3">{p._id.secondCategory}</Htag>
          <ul>
            {p.pages.map(c => (
              <li key={c._id}>
                <Link href={`/${categoryType.route}/${c.alias}`}>
                  <a className={styles.link}>{c.category} 🔗</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default TopCategoryComponent;
