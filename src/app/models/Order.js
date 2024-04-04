<< << << < HEAD
const mongoose = require('mongoose');
const MongooseDelete = require('mongoose-delete');
const mongoosePaginate = require('mongoose-paginate-v2');

const OrderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }, // Tham chiếu đến người dùng đã đặt hàng
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    }, // Tham chiếu đến người dùng đã đặt hàng
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products",
            required: true,
        }, // Tham chiếu đến sản phẩm đã đặt
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        }, //
        quantity: { type: Number, default: 1 }, // Số lượng sản phẩm đã đặt (mặc định là 1)
        price: { type: Number, required: true }, // Giá sản phẩm khi đặt hàng
        image: [{ type: String }],
    }, ],
    totalAmount: { type: Number, required: true }, // Tổng số tiền cho đơn hàng
    shippingAddress: { type: String, maxLength: 255, required: true },
    description: { type: String, maxLength: 1000 },
    email: { type: String, maxLength: 255, required: true },
    name: { type: String, maxLength: 255, required: true },
    phone: { type: String, maxLength: 255, required: true },
    status: {
        type: String,
        enum: [
            "Pending",
            "Processing",
            "Shipped",
            "Delivered",
            "Canceled",
            "Returned",
        ],
        default: "Pending", // Trạng thái mặc định là "Chờ xử lý"
    },
    payment: {
        type: String,
        maxLength: 255,
        enum: ["Cash", "Paypal", "Transfer", "Pending", "Canceled"],
        default: "Pending", // Trạng thái mặc định là "Chờ xử lý"
    },
    deletedAt: { type: String, maxLength: 255, default: null },
}, {
    timestamps: true,
});
OrderSchema.plugin(MongooseDelete, { deletedAt: true, overrideMethods: 'all' });
OrderSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('order', OrderSchema);; ===
=== =
const express = require('express')
const routerOrder = express.Router()
const OrderController = require('../app/controllers/OrderController')
const { authenticatedStaff } = require('../config/db/authenticatedStaff')


routerOrder
    .route("/manager/dashboard")
    .get(OrderController.getAdminDeliveredByMonth)


routerOrder
    .route("/user/pending")
    .get(OrderController.getUserPending)

routerOrder
    .route("/user/Canceled/:id/:status")
    .put(OrderController.putUserCanceled)
routerOrder
    .route("/user/processing")
    .get(OrderController.getUserProcessing)
routerOrder
    .route("/user/shipped")
    .get(OrderController.getUserShipped)
routerOrder
    .route("/user/delivered")
    .get(OrderController.getUserDelivered)
routerOrder
    .route("/user/canceled")
    .get(OrderController.getUserCanceled)
routerOrder
    .route("/user/returned")
    .get(OrderController.getUserReturned)

routerOrder
    .route("/user/all")
    .get(OrderController.getUserAll)



routerOrder
    .route("/admin/pending")
    .get(OrderController.getAdminPending)
routerOrder
    .route("/admin/processing")
    .get(OrderController.getAdminProcessing)
routerOrder
    .route("/admin/shipped")
    .get(OrderController.getAdminShipped)
routerOrder
    .route("/admin/delivered")
    .get(OrderController.getAdminDelivered)
routerOrder
    .route("/admin/Canceled")
    .get(OrderController.getAdminCanceled)
routerOrder
    .route("/admin/returned")
    .get(OrderController.getAdminReturned)

routerOrder
    .route("/admin/all")
    .get(OrderController.getAdminAll)

routerOrder
    .route("/admin/put/:status")
    .put(OrderController.putAdminStatus)

routerOrder
    .route("/user/put/:id")
    .put(OrderController.putUserStatus)

routerOrder
    .route("/user/:id")
    .get(OrderController.getOrderUser)


routerOrder
    .route("/user")
    .get(OrderController.getUser)
    .post(OrderController.check, OrderController.post)

routerOrder
    .route("/pay")
    .post(OrderController.check, OrderController.pay)

routerOrder
    .route("/payment/bill/:id")
    .post(OrderController.payBill)

routerOrder
    .route("/:id")
    .get(authenticatedStaff, OrderController.getOne)
    .put(authenticatedStaff, OrderController.put)
    .delete(authenticatedStaff, OrderController.delete)
routerOrder
    .route("/")
    .get(authenticatedStaff, OrderController.getAdmin)
    .post(authenticatedStaff, OrderController.check, OrderController.post)


module.exports = routerOrder >>>
    >>> > a27cd2e89b27149749ed467138fa2e69613a9f5a