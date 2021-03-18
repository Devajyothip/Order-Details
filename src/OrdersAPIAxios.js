import axios from "axios";

axios.defaults.baseURL =
  "https://virtserver.swaggerhub.com/Jyothi884/OrdersAPI/1.0.0";

export const getOrdersByCustomer = (customerId, limit) =>
  axios.get(`/customer/${customerId}/order?limit=${limit}`);

export const getOrderById = (orderId) => axios.get(`/order/${orderId}`);
