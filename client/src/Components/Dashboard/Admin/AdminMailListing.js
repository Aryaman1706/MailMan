import ListMailList from "../ListMailList";
import axios from "../../../utils/axios";
import useUserStore from "../../../Stores/userStore";

const selector = (state) => ({
  idToken: state.idToken,
});

const AdminMailListing = () => {
  const { idToken } = useUserStore(selector);

  const promiseFn = (page) =>
    axios
      .get(`/mail-list/full-list?page=${page}`, {
        headers: {
          "auth-id-token": idToken,
        },
      })
      .then((response) => response.data)
      .catch((err) => {
        throw err.response.data;
      });

  return <ListMailList full={true} promiseFn={promiseFn} />;
};

export default AdminMailListing;
