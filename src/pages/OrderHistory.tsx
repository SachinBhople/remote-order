import React, { useState } from 'react';
import { useCancelOrderMutation, useGetOrderByUserIdQuery, useReturnOrderMutation } from '../redux/api/order.api';

const OrderHistory = () => {
    const { data, isLoading, error } = useGetOrderByUserIdQuery();
    const [cancelOrder] = useCancelOrderMutation()
    const [returnOrder] = useReturnOrderMutation()
    const [orderId, setOrderId] = useState<string>("")


    if (isLoading) {
        return <div className="text-center mt-5">Loading orders...</div>;
    }

    if (error) {
        return (
            <div className="alert alert-danger text-center mt-5" role="alert">
                Failed to load orders. Please try again later.
            </div>
        );
    }

    const handleCancelOrder = () => {
        if (orderId) {
            cancelOrder(orderId)
        }
    }

    const handleReturnOrder = () => {
        if (orderId) {
            returnOrder(orderId)
        }
    }

    return <>
        <div className="container mt-5">
            <h2 className="text-center mb-4">Order History</h2>
            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white text-center">
                    <h4>Your Orders</h4>
                </div>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-striped table-hover mb-0">
                            <thead className="bg-secondary text-white">
                                <tr>
                                    <th>Order ID</th>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.result?.length ? (
                                    data.result.map((order) => (
                                        <tr key={order._id}>
                                            <td>
                                                <strong>{order._id}</strong>
                                            </td>
                                            <td>
                                                {order.products?.map((product) => (
                                                    <div key={product._id}>{product.product.name}</div>
                                                ))}
                                            </td>
                                            <td>
                                                {order.products?.map((product) => (
                                                    <div key={product._id}>{product.product.stock}</div>
                                                ))}
                                            </td>
                                            <td>
                                                {order.products?.map((product) => (
                                                    <div key={product._id}>${product.product.price.toFixed(2)}</div>
                                                ))}
                                            </td>
                                            <td>
                                                <span
                                                    className={`badge ${order.status === 'placed'
                                                        ? 'bg-warning text-dark'
                                                        : order.status === 'delivered'
                                                            ? 'bg-success'
                                                            : 'bg-danger'
                                                        }`}
                                                >
                                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                </span>
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() => setOrderId(order._id as string)}
                                                    className='btn btn-secondary ms-2 my-2 btn-sm lg:my-0'
                                                    disabled={order.status !== "placed"}
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#cancelOrder">
                                                    Cancel
                                                </button>

                                                <button
                                                    onClick={() => setOrderId(order._id as string)}
                                                    disabled={order.status !== "delivered" && order.status !== "cancel" || order.returnAccepted || order.returnRequested}
                                                    className='btn btn-success ms-2 btn-sm my-2 lg:my-0'
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#returnOrder">
                                                    Return
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="text-center">
                                            <h5>No orders found</h5>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        {/* cancel order modal */}
        <div className="modal fade" id="cancelOrder" >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header ">
                        <h5 className="modal-title">Modal title</h5>
                        <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        Are you sure you want to cancel this order?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal"
                            onClick={handleCancelOrder}>Cancel Order</button>
                    </div>
                </div>
            </div>
        </div>

        {/* return order modal */}
        <div className="modal fade" id="returnOrder" >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header ">
                        <h5 className="modal-title">Modal title</h5>
                        <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        Are you sure you want to return this product?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                            onClick={handleReturnOrder}
                        >Return</button>
                    </div>
                </div>
            </div>
        </div>
    </>


};

export default OrderHistory;
