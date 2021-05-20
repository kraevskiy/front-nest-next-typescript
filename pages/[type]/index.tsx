import axios from "axios";
import {GetStaticPaths, GetStaticProps, GetStaticPropsContext} from "next";
import {withLayout} from "../../HOC/layout/Layout";
import {MenuItem} from "../../interfaces/menu.interface";
import {firstLevelMenu} from "../../helpers/helpers";
import {ParsedUrlQuery} from "querystring";
import {API} from "../../helpers/api";
import TopCategoryComponent from "../../page-components/TopCategoryComponent/TopCategoryComponent";

function Type({firstCategory, menu: pages}: TypeProps): JSX.Element {
  return <TopCategoryComponent firstCategory={firstCategory} pages={pages}/>;
}


export default withLayout(Type);

// генерируем все пути страниц
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: firstLevelMenu.map(m => '/'+ m.route),
    fallback: true
  };
};

// получаем данные с сервера
export const getStaticProps: GetStaticProps<TypeProps> = async ({params}: GetStaticPropsContext<ParsedUrlQuery>) => {
  // вовращаем 404 если алиас не найден
  if (!params) {
    return {
      notFound: true
    };
  }

  const firstCategoryItem = firstLevelMenu.find(m => m.route === params.type);
  if (!firstCategoryItem) {
    return {
      notFound: true
    };
  }

  const {data: menu} = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory: firstCategoryItem.id
  });

  return {
    props: {
      menu,
      firstCategory: firstCategoryItem.id
    }
  };
};

interface TypeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}
