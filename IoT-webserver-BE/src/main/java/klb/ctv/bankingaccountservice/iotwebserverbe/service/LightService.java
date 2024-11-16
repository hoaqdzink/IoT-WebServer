package klb.ctv.bankingaccountservice.iotwebserverbe.service;

import klb.ctv.bankingaccountservice.iotwebserverbe.entity.Lights;
import klb.ctv.bankingaccountservice.iotwebserverbe.repository.LightsRepository;
import klb.ctv.bankingaccountservice.iotwebserverbe.utils.DateUtils;
import klb.ctv.bankingaccountservice.iotwebserverbe.utils.GeneralUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LightService {

    @Autowired
    private LightsRepository lightsRepository;

    public Lights createLight(Lights light) {
        Lights lights = Lights.builder()
                .id(GeneralUtils.generateId())
                .date(DateUtils.getCurrentDateTime())
                .style(light.getStyle())
                .build();
        return lightsRepository.save(lights);
    }

    public List<Lights> getAllLights() {
        return lightsRepository.findAll();
    }
}
