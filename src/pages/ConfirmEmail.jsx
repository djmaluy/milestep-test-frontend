import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { routes } from "../constants/routes";
import { setConfirmEmail } from "../store/routines";

export const ConfirmEmail = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const token_path = history.location.pathname.split("/");
  const token = token_path[token_path.length - 1];

  useEffect(() => {
    if (token) {
      dispatch(setConfirmEmail(token));
      history.push(routes.LOGIN);
    }
  }, [token, history, dispatch]);

  return null;
};
