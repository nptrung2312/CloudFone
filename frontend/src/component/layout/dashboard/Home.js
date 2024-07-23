import React from "react";
import { useSelector } from 'react-redux';
import WorkElement from "./WorkElement";
import CustomerElement from "./CustomerElement";
import NoteElement from "./NoteElement";
import SyntheticElement from "./SyntheticElement";
import "../../../assets/scss/Home.scss";

function Home() {
    const id = useSelector((state) => state.user.user.userId);
    return (
        <div className="section">
            <div className="home-wrapper">
                <WorkElement userId={id} />
                <CustomerElement userId={id} />
                <NoteElement userId={id} />
                <SyntheticElement userId={id} />
            </div>
        </div>
    )
}

export default Home;