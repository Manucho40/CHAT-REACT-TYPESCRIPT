import React from "react";
import { FaAlignJustify, FaPowerOff } from "react-icons/fa";


type Props = {
    handleMenu: (event: React.MouseEvent<HTMLElement>) => void;

};


const DefaultChatContent = ({handleMenu}:Props) => {
    return (
        <>
            <div className='chatContent'>
                <div>
                <div className="welBut">
                    <div className="menuBurger" onClick={handleMenu}>
                    <FaAlignJustify />
                    </div>
                </div>
                <img src={require("../../assets/img/welcome.png")}alt="" />
                </div>
            </div>
        </>
    );
}
 
export default DefaultChatContent;