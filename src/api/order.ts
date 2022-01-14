import { TOrderDetail, TOrder } from 'types/order';

import request from './axios';

const getOrderDetail = (orderId: any) => request.get<TOrderDetail>(`orders/${orderId}`);
const getOrder = (orderId: any) => request.get<TOrder>(`orders/${orderId}`);

const orderApi = {
  getOrderDetail,
  getOrder
};

export default orderApi;
