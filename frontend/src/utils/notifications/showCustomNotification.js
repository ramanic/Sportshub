import { showNotification } from "@mantine/notifications";
import { IoCloseOutline, IoCheckmarkOutline, IoInformationOutline } from "react-icons/io5";

export const showSuccessNotification = ({ title, message }) => {
  showNotification({
    title: title,
    message: message,
    autoClose: 3000,
    color: "green",
    icon: <IoCheckmarkOutline size={20} />,
    // sx: { backgroundColor: "#EBFBEE", border: "1px solid #D3F9D8" },
    sx: { border: "1px solid #D3F9D8" },
  });
};

export const showErrorNotification = ({ title, message }) => {
  showNotification({
    title: title,
    message: message,
    autoClose: 3000,
    icon: <IoCloseOutline size={20} />,
    color: "red",
    // sx: { backgroundColor: "#FFF0F6", border: "1px solid #FFDEEB" },
    sx: { border: "1px solid #FFDEEB" },
  });
};

export const showInfoNotification = ({ title, message }) => {
  showNotification({
    title: title,
    message: message,
    autoClose: 3000,
    icon: <IoInformationOutline size={20} />,
    color: "blue",
    // sx: { backgroundColor: "#E7F5FF", border: "1px solid #D0EBFF" },
    sx: { border: "1px solid #D0EBFF" },
  });
};
