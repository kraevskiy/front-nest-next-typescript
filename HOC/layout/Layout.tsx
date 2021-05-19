import {LayoutProps} from "./Layout.props";
import {Header} from "./Header/Header";
import {Sidebar} from "./Sidebar/Sidebar";
import {Footer} from "./Footer/Footer";
import {FunctionComponent} from "react";
import styles from './Layout.module.css';
import {AppContextProvider, IAppContext} from "../../context/app.context";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Layout({children}: LayoutProps): JSX.Element {

  return (
    <div className={styles.wrapper}>
      <Header className={styles.header}/>
      <Sidebar className={styles.sidebar}/>
      <div className={styles.body}>
        {children}
      </div>
      <Footer className={styles.footer}/>
    </div>
  );
}


export const withLayout = <T extends Record<string, unknown> & IAppContext>(Component: FunctionComponent<T>) => {
  return function withLayoutComponent(props: T): JSX.Element {
    return (
      <AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
        <Layout>
          <ToastContainer />
          <Component {...props}/>
        </Layout>
      </AppContextProvider>
    );
  };
};
