package com.firstbusan.wkos.reservation.dto;

import com.firstbusan.wkos.reservation.model.ReservationEntity;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class ReservationDTO {

    private String id;
    private Long facilityId;
    private String facilityName;
    private String username;
    private String userId;
    private String userPhone;
    private String email;
    private Integer price;
    private Date reservationDate;

    public ReservationDTO(final ReservationEntity entity) {
        this.id = entity.getId();
        this.facilityId = entity.getFacilityId();
        this.facilityName = entity.getFacilityName();
        this.username = entity.getUsername();
        this.userId = entity.getUserId();
        this.userPhone = entity.getUserPhone();
        this.email = entity.getEmail();
        this.price = entity.getPrice();
        this.reservationDate = entity.getReservationDate();
    }

    public static ReservationDTO toOpenDTO(final ReservationEntity entity) {
        return ReservationDTO.builder()
                .reservationDate(entity.getReservationDate())
                .build();
    }

    public static ReservationEntity toEntity(final ReservationDTO dto) {
        return ReservationEntity.builder()
                .id(dto.getId())
                .facilityId(dto.getFacilityId())
                .facilityName(dto.getFacilityName())
                .username(dto.getUsername())
                .userId(dto.getUserId())
                .userPhone(dto.getUserPhone())
                .email(dto.getEmail())
                .price(dto.getPrice())
                .reservationDate(dto.getReservationDate())
                .build();
    }
}