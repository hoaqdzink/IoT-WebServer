package com.example.iotwebserverbe.config;

import com.example.iotwebserverbe.utils.LogUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class RequestInterceptor implements HandlerInterceptor {

    /**
     * Phương thức được gọi trước khi xử lý một yêu cầu HTTP.
     * Dùng để lưu lại thời điểm bắt đầu xử lý yêu cầu nhằm tính toán thời gian thực thi sau này.
     *
     * @param request Đối tượng HttpServletRequest chứa thông tin yêu cầu.
     * @param response Đối tượng HttpServletResponse chứa thông tin phản hồi.
     * @param handler Đối tượng xử lý yêu cầu (Controller hoặc HandlerMethod).
     * @return true để tiếp tục xử lý yêu cầu, false để dừng lại.
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        long startTime = System.currentTimeMillis();
        request.setAttribute("startTime", startTime);
        return true;
    }

    /**
     * Phương thức được gọi sau khi hoàn tất xử lý yêu cầu HTTP.
     * Dùng để log thông tin yêu cầu và phản hồi, bao gồm thời gian thực thi và các chi tiết khác.
     *
     * @param request Đối tượng HttpServletRequest chứa thông tin yêu cầu.
     * @param response Đối tượng HttpServletResponse chứa thông tin phản hồi.
     * @param handler Đối tượng xử lý yêu cầu (Controller hoặc HandlerMethod).
     * @param ex Ngoại lệ (nếu có) xảy ra trong quá trình xử lý yêu cầu.
     * @throws JsonProcessingException Nếu xảy ra lỗi trong quá trình xử lý JSON khi log thông tin.
     */
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws JsonProcessingException {
        long startTime = (Long) request.getAttribute("startTime");
        LogUtil.logRequest(request, startTime);

        // Log response details
        LogUtil.logResponse(response);
    }
}