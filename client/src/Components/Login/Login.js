import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { loginUserService } from "../../api/userApi";
import { Button, Flex, Input } from "@chakra-ui/react";
import { loginUser } from "../../reducers/user";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);

  const navigate = useNavigate();

  const pay = {
    email,
    password,
  };

  const onLogin = async () => {
    if (email === "" || password === "") {
      toast.error("Nhập thiếu thông tin!");
    } else {
      // const response = await loginUserService(pay);
      // // console.log("check login user: ", response);
      // if (response.data.errCode === 0) {
      //   localStorage.setItem("UserToken", JSON.stringify(response.data.user));
      //   toast.success("Đăng nhập thành công");
      //   navigate("/");
      // } else {
      //   toast.error(response.data.message);
      // }
      dispatch(loginUser(pay, toast, navigate));
      // if (!loading) {
      //   console.log("check user when not loading: ", user);
      //   console.log("check err when not loading:", error);
      // }

      // if (error) {
      //   toast.error(error);
      // } else {
      //   localStorage.setItem("UserToken", JSON.stringify(user));
      //   toast.success("Đăng nhập thành công");
      //   navigate("/");
      // }
    }
  };
  return (
    <div>
      <Flex
        p={5}
        direction={{ base: "column", md: "row", lg: "row" }}
        className="input_div_main"
      >
        {/* sign in */}
        <div className="input_div">
          <div className="input_heading">ĐĂNG NHẬP</div>

          <div className="tit">
            Nếu bạn có tài khoản, hãy đăng nhập bằng địa chỉ email của bạn.
          </div>

          <div className="input_details">
            <label>
              Email<span> *</span>
            </label>
            <br />
            <Input
              placeholder="Nhập email của bạn"
              type="email"
              style={{ paddingLeft: "10px" }}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input_details">
            <label>
              Mật khẩu<span> *</span>
            </label>
            <br />
            <Input
              placeholder="Mật khẩu"
              type="password"
              style={{ paddingLeft: "10px" }}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button my={5} colorScheme="blue" onClick={onLogin}>
            ĐĂNG NHẬP
          </Button>
          {/* <a href="#">Forgot Your Password?</a> */}
        </div>
        {/* end sign in */}

        {/* create account */}
        <div className="register">
          <div className="input_heading">ĐĂNG KÝ MỚI</div>

          <div className="tit">
            Tạo một tài khoản có nhiều lợi ích: kiểm tra nhanh hơn, theo dõi đơn
            đặt hàng và hơn thế nữa.
          </div>

          <Link to="/signup">
            <Button my={5} colorScheme="blue">
              TẠO MỘT TÀI KHOẢN
            </Button>
          </Link>
        </div>
        {/* end create account */}
      </Flex>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}
