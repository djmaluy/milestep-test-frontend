import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import "./Tasks.css";
import { useDispatch } from "react-redux";
import { updateTask } from "../../store/routines";

export const EditTask = React.memo(({ formik }) => {
  const { id, title, description, priority, due_date } =
    useLocation().state.task;
  const [someFile, setSomeFile] = useState(null);
  const [titleForm, setTitleForm] = useState(title);
  const [descriptionForm, setDescriptionForm] = useState(description);
  const [priorityForm, setPriorityForm] = useState(priority);
  const [due_dateForm, setDue_dateForm] = useState(due_date);

  const history = useHistory();
  const dispatch = useDispatch();

  const menuItems = [1, 2, 3, 4, 5];

  const editTask = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (someFile) {
      formData.append("some_file", someFile);
    }
    formData.set("title", titleForm);
    formData.set("description", descriptionForm);
    formData.set("due_date", due_dateForm);

    dispatch(updateTask({ formData, id }));
    history.push("/");
  };

  const handleUpload = (e) => {
    setSomeFile(e.target.files[0]);
  };
  return (
    <form onSubmit={editTask} className="editForm">
      <h3>Edit task</h3>
      <Grid container direction="column" spacing={2}>
        <Grid item style={{ marginLeft: "80px" }}>
          <TextField
            style={{ width: "75%" }}
            label="title"
            name="title"
            onChange={(e) => setTitleForm(e.target.value)}
            value={titleForm}
            variant="outlined"
            required
          />
        </Grid>
        <Grid item style={{ marginLeft: "80px" }}>
          <TextField
            label="description"
            name="description"
            variant="outlined"
            onChange={(e) => setDescriptionForm(e.target.value)}
            value={descriptionForm}
            style={{ width: "75%" }}
          />
        </Grid>
        <Grid item style={{ marginLeft: "80px" }}>
          <FormControl variant="filled" style={{ width: "75%" }}>
            <InputLabel>Priority</InputLabel>
            <Select
              name="priority"
              onChange={(e) => setPriorityForm(e.target.value)}
              value={priorityForm}
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
        <Grid item style={{ marginLeft: "80px" }}>
          <TextField
            style={{ width: "75%" }}
            type="date"
            name="due_date"
            onChange={(e) => setDue_dateForm(e.target.value)}
            value={due_dateForm}
            InputProps={{
              inputProps: { min: formik.values.dueDate },
            }}
          />
        </Grid>
        <Grid item style={{ marginLeft: "80px" }}>
          <input
            accept="application/pdf, .csv"
            name="taskfile"
            type="file"
            onChange={handleUpload}
          />
        </Grid>
        <button className="editButton">Update</button>
      </Grid>
    </form>
  );
});
