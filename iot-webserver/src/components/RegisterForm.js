import React, { useState } from "react";
import "../css/RegisterForm.css"; // Đảm bảo đường dẫn đúng tới file CSS
import image from "../img/1000_F_221667537_dfzXqzQsLgADMDRVAVYwTfmFfFBDGzCk.jpg"; // Thay đổi đường dẫn đến hình ảnh của bạn

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý gửi dữ liệu đăng ký (có thể gửi tới server hoặc hiển thị dữ liệu)
    console.log("Đăng ký thành công:", formData);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Xử lý gửi dữ liệu đăng nhập (có thể chuyển hướng tới trang đăng nhập)
    console.log("Chuyển hướng đến trang đăng nhập");
  };

  return (
    <div className="register-form-wrapper">
      {/* Bên hình ảnh */}
      <div className="register-form-image">
        <img src={image} alt="Hình ảnh đăng ký dịch vụ" />
      </div>

      {/* Bên form đăng ký */}
      <div className="register-form-container">
        <h2>Đăng Ký Dịch Vụ</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="fullName">Họ Tên:</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Số Điện Thoại:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Địa Chỉ:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="register-btn">Đăng Ký</button>
            <button type="button" className="login-btn" onClick={handleLogin}>Đăng Nhập</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
