import { CATEGORIES, PAYMENT_MODES } from "@/constant";
import { FilterAttrType } from "@/types";
import { toTitleCase } from "@/utils";
import { Grid2, Paper, alpha, useMediaQuery } from "@mui/material";
import Dropdown from "./atoms/dropdown";

const filterConfig = [
  {
    type: "category",
    options: CATEGORIES,
  },
  {
    type: "payment_mode",
    options: PAYMENT_MODES,
  },
];

const cache: Record<string, string> = {};

export const Filter = ({
  onCategoryChange,
}: {
  onCategoryChange: (attr: FilterAttrType, value: string) => void;
}) => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <Grid2
      size={{
        xs: 12,
      }}
      container
      spacing={2}
      component={Paper}
      elevation={2}
      sx={{
        p: 1.5,
        background: (theme) => alpha(theme.palette.primary.main, 0.08),
      }}
      alignItems={"center"}
    >
      {filterConfig.map(({ type, options }) => (
        <Grid2
          container
          size={{
            xs: isSmallScreen ? 12 : "auto",
          }}
          key={type}
          component={"label"}
          htmlFor={type}
          spacing={2}
          alignItems={"center"}
        >
          <Grid2
            size={{
              xs: isSmallScreen ? 12 : "auto",
            }}
            component={"span"}
          >
            Filter by {toTitleCase(type)} :
          </Grid2>
          <Grid2
            size={{
              xs: isSmallScreen ? 12 : "auto",
            }}
          >
            <Dropdown
              titleCase
              id={type}
              style={{
                width: "100%",
                margin: 0,
              }}
              value={cache[type] || ""}
              onChange={(value) => {
                onCategoryChange(type as FilterAttrType, value);
                cache[type] = value;
              }}
              renderValue={(value) => (
                <>{value === "" ? "All" : toTitleCase(value as string)}</>
              )}
              displayEmpty
              emptyRenderValue="All"
              options={["", ...options]}
            />
          </Grid2>
        </Grid2>
      ))}
    </Grid2>
  );
};
