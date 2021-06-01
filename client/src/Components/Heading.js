import { Typography, Divider, Toolbar, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  heading: {
    width: "100%",
  },
  divider: {
    marginBottom: "10px",
  },
}));

const Heading = ({ text }) => {
  const { heading, divider } = useStyles();
  return (
    <>
      <Toolbar>
        <Typography className={heading} variant="h4" align="center">
          {text}
        </Typography>
      </Toolbar>
      <Divider className={divider}></Divider>
    </>
  );
};

export default Heading;
