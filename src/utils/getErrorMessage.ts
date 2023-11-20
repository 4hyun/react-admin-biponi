import axios from "axios";

const getErrorMessage = (error: unknown) => {
  if (!axios.isAxiosError(error)) return "Error Occurred!";
  return error.response?.data.message || error.response?.data || "Something Error Occurred!";
};

export default getErrorMessage;
