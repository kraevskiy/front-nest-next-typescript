import React, {useContext} from "react";
import Link from 'next/link';
import cn from 'classnames';
import {useRouter} from "next/router";
import {FirstLevelMenuItem, PageItem} from "../../../interfaces/menu.interface";
import {AppContext} from "../../../context/app.context";
import styles from './Menu.module.css';
import {firstLevelMenu} from "../../../helpers/helpers";
import {motion} from "framer-motion";

export function Menu(): JSX.Element {
  const {menu, setMenu, firstCategory} = useContext(AppContext);
  const router = useRouter();

  const variants = {
    visible: {
      marginBottom: 20,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    hidden: {marginBottom: 0}
  };

  const variantsChildren = {
    visible: {
      opacity: 1,
      maxHeight: 40,
      x: 0
    },
    hidden: {
      opacity: 0,
      maxHeight: 0,
      x: 100
    }
  };

  const handleOpenSecondLevel = (secondCategory: string) => {
    setMenu && setMenu(menu.map(m => {
      if (m._id.secondCategory === secondCategory) {
        m.isOpened = !m.isOpened;
      }
      return m;
    }));
  };

  const buildFirstLevel = () => {

    return (
      <>
        {firstLevelMenu.map(m => (
          <div key={m.route}>
            <Link href={`/${m.route}`}>
              <a>
                <div className={cn(styles.firstLevel, {
                  [styles.firstLevelActive]: m.id === firstCategory
                })}>
                  {m.icon}
                  <span>{m.name}</span>
                </div>

              </a>
            </Link>
            {m.id === firstCategory && buildSecondLevel(m)}
          </div>
        ))}
      </>
    );
  };

  const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
    return (
      <div className={styles.secondBlock}>
        {menu.map(m => {
          if (m.pages.map(p => p.alias).includes(router.asPath.split("/")[2])) {
            m.isOpened = true;
          }
          return (
            <div key={m._id.secondCategory}>
              <div className={styles.secondLevel} onClick={() => handleOpenSecondLevel(m._id.secondCategory)}>
                {m._id.secondCategory}
              </div>
              <motion.div
                layout
                variants={variants}
                initial={m.isOpened ? 'visible' : 'hidden'}
                animate={m.isOpened ? 'visible' : 'hidden'}
                className={cn(styles.secondLevelBlock)}>
                {buildThirdLevel(m.pages, menuItem.route)}
              </motion.div>
            </div>
          );
        })}
      </div>
    );
  };

  const buildThirdLevel = (pages: PageItem[], route: string) => {
    return (
      pages.map(p => (
        <motion.div key={p.alias} variants={variantsChildren}>
          <Link href={`/${route}/${p.alias}`}>
            <a className={cn(styles.thirdLevel, {
              [styles.thirdLevelActive]: `/${route}/${p.alias}` === router.asPath
            })}>
              - {p.category}
            </a>
          </Link>
        </motion.div>
      ))
    );
  };

  return (
    <div className={styles.menu}>
      {buildFirstLevel()}
    </div>
  );
}
