import React, { useState, useEffect } from "react";
import { database, ref, onValue } from "../firebase"; // Đường dẫn tới Firebase
import khongKhi from "../img/quan-ly-nhiet-do-tong-quat2-min.png"; // Đường dẫn tới icon hình ảnh
import "../css/AirHumidity.css";

const AirHumidity = () => {
    const [airHumidity, setAirHumidity] = useState(0);

    useEffect(() => {
        const airHumidityRef = ref(database, "Sensor/humidity");
        onValue(airHumidityRef, (snapshot) => {
            setAirHumidity(snapshot.val());
        });
    }, []);

    return (
        <div className="air-humidity-container">
            <h2 className="air-humidity-title">Độ Ẩm Không Khí</h2>
            <div className="air-humidity-value">
                <img src={khongKhi} alt="Độ ẩm không khí" className="humidity-icon" />
                <span className="humidity-text">{airHumidity}%</span>
            </div>
        </div>
    );
};

export default AirHumidity;
