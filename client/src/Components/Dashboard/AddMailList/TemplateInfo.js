import { Grid, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  tableCell: {
    border: "1px solid grey",
  },

  tableCellText: {
    textAlign: "center",
  },

  boldText: {
    fontWeight: "bold",
  },
}));

const TemplateInfo = ({ template }) => {
  const { tableCell, tableCellText, boldText } = useStyles();

  return (
    <>
      {template && (
        <>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant="body1" className={boldText}>
                Information about selected template:-
              </Typography>
            </Grid>

            <Grid item xs={2}>
              <p className={boldText}>Added on:- </p>
            </Grid>
            <Grid item xs={10}>
              <p>{new Date(template.date).toLocaleDateString()}</p>
            </Grid>

            <Grid item xs={2}>
              <p className={boldText}>Format:- </p>
            </Grid>
            <Grid item xs={5} className={(tableCell, boldText)}>
              <p className={tableCellText}>Field</p>
            </Grid>
            <Grid item xs={5} className={(tableCell, boldText)}>
              <p className={tableCellText}>Cell</p>
            </Grid>

            {Object.keys(template.format).map((key) => (
              <>
                <Grid item xs={2}></Grid>
                <Grid item xs={5} className={tableCell}>
                  <p className={tableCellText}>{key}</p>
                </Grid>
                <Grid item xs={5} className={tableCell}>
                  <p className={tableCellText}>{template.format[key]}</p>
                </Grid>
              </>
            ))}
          </Grid>
        </>
      )}
    </>
  );
};

export default TemplateInfo;
