import {withLayout} from "../../HOC/layout/Layout";
import {GetStaticPaths, GetStaticProps, GetStaticPropsContext} from "next";
import axios from "axios";
import {MenuItem} from "../../interfaces/menu.interface";
import {TopLevelCategory, TopPageModel} from "../../interfaces/page.interface";
import {ParsedUrlQuery} from "querystring";
import {ProductModel} from "../../interfaces/product.interface";
import {firstLevelMenu} from "../../helpers/helpers";
import {TopPageComponent} from "../../page-components";
import {API} from "../../helpers/api";

function TopPage({menu, page, products, firstCategory}: TopPagePropsType): JSX.Element {
  return <TopPageComponent
    firstCategory={firstCategory}
    page={page}
    products={products}
  />;
}


export default withLayout(TopPage);

// генерируем все пути страниц
export const getStaticPaths: GetStaticPaths = async () => {
  let paths: string[] = [];

  for (const m of firstLevelMenu) {
    const {data: menu} = await axios.post<MenuItem[]>(API.topPage.find, {
      firstCategory: m.id
    });
    paths = paths.concat(menu.flatMap(s => s.pages.map(p => `/${m.route}/${p.alias}`)));
  }

  return {
    paths,
    fallback: true
  };
};

// получаем данные с сервера
export const getStaticProps: GetStaticProps<TopPagePropsType> = async ({params}: GetStaticPropsContext<ParsedUrlQuery>) => {
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

  try {
    // получаем категории
    const {data: menu} = await axios.post<MenuItem[]>(API.topPage.find, {
      firstCategory: firstCategoryItem.id
    });

    if (menu.length == 0) {
      return {
        notFound: true
      };
    }

    // получаем подкатегории по алиас
    const {data: page} = await axios.get<TopPageModel>(API.topPage.byAlias + params.alias);

    // получаем продукты по категории с лимитом
    const {data: products} = await axios.post<ProductModel[]>(API.product.find, {
      category: page.category,
      limit: 10
    });

    return {
      props: {
        menu,
        firstCategory: firstCategoryItem.id,
        page,
        products
      }
    };
  } catch (e) {
    return {
      notFound: true
    };
  }
};

// описание входящих параметров
interface TopPagePropsType extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: TopLevelCategory;
  page: TopPageModel;
  products: ProductModel[];
}
