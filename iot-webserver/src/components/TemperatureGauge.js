import React, { useEffect, useState } from "react";
import { database, ref, onValue } from "../firebase"; // Đường dẫn đến file cấu hình Firebase
import "../css/TemperatureGauge.css"; // Đường dẫn đến file CSS

const TemperatureGauge = () => {
  const [temperature, setTemperature] = useState(0); // Giá trị nhiệt độ ban đầu

  useEffect(() => {
    const tempRef = ref(database, "Sensor/temperature");

    onValue(tempRef, (snapshot) => {
      const tempData = snapshot.val();
      setTemperature(tempData);
    });
  }, []);

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
    </div>
  );
};

export default TemperatureGauge;
