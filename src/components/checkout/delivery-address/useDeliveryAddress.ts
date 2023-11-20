import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import useSWR from "swr";
import getErrorMessage from "utils/getErrorMessage";
import { Address } from "__types__/common";

const useDeliveryAddress = () => {
  const [loading, setLoading] = useState(false);
  const [editAddress, setEditAddress] = useState<Address>();
  const [openEditAddressForm, setOpenEditAddressForm] = useState<boolean>(false);

  const { data: addressData = [], mutate } = useSWR<Address[]>("/api/address");

  // create new delivery address handler
  const handleCreateAddress = async (address: Address) => {
    setLoading(true);

    try {
      await axios.post("/api/address", address);
      mutate();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(getErrorMessage(error));
    }
  };

  // edit delivery address handler
  const handleEditAddress = async (id: string, address: Address) => {
    try {
      await axios.put(`/api/address/${id}`, address);
      mutate();
      setOpenEditAddressForm(false);
      toast.success(`${id} Updated Successfully`);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  // delete delivery address using objectId
  const handleDeleteAddress = async (id: string) => {
    try {
      await axios.delete(`/api/address/${id}`);
      mutate();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  // Edit address button handler
  const handleEditBtn = (address: Address) => {
    setEditAddress(address);
    setOpenEditAddressForm(true);
  };

  // handle for edit address modal
  const handleOpenEditAddressForm = (value: boolean) => setOpenEditAddressForm(value);

  return {
    handleOpenEditAddressForm,
    handleCreateAddress,
    handleEditAddress,
    handleDeleteAddress,
    handleEditBtn,
    loading,
    editAddress,
    addressData,
    openEditAddressForm,
  };
};

export default useDeliveryAddress;
