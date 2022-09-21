import React, { useEffect } from "react";
import { Table, TBody, TD, TH, THead, TRow } from "../styles/styles";

function SystemUser() {
    useEffect(()=>{

    },[])
  return (
    <Table>
      <THead bg="#72a6bf">
        <TRow>
          <TH>Ф.И.О</TH>
          <TH>Номер телефона</TH>
          <TH>username</TH>
          <TH>Время</TH>
        </TRow>
      </THead>
      <TBody>
        {/* {tgBotUsers.data.map(
          ({ id, fullName, phoneNumber, lang, createdAt }) => ( */}
            {/* <TRow key={id}>
              <TD>{fullName}</TD>
              <TD>{phoneNumber}</TD>
              <TD>{lang}</TD>
              <TD>{showDateTime(createdAt)}</TD>
            </TRow> */}
          {/* )
        )} */}
      </TBody>
    </Table>
  );
}

export default SystemUser;
