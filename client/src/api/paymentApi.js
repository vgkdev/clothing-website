import axios from "axios";
import { dataUrl } from "../share";

const createPaymentService = (data) => {
  return axios.post(`${dataUrl}/create-payment`, data);
};

const callbackPaymentService = () => {
  return axios.get(`${dataUrl}/return-payment`);
};

export { createPaymentService, callbackPaymentService };
