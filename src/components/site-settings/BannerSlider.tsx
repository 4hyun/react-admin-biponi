import Image from "next/image";
import { FC, FormEvent, useEffect, useState } from "react";
import { Grid, styled, Box } from "@mui/material";
import Clear from "@mui/icons-material/Clear";
import LoadingButton from "@mui/lab/LoadingButton";
import toast from "react-hot-toast";
import axios from "axios";
// custom components
import Loading from "components/Loading";
import DropZone from "components/DropZone";
import FlexBox from "components/flex-box/FlexBox";
// custom hook
import useFetchSiteSetting from "hooks/useFetchSiteSetting";
// api route param slug list
import { db_slug } from "utils/constants";
// utils function for show error message
import getErrorMessage from "utils/getErrorMessage";

// styled components
const UploadBox = styled(Box)({
  width: 170,
  height: 47,
  borderRadius: 4,
  position: "relative",
});

const StyledClear = styled(Clear)({
  top: 5,
  right: 5,
  fontSize: 14,
  color: "red",
  cursor: "pointer",
  position: "absolute",
});

// ==============================================================
interface FileType extends File {
  preview: string;
}

type ImageType = { location: string; key?: string };
// ==============================================================

const BannerSlider: FC = () => {
  const [newFiles, setNewFiles] = useState<FileType[]>([]);
  const [loadingButton, setLoadingButton] = useState(false);
  const [oldFiles, setOldFiles] = useState<ImageType[]>([]);
  const [deletedImages, setDeletedImages] = useState<ImageType[]>([]);
  const { data, loading, refetch } = useFetchSiteSetting(`/api/settings/${db_slug.banner_slider}`);

  useEffect(() => {
    if (data) setOldFiles(data);
  }, [data]);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoadingButton(true);
    const formData = new FormData();
    formData.append("delete", JSON.stringify(deletedImages));
    newFiles.forEach((file: File) => formData.append("files", file));

    try {
      await axios.post("/api/settings/slide", formData);
      toast.success("Data updated successfully");
      refetch();
      setNewFiles([]);
      setDeletedImages([]);
      setLoadingButton(false);
    } catch (error) {
      toast.error(getErrorMessage(error));
      setLoadingButton(false);
    }
  };

  // upload images handler
  const handleOnChangeDropZone = (files: File[]) => {
    const uploadFiles = files.map((file) =>
      Object.assign(file, { preview: URL.createObjectURL(file) })
    );
    setNewFiles(uploadFiles);
  };

  // delete uploaded images handler
  const deleteOldImage = (image: ImageType) => {
    setOldFiles((state) => state.filter((item) => item.location !== image.location));
    setDeletedImages((state) => [...state, image]);
  };

  // delete new uploaded images handler
  const deleteNewImage = (name: string) => {
    setNewFiles((state) => state.filter((item) => item.name !== name));
  };

  // SHOW LOADING STATUS WHEN DATA FETCHING
  if (loading) return <Loading />;

  return (
    <form onSubmit={handleFormSubmit} encType="multipart/form-data">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <DropZone
            title="Drag and Drop slide image here"
            imageSize="upload landscape photo"
            onChange={handleOnChangeDropZone}
          />

          <FlexBox gap={1} mt={2}>
            {oldFiles.map((item, index) => (
              <UploadBox key={index}>
                <Image fill src={item.location} alt="banner" style={{ objectFit: "contain" }} />
                <StyledClear onClick={() => deleteOldImage(item)} />
              </UploadBox>
            ))}

            {newFiles?.map((file, index) => (
              <UploadBox key={index}>
                <Image fill src={file.preview} alt="banner" style={{ objectFit: "contain" }} />
                <StyledClear onClick={() => deleteNewImage(file.name)} />
              </UploadBox>
            ))}
          </FlexBox>
        </Grid>

        <Grid item xs={12}>
          <LoadingButton type="submit" color="primary" variant="contained" loading={loadingButton}>
            Save Changes
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default BannerSlider;
