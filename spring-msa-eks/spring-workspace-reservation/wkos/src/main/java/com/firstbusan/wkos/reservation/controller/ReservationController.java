package com.firstbusan.wkos.reservation.controller;

import com.firstbusan.wkos.dto.ResponseDTO;
import com.firstbusan.wkos.reservation.dto.ReservationDTO;
import com.firstbusan.wkos.reservation.model.ReservationEntity;
import com.firstbusan.wkos.reservation.persistence.ReservationRepository;
import com.firstbusan.wkos.reservation.service.ReservationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("reservation")
public class ReservationController {

    private final ReservationService reservationService;
    private final ReservationRepository reservationRepository;

    @PostMapping
    public ResponseEntity<?> createReservation(@AuthenticationPrincipal User user, @RequestBody ReservationDTO dto) {
        if (user == null) {
            ResponseDTO<ReservationDTO> response = ResponseDTO.<ReservationDTO>builder()
                    .error("No authorized user")
                    .build();
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }

        try {
            ReservationEntity entity = ReservationDTO.toEntity(dto);

            List<ReservationEntity> entities = reservationService.create(entity);

            List<ReservationDTO> dtos = entities.stream()
                    .map(ReservationDTO::new)
                    .collect(Collectors.toList());

            ResponseDTO<ReservationDTO> response = ResponseDTO.<ReservationDTO>builder()
                    .data(dtos)
                    .build();

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            String error = e.getMessage();
            ResponseDTO<ReservationDTO> response = ResponseDTO.<ReservationDTO>builder()
                    .error(error)
                    .build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping
    public ResponseEntity<?> retrieveReservationByFacilityId(@RequestParam Long facilityId) {
        try {
            List<ReservationEntity> list = reservationService.retrieveReservationByFacilityId(facilityId);

            List<ReservationDTO> dtos = list.stream()
                    .map(ReservationDTO::toOpenDTO)
                    .collect(Collectors.toList());

            ResponseDTO<ReservationDTO> response = ResponseDTO.<ReservationDTO>builder()
                    .data(dtos)
                    .build();

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            String error = e.getMessage();
            ResponseDTO<ReservationDTO> response = ResponseDTO.<ReservationDTO>builder()
                    .error(error)
                    .build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/user")
    public ResponseEntity<?> retrieveReservationByUserId(@AuthenticationPrincipal User user) {
        if (user == null) {
            ResponseDTO<ReservationDTO> response = ResponseDTO.<ReservationDTO>builder()
                    .error("No authorized user")
                    .build();
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }

        try {
            List<ReservationEntity> list = reservationService.retrieveReservationByUserId(user.getUsername());

            List<ReservationDTO> dtos = list.stream()
                    .map(ReservationDTO::new)
                    .collect(Collectors.toList());

            ResponseDTO<ReservationDTO> response = ResponseDTO.<ReservationDTO>builder()
                    .data(dtos)
                    .build();

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            String error = e.getMessage();
            ResponseDTO<ReservationDTO> response = ResponseDTO.<ReservationDTO>builder()
                    .error(error)
                    .build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @DeleteMapping
    public ResponseEntity<?> deleteReservation(@AuthenticationPrincipal User user, @RequestParam String id) {
        if (user == null) {
            ResponseDTO<ReservationDTO> response = ResponseDTO.<ReservationDTO>builder()
                    .error("No authorized user")
                    .build();
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }

        String savedUserId = reservationRepository.findById(id).get().getUserId();
        if (!Objects.equals(user.getUsername(), savedUserId)) {
            ResponseDTO<ReservationDTO> response = ResponseDTO.<ReservationDTO>builder()
                    .error("No authorized user")
                    .build();
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }

        try {
            reservationService.delete(id);

            ResponseDTO<ReservationDTO> response = ResponseDTO.<ReservationDTO>builder()
                    .data(new ArrayList<>())
                    .build();

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            String error = e.getMessage();
            ResponseDTO<ReservationDTO> response = ResponseDTO.<ReservationDTO>builder()
                    .error(error)
                    .build();
            return ResponseEntity.badRequest().body(response);
        }
    }
}