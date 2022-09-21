import { Empty, Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmptyBox from "../../components/emptyBox";
import ErrorBox from "../../components/errorBox";
import Loading from "../../components/loadingBox";
import {
  Table,
  TBody,
  TD,
  TFoot,
  TH,
  THead,
  TRow,
} from "../../components/styles/styles";
import SystemUser from "../../components/systemUser";
import Text from "../../lang/langManager";
import { getTgBotUsersAction } from "../../redux/modules/getTgBotUsers";
import { showDateTime } from "../../utils/dateManager";
import { UsersPageWrapper } from "./styles";

function UsersPage() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const tgBotUsers = state.tgBotUsers;
  const lang = state.lang;
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  const currentData = new Date();
  currentData.getDate();

  useEffect(() => {
    dispatch(getTgBotUsersAction({ page, size }));
  }, []);

  const getTgUsersByPage = (page) => {
    dispatch(getTgBotUsersAction({ page, size }));
  };

  return (
    <UsersPageWrapper>
      {/* <SystemUser/> */}

      <Table>
        <THead bg="#72a6bf">
          <TRow>
            <TH><Text id="fullName"/></TH>
            <TH><Text id="phoneNumber"/></TH>
            <TH><Text id="lang"/></TH>
            <TH><Text id="date"/></TH>
          </TRow>
        </THead>
        <TBody>
          {tgBotUsers?.data?.content?.map(
            ({ id, fullName, phoneNumber, lang, createdAt }) => (
              <TRow key={id}>
                <TD>{fullName}</TD>
                <TD>
                  <a
                    href={`tel:${phoneNumber}`}
                    onClick={(e) => e.preventDefault()}
                  >
                    {phoneNumber}
                  </a>
                </TD>
                <TD>{lang}</TD>
                <TD>{showDateTime(createdAt)}</TD>
              </TRow>
            )
          )}
        </TBody>
      </Table>
      {tgBotUsers.loading && <Loading />}
      {tgBotUsers.error && <ErrorBox />}
      {tgBotUsers.success && tgBotUsers?.data?.content?.loading === 0 && (
        <EmptyBox item={"userItem"} />
      )}
      {tgBotUsers?.data?.content?.length > 0 && (
        <Pagination
          size="small"
          total={tgBotUsers?.data?.totalElements}
          // showSizeChanger
          pageSize={size}
          current={tgBotUsers?.data?.number + 1}
          // totalBoundaryShowSizeChanger={(e) => console.log(e)}
          onChange={(e) => getTgUsersByPage(e - 1)}
          // onShowSizeChange={(p, pageSize) => setSize(pageSize)}
          // showTotal={(e,d)=>console.log(e,d)}
        />
      )}
    </UsersPageWrapper>
  );
}

export default UsersPage;
