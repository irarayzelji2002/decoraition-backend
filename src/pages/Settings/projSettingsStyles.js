export const switchStyles = {
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "var(--inputBg)",
  },
  "& .MuiSwitch-thumb": {
    backgroundImage: "var(--color-white)",
  },
  "& .MuiSwitch-track": {
    backgroundColor: "var(--inputBg)",
  },
};

export const textFieldStyles = {
  "& .MuiOutlinedInput-notchedOutline": {
    borderWidth: 2, // border thickness
  },
  "& .MuiOutlinedInput-root": {
    borderColor: "var(--borderInput)",

    "& fieldset": {
      borderColor: "var(--borderInput)",
    },
    "&:hover fieldset": {
      borderColor: "var(--bright-grey)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--bright-grey)",
    },
  },
  "& input": {
    color: "var(--color-white)", // input text color
  },
};

export const selectStyles = {
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "var(--borderInput)",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "var(--bright-grey)",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "var(--bright-grey)",
  },
  "& .MuiSelect-select": {
    color: "var(--color-white)",
  },
  "& .MuiSvgIcon-root": {
    color: "var(--color-white)", // Set the arrow icon color to white
  },
};

export const menuItemStyles = {
  backgroundColor: "var(--bgColor)",
  color: "var(--color-white)",
  "&:hover": {
    backgroundColor: "var(--dropdownHover)",
    color: "var(--color-white)",
  },
  "&.Mui-selected": {
    backgroundColor: "var(--dropdownSelected)",
    color: "var(--color-white)",
  },
  "& .MuiSvgIcon-root": {
    color: "var(--color-white)", // Set the arrow icon color to white
  },
};

export const restrictedMenuItemStyles = {
  backgroundColor: "var(--bgColor)",
  color: "var(--color-grey)",
  "&:hover": {
    backgroundColor: "var(--dropdownHover)",
    color: "var(--color-white)",
  },
  "&.Mui-selected": {
    backgroundColor: "var(--dropdownSelected)",
    color: "var(--color-white)",
  },
};
