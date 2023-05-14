import { createPayment, returnPayment } from "../services/paymentService";
import { VNPay } from "vn-payments";
require("dotenv").config();
const querystring = require("qs");
const crypto = require("crypto");
import { Buffer } from "buffer";

const vnpay = new VNPay({
  paymentGateway: "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
  merchant: "S6ANVFJP",
  secureSecret: "JNOGWVTOCUVPAKBWKWTPOIRQJRSVPVIJ",
});

const handleCreatePayment = (req, res) => {
  // console.log("check data: ", req.body);
  const checkoutData = {
    amount: parseInt(req.body.amount, 10),
    orderInfo: req.body.orderInfo,
    orderId: req.body.orderId,
    orderType: "210000",
    clientIp: req.body.clientIp,
    // orderId: req.body.orderId,
    returnUrl: process.env.RETURN_URL,
    transactionId: req.body.transactionId, //mã giao dịch trong ngày
    bankCode: "NCB",

    // locale: "vn",
    // currency: "VND",
    // paymentMethod: "ATM_ONLINE",
    // description: "Mua mỹ phẩm trên website của chúng tôi",
    // installment: false,
  };
  vnpay.buildCheckoutUrl(checkoutData).then((checkoutUrl) => {
    res.send({ checkoutUrl });
  });
};

const handleReturnPayment = (req, res) => {
  const query = req.query;
  console.log("check query: ", query);
  vnpay.verifyReturnUrl(query).then((results) => {
    console.log("check res: ", results);
    if (results.vnp_TransactionStatus === "00") {
      // Payment successful
      res.send("Payment successful");
    } else {
      // Payment unsuccessful
      res.send("Payment unsuccessful");
    }
  });
};

module.exports = {
  handleCreatePayment,
  handleReturnPayment,
};
