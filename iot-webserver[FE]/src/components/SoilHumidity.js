import React, { useState, useEffect } from "react";
import { database, ref, onValue } from "../firebase"; // Đường dẫn tới Firebase
import "../css/SoilHumidity.css";
import amDat from "../img/images.png"; // Đường dẫn đến icon độ ẩm đất

const SoilHumidity = () => {
    const [soilHumidity, setSoilHumidity] = useState(0); // Giá trị độ ẩm đất
    const [lastSentHumidity, setLastSentHumidity] = useState(null); // Lưu giá trị cuối cùng đã gửi
    const [isSending, setIsSending] = useState(false); // Trạng thái gửi dữ liệu

    useEffect(() => {
        const soilHumidityRef = ref(database, "Sensor/soil_moisture");
        
        // Lắng nghe thay đổi dữ liệu từ Firebase
        const unsubscribe = onValue(soilHumidityRef, (snapshot) => {
            const newSoilHumidity = snapshot.val();
            setSoilHumidity(newSoilHumidity);

            // Gửi dữ liệu chỉ khi giá trị thực sự thay đổi
            if (newSoilHumidity !== lastSentHumidity) {
                sendSoilHumidityToAPI(newSoilHumidity);
                setLastSentHumidity(newSoilHumidity);
            }
        });

        // Dọn dẹp listener khi component bị unmount
        return () => unsubscribe();
    }, [lastSentHumidity]);

    // Hàm gửi dữ liệu đến API sử dụng fetch
    const sendSoilHumidityToAPI = async (humidityValue) => {
        setIsSending(true); // Bắt đầu trạng thái gửi
        const maxRetries = 3; // Số lần thử lại tối đa
        let attempt = 0;

        while (attempt < maxRetries) {
            try {
                const response = await fetch("http://127.0.0.1:8999/api/sensors", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: "SoilHumidity",
                        type: humidityValue,
                    }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log("Dữ liệu đã được gửi thành công:", data);
                break; // Thoát khỏi vòng lặp nếu gửi thành công
            } catch (error) {
                attempt++;
                console.error(`Lỗi khi gửi dữ liệu (thử lần ${attempt}):`, error);
                if (attempt === maxRetries) {
                    console.error("Đã hết số lần thử lại. Dữ liệu không được gửi.");
                }
            }
        }

        setIsSending(false); // Kết thúc trạng thái gửi
    };

    return (
        <div className="soil-humidity-container">
            <h2 className="soil-humidity-title">Độ Ẩm Đất</h2>
            <div className="soil-humidity-value">
                <img src={amDat} alt="Độ ẩm đất" className="humidity-icon" />
                <span className="humidity-text">{soilHumidity}%</span>
            </div>
            {isSending && <p>Đang gửi dữ liệu...</p>}
        </div>
    );
};

export default SoilHumidity;
