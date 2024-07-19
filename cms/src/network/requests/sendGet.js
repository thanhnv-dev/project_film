import axios from "axios";
import AxiosInstance from "../config/AxiosInstance";
import APIConstants from "../config/APIConstants";

const sendGet = async (endPoint) => {
  try {
    let axiosInstance = await AxiosInstance();
    const apiResponse = await axiosInstance.get(
      APIConstants.BASE_URL + endPoint
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
export { sendGet };
