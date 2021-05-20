import { useState } from "react";
import firebase from "firebase";
import "firebase/storage";
import Swal from "sweetalert2";

const useDownloadFile = (fileName) => {
  const [loading, setLoading] = useState(false);

  const downloadFile = async () => {
    try {
      setLoading(true);

      const url = await firebase.storage().ref(fileName).getDownloadURL();
      setLoading(false);

      window.open(url);
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error!",
        text: "Error while downloading file.",
        showConfirmButton: true,
      });
    }
  };

  return [downloadFile, loading];
};

export default useDownloadFile;
