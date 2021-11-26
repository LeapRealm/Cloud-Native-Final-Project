package com.firstbusan.wkos.reservation.model;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "reservation")
public class ReservationEntity {

    @Id
    private String id;

    @Column(nullable = false)
    private Long facilityId;

    @Column(nullable = false)
    private String facilityName;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String userId;

    @Column(nullable = false)
    private String userPhone;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private Integer price;

    private Date reservationDate;
}