import { FC } from "react";
import { Avatar, Typography } from "@mui/material";
import { FlexItemCenter } from "components/flex-box";

// ==============================================================
type TitleBarProps = { title: string; number: number };
// ==============================================================

const TitleBar: FC<TitleBarProps> = ({ title, number }) => {
  return (
    <FlexItemCenter gap={2} mb={3.5}>
      <Avatar
        sx={{
          width: 32,
          height: 32,
          color: "primary.text",
          backgroundColor: "primary.main",
        }}
      >
        {number}
      </Avatar>

      <Typography fontSize={20}>{title}</Typography>
    </FlexItemCenter>
  );
};

export default TitleBar;
