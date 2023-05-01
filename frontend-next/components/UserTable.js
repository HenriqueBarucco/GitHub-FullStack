import React, { useState, useEffect } from "react";
import axios from "axios";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedUser, setSelectedUser] = useState(null);
  const [repoData, setRepoData] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [open, setOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      const response = await axios.get("/api/users", {
        params: {
          since: page * rowsPerPage,
        },
      });
      setUsers(response.data);
    };

    getUsers();
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleUserClick = async (username) => {
    const response = await axios.get(`/api/user/repos/${username}`);
    setRepoData(response.data);
    setSelectedUser(username);
    setOpen(true);
  };

  const handleUserDetailsClick = async (username) => {
    const response = await axios.get(`/api/user/details/${username}`);
    setUserDetails(response.data);
    setSelectedUser(username);
    setDetailsOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDetailsClose = () => {
    setDetailsOpen(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Photo</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Repositories</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>
                  <Avatar src={user.avatar_url} />
                </TableCell>
                <TableCell>{user.login}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleUserClick(user.login)}
                    variant="contained"
                    color="primary"
                  >
                    Repositories
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleUserDetailsClick(user.login)}
                    variant="contained"
                    color="primary"
                  >
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={1000}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      {open && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{selectedUser} Repositórios</DialogTitle>
          <DialogContent>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Created at</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {repoData.map((repo) => (
                    <TableRow key={repo.id}>
                      <TableCell>{repo.id}</TableCell>
                      <TableCell>{repo.name}</TableCell>
                      <TableCell>{repo.description}</TableCell>
                      <TableCell>{repo.created_at}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {detailsOpen && (
        <Dialog open={detailsOpen} onClose={handleDetailsClose}>
          <DialogTitle>{selectedUser}'s Details</DialogTitle>
          <DialogContent>
            {userDetails ? (
              <div>
                <p>Login: {userDetails.login}</p>
                <p>ID: {userDetails.id}</p>
                <p>URL: {userDetails.html_url}</p>
                <p>Public Repositories: {userDetails.public_repos}</p>
                <p>Followers: {userDetails.followers}</p>
              </div>
            ) : (
              <div>Loading...</div>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDetailsClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
