import axios from "axios";
import AxiosInstance from "../config/AxiosInstance";
import APIConstants from "../config/APIConstants";

const sendPost = async (endPoint, body) => {
  try {
    let axiosInstance = await AxiosInstance();
    const apiResponse = await axiosInstance.post(
      APIConstants.BASE_URL + endPoint,
      body
    );
    return apiResponse;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      return err.response;
    } else {
      return err;
    }
  }
};
export { sendPost };
