package klb.ctv.bankingaccountservice.iotwebserverbe.entity;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "lights")
public class Lights implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Column(name = "date_light")
    private Date date;

    @Column(name = "style_light")
    private String style;
}
