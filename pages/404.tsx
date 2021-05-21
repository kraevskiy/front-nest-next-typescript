import {Htag, P} from "../components";
import {withLayout} from "../HOC/layout/Layout";

export function Error404(): JSX.Element {

  return (
    <>
      <Htag tag="h1">Ошибка 404</Htag>
      <P>страница не найдена</P>
    </>
  );
}


export default withLayout(Error404);
