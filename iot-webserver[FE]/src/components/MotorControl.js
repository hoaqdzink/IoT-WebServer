import React, { useState, useEffect } from "react";
import { database, ref, onValue, set } from "../firebase"; // Đảm bảo đường dẫn đúng đến cấu hình Firebase
import "../css/MotorControl.css";

const MotorControl = () => {
    const [motorState, setMotorState] = useState(false); // Trạng thái động cơ
    const [autoControl, setAutoControl] = useState(true); // Chế độ tự động
    const [humidity, setHumidity] = useState(100); // Độ ẩm hiện tại
    const [lastSentStatus, setLastSentStatus] = useState(""); // Lưu trạng thái đã gửi lần cuối

    useEffect(() => {
        const motorRef = ref(database, "Control/motor_state");
        const humidityRef = ref(database, "Sensor/humidity");
        const autoControlRef = ref(database, "Control/auto_control_motor");

        // Lắng nghe thay đổi trạng thái động cơ
        onValue(motorRef, (snapshot) => {
            setMotorState(snapshot.val() === 1);
        });

        // Lắng nghe thay đổi độ ẩm
        onValue(humidityRef, (snapshot) => {
            const humidityData = snapshot.val();
            setHumidity(humidityData);

            if (humidityData < 50) {
                if (autoControl && !motorState) {
                    // Nếu độ ẩm dưới 50%, chế độ tự động bật và động cơ đang tắt, bật động cơ
                    set(ref(database, "Control/motor_state"), 1);
                    setMotorState(true);
                    updateMotorState(1);
                    console.log("Động cơ tự động bật vì độ ẩm dưới 50%.");
                } else if (!autoControl) {
                    // Nếu độ ẩm dưới 50% nhưng chế độ tự động tắt
                    console.log("Độ ẩm dưới 50%, nhưng chế độ tự động đã tắt. Động cơ sẽ không bật tự động.");
                }
            } else if (humidityData > 60) {
                if (!autoControl) {
                    // Nếu độ ẩm trên 60% và chế độ tự động tắt, bật lại chế độ tự động
                    set(ref(database, "Control/auto_control_motor"), 1);
                    setAutoControl(true);
                    console.log("Độ ẩm trên 60%. Chế độ tự động đã được bật lại.");
                }
                if (motorState) {
                    // Nếu độ ẩm trên 60% và động cơ đang bật, tắt động cơ
                    set(ref(database, "Control/motor_state"), 0);
                    setMotorState(false);
                    console.log("Động cơ tự động tắt vì độ ẩm trên 60%.");
                }
            }
        });

        // Lắng nghe thay đổi chế độ tự động
        onValue(autoControlRef, (snapshot) => {
            setAutoControl(snapshot.val() === 1);
        });
    }, [autoControl, motorState]);

    const updateMotorState = async (newState) => {
        const status = newState === 1 ? "on" : "off";
    
        // Kiểm tra xem trạng thái mới có khác với trạng thái đã gửi trước đó không
        if (status === lastSentStatus) {
            console.log("Trạng thái không thay đổi, không gửi yêu cầu API.");
            return;
        }
    
        // Cập nhật trạng thái động cơ trong Firebase
        set(ref(database, "Control/motor_state"), newState);
    
        // Gửi trạng thái tới API
        try {
            const response = await fetch("http://localhost:8999/api/controls", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    status: status,
                    type: "motor",  // Điều chỉnh loại thiết bị thành "motor"
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

    const toggleMotor = () => {
        const newMotorState = motorState ? 0 : 1;
        set(ref(database, "Control/motor_state"), newMotorState);

        // Nếu người dùng bật/tắt động cơ thủ công, tắt chế độ tự động
        updateMotorState(newMotorState);
        if (newMotorState === 0) {
            set(ref(database, "Control/auto_control_motor"), 0);
            setAutoControl(false);
        }
        setMotorState(!motorState);
    };

    return (
        <div className="motor-control">
            <h2>Điều Khiển Động Cơ</h2>
            <p>Độ ẩm hiện tại: {humidity}%</p>
            <p>Chế độ tự động: {autoControl ? "Bật" : "Tắt"}</p>
            <div className={`motor-indicator ${motorState ? "on" : "off"}`}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="60"
                    height="60"
                    fill={motorState ? "#4CAF50" : "#f44336"} // Màu sắc thay đổi theo trạng thái
                >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm0-4h-2V7h2v8z" />
                </svg>
                <div className="status-text">{motorState ? "Đang Bật" : "Đang Tắt"}</div>
            </div>
            <button
                className={`toggle-button ${motorState ? "off" : "on"}`}
                onClick={toggleMotor}
            >
                {motorState ? "Tắt" : "Bật"}
            </button>
        </div>
    );
};

export default MotorControl;
