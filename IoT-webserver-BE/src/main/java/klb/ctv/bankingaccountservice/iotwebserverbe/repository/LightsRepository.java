package klb.ctv.bankingaccountservice.iotwebserverbe.repository;

import klb.ctv.bankingaccountservice.iotwebserverbe.entity.Lights;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LightsRepository extends JpaRepository<Lights, String> {

}
