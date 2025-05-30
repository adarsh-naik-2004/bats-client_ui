import axios from 'axios';
import { CouponCodeData, OrderData, Customer } from '../types';

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_ORDER_API,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});


export const getCustomer = () => api.get<Customer>(`/customer`);
export const addAddress = (customerId: string, address: string) => api.patch(`/customer/addresses/${customerId}`, { address,});
export const verifyCoupon = (data: CouponCodeData) => api.post(`/coupons/verify`, data);

export const createOrder = (data: OrderData, idempotencyKey: string) =>
    api.post(
      `/orders`, 
      data,
      { headers: { 'Idempotency-Key': idempotencyKey } }
    );

export const getSingleOrder = (orderId: string) => api.get(`/orders/${orderId}?fields=orderStatus`);
