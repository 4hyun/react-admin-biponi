import { ReactElement, useEffect, useState } from "react";
import { Button, IconButton } from "@mui/material";
import { Construction, Delete, Edit } from "@mui/icons-material";
import { ItemInterface, ReactSortable } from "react-sortablejs";
import { toast } from "react-hot-toast";
import axios from "axios";
// custom components
import appIcons from "components/icons";
import Loading from "components/Loading";
import TableRow from "components/TableRow";
import { H5 } from "components/Typography";
import FlexBox from "components/flex-box/FlexBox";
import ConfirmationAlert from "components/ConfirmationAlert";
import ServiceForm from "components/service-type/ServiceForm";
import DashboardPageHeader from "components/DashboardPageHeader";
// api route param slug list
import { db_slug } from "utils/constants";
// layout
import { NextPageWithLayout } from "../../_app";
import AdminDashboardLayout from "components/layouts/admin-dashboard/Layout";
// utils function for show error message
import getErrorMessage from "utils/getErrorMessage";
// service & icon keys data type for typescript
import { Service } from "__types__/common";
import KeyOfIcons from "__types__/keyOfIcons";

const Services: NextPageWithLayout = () => {
  const [loading, setLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [deleteService, setDeleteService] = useState("");
  const [editService, setEditService] = useState<Service>();
  const [services, setServices] = useState<(Service & ItemInterface)[]>([]);

  const fetchService = async () => {
    setLoading(true);

    try {
      const { data } = await axios.get(`/api/service-type/${db_slug.services}`);
      setServices(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(getErrorMessage(error));
    }
  };

  useEffect(() => {
    fetchService();
  }, []);

  const handleDeleteItem = async () => {
    try {
      if (deleteService) {
        await axios.post("/api/service-type/delete", {
          serviceTypeSlug: db_slug.services,
          serviceSlug: deleteService,
        });
        toast.success("Item deleted successfully");
        setOpenAlert(false);
        setDeleteService("");
        fetchService();
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleUpdateList = () => async (services: (Service & ItemInterface)[]) => {
    try {
      const serviceList = services.map(({ _id }) => _id);
      await axios.put(`/api/service-type/${db_slug.services}`, { services: serviceList });
      toast.success("Service List Update successfully");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleAlertClose = () => {
    setOpenAlert(false);
    setDeleteService("");
  };

  return (
    <>
      <DashboardPageHeader
        Icon={Construction}
        title="Services"
        button={
          <Button
            color="primary"
            sx={{ bgcolor: "primary.light", px: "2rem" }}
            onClick={() => {
              setOpenForm(true);
              setEditService(undefined);
            }}
          >
            Add new
          </Button>
        }
      />

      <ServiceForm
        open={openForm}
        service={editService}
        fetchService={fetchService}
        close={() => setOpenForm(false)}
      />

      <ConfirmationAlert
        open={openAlert}
        close={handleAlertClose}
        handleConfirm={handleDeleteItem}
        description="Want to remove this service."
      />

      {loading ? (
        <Loading />
      ) : (
        <ReactSortable list={services} setList={setServices} onSort={handleUpdateList}>
          {services.map((item) => {
            const { slug, title, _id, icon } = item;
            const Icon = appIcons[icon as KeyOfIcons];

            return (
              <TableRow sx={{ my: "1rem", padding: "6px 18px", cursor: "move" }} key={_id}>
                <Icon />

                <H5 m={0.75} textAlign="left" fontWeight="600">
                  {title}
                </H5>

                <H5 m={0.75} textAlign="left" fontWeight="400">
                  {slug}
                </H5>

                <FlexBox justifyContent="center">
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditService(item);
                      setOpenForm(true);
                    }}
                  >
                    <Edit fontSize="small" color="inherit" />
                  </IconButton>

                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteService(slug);
                      setOpenAlert(true);
                    }}
                  >
                    <Delete fontSize="small" color="inherit" />
                  </IconButton>
                </FlexBox>
              </TableRow>
            );
          })}
        </ReactSortable>
      )}
    </>
  );
};

// ==============================================================
Services.getLayout = function getLayout(page: ReactElement) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
// ==============================================================

export default Services;
