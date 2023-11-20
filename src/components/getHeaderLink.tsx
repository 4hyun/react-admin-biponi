import Link from "next/link";
import Button from "@mui/material/Button";

const getHeaderLink = (link: string, title: string) => {
  return (
    <Button
      color="primary"
      href={link}
      LinkComponent={Link}
      sx={{ bgcolor: "primary.light", px: 4 }}
    >
      {title}
    </Button>
  );
};

export default getHeaderLink;
