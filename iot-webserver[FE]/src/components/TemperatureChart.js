import React, { useEffect, useState } from "react";
import { database, ref, onValue } from "../firebase"; // Đường dẫn tới Firebase
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

import "../css/TemperatureControl.css";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function TemperatureControl() {
    const [temperature, setTemperature] = useState(0); // Nhiệt độ hiện tại
    const [isSending, setIsSending] = useState(false); // Trạng thái gửi
    const [apiData, setApiData] = useState([]); // Dữ liệu từ API

    useEffect(() => {
        const tempRef = ref(database, "Sensor/temperature");

        // Lắng nghe thay đổi dữ liệu từ Firebase
        onValue(tempRef, (snapshot) => {
            const tempValue = snapshot.val();
            setTemperature(tempValue);
            sendTemperatureToAPI(tempValue); // Gửi dữ liệu mới đến API
        });
    }, []);

    // Hàm gửi dữ liệu đến API POST
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

            // Sau khi gửi thành công, gọi API GET để tải lại dữ liệu
            fetchTemperatureData();
        } catch (error) {
            console.error("Lỗi khi gửi dữ liệu đến API:", error);
        } finally {
            setIsSending(false); // Kết thúc trạng thái gửi
        }
    };

    // Hàm lấy dữ liệu từ API GET
    const fetchTemperatureData = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8999/api/sensors/name/temperature");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setApiData(data); // Cập nhật dữ liệu từ API vào state
            console.log("Dữ liệu từ API:", data);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu từ API:", error);
        }
    };

    // Lấy dữ liệu ban đầu từ API khi component được render
    useEffect(() => {
        fetchTemperatureData();
    }, []);

    // Dữ liệu cho biểu đồ
    const chartData = {
        labels: apiData.map((item) =>
            new Date(item.time).toLocaleString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            })
        ),
        datasets: [
            {
                label: "Nhiệt độ (°C)",
                data: apiData.map((item) => parseFloat(item.type)),
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                tension: 0.3,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Biểu đồ nhiệt độ theo thời gian",
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Thời gian",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Nhiệt độ (°C)",
                },
                min: 20,
                max: 40,
            },
        },
    };

    return (
        <div className="temperature-control">
            <h2>Nhiệt Độ Hiện Tại</h2>
            <p>Nhiệt độ: {temperature}°C</p>
            <p>Trạng thái gửi: {isSending ? "Đang gửi..." : "Sẵn sàng"}</p>

            <div>
                <h3>Biểu đồ nhiệt độ</h3>
                <Line data={chartData} options={chartOptions} />
            </div>
        </div>
    );
}
