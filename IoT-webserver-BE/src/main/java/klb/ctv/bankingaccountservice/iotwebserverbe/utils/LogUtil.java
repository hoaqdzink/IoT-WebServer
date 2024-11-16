package klb.ctv.bankingaccountservice.iotwebserverbe.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;

public class LogUtil {

    private static final Logger logger = LoggerFactory.getLogger(LogUtil.class);

    public static void logRequest(HttpServletRequest request, long startTime) throws JsonProcessingException {
        try {
            // Thời gian xử lý
            long executionTime = System.currentTimeMillis() - startTime;

            // Thông tin từ request
            String method = request.getMethod();
            String url = request.getRequestURL().toString();
            String queryParams = request.getQueryString();
            String clientIp = request.getRemoteAddr();
            String userAgent = request.getHeader("User-Agent");
            String contentType = request.getContentType();

            // Log thông tin chi tiết
            // logger.info("HTTP Method: {}", method);
            // logger.info("URL: {}", url + (queryParams != null ? "?" + queryParams : ""));
            // logger.info("Client IP: {}", clientIp);
            // logger.info("User-Agent: {}", userAgent);
            // logger.info("Content-Type: {}", contentType);
            // logger.info("Execution time: {} ms", executionTime);

            // Tạo một map để chứa các thông tin log
            Map<String, Object> logDetails = new HashMap<>();
            logDetails.put("HTTP Method", method);
            logDetails.put("URL", url + (queryParams != null ? "?" + queryParams : ""));
            logDetails.put("Client IP", clientIp);
            logDetails.put("User-Agent", userAgent);
            logDetails.put("Content-Type", contentType);
            logDetails.put("Execution Time (ms)", executionTime);

            // Chuyển đổi map thành chuỗi JSON
            ObjectMapper objectMapper = new ObjectMapper();
            String jsonLog = objectMapper.writeValueAsString(logDetails);

            // Ghi log dưới dạng JSON
            logger.info(jsonLog);
        } catch (Exception e) {
            logger.error("Error while logging request: {}", e.getMessage());
        }
    }

    public static void logResponse(HttpServletResponse response) throws JsonProcessingException {
        try {
            // Thông tin từ response
            int status = response.getStatus();
            String contentType = response.getContentType();

            // Tạo map chứa thông tin log response
            Map<String, Object> logDetails = new HashMap<>();
            logDetails.put("HTTP Status", status);
            logDetails.put("Response Content-Type", contentType);

            // Chuyển đổi map thành chuỗi JSON
            ObjectMapper objectMapper = new ObjectMapper();
            String jsonLog = objectMapper.writeValueAsString(logDetails);

            // Ghi log dưới dạng JSON
            logger.info(jsonLog);
        } catch (Exception e) {
            logger.error("Error while logging response: {}", e.getMessage());
        }
    }
}
