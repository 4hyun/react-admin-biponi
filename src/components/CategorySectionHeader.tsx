import Link from "next/link";
import { FC, ReactNode } from "react";
import ArrowRight from "@mui/icons-material/ArrowRight";
import { H2 } from "./Typography";
import { FlexBetween, FlexItemCenter } from "./flex-box";

// ===========================================================
type CategorySectionHeaderProps = {
  title?: string;
  icon?: ReactNode;
  seeMoreLink?: string;
};
// ===========================================================

const CategorySectionHeader: FC<CategorySectionHeaderProps> = (props) => {
  const { title, seeMoreLink, icon } = props;

  return (
    <FlexBetween gap={1} mb={3}>
      <FlexItemCenter gap={1}>
        {icon && <FlexItemCenter>{icon}</FlexItemCenter>}

        <H2 fontWeight="bold" lineHeight="1">
          {title}
        </H2>
      </FlexItemCenter>

      {seeMoreLink && (
        <Link href={seeMoreLink}>
          <FlexItemCenter color="grey.600">
            View all
            <ArrowRight fontSize="small" color="inherit" />
          </FlexItemCenter>
        </Link>
      )}
    </FlexBetween>
  );
};

export default CategorySectionHeader;
