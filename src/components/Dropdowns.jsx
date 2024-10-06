import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { colors } from "@mui/material";
import { Height } from "@mui/icons-material";

export default function SelectSmall() {
  const [owner, setOwner] = React.useState("");
  const [dateModified, setDateModified] = React.useState("");
  const [dateCreated, setDateCreated] = React.useState("");
  const [sortBy, setSortBy] = React.useState("");
  const [order, setOrder] = React.useState("");

  const formControlStyles = {
    m: 1,
    minWidth: 150,
    size: "small",
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          justifyContent: "center",
          margin: "16px",
        }}
      >
        <FormControl sx={formControlStyles}>
          <InputLabel
            id="owner-select-label"
            sx={{ color: "var(--color-white)" }}
          >
            Owner
          </InputLabel>
          <Select
            labelId="owner-select-label"
            id="owner-select"
            value={owner}
            label="Owner"
            onChange={(e) => setOwner(e.target.value)}
            sx={{ color: "var(--color-white)" }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Alice">Alice</MenuItem>
            <MenuItem value="Bob">Bob</MenuItem>
            <MenuItem value="Charlie">Charlie</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={formControlStyles}>
          <InputLabel
            id="date-modified-select-label"
            sx={{ color: "var(--color-white)" }}
          >
            Date Modified
          </InputLabel>
          <Select
            labelId="date-modified-select-label"
            id="date-modified-select"
            value={dateModified}
            label="Date Modified"
            onChange={(e) => setDateModified(e.target.value)}
            sx={{ color: "var(--color-white)" }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="2023-01-01">2023-01-01</MenuItem>
            <MenuItem value="2023-02-01">2023-02-01</MenuItem>
            <MenuItem value="2023-03-01">2023-03-01</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={formControlStyles}>
          <InputLabel
            id="date-created-select-label"
            sx={{ color: "var(--color-white)" }}
          >
            Date Created
          </InputLabel>
          <Select
            labelId="date-created-select-label"
            id="date-created-select"
            value={dateCreated}
            label="Date Created"
            onChange={(e) => setDateCreated(e.target.value)}
            sx={{ color: "var(--color-white)" }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="2023-01-01">2023-01-01</MenuItem>
            <MenuItem value="2023-02-01">2023-02-01</MenuItem>
            <MenuItem value="2023-03-01">2023-03-01</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={formControlStyles}>
          <InputLabel
            id="sort-by-select-label"
            sx={{ color: "var(--color-white)" }}
          >
            Sort By
          </InputLabel>
          <Select
            labelId="sort-by-select-label"
            id="sort-by-select"
            value={sortBy}
            label="Sort By"
            onChange={(e) => setSortBy(e.target.value)}
            sx={{ color: "var(--color-white)" }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Name">Name</MenuItem>
            <MenuItem value="Date">Date</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={formControlStyles}>
          <InputLabel
            id="order-select-label"
            sx={{ color: "var(--color-white)" }}
          >
            Order
          </InputLabel>
          <Select
            labelId="order-select-label"
            id="order-select"
            value={order}
            label="Order"
            onChange={(e) => setOrder(e.target.value)}
            sx={{ color: "var(--color-white)" }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Ascending">Ascending</MenuItem>
            <MenuItem value="Descending">Descending</MenuItem>
          </Select>
        </FormControl>
      </div>
    </>
  );
}
