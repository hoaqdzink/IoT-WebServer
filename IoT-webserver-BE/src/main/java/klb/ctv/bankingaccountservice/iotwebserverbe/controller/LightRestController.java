package klb.ctv.bankingaccountservice.iotwebserverbe.controller;

import klb.ctv.bankingaccountservice.iotwebserverbe.entity.Lights;
import klb.ctv.bankingaccountservice.iotwebserverbe.service.LightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController("/api/v1")
public class LightRestController {
    @Autowired
    private LightService lightService;

    @PostMapping("/lights")
    public Lights createLight(@RequestBody Lights light) {
        return lightService.createLight(light);
    }

    @GetMapping("/lights")
    public List<Lights> getAllLights() {
        return lightService.getAllLights();
    }
}
