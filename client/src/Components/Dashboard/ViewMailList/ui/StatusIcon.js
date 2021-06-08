import Check from "@material-ui/icons/Check";
import Clear from "@material-ui/icons/Clear";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  flexContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    placeItems: "center",
  },
  green: {
    color: "green",
  },
  red: {
    color: "red",
  },
}));

const StatusIcon = ({ status }) => {
  const { flexContainer, green, red } = useStyles();

  return (
    <div className={flexContainer}>
      {status ? <Check className={green} /> : <Clear className={red} />}
    </div>
  );
};

export default StatusIcon;
