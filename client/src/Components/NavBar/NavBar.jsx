import { BottomNav } from "./Bottom_nav";
import { MiddleLogoDiv } from "./Middle_logo_div";
import { TopImageDiv } from "./Top_image";
import { Buffer } from "buffer";

import { useDispatch, useSelector } from "react-redux";

export const Navbar = () => {
  const categories = useSelector((state) => state.categories.categories);
  const loading = useSelector((state) => state.categories.loading);
  const error = useSelector((state) => state.categories.error);

  // console.log("check categories data: ", categories);

  const serumProducts = categories.filter((value) => {
    return value.categoryName === "Áo";
  });

  const skinProducts = categories.filter((value) => {
    return value.categoryName === "Quần";
  });

  const cleanProducts = categories.filter((value) => {
    return value.categoryName === "Đầm";
  });

  const personalProducts = categories.filter((value) => {
    return value.categoryName === "Phụ kiện";
  });

  return (
    <>
      <BottomNav
        serumProducts={serumProducts[0]?.Products}
        skinProducts={skinProducts[0]?.Products}
        cleanProducts={cleanProducts[0]?.Products}
        personalProducts={personalProducts[0]?.Products}
      />
    </>
  );
};
