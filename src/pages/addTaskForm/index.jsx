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
import { yupResolver } from "@hookform/resolvers/yup";
import { taskSchema } from "../../validations/taskValidations";
import { SelectCategories } from "./SelectCategories";

export const AddTaskForm = ({ handleClose, open, setOpen, categories }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(taskSchema),
  });
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
                  />
                  <p>{errors.title?.message}</p>
                </Grid>
                <Grid item>
                  <TextField
                    variant="outlined"
                    {...register("description")}
                    placeholder="Description"
                  />
                  <p>{errors.description?.message}</p>
                </Grid>
                <Grid item>
                  <TextField
                    style={{ width: "50%" }}
                    select
                    {...register("priority")}
                    defaultValue=""
                    label="priority"
                  >
                    {menuItems.map((item) => {
                      return (
                        <MenuItem value={item} key={item}>
                          {item}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                  <p>{errors.priority?.message}</p>
                </Grid>
                <SelectCategories categories={categories} />
                <Grid item>
                  <TextField
                    style={{ width: "100%" }}
                    type="date"
                    {...register("dueDate")}
                  />
                  <p>{errors.dueDate?.message}</p>
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
