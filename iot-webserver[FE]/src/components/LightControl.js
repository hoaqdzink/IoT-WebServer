import React, { useState, useEffect } from "react";
import { database, ref, set, onValue } from "../firebase";
import "../css/LightControl.css";

export default function LightControl() {
    const [isLedOn, setIsLedOn] = useState(null); // Trạng thái LED
    const [lightLevel, setLightLevel] = useState(100); // Độ sáng hiện tại
    const [autoControl, setAutoControl] = useState(true); // Trạng thái tự động điều khiển
    const [lastSentStatus, setLastSentStatus] = useState(null);

    useEffect(() => {
        const ledRef = ref(database, "Control/led_state");
        const lightRef = ref(database, "Sensor/light");
        const autoControlRef = ref(database, "Control/auto_control");

        // Lắng nghe thay đổi trạng thái LED
        onValue(ledRef, (snapshot) => {
            const data = snapshot.val();
            setIsLedOn(data === 1);
        });

        // Lắng nghe thay đổi trạng thái tự động điều khiển
        onValue(autoControlRef, (snapshot) => {
            const data = snapshot.val();
            setAutoControl(data === 1);
        });

        // Lắng nghe thay đổi của giá trị ánh sáng
        onValue(lightRef, (snapshot) => {
            const lightData = snapshot.val();
            setLightLevel(lightData);

            if (lightData < 40 && autoControl) {
                // Nếu ánh sáng dưới 40% và chế độ tự động bật, bật đèn
                set(ref(database, "Control/led_state"), 1);
                setIsLedOn(true);
                updateLedState(1);
            } else if (lightData > 40) {
                // Nếu ánh sáng trên 40%, bật lại chế độ tự động
                set(ref(database, "Control/auto_control"), 1);
                setAutoControl(true);
            }else if(lightData < 40 && !autoControl){
                //nếu anh sáng dưới 40% và chế độ bật tự động tắt thì không bật đèn
                set(ref(database, "Control/led_state"), 0);
            }
        });
    }, [autoControl]);

    const updateLedState = async (newState) => {
        const status = newState === 1 ? "on" : "off";

        // Cập nhật trạng thái LED trong Firebase
        set(ref(database, "Control/led_state"), newState);
        setIsLedOn(newState === 1);
        
        // Chỉ gửi yêu cầu nếu trạng thái mới khác với trạng thái cuối cùng đã gửi
        if (status === lastSentStatus) {
            console.log("Trạng thái không thay đổi, không gửi yêu cầu API.");
            return;
        }

        

        // Gửi trạng thái tới API
        try {
            const response = await fetch("http://localhost:8999/api/controls", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    status: status,
                    type: "light",
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Đã gửi trạng thái tới API:", data);

            // Cập nhật trạng thái cuối cùng đã gửi
            setLastSentStatus(status);
        } catch (error) {
            console.error("Lỗi khi gửi trạng thái tới API:", error);
        }
    };

    const toggleLed = () => {
        const newLedState = isLedOn ? 0 : 1; // Đổi trạng thái LED
        updateLedState(newLedState);

        // Nếu người dùng tắt đèn thủ công, tắt chế độ tự động
        if (newLedState === 0) {
            set(ref(database, "Control/auto_control"), 0);
            setAutoControl(false);
        }
    };

    return (
        <div className="light-control">
            <h2>Điều Khiển Đèn LED</h2>
            <p>Độ sáng hiện tại: {lightLevel}%</p>
            <p>Chế độ tự động: {autoControl ? "Bật" : "Tắt"}</p>
            <div className={`light-bulb ${isLedOn ? "on" : "off"}`}></div>
            <button onClick={toggleLed} className={`toggle-button ${isLedOn ? "on" : "off"}`}>
                {isLedOn ? "Tắt" : "Bật"}
            </button>
        </div>
    );
}
