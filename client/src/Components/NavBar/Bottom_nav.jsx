import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { GiShoppingBag } from "react-icons/gi";
import { NavSingle } from "./navSingle";
import { Link } from "react-router-dom";
import "./cart.css";
import { GiClothes } from "react-icons/gi";
export const BottomNav = (props) => {
  const { serumProducts, skinProducts, cleanProducts, personalProducts } =
    props;

  const [navDropDown, setnavDropDown] = useState(false);
  const [dropDownSerum, setDropDownSerum] = useState(false);
  const [dropDownSkin, setDropDownSkin] = useState(false);
  const [dropDownClean, setDropDownClean] = useState(false);
  const [dropDownPersonalCare, setDropDownPersonalCare] = useState(false);

  const [makeup, setMakeup] = useState(false);
  const [skin, setSkin] = useState(false);
  const [clean, setClean] = useState(false);
  const [pcare, setPcare] = useState(false);
  const [mom, setmom] = useState(false);
  const [frag, setFrag] = useState(false);
  const [ayurveda, setAyurveda] = useState(false);
  const [brand, setBrand] = useState(false);
  const restState = [
    setSkin,
    setClean,
    setPcare,
    setmom,
    setFrag,
    setAyurveda,
    setBrand,
  ];

  // const brands = [{ "": [] }];
  return (
    <div id="bottom_nav">
      {/* menu */}
      <div id="nav_content">
        <div
          // style={{ color: "black" }}
          style={{ color: dropDownSerum ? "#000000" : "#777777" }}
          onMouseEnter={() => {
            setDropDownSerum(true);
            setSkin(false);
            setClean(false);
            setPcare(false);
            setmom(false);
            setFrag(false);
            setAyurveda(false);
            setBrand(false);
            setMakeup(true);
          }}
          onMouseLeave={() => {
            setDropDownSerum(false);
          }}
        >
          ÁO <IoIosArrowDown />
        </div>

        <div
          style={{ color: dropDownSkin ? "#000000" : "#777777" }}
          onMouseEnter={() => {
            setDropDownSkin(true);
            setMakeup(false);
            setClean(false);
            setPcare(false);
            setmom(false);
            setFrag(false);
            setAyurveda(false);
            setBrand(false);
            setSkin(true);
          }}
          onMouseLeave={() => {
            setDropDownSkin(false);
          }}
        >
          QUẦN <IoIosArrowDown />
        </div>

        <div
          style={{ color: dropDownClean ? "#000000" : "#777777" }}
          onMouseEnter={() => {
            setDropDownClean(true);
            setMakeup(false);
            setSkin(false);
            setPcare(false);
            setmom(false);
            setFrag(false);
            setAyurveda(false);
            setBrand(false);
            setClean(true);
          }}
          onMouseLeave={() => {
            setDropDownClean(false);
          }}
        >
          ĐẦM
          <IoIosArrowDown />
        </div>

        <div
          style={{ color: dropDownPersonalCare ? "#000000" : "#777777" }}
          onMouseEnter={() => {
            setDropDownPersonalCare(true);
            setMakeup(false);
            setSkin(false);
            setClean(false);
            setmom(false);
            setFrag(false);
            setAyurveda(false);
            setBrand(false);
            setPcare(true);
          }}
          onMouseLeave={() => {
            setDropDownPersonalCare(false);
          }}
        >
          PHỤ KIỆN <IoIosArrowDown />
        </div>

        <Link to="/products">
          <div id="cart" style={{ color: "#777777" }}>
            <GiClothes /> Tất cả sản phẩm
          </div>
        </Link>

        <Link to="/cart">
          <div id="cart" style={{ color: "#777777" }}>
            <GiShoppingBag></GiShoppingBag> GIỎ HÀNG
          </div>
        </Link>
      </div>

      {/* {navDropDown ? (
        <>
          <NavSingle
            array={makeupArr}
            products={serumProducts}
            state={makeup}
            setState={setMakeup}
            setnav={setnavDropDown}
          />
          <NavSingle
            array={skinArr}
            products={skinProducts}
            state={skin}
            setState={setSkin}
            setnav={setnavDropDown}
          />
          <NavSingle
            array={cleanArr}
            products={cleanProducts}
            state={clean}
            setState={setClean}
            setnav={setnavDropDown}
          />
          <NavSingle
            array={personalcare}
            products={personalProducts}
            state={pcare}
            setState={setPcare}
            setnav={setnavDropDown}
          />
          <NavSingle
            array={brands}
            state={brand}
            setState={setBrand}
            setnav={setnavDropDown}
          />
        </>
      ) : null} */}

      {dropDownSerum && serumProducts && serumProducts?.length !== 0 && (
        <NavSingle
          products={serumProducts}
          state={makeup}
          setState={setMakeup}
          setnav={setDropDownSerum}
          path={"/shirt"}
        />
      )}

      {dropDownSkin && skinProducts && skinProducts?.length !== 0 && (
        <NavSingle
          products={skinProducts}
          state={skin}
          setState={setSkin}
          setnav={setDropDownSkin}
          path={"/pant"}
        />
      )}

      {dropDownClean && cleanProducts && cleanProducts?.length !== 0 && (
        <NavSingle
          products={cleanProducts}
          state={clean}
          setState={setClean}
          setnav={setDropDownClean}
          path={"/dress"}
        />
      )}

      {dropDownPersonalCare &&
        personalProducts &&
        personalProducts?.length !== 0 && (
          <NavSingle
            products={personalProducts}
            state={pcare}
            setState={setPcare}
            setnav={setDropDownPersonalCare}
            path={"/accessory"}
          />
        )}
    </div>
  );
};
