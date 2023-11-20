import mongoose from "mongoose";

const checkValidId = (id: string) => mongoose.Types.ObjectId.isValid(id);
export default checkValidId;
