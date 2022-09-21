import { Radio, Steps } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useHttpRequest from "../../hooks/useHttpRequest";
import { getMessages } from "../../redux/modules/getMessages";
import { AddImageBox, ImageWrapper } from "../categorySidePage/styles";
import {ActionButton,   Textarea} from "../styles";
import {
  PopUpContainer,
  Form,
  Input,
  InputWrap,
  Labels,
  LabelSecond,
  TextareaWrapper,
  ContentWrapper,
  TitleWrapper
} from "./styles";
import { ReactComponent as PlusIcon } from "../../assets/icons/plus.svg";
import { ReactComponent as X } from "../../assets/icons/x.svg";
import { BASE_URL } from "../../constants/link";
import Text, { text } from "../../lang/langManager";
import {toast} from "react-toastify";


function MessagePopUp({ msgPopUp, setMsgPopUp }) {
  const dispatch = useDispatch();
  const [imageId, setImageId] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [sendImgProcess, sendImgRequest] = useHttpRequest({
    onSuccess: (res) => setImageId(res.data.message),
    cleanTimeout: 0,
  });
  const state = useSelector((state) => state);
  const userLang = state.lang;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [lang, setLang] = useState("");

  const [getImgPathProcess, makeGetPathRequest] = useHttpRequest({
    onSuccess: (res) => {
      res.data.success && setImagePath(res.data.message);
    },
    onError: () => setImagePath(""),
  });

  useEffect(() => {
    if (imageId === "") {
      setImagePath("");
    } else {
      makeGetPathRequest({
        method: "GET",
        path: "attachment/get-path",
        params: {
          fileId: imageId,
        },
      });
    }
  }, [imageId]);

  useEffect(() => {
    const { popUp, data } = msgPopUp;
    console.log(msgPopUp);
    data?.title && setTitle(data?.title);
    data?.description && setDescription(data?.description);
    data?.imageId && setImageId(data?.imageId);
    data?.lang && setLang(data?.lang);
  }, []);

  const [saveMsgProcess, saveMsgRequest] = useHttpRequest({
    onSuccess: () => {
      dispatch(getMessages());
      toast.success(  <Text id={'successfullyCompleted'}/>);
      setTimeout(() => {
        setMsgPopUp({});
      }, 2000);
    },
    cleanTimeout: 2000,
  });

  const saveMessage = () => {
    if (title !== "" && description !== "" && lang !== "") {
      if (msgPopUp?.data?.id) {
        saveMsgRequest({
          method: "PUT",
          path: `messages/update/${msgPopUp?.data?.id}`,
          params: {
            imageId,
            title,
            description,
            lang,
          },
        });
      } else {
        saveMsgRequest({
          method: "POST",
          path: "messages/save",
          params: {
            title,
            description,
            imageId,
            lang,
          },
        });
      }
    }
  };

  const [sendMsgProcess, sendMsgRequest] = useHttpRequest({
    // cleanTimeout: 2000,
  });
  const sendMessage = () => {
    if (title !== "" && description !== "" && lang !== "") {
      sendMsgRequest({
        method: "PUT",
        path: "messages/send",
        params: {
          imageId,
          title,
          description,
          lang,
        },
      });
    }
  };
  const { Step } = Steps;

  return (
    <PopUpContainer close={() => setMsgPopUp({ popUp: false, data: {} })}
    >
      <ContentWrapper>
        <TitleWrapper>
          {text({ id: msgPopUp?.data?.id?"edit":"add", lang: userLang })}
        </TitleWrapper>
        {sendMsgProcess.success ? (
            <Steps progressDot current={10} direction="vertical">
              <Step status="wait" title={`Total ${sendMsgProcess?.data?.total}`} />
              <Step title={`Success ${sendMsgProcess?.data?.success}`} />
              <Step
                  status="error"
                  title={`Error ${sendMsgProcess?.data?.errors?.length}`}
                  description={
                    <div>
                      {sendMsgProcess?.data?.errors?.map((error) => (
                          <div>{error}</div>
                      ))}
                    </div>
                  }
              />
            </Steps>
        ) : (
            <>
              <ImageWrapper style={{ margin: "auto" }}>
                <AddImageBox>
                  {imageId ? (
                      <div className="image-box">
                        <div className="x" onClick={() => setImageId("")}>
                          <X />
                        </div>
                        <img src={imagePath} alt="chosen img" />
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
                                path: "attachment/tg-bot",
                                data: formData,
                              });
                            }}
                            type="file"
                            max-file-size="3024"
                            accept="image/*"
                            style={{ display: "none" }}
                        />
                      </label>
                  )}
                </AddImageBox>
              </ImageWrapper>
              <Form onSubmit={(e) => e.preventDefault()}>
                <InputWrap>
                  <Labels>{text({ id: "title", lang: userLang })}</Labels>
                  <Input
                      width="100%"
                      required
                      value={title}
                      type="text"
                      onChange={(e) => setTitle(e.target.value)}
                  />
                </InputWrap>
                <LabelSecond>{text({ id: "description", lang: userLang })}</LabelSecond>
                <TextareaWrapper>
                  <Textarea className={'pr'}
                            mb="20px"
                            rows="5"
                            lWidth={"100%"}
                            width="100%"
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                  />
                </TextareaWrapper>
                <div className={'btn-wrapper'}>
                  <Radio.Group size={"large"}
                               required
                               onChange={(e) => setLang(e.target.value)}
                               value={lang}>
                    <Radio  value="UZBEK">uzbek</Radio>
                    <Radio  value="RUSSIAN">rus</Radio>
                  </Radio.Group>

                </div>
                <br className={'none'} />
                <div className={'btn-wrapper'}>
                  <ActionButton
                      loading={saveMsgProcess.loading}
                      success={saveMsgProcess.success}
                      error={saveMsgProcess.error}
                      onClick={saveMessage}
                      edit
                      mr="20px"
                  >
                    <Text id={msgPopUp?.data?.id ? "edit" : "save"} />
                  </ActionButton>
                  <ActionButton
                      loading={sendMsgProcess.loading}
                      success={sendMsgProcess.success}
                      error={sendMsgProcess.error}
                      onClick={sendMessage}
                      cancel
                  >
                    <Text id="cancel" />
                  </ActionButton>
                </div>
              </Form>
            </>
        )}

      </ContentWrapper>
    </PopUpContainer>
  );
}

export default MessagePopUp;
