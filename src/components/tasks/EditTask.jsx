import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import "./Tasks.css"


export const EditTask = ({updateTaskHandler }) => {
  const history = useHistory();
  const { id, title, description, priority, due_date } = useLocation().state.task
  const [state, setState] = useState({id, title, description, priority, due_date});

  const editTask = (e) => {
    e.preventDefault();
    updateTaskHandler(state);
    history.push("/");
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };
  return (
        <form onSubmit={editTask} className = 'editForm'>
          <h3>Edit task</h3>
          <Grid container direction="column" spacing={2}>
            <Grid item style={{marginLeft:"80px"}} >
              <TextField
                style={{ width: "75%" }}
                label="title"
                name="title"
                onChange={(e) => handleChange(e)}
                value={state.title}
                variant="outlined"
                
                required
              />
            </Grid>
            <Grid item style={{marginLeft:"80px"}}>
              <TextField
                label="description"
                name="description"
                variant="outlined"
                onChange={(e) => handleChange(e)}
                value={state.description}
                style={{ width: "75%" }}
              />
            </Grid>
            <Grid item style={{marginLeft:"80px"}}>
              <FormControl variant="filled" style={{ width: "75%" }}>
                <InputLabel>Priority</InputLabel>
                <Select
                  name="priority"
                  onChange={(e) => handleChange(e)}
                  value={state.priority}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item  style={{marginLeft:"80px"}}>
              <TextField
                style={{ width: "75%" }}
                type="date"
                name="due_date"
                onChange={(e) => handleChange(e)}
                value={state.due_date}
                
              />
            </Grid>
            <button className="editButton">Update</button>
          </Grid>
        </form>
  )
}
