import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function SelectSmall() {
  const [owner, setOwner] = React.useState("");
  const [dateModified, setDateModified] = React.useState("");
  const [dateCreated, setDateCreated] = React.useState("");
  const [sortBy, setSortBy] = React.useState("");
  const [order, setOrder] = React.useState("");

  return (
    <div className="scrollable-div">
      {/* Owner Select */}
      <FormControl className="see-dropdown">
        <InputLabel className="label-dropdown">Owner</InputLabel>
        <Select
          id="date-modified-select"
          className="custom-selectAll"
          value={owner}
          label="Choose Pallete"
          onChange={(e) => setOwner(e.target.value)}
          IconComponent={(props) => (
            <ArrowDropDownIcon
              sx={{ color: "var(--color-white) !important" }}
            />
          )}
        >
          <MenuItem>None</MenuItem>
          <MenuItem value="2023-01-01">Jakob</MenuItem>
          <MenuItem value="2023-02-01">Aliah</MenuItem>
          <MenuItem value="2023-03-01">Yna</MenuItem>
          <MenuItem value="2023-03-01">Ira</MenuItem>
        </Select>
      </FormControl>

      <FormControl className="see-dropdown">
        <InputLabel className="label-dropdown">Date Modified</InputLabel>
        <Select
          id="date-modified-select"
          className="custom-selectAll"
          value={dateModified}
          label="Choose Pallete"
          onChange={(e) => setDateModified(e.target.value)}
          IconComponent={(props) => (
            <ArrowDropDownIcon
              sx={{ color: "var(--color-white) !important" }}
            />
          )}
        >
          <MenuItem>None</MenuItem>
          <MenuItem value="2023-01-01">01-01</MenuItem>
          <MenuItem value="2023-02-01">02-01</MenuItem>
          <MenuItem value="2023-03-01">03-01</MenuItem>
          <MenuItem value="2023-04-01">03-01</MenuItem>
        </Select>
      </FormControl>

      <FormControl className="see-dropdown">
        <InputLabel className="label-dropdown">Date Created</InputLabel>
        <Select
          id="date-modified-select"
          className="custom-selectAll"
          value={dateCreated}
          label="Choose Pallete"
          onChange={(e) => setDateCreated(e.target.value)}
          IconComponent={(props) => (
            <ArrowDropDownIcon
              sx={{ color: "var(--color-white) !important" }}
            />
          )}
        >
          <MenuItem>None</MenuItem>
          <MenuItem value="2023-01-01">2021-01-01</MenuItem>
          <MenuItem value="2023-02-01">2023-02-01</MenuItem>
          <MenuItem value="2023-04-01">2024-03-01</MenuItem>
          <MenuItem value="2023-03-01">2023-03-01</MenuItem>
        </Select>
      </FormControl>

      <FormControl className="see-dropdown">
        <InputLabel className="label-dropdown">Sort By</InputLabel>
        <Select
          id="date-modified-select"
          className="custom-selectAll"
          value={sortBy}
          label="Choose Pallete"
          onChange={(e) => setSortBy(e.target.value)}
          IconComponent={(props) => (
            <ArrowDropDownIcon
              sx={{ color: "var(--color-white) !important" }}
            />
          )}
        >
          <MenuItem>None</MenuItem>
          <MenuItem value="2023-01-01">Date Modified</MenuItem>
          <MenuItem value="2023-02-01">Date Created</MenuItem>
          <MenuItem value="2023-03-01">Name</MenuItem>
          <MenuItem value="2023-07-01">Owner</MenuItem>
        </Select>
      </FormControl>

      <FormControl className="see-dropdown">
        <InputLabel className="label-dropdown">Order</InputLabel>
        <Select
          id="date-modified-select"
          className="custom-selectAll"
          value={order}
          label="Choose Pallete"
          onChange={(e) => setOrder(e.target.value)}
          IconComponent={(props) => (
            <ArrowDropDownIcon
              sx={{ color: "var(--color-white) !important" }}
            />
          )}
        >
          <MenuItem>None</MenuItem>
          <MenuItem value="2023-01-01">Ascending</MenuItem>
          <MenuItem value="2023-02-01">Descending</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
