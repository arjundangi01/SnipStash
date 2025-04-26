import { type AxiosError } from "axios";
import React from "react";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";

export const openErrorToast = ({
  error,
  message = "Something went wrong",
}: {
  error?: Error | AxiosError<{ message: string }>;
  message?: string;
}) => {
  const axiosError = error as AxiosError<{ message: string }>;

  if (
    axiosError?.response &&
    axiosError?.response?.data &&
    axiosError?.response?.data?.message
  ) {
    message = axiosError.response.data.message;
  }

  const onCloseToast = (id: string) => {
    toast.dismiss(id);
  };

  toast.error(
    <ErrorToast message={message} onCloseToast={onCloseToast} id="errorId" />,
    {
      duration: 5000,
      id: "errorId",
    }
  );
};

export const openSuccessToast = ({
  message = "Success",
}: {
  message?: string;
}) => {
  const onCloseToast = (id: string) => {
    toast.dismiss(id);
  };
  toast.success(
    <SuccessToast
      message={message}
      onCloseToast={onCloseToast}
      id="successId"
    />,
    {
      duration: 5000,
      id: "successId",
    }
  );
};

export const SuccessToast = ({
  message,
  onCloseToast,
  id,
}: {
  message: string;
  onCloseToast: (id: string) => void;
  id: string;
}) => {
  return (
    <div>
      <RxCross2
        className="absolute right-[3px] top-[3px] "
        onClick={() => {
          onCloseToast(id);
        }}
      />
      <p className="pr-3 text-black">{message}</p>
    </div>
  );
};

export const ErrorToast = ({
  message,
  onCloseToast,
  id,
}: {
  message: string;
  onCloseToast: (id: string) => void;
  id: string;
}) => {
  return (
    <div>
      <RxCross2
        className="absolute right-[3px] top-[3px]"
        onClick={() => {
          onCloseToast(id);
        }}
      />
      <p className="pr-3 text-black">{message}</p>
    </div>
  );
};
