import { TOrderDetail, TOrderDetailMedia, TOrder } from 'types/order';

import request from './axios';

const getOrderDetail = (orderId: any) => request.get<TOrderDetail>(`orders/${orderId}`);
const getOrder = (orderId: any) => request.get<TOrder>(`orders/${orderId}`);
const getOrderMediasOfOrder = (orderId: number) =>
  request.get<TOrderDetailMedia[]>(`/orders/${orderId}/medias`);

const orderApi = {
  getOrderDetail,
  getOrderMediasOfOrder,
  getOrder
};

export default orderApi;
