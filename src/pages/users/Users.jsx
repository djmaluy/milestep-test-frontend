import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { getLoading, getPages, getUsers } from "../../redux/usersSelector";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@material-ui/lab/Pagination";
import { setUsers } from "../../store/routines";

export const Users = () => {
  const [page, setPage] = useState(1);

  const loading = useSelector(getLoading);
  const pages = useSelector(getPages);
  const users = useSelector(getUsers);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUsers(page));
  }, [page, dispatch]);

  return (
    <div>
      <TableContainer component={Paper}>
        {!loading ? (
          <Table className="users__table" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>FirstName</TableCell>
                <TableCell>LastName</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Address</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.first_name}</TableCell>
                  <TableCell>{user.last_name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.address}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <h3>Please wait</h3>
        )}
      </TableContainer>
      <Pagination
        count={pages}
        page={page}
        color="primary"
        onChange={(e, value) => setPage(value)}
      />
    </div>
  );
};
