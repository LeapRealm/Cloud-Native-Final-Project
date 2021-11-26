package com.firstbusan.wkos.facility.controller;

import com.firstbusan.wkos.dto.ResponseDTO;
import com.firstbusan.wkos.facility.dto.FacilityDTO;
import com.firstbusan.wkos.facility.model.FacilityEntity;
import com.firstbusan.wkos.facility.service.FacilityService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("facility")
public class FacilityController {

    private final FacilityService facilityService;

    @PostMapping
    public ResponseEntity<?> createFacility(@RequestBody FacilityDTO dto) {
        try {
            FacilityEntity entity = FacilityDTO.toEntity(dto);
            entity.setId(null);

            List<FacilityEntity> entities = facilityService.create(entity);

            List<FacilityDTO> dtos = entities.stream()
                    .map(FacilityDTO::new)
                    .collect(Collectors.toList());

            ResponseDTO<FacilityDTO> response = ResponseDTO.<FacilityDTO>builder()
                    .data(dtos)
                    .build();

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            String error = e.getMessage();
            ResponseDTO<FacilityDTO> response = ResponseDTO.<FacilityDTO>builder()
                    .error(error)
                    .build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> retrieveById(@PathVariable Long id) {
        try {
            List<FacilityEntity> list = facilityService.retrieveById(id);

            List<FacilityDTO> dtos = list.stream()
                    .map(FacilityDTO::new)
                    .collect(Collectors.toList());

            ResponseDTO<FacilityDTO> response = ResponseDTO.<FacilityDTO>builder()
                    .data(dtos)
                    .build();

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            String error = e.getMessage();
            ResponseDTO<FacilityDTO> response = ResponseDTO.<FacilityDTO>builder()
                    .error(error)
                    .build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping
    public ResponseEntity<?> retrieveByLocationAndCategory(@RequestParam(defaultValue = "") String location,
                                                           @RequestParam(defaultValue = "") String category) {
        try {
            List<FacilityEntity> list = facilityService.retrieveByLocationAndCategory(location, category);

            List<FacilityDTO> dtos = list.stream()
                    .map(FacilityDTO::new)
                    .collect(Collectors.toList());

            ResponseDTO<FacilityDTO> response = ResponseDTO.<FacilityDTO>builder()
                    .data(dtos)
                    .build();

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            String error = e.getMessage();
            ResponseDTO<FacilityDTO> response = ResponseDTO.<FacilityDTO>builder()
                    .error(error)
                    .build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PutMapping
    public ResponseEntity<?> updateFacility(@RequestBody FacilityDTO dto) {
        try {
            FacilityEntity entity = FacilityDTO.toEntity(dto);
            List<FacilityEntity> entities = facilityService.update(entity);

            List<FacilityDTO> dtos = entities.stream()
                    .map(FacilityDTO::new)
                    .collect(Collectors.toList());

            ResponseDTO<FacilityDTO> response = ResponseDTO.<FacilityDTO>builder()
                    .data(dtos)
                    .build();

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            String error = e.getMessage();
            ResponseDTO<FacilityDTO> response = ResponseDTO.<FacilityDTO>builder()
                    .error(error)
                    .build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFacility(@PathVariable Long id) {
        try {
            List<FacilityEntity> entities = facilityService.delete(id);

            List<FacilityDTO> dtos = entities.stream()
                    .map(FacilityDTO::new)
                    .collect(Collectors.toList());

            ResponseDTO<FacilityDTO> response = ResponseDTO.<FacilityDTO>builder()
                    .data(dtos)
                    .build();

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            String error = e.getMessage();
            ResponseDTO<FacilityDTO> response = ResponseDTO.<FacilityDTO>builder()
                    .error(error)
                    .build();
            return ResponseEntity.badRequest().body(response);
        }
    }
}