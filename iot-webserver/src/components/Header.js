import React from "react";
import "../css/Header.css";

export default function Header() {
    return (
        <header>
            <div className="content">
                <div className="logo">IrrigSmart</div>
                <nav>
                    <ul>
                        <li><a href="">Trang Chủ</a></li>
                        <li><a href="">Điều Khiển Đèn</a></li>
                        <li><a href="">Cài Đặt</a></li>
                        <li><a href="">Liên Hệ</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
