// src/components/LightControl.js
import React, { useState, useEffect } from "react";
import { database, ref, set, onValue } from "../firebase";
import "../css/LightControl.css";

export default function LightControl() {
    const [isLedOn, setIsLedOn] = useState(null);

    useEffect(() => {
        // Tham chiếu đến trạng thái của đèn LED trong Firebase
        const ledRef = ref(database, "Control/led_state");
        onValue(ledRef, (snapshot) => {
            const data = snapshot.val();
            setIsLedOn(data === 1); // Giả sử 1 là bật và 0 là tắt
        });
    }, []);

    const toggleLed = () => {
        const newLedState = isLedOn ? 0 : 1; // Đổi trạng thái
        set(ref(database, "Control/led_state"), newLedState);
        setIsLedOn(!isLedOn);
    };

    return (
        <div className="light-control">
            <h2>Điều Khiển Đèn LED</h2>
            <div className={`light-bulb ${isLedOn ? "on" : "off"}`}></div>
            <button onClick={toggleLed} className={`toggle-button ${isLedOn ? "on" : "off"}`}>
                {isLedOn ? "Tắt" : "Bật"}
            </button>
        </div>
    );
}
