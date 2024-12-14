import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { database, ref, onValue } from "../firebase"; // Firebase configuration
import "../css/SoilHumidityChart.css";

const SoilHumidity = () => {
    const [chartData, setChartData] = useState({});
    const [loading, setLoading] = useState(true);
    const [soilHumidity, setSoilHumidity] = useState(0); // Giá trị độ ẩm đất
    const [lastSentHumidity, setLastSentHumidity] = useState(null); // Trạng thái kiểm tra giá trị đã gửi

    useEffect(() => {
        const soilHumidityRef = ref(database, "Sensor/soil_moisture");

        // Lắng nghe thay đổi dữ liệu từ Firebase
        const unsubscribe = onValue(soilHumidityRef, async (snapshot) => {
            const newSoilHumidity = snapshot.val();
            setSoilHumidity(newSoilHumidity); // Cập nhật giá trị độ ẩm đất
        
            // Gửi dữ liệu về API nếu giá trị thay đổi
            if (newSoilHumidity !== lastSentHumidity) {
                await sendSoilHumidityToAPI(newSoilHumidity);
                setLastSentHumidity(newSoilHumidity); // Lưu giá trị đã gửi
        
                // Chỉ fetch dữ liệu biểu đồ sau khi API đã được cập nhật
                fetchChartData();
            }
        });

        // Dọn dẹp listener khi component bị unmount
        return () => unsubscribe();
    }, [lastSentHumidity]);

    const fetchChartData = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8999/api/sensors/name/SoilHumidity");
            const data = await response.json();

            // Chuyển đổi dữ liệu thành dạng biểu đồ
            const labels = data.map((item) => new Date(item.time).toLocaleTimeString());
            const values = data.map((item) => parseInt(item.type, 10));

            setChartData({
                labels,
                datasets: [
                    {
                        label: "Độ Ẩm Đất",
                        data: values,
                        borderColor: "rgba(75, 192, 192, 1)",
                        backgroundColor: "rgba(75, 192, 192, 0.2)",
                        borderWidth: 2,
                    },
                ],
            });

            setLoading(false);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu API:", error);
        }
    };

    const sendSoilHumidityToAPI = async (humidityValue) => {
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
            console.log("Dữ liệu đã lưu vào DB:", data);
        } catch (error) {
            console.error("Lỗi khi lưu dữ liệu vào DB:", error);
        }
    };

    return (
        <div className="soil-humidity-container1">
            <h2 className="soil-humidity-title">Biểu đồ Độ Ẩm Đất</h2>
            <div className="current-humidity">
                <p>Giá trị độ ẩm hiện tại: <strong>{soilHumidity}%</strong></p>
            </div>
            {loading ? (
                <p>Đang tải dữ liệu...</p>
            ) : (
                <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
            )}
        </div>
    );
};

export default SoilHumidity;
