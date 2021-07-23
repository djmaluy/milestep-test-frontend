import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Grid } from "@material-ui/core";

export const AddTaskForm = React.memo(
  ({
    handleSubmit,
    formik,
    handleClickOpen,
    handleClose,
    open,
    // onSubmit,
    // handleFileUpload,
  }) => {
    const menuItems = [1, 2, 3, 4, 5];
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Add task
        </Button>
        <Dialog style={{ minWidth: "60vw" }} open={open} onClose={handleClose}>
          <DialogTitle>Add task</DialogTitle>
          <DialogContent>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <TextField
                  label="title"
                  name="title"
                  onChange={formik.handleChange}
                  value={formik.values.title}
                  variant="outlined"
                  required={true}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="description"
                  name="description"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.description}
                />
              </Grid>
              <Grid item>
                <FormControl variant="filled" style={{ width: "100%" }}>
                  <InputLabel>Priority</InputLabel>
                  <Select
                    name="priority"
                    onChange={formik.handleChange}
                    value={formik.values.priority}
                  >
                    {menuItems.map((item) => {
                      return (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <TextField
                  style={{ width: "100%" }}
                  type="date"
                  name="dueDate"
                  onChange={formik.handleChange}
                  value={formik.values.dueDate}
                  InputProps={{
                    inputProps: { min: formik.values.dueDate },
                  }}
                />
              </Grid>
              {/* <Grid item>
                <TextField
                  type="file"
                  name="image"
                  onChange={formik.handleChange}
                  value={(e) => e.target.files[0]}
                />
              </Grid> */}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
);
