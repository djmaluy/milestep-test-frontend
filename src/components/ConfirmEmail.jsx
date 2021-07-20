import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { confirmEmailAC } from "../store/actions/user.actions";

export const ConfirmEmail = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const token_path = history.location.pathname.split("/");
  const token = token_path[token_path.length - 1];

  useEffect(() => {
    if (token) {
      dispatch(confirmEmailAC(token));
      history.push("/login");
    }
  }, [token, history, dispatch]);

  return null;
};
