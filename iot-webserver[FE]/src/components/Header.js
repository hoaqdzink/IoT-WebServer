import React from "react";
import { Link } from "react-router-dom"; // Import Link từ react-router-dom

export default function Header() {
    return (
        <header>
            <div className="content">
                <div className="logo">IrrigSmart</div>
                <nav>
                    <ul>
                        <li><Link to="/">Trang Chủ</Link></li>
                        <li><Link to="/control">Điều Khiển</Link></li>
                        <li><Link to="/sensor">Cảm biến</Link></li>
                        <li><Link to="/data">Dữ liệu</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
