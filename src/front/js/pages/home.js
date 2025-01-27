import React from "react";
import "../../styles/home.css";
import "../../styles/index.css";
import { Jumbotron } from "../component/jumbotron.jsx";
import { WhyChoose } from "../component/whyChoose.jsx";

export const Home = () => {

    return (
        <>
            <Jumbotron />

            <WhyChoose />
        </>
    );
};

