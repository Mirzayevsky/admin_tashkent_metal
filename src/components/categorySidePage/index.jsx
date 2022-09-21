import React, { useState } from "react";
import { ActionButton, SidePage } from "../styles";
import {
  AddImageBox,
  CategoryBox,
  CategoryWrapper,
  ImageWrapper, TitleWrapper,
  InputWrap, Labels, Input, ActionWrapper,ProductWrapper,ProductInner
} from "./styles";
import { ReactComponent as PlusIcon } from "../../assets/icons/plus.svg";
import { ReactComponent as X } from "../../assets/icons/x.svg";
import { Button, CancelButton } from "../styles/styles";
import useHttpRequest from "../../hooks/useHttpRequest";
import { BASE_URL } from "../../constants/link";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getCategoriesAction } from "../../redux/modules/getCategories";
import Text, { text } from "../../lang/langManager";
import {toast} from "react-toastify";

function CategorySidePage({ isOpen, setIsOpen }) {
  const [editCategory, setEditCategory] = useState({ edit: false, data: {} });
  const [imageId, setImageId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const state = useSelector((state) => state);
  const categories = state.categories;
  const lang = state.lang;
  const [sendImgProcess, sendImgRequest] = useHttpRequest({
    onSuccess: (res) => setImageId(res.data.message),
    cleanTimeout: 0,
  });

  const dispatch = useDispatch();

  const [submitCategoryProcess, makeSubmitCategoryRequest] = useHttpRequest({
    onSuccess: () => {
      setCategoryName("");
      setImageId("");
      setEditCategory({ edit: false, data: {} });
      dispatch(getCategoriesAction());
      toast.success(  <Text id={'successfullyCompleted'}/>);

    },
    cleanTimeout: 2000,
  });

  const submitCategory = (e) => {
    e.preventDefault();

    if (!editCategory.edit) {
      makeSubmitCategoryRequest({
        method: "POST",
        path: "category",
        data: {
          name: categoryName,
          imageID: imageId,
        },
      });
    } else {
      makeSubmitCategoryRequest({
        method: "PUT",
        path: `category/${editCategory.data.id}`,
        data: {
          name: categoryName,
          imageID: imageId,
        },
      });
    }
  };

  return (
    <SidePage
      isOpen={isOpen}
      close={() => setIsOpen(false)}
    >
          <TitleWrapper>
            <h5>{text({ id: "addNewCategory", lang })}</h5>
          </TitleWrapper>
          <form autoComplete="off" onSubmit={submitCategory}>
            <ImageWrapper id={'top'}>
              <AddImageBox>
                {imageId ? (
                    <div className="image-box">
                      <div className="x" onClick={() => setImageId("")}>
                        <X />
                      </div>
                      <img
                          src={`${BASE_URL}/attachment/${imageId}`}
                          alt="chosen img"
                      />
                    </div>
                ) : (
                    <label>
                      <div>
                        <PlusIcon />
                      </div>
                      <p>
                        <Text id="addPhoto" />
                      </p>
                      <input
                          onChange={(e) => {
                            const formData = new FormData();
                            formData.append("file", e.target.files[0]);
                            sendImgRequest({
                              method: "POST",
                              path: "attachment",
                              data: formData,
                            });
                          }}
                          type="file"
                          max-file-size="1024"
                          accept="image/*"
                          style={{ display: "none" }}
                      />
                    </label>
                )}
              </AddImageBox>
            </ImageWrapper>
            <InputWrap>
              <Labels>{text({ id: "category", lang })}</Labels>
              <Input
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  type="text"
                  placeholder="Арматура"
                  required
              />
            </InputWrap>
            <ActionWrapper>
              <ActionButton
                  loading={submitCategoryProcess.loading}
                  success={submitCategoryProcess.success}
                  error={submitCategoryProcess.error}
                  disabled={
                    (imageId === "" && categoryName === "") ||
                    submitCategoryProcess.loading ||
                    submitCategoryProcess.success ||
                    submitCategoryProcess.error ||
                    (imageId === editCategory.data?.imageID &&
                        categoryName === editCategory.data?.name)
                  }
                  edit
                  mr="20px"
              >
                {/* {(imageId === "" && categoryName === "").toString()} <br />
          {sendImgProcess.loading.toString()} <br />
          {sendImgProcess.success.toString()} <br />
          {sendImgProcess.error.toString()} <br /> */}
                <Text id={editCategory.edit ? "edit" : "add"} />
              </ActionButton>

              <CancelButton
                  onClick={() => {
                    if (editCategory.edit) {
                      setCategoryName("");
                      setImageId("");
                      setEditCategory({ edit: false, data: {} });
                    } else {
                      setIsOpen(false);
                    }
                  }}
              >
                <Text id="cancel" />
              </CancelButton>
            </ActionWrapper>
          </form>
          <CategoryWrapper>
            {categories.data.map(({ id, name, imageID }) => (
                <CategoryBox
                    style={{
                      backgroundColor: `${
                          editCategory?.data?.id === id
                              ? "rgba(55, 52, 53, 0.3)"
                              : "white"
                      }`,
                    }}
                >
                  <img src={`${BASE_URL}/attachment/${imageID}`} alt="" />
                  <p>{name}</p>
                  {editCategory?.data?.id === id ? (
                      <div
                          onClick={() => {
                            setEditCategory({ edit: false, data: {} });
                            setImageId("");
                            setCategoryName("");
                          }}
                      >
                        <Text id="cancel" />
                      </div>
                  ) : (
                      <div
                          onClick={() => {
                            setEditCategory({ edit: true, data: { id, name, imageID } });
                            setImageId(imageID);
                            setCategoryName(name);
                          }}
                      >
                        <a href={'#top'}>
                          <Text id="edit"/>
                        </a>
                      </div>
                  )}
                </CategoryBox>
            ))}
          </CategoryWrapper>

    </SidePage>
  );
}

export default CategorySidePage;
