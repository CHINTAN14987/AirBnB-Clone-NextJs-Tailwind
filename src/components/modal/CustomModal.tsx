import React, { FC } from "react";
interface IProps {
  children: JSX.Element;
}
const CustomModal: FC<IProps> = (props) => {
  return <div>{props.children}</div>;
};

export default CustomModal;
