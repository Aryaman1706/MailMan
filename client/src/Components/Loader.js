import { CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  flexContainer: {
    display: "flex",
    justifyContent: "center",
    placeContent: "center",
    height: "500px",
    width: "100%",
  },

  progress: {
    marginTop: "auto",
    marginBottom: "auto",
  },
}));

const Loader = () => {
  const { flexContainer, progress } = useStyles();

  return (
    <>
      <div className={flexContainer}>
        <CircularProgress size={80} className={progress} />
      </div>
    </>
  );
};

export default Loader;
