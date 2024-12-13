import React, { useState, useEffect } from "react";
import { database, ref, onValue } from "../firebase"; // Đường dẫn tới Firebase
import khongKhi from "../img/quan-ly-nhiet-do-tong-quat2-min.png"; // Đường dẫn tới icon hình ảnh
import "../css/AirHumidity.css";

const AirHumidity = () => {
    const [airHumidity, setAirHumidity] = useState(0); // Giá trị độ ẩm không khí
    const [lastSentHumidity, setLastSentHumidity] = useState(null); // Giá trị cuối cùng đã gửi
    const [isSending, setIsSending] = useState(false); // Trạng thái gửi dữ liệu

    useEffect(() => {
        const airHumidityRef = ref(database, "Sensor/humidity");

        // Lắng nghe thay đổi độ ẩm không khí từ Firebase
        const unsubscribe = onValue(airHumidityRef, (snapshot) => {
            const newAirHumidity = snapshot.val();
            setAirHumidity(newAirHumidity);

            // Gửi dữ liệu chỉ khi giá trị thực sự thay đổi
            if (newAirHumidity !== lastSentHumidity) {
                sendAirHumidityToAPI(newAirHumidity);
                setLastSentHumidity(newAirHumidity);
            }
        });

        return () => unsubscribe(); // Dọn dẹp listener khi component bị unmount
    }, [lastSentHumidity]);

    // Hàm gửi dữ liệu tới API
    const sendAirHumidityToAPI = async (humidityValue) => {
        setIsSending(true); // Bắt đầu trạng thái gửi
        try {
            const response = await fetch("http://127.0.0.1:8999/api/sensors", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: "humidity",
                    type: humidityValue,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Dữ liệu đã được gửi thành công:", data);
        } catch (error) {
            console.error("Lỗi khi gửi dữ liệu đến API:", error);
        } finally {
            setIsSending(false); // Kết thúc trạng thái gửi
        }
    };

    return (
        <div className="air-humidity-container">
            <h2 className="air-humidity-title">Độ Ẩm Không Khí</h2>
            <div className="air-humidity-value">
                <img src={khongKhi} alt="Độ ẩm không khí" className="humidity-icon" />
                <span className="humidity-text">{airHumidity}%</span>
            </div>
            {isSending && <p>Đang gửi dữ liệu...</p>} {/* Hiển thị trạng thái gửi */}
        </div>
    );
};

export default AirHumidity;
