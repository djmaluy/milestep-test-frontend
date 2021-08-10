import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import MenuItem from "@material-ui/core/MenuItem";
import { FormControl, Grid } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addTaskAC, fetchTasks } from "../../store/routines";

export const AddTaskForm = ({ handleClose, open, setOpen }) => {
  const { register, handleSubmit, setValue } = useForm();
  const menuItems = [1, 2, 3, 4, 5];
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const { title, description, priority, dueDate } = data;
    const request = {
      task: {
        title,
        description,
        priority,
        due_date: dueDate,
      },
    };
    dispatch(addTaskAC(request));
    dispatch(fetchTasks());
    setOpen(false);
  };

  return (
    <div>
      <Dialog style={{ minWidth: "60vw" }} open={open} onClose={handleClose}>
        <DialogTitle>Add task</DialogTitle>
        <DialogContent>
          <Grid container direction="column" spacing={2}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl>
                <Grid item>
                  <TextField
                    {...register("title")}
                    placeholder="Title"
                    variant="outlined"
                    name="title"
                  />
                </Grid>
                <Grid item>
                  <TextField
                    variant="outlined"
                    name="description"
                    {...register("description")}
                    placeholder="Description"
                  />
                </Grid>
                <Grid item>
                  <TextField
                    select
                    {...register("priority")}
                    defaultValue={1}
                    onChange={(e) => setValue("priority", e.target.value)}
                  >
                    {menuItems.map((item) => {
                      return (
                        <MenuItem value={item} key={item}>
                          {item}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                </Grid>
                <Grid item>
                  <TextField
                    style={{ width: "100%" }}
                    type="date"
                    name="dueDate"
                    {...register("dueDate")}
                  />
                </Grid>
              </FormControl>

              <DialogActions>
                <Button onClick={handleClose} color="secondary">
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  size="small"
                  startIcon={<SaveIcon />}
                >
                  Save
                </Button>
              </DialogActions>
            </form>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};
