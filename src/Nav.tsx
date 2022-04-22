import React from "react";
import "./lib.scss";

interface IProps {
  name?: string;
}
const Nav: React.FC<IProps> = ({ name }) => {
  console.log(name);
  return (
    <div className="test">
      <div className=" text-gray-600 px-3">dsfa</div>
      <div>kljhgjkgf</div>
    </div>
  );
};

export default Nav;
