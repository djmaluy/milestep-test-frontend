import { toastr } from "react-redux-toastr";

export const toastrError = async (errorMessage) => {
  toastr.error("Error", errorMessage);
};
