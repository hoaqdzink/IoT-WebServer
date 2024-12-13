import React from "react";
import MotorControl from "../components/MotorControl";
import LightControl from "../components/LightControl";

const Control = () => {
    return (
        <main>
            <div className="app-wrapper" style={{ height: "70vh" }}>
                <div className="app-container">
                    <MotorControl />
                    <LightControl />
                </div>
            </div>
        </main>
    );
};

export default Control;