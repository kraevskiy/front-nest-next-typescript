import {LayoutProps} from "./Layout.props";
import {Header} from "./Header/Header";
import {Sidebar} from "./Sidebar/Sidebar";
import {Footer} from "./Footer/Footer";
import {FunctionComponent, useState, KeyboardEvent, useRef, useEffect} from "react";
import styles from './Layout.module.css';
import {AppContextProvider, IAppContext} from "../../context/app.context";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Up} from "../../components";
import cn from "classnames";
import {useRouter} from "next/router";
import Loader from "../../components/Loader/Loader";

function Layout({children}: LayoutProps): JSX.Element {
  const [isSkipLinkDisplayed, setIsSkipLinkDisplayed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const onLoader = () => setLoading(true);
    const offLoader = () => setLoading(false);

    router.events.on('routeChangeStart', onLoader);
    router.events.on('routeChangeComplete', offLoader);
    router.events.on('routeChangeError', offLoader);

    return () => {
      router.events.off('routeChangeStart', onLoader);
      router.events.off('routeChangeComplete', offLoader);
      router.events.off('routeChangeError', offLoader);
    };
  }, []);

  const skipContentAction = (key: KeyboardEvent) => {
    if(key.code === 'Space' || key.code === 'Enter') {
      key.preventDefault();
      bodyRef.current?.focus();
    }
    setIsSkipLinkDisplayed(false);
  };

  return (
    <div className={styles.wrapper}>
      {loading && <Loader/>}
      <a
        tabIndex={1}
        onFocus={() => setIsSkipLinkDisplayed(true)}
        onKeyDown={skipContentAction}
        className={cn(styles.skipLink, {
          [styles.displayed]: isSkipLinkDisplayed
        })}
      >К содержанию</a>
      <Header className={styles.header}/>
      <Sidebar className={styles.sidebar}/>
      <main className={styles.body} ref={bodyRef} tabIndex={0} role="main">
        {children}
      </main>
      <Footer className={styles.footer}/>
      <Up/>
    </div>
  );
}


export const withLayout = <T extends Record<string, unknown> & IAppContext>(Component: FunctionComponent<T>) => {
  return function withLayoutComponent(props: T): JSX.Element {
    return (
      <AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
        <ToastContainer/>
        <Layout>
          <Component {...props}/>
        </Layout>
      </AppContextProvider>
    );
  };
};
