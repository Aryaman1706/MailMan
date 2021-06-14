import { IconButton, makeStyles } from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";

const useStyles = makeStyles((theme) => ({
  flexContainer: {
    display: "flex",
    placeItems: "center",
    justifyContent: "space-between",
  },
  btn: {
    border: `1px solid ${theme.palette.primary.main}`,
  },
}));

const Attachements = () => {
  const { flexContainer, btn } = useStyles();

  return (
    <div className={flexContainer}>
      <IconButton color="primary" className={btn}>
        <GetAppIcon />
      </IconButton>
    </div>
  );
};

export default Attachements;
