package com.firstbusan.wkos.reservation.service;

import com.firstbusan.wkos.reservation.model.ReservationEntity;
import com.firstbusan.wkos.reservation.persistence.ReservationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional
public class ReservationService {

    private final ReservationRepository reservationRepository;

    public List<ReservationEntity> create(final ReservationEntity entity) {
        reservationRepository.save(entity);
        log.info("Entity Id : {} is saved.", entity.getId());
        return reservationRepository.findByFacilityId(entity.getFacilityId());
    }

    public List<ReservationEntity> retrieveReservationByFacilityId(final Long facilityId) {
        return reservationRepository.findByFacilityId(facilityId);
    }

    public List<ReservationEntity> retrieveReservationByUserId(final String userId) {
        return reservationRepository.findByUserId(userId);
    }

    public void delete(final String id) {
        try {
            Optional<ReservationEntity> original = reservationRepository.findById(id);
            original.ifPresent(reservationRepository::delete);
        } catch (Exception e) {
            log.error("error deleting entity {} {}", id, e);
            throw new RuntimeException("error deleting entity " + id);
        }
    }
}