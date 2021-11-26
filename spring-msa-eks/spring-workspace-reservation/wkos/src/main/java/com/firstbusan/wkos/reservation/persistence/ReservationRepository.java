package com.firstbusan.wkos.reservation.persistence;

import com.firstbusan.wkos.reservation.model.ReservationEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservationRepository extends JpaRepository<ReservationEntity, String> {

    List<ReservationEntity> findByFacilityId(Long facilityId);
    List<ReservationEntity> findByUserId(String userId);
}