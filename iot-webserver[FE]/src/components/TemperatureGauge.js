import React, { useEffect, useState } from "react";
import { database, ref, onValue } from "../firebase"; // Đường dẫn đến file cấu hình Firebase
import "../css/TemperatureGauge.css"; // Đường dẫn đến file CSS

const TemperatureGauge = () => {
  const [temperature, setTemperature] = useState(0); // Giá trị nhiệt độ ban đầu
  const [lastSentTemperature, setLastSentTemperature] = useState(null); // Giá trị cuối cùng đã gửi
  const [isSending, setIsSending] = useState(false); // Trạng thái gửi dữ liệu

  useEffect(() => {
    const tempRef = ref(database, "Sensor/temperature");

    // Lắng nghe thay đổi nhiệt độ từ Firebase
    const unsubscribe = onValue(tempRef, (snapshot) => {
      const tempData = snapshot.val();
      setTemperature(tempData);

      // Gửi dữ liệu chỉ khi giá trị thực sự thay đổi
      if (tempData !== lastSentTemperature) {
        sendTemperatureToAPI(tempData);
        setLastSentTemperature(tempData);
      }
    });

    return () => unsubscribe(); // Dọn dẹp listener khi component bị unmount
  }, [lastSentTemperature]);

  // Hàm gửi dữ liệu tới API
  const sendTemperatureToAPI = async (temperatureValue) => {
    setIsSending(true); // Bắt đầu trạng thái gửi
    try {
      const response = await fetch("http://127.0.0.1:8999/api/sensors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "temperature",
          type: temperatureValue,
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

  // Xác định lớp CSS dựa trên giá trị nhiệt độ
  const getTemperatureClass = () => {
    if (temperature <= 20) return "low";
    if (temperature <= 35) return "medium";
    return "high";
  };

  // Tính toán góc của kim dựa trên giá trị nhiệt độ
  const needleRotation = (temperature / 50) * 180 - 90;

  return (
    <div className={`gauge-container ${getTemperatureClass()}`}>
      <h2 className="gauge-title">Nhiệt Độ Hiện Tại</h2>
      <div className="gauge">
        <div className="gauge-background"></div>

        {[...Array(11)].map((_, i) => (
          <div
            key={i}
            className="gauge-tick"
            style={{ transform: `rotate(${i * 18 - 90}deg)` }}
          >
            <span className="tick-label" style={{ transform: `rotate(${-i * 18 + 90}deg)` }}>
              {i * 5}
            </span>
          </div>
        ))}

        <div
          className="needle"
          style={{ transform: `rotate(${needleRotation}deg)` }}
        ></div>
        <div className="gauge-center"></div>
      </div>
      <div className="temperature-display">{temperature}°C</div>
      {isSending && <p>Đang gửi dữ liệu...</p>} {/* Hiển thị trạng thái gửi dữ liệu */}
    </div>
  );
};

export default TemperatureGauge;
