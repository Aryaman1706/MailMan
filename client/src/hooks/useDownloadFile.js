import Swal from "sweetalert2";

import { useState } from "react";

import firebase from "firebase";
import "firebase/storage";

export const Status = {
  Idle: "idle",
  Loading: "loading",
  Errored: "errored",
  Completed: "completed",
};

const useDownloadFile = (fileName) => {
  const [status, setStatus] = useState(Status.Idle);

  const downloadFile = async () => {
    try {
      setStatus(Status.Loading);

      const url = await firebase.storage().ref(fileName).getDownloadURL();
      setStatus(Status.Completed);

      window.open(url);
    } catch (error) {
      setStatus(Status.Errored);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error!",
        text: "Error while downloading file.",
        showConfirmButton: true,
      });
    }
  };

  return [downloadFile, status];
};

export default useDownloadFile;
