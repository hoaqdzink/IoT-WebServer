import React from "react";
import "../css/Introduction.css";
import canvarsImage from "../img/maxresdefault.jpg"

const Introduction = () => {
    return (
        <div className="introduction-wrapper">
            <div className="introduction-content">
                <h2 className="introduction-title">Giới Thiệu Hệ Thống Tưới Tiêu Tự Động IrrigSmart</h2>
                <p className="introduction-text">
                    IrrigSmart là hệ thống tưới tiêu tự động sử dụng công nghệ IoT do hai sinh viên
                    Khoa khoa học máy tính trường Đại Học Bách Khoa xây dựng,
                    giúp người dùng dễ dàng giám sát và điều khiển quá trình tưới nước từ xa. 
                    Với các cảm biến đo độ ẩm đất và nhiệt độ, hệ thống tự động điều chỉnh lượng nước tưới, 
                    đảm bảo cây trồng luôn được cung cấp đủ nước mà không lãng phí tài nguyên.
                </p>
                <p className="introduction-text">
                    IrrigSmart còn hỗ trợ cài đặt lịch tưới tự động và cung cấp dữ liệu thời gian thực về tình trạng cây trồng. 
                    Giải pháp này không chỉ tiết kiệm nước và công sức mà còn góp phần phát triển nông nghiệp bền vững, 
                    nâng cao hiệu quả canh tác.
                </p>
            </div>
            <div className="introduction-image">
                <img src={canvarsImage} alt="Hệ thống tưới tiêu" />
            </div>
        </div>
    );
};

export default Introduction;
