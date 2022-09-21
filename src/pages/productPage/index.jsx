import { Empty, Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ActionButton, SearchInput } from "../../components/styles";
import {
  ActionBox,
  Button,
  SearchBox,
  Table,
  TableWrapper,
  TBody,
  TD,
  TH,
  THead,
  TRow,
} from "../../components/styles/styles";
import { getCategoriesAction } from "../../redux/modules/getCategories";
import { getProductsAction } from "../../redux/modules/getProducts";
import {
  CategoryFilter,
  CategoryFilterWrapper,
  ProductPageWrapper,
  SearchBoxAndAddButtonWrapper,
  ActionWrapper,
  PopUpContainer,
  TitleWrapper,
  InputWrap,
  Input,
  Labels,
  ActionWrapperPopUP,
  ProductWrapper,
  InputText,
  ActionButtonDelete,
} from "./styles";

// icons
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg";
import { ReactComponent as DeleteIcon } from "../../assets/icons/udalit.svg";
import useHttpRequest from "../../hooks/useHttpRequest";
import AddProduct from "../../components/addProduct";
import CategorySidePage from "../../components/categorySidePage";
import Loading from "../../components/loadingBox";
import ErrorBox from "../../components/errorBox";
import Text, { text } from "../../lang/langManager";
import EmptyBox from "../../components/emptyBox";
import { toast } from "react-toastify";
import httpRequest from "../../utils/httpRequest";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import moment from "moment";
import { getCurrencyAction } from "../../redux/modules/getCurrency";

