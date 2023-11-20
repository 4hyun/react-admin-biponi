import { FC, Fragment, ReactNode } from "react";
import CategorySectionHeader from "./CategorySectionHeader";

// ===============================================================
type CategorySectionCreatorProps = {
  title?: string;
  icon?: ReactNode;
  children: ReactNode;
  seeMoreLink?: string;
};
// ===============================================================

const CategorySectionCreator: FC<CategorySectionCreatorProps> = (props) => {
  const { icon, title, children, seeMoreLink } = props;

  return (
    <Fragment>
      {title && <CategorySectionHeader title={title} seeMoreLink={seeMoreLink} icon={icon} />}
      {children}
    </Fragment>
  );
};

export default CategorySectionCreator;
