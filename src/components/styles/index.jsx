import {
  Button,
  ClosePopUp,
  CloseSidePage,
  InputWrapper,
  Label,
  PopUpBackground,
  PopUpTitle,
  PopUpWrapper,
  SearchBox,
  Select,
  SidePageBackground,
  SidePageTitle,
  SidePageWrapper,
} from "./styles";
import { ReactComponent as SearchIcon } from "../../assets/icons/search-icon.svg";
import { ReactComponent as X } from "../../assets/icons/x.svg";
import { ReactComponent as Eye } from "../../assets/icons/eye.svg";
import { ReactComponent as EyeOff } from "../../assets/icons/eye-off.svg";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import { text } from "../../lang/langManager";
import { DatePicker } from "antd";
import { useState } from "react";

import { Drawer } from "antd";

export const SearchInput = ({ ...rest }) => {
  const state = useSelector((state) => state);
  const lang = state.lang;
  return (
    <SearchBox>
      <SearchIcon />
      <input
        type="search"
        placeholder={text({ id: "search", lang })}
        {...rest}
      />
    </SearchBox>
  );
};

export const PopUpContainer = ({ children, close, title, width }) => {
  return (
    <>
      <PopUpBackground onClick={close} />
      <PopUpWrapper width={width}>
        <ClosePopUp onClick={close}>
          <X />
        </ClosePopUp>
        <PopUpTitle>{title}</PopUpTitle>
        {children}
      </PopUpWrapper>
    </>
  );
};

export const Input = ({
  name,
  width,
  lWidth,
  label,
  selectData,
  mb,
  type,
  placeholder,
  value,
  onChange,
  datePicker,
  ...rest
}) => {
  const [password, setPassword] = useState(true);

  return (
    <Label mb={mb} lWidth={lWidth}>
      <span dangerouslySetInnerHTML={{ __html: label }} />
      {/* {label}</span> */}
      <InputWrapper w={width}>
        {selectData ? (
          <select name={name}>
            {selectData.map(({ id, name }) => (
              <option value={id} key={id}>
                {name}
              </option>
            ))}
          </select>
        ) : type ? (
          type === "password" ? (
            <div className="password-box">
              <input
                onChange={onChange}
                value={value}
                placeholder={placeholder}
                type={password ? "password" : "text"}
                name={name}
              />
              <div
                onClick={() => setPassword(!password)}
                className="eye-toggle"
              >
                {password ? <EyeOff /> : <Eye />}
              </div>
            </div>
          ) : (
            <input
              onChange={onChange}
              value={value}
              placeholder={placeholder}
              type={type}
              name={name}
            />
          )
        ) : datePicker ? (
          <DatePicker onChange={onChange} value={value} />
        ) : (
          <NumberFormat
            onChange={onChange}
            value={value}
            placeholder={placeholder}
            name={name}
            {...rest}
          />
        )}
      </InputWrapper>
    </Label>
  );
};

export const Textarea = ({ width, lWidth, label, mb, type, ...rest }) => {
  return (
    <Label mb={mb} lWidth={lWidth}>
      <span>{label}</span>
      <InputWrapper w={width}>
        <textarea {...rest} />
      </InputWrapper>
    </Label>
  );
};

export const ActionButton = ({
  loading,
  success,
  error,
  children,
  ...rest
}) => {
  return (
    <Button disabled={loading || success || error} {...rest}>
      {loading
        ? "загрузка..."
        : success
        ? "успех"
        : error
        ? "ошибка"
        : children}
    </Button>
  );
};

export const SidePage = ({ isOpen, children, close, title, width }) => {
  return (
    <>
      <SidePageBackground onClick={close} isOpen={isOpen} />
      <SidePageWrapper width={width} isOpen={isOpen}>
        <SidePageTitle>{title}</SidePageTitle>
        <CloseSidePage onClick={close}>
          <X />
        </CloseSidePage>
        {children}
      </SidePageWrapper>
    </>
  );
};
