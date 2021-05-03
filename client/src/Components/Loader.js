import { CircularProgress } from "@material-ui/core";

const Loader = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          placeContent: "center",
          height: "500px",
          width: "100%",
        }}
      >
        <CircularProgress
          size={80}
          style={{ marginTop: "auto", marginBottom: "auto" }}
        />
      </div>
    </>
  );
};

export default Loader;
