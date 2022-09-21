import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../constants/link";
import { AddImageBox, ImageWrapper } from "../../pages/supplierPage/styles";
import {
  ActionBox, ActionWrapper,
  CertificateCard,
  CertificateCardWrapper,
  CertificateSectionWrapper,
  Form,
  FormInputBox, TitleWrapper, CancelButton, InputWrap, ActionButtonIn
} from "./styles";
import { ReactComponent as PlusIcon } from "../../assets/icons/plus.svg";
import { ReactComponent as X } from "../../assets/icons/x.svg";
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg";
import { ReactComponent as DeleteIcon } from "../../assets/icons/udalit.svg";
import useHttpRequest from "../../hooks/useHttpRequest";
import { ActionButton } from "../styles";
import { getCertificate } from "../../redux/modules/getCertificate";
import { Button,} from "../styles/styles";
import { Empty, Popover } from "antd";
import Loading from "../loadingBox";
import ErrorBox from "../errorBox";
import Text, { text } from "../../lang/langManager";
import EmptyBox from "../emptyBox";
import {toast} from "react-toastify";
import { Labels,Input} from "../clientSection/styles";

function CertificateSection() {
  const state = useSelector((state) => state);

  const certificates = state.certificates;
  const lang = state.lang;

  const dispatch = useDispatch();
  const [edit, setEdit] = useState({
    edit: false,
    id: null,
  });
  const [imageId, setImageId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(getCertificate());
  }, []);

  const [sendImgProcess, sendImgRequest] = useHttpRequest({
    onSuccess: (res) => setImageId(res.data.message),
  });

  const [submitCertificateProcess, makeSubmitCertificateRequest] =
    useHttpRequest({
      onSuccess: () => {
        dispatch(getCertificate());
        toast.success(  <Text id={'successfullyCompleted'}/>);
        setEdit({ edit: false, id: null });
        setTimeout(() => {
          setImageId("");
          setName("");
          setDescription("");
        }, 2000);
      },
      cleanTimeout: 2000,
    });
  const submitCertificate = (e) => {
    e.preventDefault();
    if (edit.edit) {
      makeSubmitCertificateRequest({
        method: "PUT",
        path: `certificate/${edit.id}`,
        data: {
          imageId,
          name,
          description,
        },
      });
    } else {
      makeSubmitCertificateRequest({
        method: "POST",
        path: "certificate",
        data: {
          imageId,
          name,
          description,
        },
      });
    }
  };

  const [deleteProcess, makeDeleteRequest] = useHttpRequest({
    onSuccess: () => {
      dispatch(getCertificate());
      setTimeout(() => {});
      toast.success(  <Text id={'successfullyCompleted'}/>);
    },
    cleanTimeout: 2000,
  });
  const deleteItem = (id) => {
    makeDeleteRequest({
      method: "DELETE",
      path: `certificate/${id}`,
    });
  };

  return (
    <CertificateSectionWrapper id={'top'}>
      <TitleWrapper>
        <Text id="certificate" />
      </TitleWrapper>
      <Form onSubmit={submitCertificate}>
        <ImageWrapper  style={{ marginBottom: "0" }}>
          <AddImageBox imageId={imageId}>
            {imageId ? (
              <div className="image-box">
                <div className="x" onClick={() => setImageId("")}>
                  <X />
                </div>
                {/* <img
                  src={`${BASE_URL}/attachment/${imageId}`}
                  alt="chosen img"
                /> */}
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
        <FormInputBox>

          <InputWrap>
            <Labels>{text({ id: "name", lang })}</Labels>
            <Input
                type={"text"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
          </InputWrap>
          <InputWrap>
            <Labels>{text({ id: "description", lang })}</Labels>
            <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
          </InputWrap>
        </FormInputBox>
        <ActionWrapper>
          <ActionButton
            loading={submitCertificateProcess.loading}
            error={submitCertificateProcess.error}
            success={submitCertificateProcess.success}
            edit
          >
            <Text id={edit.edit ? "edit" : "add"} />
          </ActionButton>
          {edit.edit && (
            <CancelButton className={'ml'}
              onClick={() => {
                setImageId("");
                setName("");
                setDescription("");
                setEdit({ edit: false, id: null });
              }}
            >
              <Text id="cancel" />
            </CancelButton>
          )}
        </ActionWrapper>
      </Form>
      <CertificateCardWrapper>
        {certificates?.data?.map(({ id, imageId, name, description }) => (
          <CertificateCard>
            <img src={`${BASE_URL}/attachment/${imageId}`} alt="" />
            <b>{name}</b>
            <p>{description}</p>
            <ActionBox>
              <a href={"#top"}
                className="edit"
                onClick={() => {
                  setEdit({ edit: true, id });
                  setImageId(imageId);
                  setName(name);
                  setDescription(description);
                }}
              >
                <EditIcon />
              </a>
              <div className="delete">
                <Popover
                  content={
                    <div>
                      <Text id="reallyWannaDelete" /> <br />
                      <ActionButtonIn
                        loading={deleteProcess.loading}
                        error={deleteProcess.error}
                        success={deleteProcess.success}
                        onClick={() => deleteItem(id)}
                        edit
                      >
                        <Text id="delete" />
                      </ActionButtonIn>
                    </div>
                  }
                >
                  <DeleteIcon />
                </Popover>
              </div>
            </ActionBox>
          </CertificateCard>
        ))}
        {certificates.loading && <Loading />}
        {certificates.error && <ErrorBox />}
        {certificates.success && certificates.data.length === 0 && (
          <EmptyBox item={"certificateItem"} />
        )}
      </CertificateCardWrapper>
    </CertificateSectionWrapper>
  );
}

export default CertificateSection;
