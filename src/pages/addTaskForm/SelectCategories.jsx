import React, { useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import "./AddTaskForm.scss";

import { MenuProps } from "../../services/utils";

export const SelectCategories = ({ categories }) => {
  const [selected, setSelected] = useState([]);

  const categoriesNames = categories.map((c) => {
    return c.name;
  });

  const allSelected =
    categoriesNames.length > 0 && selected.length === categoriesNames.length;

  const handleChange = (e) => {
    const value = e.target.value;
    if (value[value.length - 1] === "all") {
      setSelected(
        selected.length === categoriesNames.length ? [] : categoriesNames
      );
      return;
    }
    setSelected(value);
  };

  return (
    <FormControl>
      <InputLabel id="select">Category</InputLabel>
      <Select
        labelId="select"
        multiple
        value={selected}
        onChange={handleChange}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
      >
        <MenuItem value="all">
          <ListItemIcon>
            <Checkbox checked={allSelected} />
          </ListItemIcon>
          <ListItemText primary="Select All" />
        </MenuItem>
        {categoriesNames.map((name) => (
          <MenuItem key={name} value={name}>
            <ListItemIcon>
              <Checkbox checked={selected.indexOf(name) > -1} />
            </ListItemIcon>
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
