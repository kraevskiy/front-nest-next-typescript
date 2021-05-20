import {MenuItem} from "../../interfaces/menu.interface";
import {TopLevelCategory} from "../../interfaces/page.interface";

export interface TopCategoryComponentProps {
  pages: MenuItem[];
  firstCategory: TopLevelCategory;
}
