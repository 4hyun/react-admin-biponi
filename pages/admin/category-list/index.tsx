import { Fragment, ReactElement, useEffect, useState } from "react";
import { Delete, Edit } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { ItemInterface, ReactSortable } from "react-sortablejs";
import { toast } from "react-hot-toast";
import axios from "axios";
// all icons
import appIcons from "components/icons";
// custom components
import Loading from "components/Loading";
import TableRow from "components/TableRow";
import { H5 } from "components/Typography";
import FlexBox from "components/flex-box/FlexBox";
import DeliveryBox from "components/icons/DeliveryBox";
import ConfirmationAlert from "components/ConfirmationAlert";
import CategoryForm from "components/category-list/CategoryForm";
import DashboardPageHeader from "components/DashboardPageHeader";
// layout
import { NextPageWithLayout } from "../../_app";
import AdminDashboardLayout from "components/layouts/admin-dashboard/Layout";
// api route param slug list
import { db_slug } from "utils/constants";
// utils function for show error message
import getErrorMessage from "utils/getErrorMessage";
// category & icon keys data type for typescript
import { Category } from "__types__/common";
import KeyOfIcons from "__types__/keyOfIcons";

const CategoryNav: NextPageWithLayout = () => {
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState("");
  const [editCategory, setEditCategory] = useState<Category>();
  const [categoryNav, setCategoryNav] = useState<(Category & ItemInterface)[]>([]);

  const fetchCategory = async () => {
    try {
      const { data } = await axios.get(`/api/category-navlist/${db_slug.category_nav}`);
      setCategoryNav(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(getErrorMessage(error));
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  // HANDLE DELETE ITEM FROM EXISTING LIST
  const handleDeleteItem = async () => {
    try {
      if (deleteCategory) {
        await axios.post("/api/category-navlist/delete", {
          categorySlug: deleteCategory,
          categoryNavListSlug: db_slug.category_nav,
        });
        toast.success("Item deleted successfully");
        setOpenAlert(false);
        setDeleteCategory("");
        fetchCategory();
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  // HANDLE UPDATE OR SORT LIST
  const handleUpdateList = async () => {
    try {
      if (categoryNav) {
        const categories = categoryNav.map(({ _id }) => _id);
        await axios.put(`/api/category-navlist/${db_slug.category_nav}`, { categories });
        toast.success("Category Nav List Update successfully");
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  // HANDLE CLOSE CONFIRMATION ALERT MODAL
  const handleAlertClose = () => {
    setOpenAlert(false);
    setDeleteCategory("");
  };

  return (
    <Fragment>
      <DashboardPageHeader
        Icon={DeliveryBox}
        title="Category List"
        button={
          <Button
            color="primary"
            sx={{ bgcolor: "primary.light", px: "2rem" }}
            onClick={() => {
              setEditCategory(undefined);
              setOpenForm(true);
            }}
          >
            Add Category
          </Button>
        }
      />

      <CategoryForm
        open={openForm}
        category={editCategory}
        fetchCategory={fetchCategory}
        close={() => setOpenForm(false)}
      />

      <ConfirmationAlert
        open={openAlert}
        close={handleAlertClose}
        handleConfirm={handleDeleteItem}
        description="Want to remove this category."
      />

      {loading ? (
        <Loading />
      ) : (
        <ReactSortable list={categoryNav} setList={setCategoryNav} onSort={handleUpdateList}>
          {categoryNav.map((item) => {
            const { slug, name, _id, icon } = item;
            const Icon = appIcons[icon as KeyOfIcons];

            return (
              <TableRow sx={{ my: "1rem", padding: "6px 18px", cursor: "move" }} key={_id}>
                <Icon />

                <H5 m={0.75} textAlign="left" fontWeight="600">
                  {name}
                </H5>

                <H5 m={0.75} textAlign="left" fontWeight="400">
                  {slug}
                </H5>

                <FlexBox justifyContent="center">
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditCategory(item);
                      setOpenForm(true);
                    }}
                  >
                    <Edit fontSize="small" color="inherit" />
                  </IconButton>

                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteCategory(slug);
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
    </Fragment>
  );
};

// ==============================================================
CategoryNav.getLayout = function getLayout(page: ReactElement) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
// ==============================================================

export default CategoryNav;
