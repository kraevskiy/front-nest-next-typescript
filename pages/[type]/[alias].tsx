import {withLayout} from "../../HOC/layout/Layout";
import {GetStaticPaths, GetStaticProps, GetStaticPropsContext} from "next";
import axios from "axios";
import {MenuItem} from "../../interfaces/menu.interface";
import {TopLevelCategory, TopPageModel} from "../../interfaces/page.interface";
import {ParsedUrlQuery} from "querystring";
import {ProductModel} from "../../interfaces/product.interface";
import {firstLevelMenu} from "../../helpers/helpers";

function Course({menu, page, products}: CourseProps): JSX.Element {
  return (
    <>
      {products && products.length}
    </>
  );
}


export default withLayout(Course);

// генерируем все пути страниц
export const getStaticPaths: GetStaticPaths = async () => {
  let paths: string[] = [];

  for (const m of firstLevelMenu) {
    const {data: menu} = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
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
export const getStaticProps: GetStaticProps<CourseProps> = async ({params}: GetStaticPropsContext<ParsedUrlQuery>) => {
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
    const {data: menu} = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
      firstCategory: firstCategoryItem.id
    });

    if(menu.length == 0) {
      return {
        notFound: true
      };
    }

    // получаем подкатегории по алиас
    const {data: page} = await axios.get<TopPageModel>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/byAlias/' + params.alias);

    // получаем продукты по категории с лимитом
    const {data: products} = await axios.post<ProductModel[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/product/find/', {
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
interface CourseProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: TopLevelCategory;
  page: TopPageModel;
  products: ProductModel[];
}
