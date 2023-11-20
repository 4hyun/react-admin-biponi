import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";

const TableRow = styled(Card)({
  display: "flex",
  flexWrap: "wrap",
  cursor: "pointer",
  alignItems: "center",
  borderRadius: "10px",
  "& > *": { flex: "1 1 0" },
  "& .pre": { whiteSpace: "pre" },
});

export default TableRow;