function ProductPage() {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState("");
  const [size, setSize] = useState(10);
  const [price1, setPrice1] = useState();
  const [price2, setPrice2] = useState();
  const [stock, setStock] = useState();

  const [editPopUp, setEditPopUp] = useState({ popUp: false, data: {} });
  const [deletePopUp, setDeletePopUp] = useState({ popUp: false, data: {} });

  const [isSidePageOpen, setIsSidePageOpen] = useState(false);
  const [isCategorySidePageOpen, setIsCategorySidePageOpen] = useState(false);

  useEffect(() => {
    dispatch(getCategoriesAction());
    dispatch(getCurrencyAction());
  }, []);

  useEffect(() => {
    dispatch(getProductsAction(0, size, categories, filter));
  }, [categories, filter, size]);

  const getProductByPage = (page) => {
    dispatch(getProductsAction(page, size, categories, filter));
  };

  const state = useSelector((state) => state);
  const products = state.products;
  const categoryList = state.categories;
  const lang = state.lang;
  const currency = state.currency;

  const addRemoveCategory = (id) => {
    const index = categories?.indexOf(id);
    console.log(index);
    console.log(categories);
    if (index === -1) {
      setCategories([...categories, id]);
    } else {
      setCategories([...categories.filter((v, i) => i !== index)]);
    }
    console.log(categories);
  };

  const [editProcess, makeRequest] = useHttpRequest({
    onSuccess: () => {
      getProductByPage(0);
      toast.success(<Text id={"successfullyCompleted"} />);
    },
    onFinal: () => setEditPopUp({ popUp: false, sidePage: false, data: {} }),
    cleanTimeout: 3000,
  });
  const [deleteProcess, deleteRequest] = useHttpRequest({
    onSuccess: () => {
      getProductByPage(0);
      toast.success(<Text id={"successfullyCompleted"} />);
    },
    onFinal: () => setDeletePopUp({ popUp: false, data: {} }),
    cleanTimeout: 3000,
  });

  const editProduct = (e) => {
    e.preventDefault();
    const { id } = editPopUp.data;

    makeRequest({
      method: "PUT",
      path: "product",
      params: { id, price1, price2, stock },
    });
  };

  const deleteProduct = (id) => {
    deleteRequest({
      method: "DELETE",
      path: `product/${id}`,
    });
  };

  const downloadExcel = () => {
    httpRequest({
      method: "GET",
      path: "product/all",
    })
      .then((res) => {
        const fileName = `Товары ${moment().format("DD/MM/YYYY")}`;
        const fileType =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        const fileExtension = ".xlsx";

        const response = res.data.map(
          (
            {
              active,
              createdAt,
              diameter,
              id,
              isOnSale,
              length,
              mass,
              name,
              price1,
              price2,
              stock,
              supplier,
              thickness,
            },
            index
          ) => ({
            // Nº: index + 1,
            ID: id,
            Наименование: name,
            "Размер (мм)": diameter,
            "Толщина (мм)": thickness,
            Масса: mass,
            "Цена наличн.": `${price1} сум`,
            "Цена безнал.": `${price2} сум`,
            USD: `$${(price1 / currency?.data?.currency).toFixed(2)}`,
            "Длина (м)": length,
            "Запас":stock
          })
        );

        const ws = XLSX.utils.json_to_sheet(response);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        ws["!cols"] = [
          // { wch: 3 }, // No
          { wch: 3 }, // ID
          { wch: 20 }, // Name
          { wch: 12 }, // size
          { wch: 13 }, // thickness
          { wch: 10 }, // mass
          { wch: 15 }, // price1
          { wch: 15 }, // price2
          { wch: 10 }, // usd
          { wch: 10 }, // length
        ];

        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
      })
      .catch((err) => {});
  };

  return (
    <ProductPageWrapper>
      <SearchBoxAndAddButtonWrapper>
        <SearchInput onChange={(e) => setFilter(e.target.value)} />
        <div>
          <Button mr={"20px"} edit onClick={downloadExcel}>
            <Text id="excel" />
          </Button>
          <Button mr={"20px"} edit onClick={() => setIsSidePageOpen(true)}>
            + <Text id="product" />
          </Button>
          <Button edit onClick={() => setIsCategorySidePageOpen(true)}>
            + <Text id="category" />
          </Button>
        </div>
      </SearchBoxAndAddButtonWrapper>

      <CategoryFilterWrapper>
        {categoryList.data.map(({ id, name }) => (
          <CategoryFilter
            key={id}
            active={categories.includes(id)}
            onClick={() => addRemoveCategory(id)}
          >
            {name}
          </CategoryFilter>
        ))}
      </CategoryFilterWrapper>

      <TableWrapper>
        <Table>
          <THead bg="#B57068">
            <TRow>
              <TH>
                <Text id="name" />
              </TH>
              <TH>
                <Text id="diameter" />
              </TH>
              <TH>
                <Text id="thickness" /> (мм)
              </TH>
              <TH>
                <Text id="price1" />
              </TH>
              <TH>
                <Text id="price2" />
              </TH>
              <TH>
                <Text id="mass" /> (кг)
              </TH>
              {/* <TH>
                <Text id="source" />
              </TH> */}
              <TH>
                <Text id="amount" />
              </TH>
              <TH></TH>
            </TRow>
          </THead>
          <TBody>
            {products?.data?.content?.map((value) => {
              const {
                id,
                name,
                diameter,
                thickness,
                price1,
                price2,
                priceInUSD,
                mass,
                length,
                stock,
                isOnSale,
                supplier,
                category,
              } = value;
              return (
                <TRow key={id}>
                  <TD>
                    <b>{name}</b>
                  </TD>
                  <TD>{diameter}</TD>
                  <TD>{thickness}</TD>
                  <TD>{price1}</TD>
                  <TD>{price2}</TD>
                  <TD>{mass}</TD>
                  {/* <TD>{(1000 / mass).toFixed(2)}</TD> */}
                  <TD>
                    {length}/{stock}
                  </TD>
                  <TD action={2}>
                    <ActionWrapper>
                      <ActionBox
                        onClick={() => {
                          setEditPopUp({
                            popUp: true,
                            sidePage: false,
                            data: value,
                          });
                          setStock(stock);
                          setPrice1(price1);
                          setPrice2(price2);
                        }}
                        edit
                      >
                        <EditIcon />
                      </ActionBox>
                      <ActionBox
                        onClick={() =>
                          setDeletePopUp({ popUp: true, data: value })
                        }
                        deleteBtn
                      >
                        <DeleteIcon />
                      </ActionBox>
                    </ActionWrapper>
                  </TD>
                </TRow>
              );
            })}
          </TBody>
        </Table>
      </TableWrapper>
      {products.loading && <Loading />}
      {products.error && <ErrorBox />}
      {products.success && products?.data?.content?.length === 0 && (
        <EmptyBox item="productItem" />
      )}
      {products?.data?.content?.length > 0 && (
        <Pagination
          size="small"
          total={products?.data?.totalElements}
          // showSizeChanger
          pageSize={size}
          current={products?.data?.number + 1}
          // totalBoundaryShowSizeChanger={(e) => console.log(e)}
          onChange={(e) => getProductByPage(e - 1)}
          // onShowSizeChange={(p, pageSize) => setSize(pageSize)}
          // showTotal={(e,d)=>console.log(e,d)}
        />
      )}

      {editPopUp.popUp && (
        <PopUpContainer
          close={() =>
            setEditPopUp({ popUp: false, sidePage: false, data: {} })
          }
        >
          <ProductWrapper>
            <TitleWrapper>
              {text({ id: "editProduct", lang })}{" "}
              <EditIcon
              style={{cursor:"pointer"}}
                onClick={() => {
                  setEditPopUp((prev) => ({
                    ...prev,
                    sidePage: true,
                    popUp: false,
                  }));
                }}
              />
            </TitleWrapper>
            <form autoComplete="off" onSubmit={editProduct}>
              <InputWrap>
                <Labels>{text({ id: "stock", lang }) + " (метр)"}</Labels>
                <Input
                  type="text"
                  thousandSeparator=" "
                  suffix=" m"
                  placeholder={text({ id: "stock", lang })}
                  // defaultValue={editPopUp.data.totalLength}
                  onValueChange={(e) => setStock(e.floatValue)}
                  value={stock}
                  required
                />
              </InputWrap>
              <InputWrap>
                <Labels>{text({ id: "price1", lang })}</Labels>
                <Input
                  placeholder={text({ id: "price1", lang })}
                  label={text({ id: "price1", lang })}
                  // type="text"
                  thousandSeparator=" "
                  suffix=" UZS"
                  // defaultValue={editPopUp.data.price1}
                  onValueChange={(e) => setPrice1(e.floatValue)}
                  value={price1}
                  required
                />
              </InputWrap>
              <InputWrap>
                <Labels>{text({ id: "price2", lang })}</Labels>
                <Input
                  placeholder={text({ id: "price2", lang })}
                  type="text"
                  thousandSeparator=" "
                  suffix=" UZS"
                  // defaultValue={editPopUp.data.price2}
                  onValueChange={(e) => setPrice2(e.floatValue)}
                  value={price2}
                  required
                />
              </InputWrap>
              <ActionWrapperPopUP>
                <ActionButton
                  // loading={editProcess.loading}
                  // success={editProcess.success}
                  // error={editProcess.error}
                  disabled={
                    (editPopUp.data.price1 === price1 &&
                      editPopUp.data.price2 === price2 &&
                      editPopUp.data.stock === stock) ||
                    editProcess.loading ||
                    editProcess.success ||
                    editProcess.error
                  }
                  edit
                  type="submit"
                  mr={"20px"}
                >
                  <Text id="edit" />
                </ActionButton>
                <Button
                  cancel
                  onClick={() =>
                    setEditPopUp({ popUp: false, sidePage: false, data: {} })
                  }
                >
                  <Text id="cancel" />
                </Button>
              </ActionWrapperPopUP>
            </form>
          </ProductWrapper>
        </PopUpContainer>
      )}

      {deletePopUp.popUp && (
        <PopUpContainer
          close={() => setDeletePopUp({ popUp: false, data: {} })}
        >
          <ProductWrapper>
            <TitleWrapper>
              <Text id={"reallyWannaDelete"} />
            </TitleWrapper>
            <Table>
              <TRow>
                <TD>{deletePopUp.data.name}</TD>
                <TD>{deletePopUp.data.diameter}</TD>
                <TD>{deletePopUp.data.thickness}</TD>
              </TRow>
            </Table>
            <ActionWrapperPopUP>
              <ActionButtonDelete
                className={"mr"}
                loading={deleteProcess.loading}
                success={deleteProcess.success}
                error={deleteProcess.error}
                edit
                onClick={() => deleteProduct(deletePopUp.data.id)}
              >
                <Text id="delete" />
              </ActionButtonDelete>
              <Button
                cancel
                onClick={() => setDeletePopUp({ popUp: false, data: {} })}
              >
                <Text id="cancel" />
              </Button>
            </ActionWrapperPopUP>
          </ProductWrapper>
        </PopUpContainer>
      )}
      <AddProduct
        setEditPopUp={setEditPopUp}
        editPopUp={editPopUp}
        sidePage={isSidePageOpen}
        setSidePage={setIsSidePageOpen}
        reGetProducts={() => getProductByPage(0)}
      />
      <CategorySidePage
        isOpen={isCategorySidePageOpen}
        setIsOpen={setIsCategorySidePageOpen}
        reGetCategory={() => dispatch()}
      />
    </ProductPageWrapper>
  );
}

export default ProductPage;
