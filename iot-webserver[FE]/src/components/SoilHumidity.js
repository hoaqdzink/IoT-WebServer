import React, { useState, useEffect } from "react";
import { database, ref, onValue } from "../firebase"; // Đường dẫn tới Firebase
import "../css/SoilHumidity.css";
import amDat from "../img/images.png"; // Đường dẫn đến icon độ ẩm đất

const SoilHumidity = () => {
    const [soilHumidity, setSoilHumidity] = useState(0);

    useEffect(() => {
        const soilHumidityRef = ref(database, "Sensor/soil_moisture");
        onValue(soilHumidityRef, (snapshot) => {
            setSoilHumidity(snapshot.val());
        });
    }, []);

    return (
        <div className="soil-humidity-container">
            <h2 className="soil-humidity-title">Độ Ẩm Đất</h2>
            <div className="soil-humidity-value">
                <img src={amDat} alt="Độ ẩm đất" className="humidity-icon" />
                <span className="humidity-text">{soilHumidity}%</span>
            </div>
        </div>
    );
};

export default SoilHumidity;
