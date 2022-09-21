import React, { useEffect, useState } from "react";
import {
  ActionCircleButton,
  SavedSmsBox,
  SmsActionBox,
  SmsPoster,
  SmsText,ActionButtonDelete
} from "./styles";

import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg";
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg";
import { ReactComponent as SendIcon } from "../../assets/icons/send-sms.svg";
import useHttpRequest from "../../hooks/useHttpRequest";
import { Popover, Steps } from "antd";
import { ActionButton, PopUpContainer } from "../styles";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../../redux/modules/getMessages";
import {
  BoxLoading,
  BabelLoading,
  CircleLoading,
  CircleToBlockLoading,
  CommonLoading,
} from "react-loadingg";
import Text, { text } from "../../lang/langManager";
function SavedMsgBox({
  id,
  title,
  description,
  lang,
  imageId,
  msgPopUp,
  setMsgPopUp,
}) {
  const dispatch = useDispatch();
  const [imgPath, setImgPath] = useState("");
  const state = useSelector((state) => state);
  const userLang = state.lang;

  const [sendMsgPopUp, setSendMsgPopUp] = useState(false);

  const [getPathProcess, makeGetPathRequest] = useHttpRequest({
    onSuccess: (res) => res?.data?.success && setImgPath(res?.data?.message),
  });

  useEffect(() => {
    makeGetPathRequest({
      method: "GET",
      path: "attachment/get-path",
      params: {
        fileId: imageId,
      },
    });
  }, []);

  const [deleteProcess, makeDeleteRequest, cleanProcess] = useHttpRequest({
    onSuccess: () => dispatch(getMessages()),
  });
  const deleteMsg = (id) => {
    makeDeleteRequest({
      method: "DELETE",
      path: `messages/${id}`,
    });
  };

  const [sendMsgProcess, setSendMsgProcess] = useHttpRequest();

  const { Step } = Steps;

  return (
    <>
      <SavedSmsBox>
        <SmsPoster>
          <img src={imgPath} alt="" />
        </SmsPoster>
        <SmsText>
          <b>{title}</b>
          <span>{description}</span>
          <b className="lang">{lang}</b>
        </SmsText>
        <SmsActionBox>
          <ActionCircleButton
            onClick={() =>
              setMsgPopUp({
                popUp: true,
                data: { id, title, description, lang, imageId },
              })
            }
            bg="white"
          >
            <EditIcon />
          </ActionCircleButton>
          <Popover
            title={text({ id: "reallyWannaDelete", lang: userLang })}
            trigger="click"
            content={
              <ActionButtonDelete
                loading={deleteProcess.loading}
                success={deleteProcess.success}
                error={deleteProcess.error}
                onClick={() => deleteMsg(id)}
                edit
                style={{ margin: "auto", display: "block" }}
              >
                <Text id="delete" />

              </ActionButtonDelete>
            }
          >
            <ActionCircleButton bg="#B57068">
              <DeleteIcon />
            </ActionCircleButton>
          </Popover>
          <Popover
            title={text({ id: "reallyWannaSendMsg", lang: userLang })}
            trigger="click"
            content={
              <ActionButton
                onClick={() => {
                  setSendMsgPopUp(true);
                  setSendMsgProcess({
                    method: "PUT",
                    path: "messages/send-saved-msg",
                    params: {
                      msgId: id,
                    },
                  });
                }}
                edit
                style={{ margin: "auto", display: "block" }}
              >
                <Text id="send" />
              </ActionButton>
            }
          >
            <ActionCircleButton bg="#72A6BF">
              <SendIcon />
            </ActionCircleButton>
          </Popover>
        </SmsActionBox>
      </SavedSmsBox>
      {sendMsgPopUp && (
        <PopUpContainer
          close={() => {
            setSendMsgPopUp(false);
            cleanProcess();
          }}
        >
          {sendMsgProcess.success && (
            <Steps progressDot current={10} direction="vertical">
              <Step
                status="wait"
                title={`Total ${sendMsgProcess?.data?.total}`}
              />
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
          )}
          {/* <BoxLoading />;
          <BabelLoading />
          <CircleLoading /> */}
          {sendMsgProcess.loading && <CommonLoading />}
          {sendMsgProcess.error && <div>Error</div>}
        </PopUpContainer>
      )}
    </>
  );
}

export default SavedMsgBox;
