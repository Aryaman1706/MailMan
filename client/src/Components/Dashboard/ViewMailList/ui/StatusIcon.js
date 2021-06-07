import Check from "@material-ui/icons/Check";
import Clear from "@material-ui/icons/Clear";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  flexContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
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
