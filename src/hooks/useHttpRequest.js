import { useState } from "react";
import httpRequest from "../utils/httpRequest";

const useHttpRequest = (props) => {
  // const {
  //   onLoading,
  //   onSuccess,
  //   onError,
  //   onFinal,
  //   cleanTimeout,
  //   log = false,
  // } = props;

  const defaultState = {
    loading: false,
    success: false,
    error: false,
    data: null,
  };

  const [process, setProcess] = useState(defaultState);

  const makeRequest = (data) => {
    console.log(data);
    setProcess({
      loading: true,
      success: false,
      error: false,
      data: null,
    });
    props?.onLoading?.();

    httpRequest(data)
      .then(
        (res) => {
          setProcess({
            loading: false,
            success: true,
            error: false,
            data: res.data,
          });
          props?.onSuccess?.(res);

          console.log("success",res);
        }
      )
      .catch((err) => {
        setProcess({
          loading: false,
          success: false,
          error: true,
          data: null,
        });

        console.log("error",err?.response);
        console.log("error",err);
        props?.onError?.(err);
      })
      .finally(() => {
        console.log(
          "final ",
          props,
          props?.cleanTimeout,
          props && props?.cleanTimeout
        );
        if (props && props?.cleanTimeout) {
          setTimeout(() => {
            setProcess(defaultState);
            props?.onFinal?.();
          }, props?.cleanTimeout);
        } else {
          props?.onFinal?.();
        }
      });
  };
  return [process, makeRequest, () => setProcess(defaultState)];
};

export default useHttpRequest;
