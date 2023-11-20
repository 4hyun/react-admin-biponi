import { FC, Fragment, useState } from "react";
import { Button, Divider, Grid, IconButton, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Delete from "@mui/icons-material/Delete";
import { FieldArray, Formik } from "formik";
import { toast } from "react-hot-toast";
import axios from "axios";
// custom components
import Loading from "components/Loading";
import { H3 } from "components/Typography";
import FlexBox from "components/flex-box/FlexBox";
// custom hook
import useFetchSiteSetting from "hooks/useFetchSiteSetting";
// api route param slug list
import { db_slug } from "utils/constants";
// utils function for show error message
import getErrorMessage from "utils/getErrorMessage";

const TopbarSetting: FC = () => {
  const [loadingButton, setLoadingButton] = useState(false);
  const { data, loading, refetch } = useFetchSiteSetting(`/api/settings/${db_slug.topbar_setting}`);

  const initialValues = {
    phone: data?.phone || "",
    email: data?.email || "",
    links: data?.links || [{ id: 1, name: "", link: "" }],
  };

  const handleFormSubmit = async (values: typeof initialValues) => {
    setLoadingButton(true);

    try {
      const { phone, email, links } = values;
      await axios.post("/api/settings/topbar", { phone, email, links });
      toast.success("Setting Updated successfully");
      refetch();
      setLoadingButton(false);
    } catch (error) {
      toast.error(getErrorMessage(error));
      setLoadingButton(false);
    }
  };

  // SHOW LOADING STATUS WHEN DATA FETCHING
  if (loading) return <Loading />;

  return (
    <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
      {({ values, handleChange, handleBlur, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <H3>Top Bar Left Content</H3>
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                name="phone"
                label="Phone"
                onBlur={handleBlur}
                value={values.phone}
                onChange={handleChange}
                placeholder="0000000000"
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                name="email"
                label="Email"
                onBlur={handleBlur}
                value={values.email}
                onChange={handleChange}
                placeholder="email@example.com"
              />
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <FieldArray
              name="links"
              render={(arrayHelper) => (
                <Fragment>
                  <Grid item xs={12}>
                    <FlexBox alignItems="center" justifyContent="space-between">
                      <H3>Top Bar Right</H3>

                      <Button
                        color="primary"
                        variant="contained"
                        onClick={() => {
                          arrayHelper.push({ id: Date.now(), name: "", link: "" });
                        }}
                      >
                        Add Item
                      </Button>
                    </FlexBox>
                  </Grid>

                  {values.links?.map((item: any, index: number) => (
                    <Grid item container spacing={2} key={item.id}>
                      <Grid item xs={5}>
                        <TextField
                          fullWidth
                          label="Name"
                          value={item.name}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name={`links.${index}.name`}
                        />
                      </Grid>

                      <Grid item xs={5}>
                        <TextField
                          fullWidth
                          label="Link"
                          value={item.link}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name={`links.${index}.link`}
                        />
                      </Grid>

                      <Grid item xs={2}>
                        <IconButton onClick={() => arrayHelper.remove(index)}>
                          <Delete />
                        </IconButton>
                      </Grid>
                    </Grid>
                  ))}
                </Fragment>
              )}
            />

            <Grid item xs={12}>
              <LoadingButton
                type="submit"
                color="primary"
                variant="contained"
                loading={loadingButton}
              >
                Save Changes
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default TopbarSetting;
