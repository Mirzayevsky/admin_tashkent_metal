import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useHttpRequest from "../../hooks/useHttpRequest";
import Text, { text } from "../../lang/langManager";
import { ActionButton, SidePage } from "../styles";
import { Button, CancelButton } from "../styles/styles";
import {
  InputWrap,
  Labels,
  Input,
  FormInner,
  FirstWrap,
  InputSelect,
  ActionWrapper,
  TitleWrapper,
  ProductWrapper,
  ProductInner,
  InputStr,
} from "./styles";
import { toast } from "react-toastify";
import httpRequest from "../../utils/httpRequest";

function AddProduct({
  sidePage,
  setSidePage,
  reGetProducts,
  setEditPopUp,
  editPopUp,
}) {
  const myRef = useRef();
  //   const dispatch = useDispatch();

  const state = useSelector((state) => state);
  const lang = state.lang;

  const categories = state.categories;

  const [categoryId, setCategoryId] = useState();
  const [productName, setProductName] = useState();
  const [diameter, setDiameter] = useState();
  const [thickness, setThickness] = useState();

  const [price1, setPrice1] = useState();
  const [price2, setPrice2] = useState();

  const [mass, setMass] = useState();
  const [length, setLength] = useState();
  const [stock, setStock] = useState();

  const [process, makeRequest] = useHttpRequest({
    onSuccess: () => {
      toast.success(<Text id={"successfullyCompleted"} />);
      setTimeout(() => {
        setSidePage(false);
        setEditPopUp({ popUp: false, sidePage: false, data: {} });
      }, 2000);
      setCategoryId(null);
      setProductName("");
      setDiameter("");
      setThickness("");
      setPrice1("");
      setPrice2("");
      setMass("");
      setLength("");
      setStock("");
      // myRef.current.reset();
      reGetProducts();
    },
    cleanTimeout: 2000,
  });

  const addProduct = (e) => {
    e.preventDefault();

    const {
      category: { value: category },
      productName: { value: productName },
      //   diameter: { value: diameter },
      //   thickness: { value: thickness },
      //   length: { value: length },
      //   mass: { value: mass },
      //   stock: { value: stock },
      //   price1: { value: price1 },
      //   price2: { value: price2 },
    } = e.target;
    console.log("adding product to server");
    makeRequest({
      method: editPopUp.sidePage ? "PUT" : "POST",
      path: `product${editPopUp.sidePage ? `/${editPopUp?.data?.id}` : ""}`,
      data: {
        name: productName,
        diameter,
        thickness,
        price1,
        price2,
        mass,
        length,
        stock,
        category: {
          id: category,
        },
      },
    });
  };

  useEffect(() => {
    const data = editPopUp.data;
    if (editPopUp.sidePage) {
      httpRequest({
        method: "GET",
        path: `product/${data.id}/category`,
      }).then((res) => {
        setCategoryId(res.data);
      });
      setProductName(data?.name);
      setDiameter(data?.diameter);
      setThickness(data?.thickness);
      setPrice1(data?.price1);
      setPrice2(data?.price2);
      setMass(data?.mass);
      setLength(data?.length);
      setStock(data?.stock);
    } else {
      setCategoryId(null);
      setProductName("");
      setDiameter("");
      setThickness("");
      setPrice1("");
      setPrice2("");
      setMass("");
      setLength("");
      setStock("");
    }
  }, [editPopUp.sidePage]);

  return (
    <>
      <SidePage
        isOpen={sidePage || editPopUp.sidePage}
        close={() => {
          setSidePage(false);
          setEditPopUp({ popUp: false, sidePage: false, data: {} });
        }}
      >
        <ProductWrapper>
          <ProductInner>
            <TitleWrapper>
              <h6>
                {text({
                  id: editPopUp.sidePage ? "editProduct" : "addNewProduct",
                  lang,
                })}
              </h6>
            </TitleWrapper>
            <form
              autoComplete="off"
              // ref={myRef}
              onSubmit={addProduct}
            >
              <FormInner>
                <FirstWrap>
                  <InputWrap>
                    <Labels>{text({ id: "category", lang })}</Labels>
                    <InputSelect
                      selectData={categories?.data}
                      name="category"
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                      required
                    />
                  </InputWrap>
                  <InputWrap>
                    <Labels>{text({ id: "name", lang })}</Labels>
                    <InputStr
                      type="text"
                      // type="number"
                      placeholder={text({ id: "name", lang })}
                      name="productName"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      required
                    />
                  </InputWrap>
                </FirstWrap>
                <FirstWrap>
                  <InputWrap>
                    <Labels>{text({ id: "diameter", lang })}</Labels>
                    <InputStr
                      placeholder="15 мм"
                      // name="diameter"
                      required
                      // suffix=" мм"
                      value={diameter}
                      onChange={(e) => setDiameter(e.target.value)}
                      type="text"
                      // onValueChange={(e) => setDiameter(e.floatValue)}
                      // onChange={(e) => setDiameter(e.floatValue)}
                    />
                  </InputWrap>
                  <InputWrap>
                    <Labels>{text({ id: "thickness", lang }) + " (мм)"}</Labels>
                    <Input
                      placeholder="1.5 мм"
                      // name="thickness"
                      required
                      suffix=" мм"
                      // type={"number"}
                      // step={"0.000001"}
                      value={thickness}
                      onValueChange={(e) => setThickness(e.floatValue)}
                    />
                  </InputWrap>
                </FirstWrap>
                <FirstWrap>
                  <InputWrap>
                    <Labels>{text({ id: "length", lang })}</Labels>
                    <Input
                      placeholder="8 м"
                      // name="length"
                      required
                      suffix=" м"
                      value={length}
                      // step="0.00001"
                      // type={"number"}
                      onValueChange={(e) => setLength(e.floatValue)}
                    />
                  </InputWrap>
                  <InputWrap>
                    <Labels>{text({ id: "mass", lang })}</Labels>
                    <Input
                      placeholder="0.709 кг"
                      // name="mass"
                      required
                      suffix=" кг"
                      // step="0.00001"
                      // type={"number"}
                      value={mass}
                      onValueChange={(e) => setMass(e.floatValue)}
                    />
                  </InputWrap>
                </FirstWrap>
                <FirstWrap>
                  <InputWrap>
                    <Labels>{text({ id: "stock", lang })}</Labels>
                    <Input
                      placeholder="123 м"
                      // name="stock"
                      required
                      suffix=" м"
                      // type={"number"}
                      // step="0.000001"
                      value={stock}
                      onValueChange={(e) => setStock(e.floatValue)}
                    />
                  </InputWrap>
                  <InputWrap>
                    <Labels>{text({ id: "price1", lang })}</Labels>
                    <Input
                      thousandSeparator=" "
                      suffix=" сум"
                      placeholder="10 900.00 сум"
                      // name="price1"
                      onValueChange={(e) => setPrice1(e.floatValue)}
                      value={price1}
                      required
                      // type={"number"}
                      // step="0.01"
                    />
                  </InputWrap>
                </FirstWrap>
                <InputWrap className={"bottom-input"}>
                  <Labels>{text({ id: "price2", lang })}</Labels>
                  <Input
                    thousandSeparator=" "
                    suffix=" сум"
                    placeholder="11 500.00 сум"
                    // name="price2"
                    onValueChange={(e) => setPrice2(e.floatValue)}
                    value={price2}
                    required
                    // type={"number"}
                    // step="0.01"
                  />
                </InputWrap>
              </FormInner>
              <ActionWrapper>
                <ActionButton
                  loading={process.loading}
                  success={process.success}
                  error={process.error}
                  edit
                  mr="20px"
                >
                  <Text id={editPopUp.sidePage ? "edit" : "add"} />
                </ActionButton>
                <CancelButton
                  cancel
                  onClick={() => {
                    setSidePage(false);
                    setEditPopUp({ popUp: false, sidePage: false, data: {} });
                  }}
                >
                  <Text id="cancel" />
                </CancelButton>
              </ActionWrapper>
            </form>
          </ProductInner>
        </ProductWrapper>
      </SidePage>
    </>
  );
}

export default AddProduct;
