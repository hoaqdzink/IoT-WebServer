import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LightControl from "./components/LightControl";
import TemperatureGauge from "./components/TemperatureGauge";
import "./App.css"
import MotorControl from "./components/MotorControl";
import Introduction from "./components/Introduction";
import SoilHumidity from "./components/SoilHumidity";
import AirHumidity from "./components/AirHumidity";
import RegisterForm from "./components/RegisterForm";

function App() {
  return (
    <div>
            <Header />
            <main>
              <Introduction />

              <h1 style={{ textAlign: "center", margin: "20px 0", color: "#2c3e50", fontSize: "2rem", fontWeight: "bold" }}>
                  Các chức năng điều khiển
              </h1>

              <p style={{ 
                  fontSize: "1.2rem", 
                  color: "#34495e", 
                  lineHeight: "1.6", 
                  textAlign: "center", 
                  marginBottom: "20px", 
                  maxWidth: "800px", 
                  marginLeft: "auto", 
                  marginRight: "auto" 
                }}>Chức năng điều khiển động cơ và đèn LED cho phép người dùng bật/tắt động cơ và đèn LED từ xa thông qua giao 
                diện đơn giản. Người dùng có thể điều chỉnh trạng thái của các thiết bị này để phù hợp với nhu cầu sử dụng, 
                iúp tiết kiệm năng lượng và tối ưu hóa quy trình hoạt động của hệ thống.</p>
              <div className="app-wrapper">
                <div className="app-container">
                  <MotorControl />
                  <LightControl />
                </div>
              </div>

              <h1 style={{ textAlign: "center", margin: "20px 0", color: "#2c3e50", fontSize: "2rem", fontWeight: "bold" }}>
                Các chức năng đo lường
              </h1>
                <p style={{ 
                  fontSize: "1.2rem", 
                  color: "#34495e", 
                  lineHeight: "1.6", 
                  textAlign: "center", 
                  marginBottom: "20px", 
                  maxWidth: "800px", 
                  marginLeft: "auto", 
                  marginRight: "auto" 
                }}>Chức năng đo lường trong hệ thống tưới tiêu tự động sử dụng các cảm biến thông minh để thu thập 
                dữ liệu về độ ẩm đất, nhiệt độ và độ ẩm không khí. Các cảm biến này liên tục theo dõi các yếu tố 
                môi trường và truyền tải thông tin về hệ thống để người dùng có thể giám sát tình trạng thực tế của
                 cây trồng. Dữ liệu đo lường được hiển thị thời gian thực, giúp người dùng đưa ra các quyết định
                  chính xác về việc điều chỉnh quá trình tưới tiêu, từ đó tối ưu hóa việc sử dụng tài nguyên và 
                  nâng cao hiệu quả sản xuất nông nghiệp.</p>
                <div className="app-wrapper">
                  <div className="app-container">
                    <SoilHumidity />
                    <TemperatureGauge />
                    <AirHumidity />
                  </div>
                </div>

              <RegisterForm />
            </main>
            <Footer />
        </div>
  );
}

export default App;
