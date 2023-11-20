import { FC, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Button, Divider, Typography } from "@mui/material";
import { H5, Small } from "./Typography";

// ==============================================================
type DropZoneProps = {
  title?: string;
  imageSize?: string;
  onChange?: (files: File[]) => void;
};
// ==============================================================

const DropZone: FC<DropZoneProps> = ({ onChange, title, imageSize }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (onChange) onChange(acceptedFiles);
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 10,
    multiple: true,
    accept: { "image/*": [".jpeg", ".png"] },
  });

  return (
    <Box
      display="flex"
      minHeight="200px"
      alignItems="center"
      border="1px dashed"
      borderRadius="10px"
      borderColor="grey.400"
      flexDirection="column"
      justifyContent="center"
      bgcolor={isDragActive ? "grey.200" : "none"}
      sx={{ transition: "all 250ms ease-in-out", outline: "none" }}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <H5 mb={2} color="grey.600">
        {title}
      </H5>

      <Divider sx={{ width: "200px", mx: "auto" }} />

      <Typography
        px={2}
        mb={2}
        mt={-1.25}
        lineHeight="1"
        color="grey.600"
        bgcolor={isDragActive ? "grey.200" : "background.paper"}
      >
        on
      </Typography>

      <Button
        color="primary"
        type="button"
        sx={{ px: "2rem", mb: "22px", bgcolor: "primary.light" }}
      >
        Select files
      </Button>

      <Small color="grey.600">{imageSize}</Small>
    </Box>
  );
};

DropZone.defaultProps = {
  title: "Drag & drop product image here",
  imageSize: "Upload 280*280 image",
};

export default DropZone;
