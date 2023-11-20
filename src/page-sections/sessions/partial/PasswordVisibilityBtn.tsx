import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const PasswordVisibilityBtn = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const togglePasswordVisibility = () => setPasswordVisibility((visible) => !visible);

  return (
    <IconButton size="small" type="button" onClick={togglePasswordVisibility}>
      {passwordVisibility ? (
        <Visibility fontSize="small" sx={{ color: "grey.600" }} />
      ) : (
        <VisibilityOff fontSize="small" sx={{ color: "grey.400" }} />
      )}
    </IconButton>
  );
};

export default PasswordVisibilityBtn;
