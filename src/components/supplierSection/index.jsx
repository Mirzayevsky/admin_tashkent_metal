import { DatePicker, Empty, Popover } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useHttpRequest from "../../hooks/useHttpRequest";
import Text, { text } from "../../lang/langManager";
import {
  AddImageBox,
  CardImg,
  ImageWrapper,
  SupplierCard,
  SupplierCardsWrapper,
  SupplierForm,
  SupplierPageWrapper,
  TextPart,
} from "../../pages/supplierPage/styles";
import {ActionButtonDelete, InputContact} from "./styles";
import { getSuppliersAction } from "../../redux/modules/getSuppliers";
import { formatDate, getDate } from "../../utils/dateManager";
import ErrorBox from "../errorBox";
import Loading from "../loadingBox";
import { ActionButton } from "../styles";

import { ReactComponent as PlusIcon } from "../../assets/icons/plus.svg";
import { ReactComponent as X } from "../../assets/icons/x.svg";
import { BASE_URL } from "../../constants/link";
import EmptyBox from "../emptyBox";
import moment from "moment";
import {
  InputWrap, Input, Labels,
  DateInput, InputWrapper, ActionWrapper, EditSupplier, TitleWrapper
} from "./styles";
import {toast} from "react-toastify";

function SupplierSection() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const suppliers = state.suppliers;
  const lang = state.lang;

  const [edit, setEdit] = useState({ edit: false, id: null });
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [date, setDate] = useState("");
  const [imageId, setImageId] = useState("");

  const [submitSupplierProcess, makeSubmitSupplierRequest] = useHttpRequest({
    onSuccess: () => {
      dispatch(getSuppliersAction());
      toast.success(  <Text id={'successfullyCompleted'}/>)
      setTimeout(() => {
        setEdit({ edit: false, id: null });
        setImageId("");
        setName("");
        setAddress("");
        setContact("");
        setDate("");
      }, 2000);
    },
    cleanTimeout: 2000,
  });

  const submitSupplier = (e) => {
    e.preventDefault();
    const {
      name: { value: name },
      address: { value: address },
      contact: { value: contact },
      // date: { value: date },
    } = e.target;

    if (edit.edit) {
      makeSubmitSupplierRequest({
        method: "PUT",
        path: `supplier/${edit.id}`,
        data: {
          imageId,
          name,
          address,
          contact,
          date,
        },
      });
    } else {
      makeSubmitSupplierRequest({
        method: "POST",
        path: "supplier",
        data: {
          imageId,
          name,
          address,
          contact,
          date,
        },
      });
    }
  };

  const [sendImgProcess, sendImgRequest] = useHttpRequest({
    onSuccess: (res) => setImageId(res.data.message),
  });
  const [deleteSupplierProcess, makeDeleteSupplierRequest] = useHttpRequest({
    onSuccess: () => {
      dispatch(getSuppliersAction())
      toast.success(<Text id={'successfullyCompleted'}/>)
    },


  });

  const deleteSupplier = (id) => {
    makeDeleteSupplierRequest({
      method: "DELETE",
      path: `supplier/${id}`,
    });
  };

  useEffect(() => {
    dispatch(getSuppliersAction());
  }, []);

  return (
    <SupplierPageWrapper id={'top'}>
      <TitleWrapper>
        <Text id="suppliers" />
      </TitleWrapper>
      <SupplierForm onSubmit={submitSupplier}>
        <ImageWrapper>
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
        <InputWrapper>
          <InputWrap>
            <Labels>{text({ id: "name", lang })}</Labels>
            <Input
                name="name"
                placeholder="Metallon"
                type="text"
                lWidth={"200px"}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}/>
          </InputWrap>

          <InputWrap>
            <Labels>{text({ id: "address", lang })}</Labels>
            <Input
                name="address"
                placeholder="Ташкент, Узбекистан"
                type="text"
                lWidth={"200px"}
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}/>
          </InputWrap>

          <InputWrap>
            <Labels>{text({ id: "contact", lang })}</Labels>
            <InputContact
                name="contact"
                placeholder="+998(99) 923-45-67"
                // allowEmptyFormatting
                format="+998(##) ###-##-##"
                mask="_"
                lWidth={"200px"}
                required
                value={contact}
                onChange={(e) => setContact(e.target.value)}/>
          </InputWrap>

          <InputWrap>
            <Labels>{text({ id: "dateContract", lang })}</Labels>
            <DateInput
                onChange={(date, dateString) => setDate(dateString)}
                value={date && moment(date, "YYYY-MM-DD")}
                datePicker
                name="date"
                placeholder="12.03.2022г"/>
          </InputWrap>



          {/* <Input
            label={text({ id: "dateContract", lang })}
            name="date"
            placeholder="12.03.2022г"
            type="date"
            lWidth={"200px"}
            required
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              console.log(e.target.value);
            }}
          /> */}
        </InputWrapper>
        <ActionWrapper >
          <ActionButton
            loading={submitSupplierProcess.loading}
            success={submitSupplierProcess.success}
            error={submitSupplierProcess.error}
            edit
          >
            <Text id={edit.edit ? "edit" : "add"} />
          </ActionButton>
        </ActionWrapper>
      </SupplierForm>

      <SupplierCardsWrapper>
        {suppliers?.data?.map((supplier) => {
          const { id, imageId, name, address, contact, date } = supplier;
          return (
            <SupplierCard editing={id === edit.id} id={id}>
              <CardImg img={`${BASE_URL}/attachment/${imageId}`} />
              <TextPart>
                <p>{name}</p>
                <p>{address}</p>
                <p>{contact}</p>
                <p>{getDate(date)}</p>
              </TextPart>
              {edit.id === id ? (
                <EditSupplier href={'#top'}
                  className="edit"
                  onClick={() => {
                    setEdit({ edit: false, id: null });
                    setImageId("");
                    setName("");
                    setAddress("");
                    setContact("");
                    setDate("");
                  }}
                >
                  <Text id="cancel" />
                </EditSupplier>
              ) : (
                <EditSupplier
                  className="edit"
                  onClick={() => {
                    setEdit({ edit: true, id });
                    setImageId(imageId);
                    setName(name);
                    setAddress(address);
                    setContact(contact);
                    setDate(formatDate(date));
                  }}
                >
                  <Text id="edit" />
                </EditSupplier>
              )}

              <Popover
                content={
                  <div>
                    <Text id="reallyWannaDelete" /> <br />
                    <ActionButtonDelete
                      loading={deleteSupplierProcess.loading}
                      error={deleteSupplierProcess.error}
                      success={deleteSupplierProcess.success}
                      onClick={() => deleteSupplier(id)}
                      edit
                    >
                      <Text id="delete" />
                    </ActionButtonDelete>
                  </div>
                }
              >
                <div className="x">
                  <X />
                </div>
              </Popover>
            </SupplierCard>
          );
        })}
        {suppliers.loading && <Loading />}
        {suppliers.error && <ErrorBox />}
        {suppliers.success && suppliers?.data?.length === 0 && (
          <EmptyBox item="supplierItem" />
        )}
      </SupplierCardsWrapper>
    </SupplierPageWrapper>
  );
}

export default SupplierSection;
