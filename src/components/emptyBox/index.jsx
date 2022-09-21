import React from "react";
import { EmptyBoxWrapper } from "./styles";
import emptyImg from "../../assets/images/empty-box.svg";
import emptyImgDark from "../../assets/images/empty-box-dark.svg";
import { text } from "../../lang/langManager";
import { useSelector } from "react-redux";

function EmptyBox({ item, dark,cart }) {
  const lang = useSelector((state) => state.lang);
  return (
    <EmptyBoxWrapper dark={dark}>
      <img src={dark ? emptyImgDark : emptyImg} alt="empty page" />
      <p>{cart? text({id:"cartIsFree",lang}):text({ id: "itemNotFound", lang })?.(text({ id: item, lang }))}</p>
    </EmptyBoxWrapper>
  );
}

export default EmptyBox;
