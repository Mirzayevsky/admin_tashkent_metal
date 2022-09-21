import { useSelector } from "react-redux";
import langs from "../constants/lang";
import uzbek from "./uzbek";
import russian from "./russian";

const Text = ({ id }) => {
  const lang = useSelector((state) => state.lang);
  switch (lang) {
    case langs.RUSSIAN:
      return russian[id] ? russian[id] : id;
    case langs.UZBEK:
      return uzbek[id] ? uzbek[id] : id;
    default:
      return id;
  }
};

export const text = ({ lang, id }) => {
  switch (lang) {
    case langs.RUSSIAN:
      return russian[id] ? russian[id] : id;
    case langs.UZBEK:
      return uzbek[id] ? uzbek[id] : id;
    default:
      return id;
  }
};

export default Text;
