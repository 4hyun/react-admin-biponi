import axios from "axios";

const errorResponse = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    let message = error.response ? error.response.data.message : error.message;
    throw new Error(message);
  } else if (error instanceof Error) {
    // console.log(error.message, "-", );
    throw new Error(error.message);
  } else {
    throw new Error("Server Error Occurred!");
  }
};

export default errorResponse;
