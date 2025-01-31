import React, { useContext, useEffect } from "react";
import { SecondaryJumbotron } from "../component/secondaryJumbotron.jsx";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { Menu_GPT } from "../gpt/gpt_crear_menu.jsx";

export const MenuCreator = () => {

    return (
        <>
            <SecondaryJumbotron />
            <Menu_GPT />
        </>
    );
};