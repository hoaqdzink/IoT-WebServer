import React from "react";
import SoilHumidity from "../components/SoilHumidity";
import TemperatureGauge from "../components/TemperatureGauge";
import AirHumidity from "../components/AirHumidity";

const Sensor = () => {
    return (
        <main>
            <div className="app-wrapper" style={{ height: "70vh" }}>
                <div className="app-container">
                        <SoilHumidity />
                        <TemperatureGauge />
                        <AirHumidity />
                </div>
            </div>
        </main>
    );
};

export default Sensor;