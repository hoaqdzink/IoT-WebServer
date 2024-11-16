import React, { useState, useEffect } from "react";
import { database, ref, onValue, set } from "../firebase"; // Đảm bảo đường dẫn đúng đến cấu hình Firebase
import "../css/MotorControl.css";

const MotorControl = () => {
    const [motorState, setMotorState] = useState(false);

    useEffect(() => {
        const motorRef = ref(database, "Control/motor_state");
        onValue(motorRef, (snapshot) => {
            setMotorState(snapshot.val() === 1);
        });
    }, []);

    const toggleMotor = () => {
        const newMotorState = motorState ? 0 : 1;
        set(ref(database, "Control/motor_state"), newMotorState);
    };

    return (
        <div className="motor-control">
            <h2>Điều Khiển Động Cơ</h2>
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
