import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { database, ref, onValue } from "../firebase";

const HumidityChart = () => {
    const [chartData, setChartData] = useState({});
    const [loading, setLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);

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
                    name: "humidity",
                    type: temperatureValue,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Dữ liệu đã được gửi thành công:", data);

            // Sau khi gửi thành công, gọi API GET để tải lại dữ liệu
            fetchHumidityData();
        } catch (error) {
            console.error("Lỗi khi gửi dữ liệu đến API:", error);
        } finally {
            setIsSending(false); // Kết thúc trạng thái gửi
        }
    };

    // Hàm tải dữ liệu từ API
    const fetchHumidityData = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8999/api/sensors/name/humidity");
            const data = await response.json();

            // Chuyển đổi dữ liệu thành dạng phù hợp với biểu đồ
            const labels = data.map(item => new Date(item.time).toLocaleString());
            const values = data.map(item => parseInt(item.type, 10));

            // Thiết lập dữ liệu biểu đồ
            setChartData({
                labels: labels,
                datasets: [
                    {
                        label: "Độ Ẩm (%)",
                        data: values,
                        borderColor: "rgba(75, 192, 192, 1)",
                        backgroundColor: "rgba(75, 192, 192, 0.2)",
                        borderWidth: 2,
                        tension: 0.4, // Làm mượt đường biểu đồ
                    },
                ],
            });

            setLoading(false);
        } catch (error) {
            console.error("Lỗi khi fetch dữ liệu từ API:", error);
        }
    };

    // Lắng nghe sự thay đổi từ Firebase
    useEffect(() => {
        const humidityRef = ref(database, "humidity"); // Thay "humidity" bằng đường dẫn chính xác trong Firebase
        const unsubscribe = onValue(humidityRef, (snapshot) => {
            if (snapshot.exists()) {
                const newHumidity = snapshot.val();
                console.log("Dữ liệu mới từ Firebase:", newHumidity);

                // Gửi dữ liệu mới tới API
                sendTemperatureToAPI(newHumidity);
            }
        });

        // Cleanup khi component unmount
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        fetchHumidityData();
    }, []);

    return (
        <div style={{ width: "80%", margin: "0 auto", padding: "20px" }}>
            <h2>Biểu đồ Độ Ẩm</h2>
            {loading ? (
                <p>Đang tải dữ liệu...</p>
            ) : (
                <Line
                    data={chartData}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: "top",
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
                                    text: "Độ ẩm (%)",
                                },
                                beginAtZero: true,
                            },
                        },
                    }}
                />
            )}
        </div>
    );
};

export default HumidityChart;
