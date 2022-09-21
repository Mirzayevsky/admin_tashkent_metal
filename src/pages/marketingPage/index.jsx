import React, { useEffect, useState } from "react";
import { Button } from "../../components/styles/styles";
import {
  ActionCircleButton,
  MarketingPageWrapper,
  MarketingSmsBoxWrapper,
  SavedSmsBox,
  SmsActionBox,
  SmsPoster,
  SmsPosterActionWrapper,
  SmsText,
} from "./styles";

import posterImg from "../../assets/images/poster-image.png";

import {
  ActionButton,
  Input,
  PopUpContainer,
  Textarea,
} from "../../components/styles";
import {
  AddImageBox,
  ImageWrapper,
} from "../../components/categorySidePage/styles";

import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../../redux/modules/getMessages";
import MessagePopUp from "../../components/messagePopUp";
import SavedMsgBox from "../../components/savedMsgBox";
import Loading from "../../components/loadingBox";
import { Empty } from "antd";
import ErrorBox from "../../components/errorBox";
import Text from "../../lang/langManager";
import EmptyBox from "../../components/emptyBox";

function MarketingPage() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const [msgPopUp, setMsgPopUp] = useState({ popUp: false, data: {} });
  //   const [deletePopUp, setDeletePopUp] = useState({ popUp: false, data: {} });
  const messages = state.messages;

  useEffect(() => {
    dispatch(getMessages());
  }, []);

  return (
    <MarketingPageWrapper>
      <Button
        edit
        style={{ display: "block", marginLeft: "auto" }}
        onClick={() => setMsgPopUp({ popUp: true, data: {} })}
      >
        + <Text id="add"/>
      </Button>
      <MarketingSmsBoxWrapper>
        {messages?.data?.map(({ id, title, description, lang, imageId }) => (
          <SavedMsgBox
          key={id}
            id={id}
            title={title}
            description={description}
            lang={lang}
            imageId={imageId}
            msgPopUp={msgPopUp}
            setMsgPopUp={setMsgPopUp}
          />
        ))}
      </MarketingSmsBoxWrapper>
      {messages.loading && <Loading />}
      {messages.error && <ErrorBox />}
      {messages.success && messages?.data?.length === 0 && <EmptyBox item="messageItem" />}
      {msgPopUp.popUp && (
        <MessagePopUp msgPopUp={msgPopUp} setMsgPopUp={setMsgPopUp} />
      )}
    </MarketingPageWrapper>
  );
}

export default MarketingPage;
