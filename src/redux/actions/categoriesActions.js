import { API_URL } from "../../helpers/API_URL";
import Axios from "axios";

export const GetCategories = () => {
  return async (dispatch) => {
    try {
      const { data } = await Axios.get(`${API_URL}/cat`);
      console.log(data.result);
      dispatch({ type: "GET_CAT", payload: { data: data.result, count: data.pagesCount } });
    } catch (err) {
      console.log(err);
    }
  };
};
