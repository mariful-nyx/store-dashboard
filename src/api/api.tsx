import useInterceptor, { API_URL } from "./interceptor";

export const useApi = () => {
    
    const interceptor = useInterceptor()

    const api = {
        getProducts: (params={}) => interceptor.get(`${API_URL}/store/product/api/products/`, {params: params}),
        createProduct: (data:any) => interceptor.post(`${API_URL}/store/product/api/products/`, data),
        getProductDetail: (slug:any) => interceptor.get(`${API_URL}/store/product/api/products/${slug}/`),
        
        getCustomers: () => interceptor.get(`${API_URL}/store/user/api/customers/`),
        createCustomers: (data:any) => interceptor.post(`${API_URL}/store/user/api/customers/`, data),
        getCustomerDetail: (id:number) => interceptor.get(`${API_URL}/store/user/api/customers/${id}/`),
        editCustomer: (id:number, data:any) => interceptor.put(`${API_URL}/store/user/api/customers/${id}/`, data),

        getRetailers: () => interceptor.get(`${API_URL}/store/user/api/retailers/`),
        createRetailers: (data:any) => interceptor.post(`${API_URL}/store/user/api/retailers/`, data),
        getRetailerDetail: (id: number) => interceptor.get(`${API_URL}/store/user/api/retailers/${id}/`),
        editRetailer: (id:number, data:any) => interceptor.put(`${API_URL}/store/user/api/retailers/${id}/`, data),


        getOrders: (params={}) => interceptor.get(`${API_URL}/store/order/api/orders/`, {params: params}),
        createOrders: (data:any) => interceptor.post(`${API_URL}/store/order/api/orders/`, data),
        getOrderDetail: (id:number) => interceptor.get(`${API_URL}/store/order/api/orders/${id}/`),

        getVariants: () => interceptor.get(`${API_URL}/store/product/api/product-variants/`),
        createVariant: (data:any) => interceptor.post(`${API_URL}/store/product/api/product-variants/`, data),
        deleteVariant: (id:number) => interceptor.delete(`${API_URL}/store/product/api/product-variants/${id}/`),

        makePayment: (data:any) => interceptor.post(`${API_URL}/store/payment/api/payments/`, data),

    }
    return api
}