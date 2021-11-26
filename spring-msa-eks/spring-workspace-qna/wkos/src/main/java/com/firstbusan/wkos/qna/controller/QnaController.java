package com.firstbusan.wkos.qna.controller;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.firstbusan.wkos.dto.ResponseDTO;
import com.firstbusan.wkos.qna.dto.QnaDTO;
import com.firstbusan.wkos.qna.model.QnaEntity;
import com.firstbusan.wkos.qna.service.QnaService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("qna")
public class QnaController {

    private final QnaService qnaService;
    private final DynamoDBMapper dynamoDBMapper;

    @PostMapping("/question")
    public ResponseEntity<?> createQuestion(@AuthenticationPrincipal User user, @RequestBody QnaDTO dto) {
        if (user == null) {
            ResponseDTO<QnaDTO> response = ResponseDTO.<QnaDTO>builder()
                    .error("No authorized user")
                    .build();
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }

        try {
            QnaEntity entity = QnaDTO.toEntity(dto);
            entity.setId(null);
            entity.setTableName("Qna");
            entity.setQ_date(LocalDateTime.now());

            List<QnaEntity> entities = qnaService.createQuestion(entity);

            List<QnaDTO> dtos = entities.stream()
                    .map(QnaDTO::new)
                    .collect(Collectors.toList());

            ResponseDTO<QnaDTO> response = ResponseDTO.<QnaDTO>builder()
                    .data(dtos)
                    .build();

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            String error = e.getMessage();
            ResponseDTO<QnaDTO> response = ResponseDTO.<QnaDTO>builder()
                    .error(error)
                    .build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("answer")
    public ResponseEntity<?> createAnswer(@AuthenticationPrincipal User user, @RequestBody QnaDTO dto) {
        if (user == null) {
            ResponseDTO<QnaDTO> response = ResponseDTO.<QnaDTO>builder()
                    .error("No authorized user")
                    .build();
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }

        try {
            QnaEntity entity = QnaDTO.toEntity(dto);
            List<QnaEntity> entities = qnaService.createAnswer(entity);

            List<QnaDTO> dtos = entities.stream()
                    .map(QnaDTO::new)
                    .collect(Collectors.toList());

            ResponseDTO<QnaDTO> response = ResponseDTO.<QnaDTO>builder()
                    .data(dtos)
                    .build();

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            String error = e.getMessage();
            ResponseDTO<QnaDTO> response = ResponseDTO.<QnaDTO>builder()
                    .error(error)
                    .build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> retrieveQnaById(@PathVariable String id) {
        try {
            List<QnaEntity> list = qnaService.retrieveQnaById(id);

            List<QnaDTO> dtos = list.stream()
                    .map(QnaDTO::new)
                    .collect(Collectors.toList());

            ResponseDTO<QnaDTO> response = ResponseDTO.<QnaDTO>builder()
                    .data(dtos)
                    .build();

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            String error = e.getMessage();
            ResponseDTO<QnaDTO> response = ResponseDTO.<QnaDTO>builder()
                    .error(error)
                    .build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping
    public ResponseEntity<?> retrieveQnaByFacilityId(@RequestParam Integer facilityId) {
        try {
            List<QnaEntity> list = qnaService.retrieveQnaByFacilityId(facilityId);
            list = list.stream()
                    .sorted(Comparator.comparing(QnaEntity::getQ_date).reversed())
                    .collect(Collectors.toList());

            List<QnaDTO> dtos = list.stream()
                    .map(QnaDTO::new)
                    .collect(Collectors.toList());

            ResponseDTO<QnaDTO> response = ResponseDTO.<QnaDTO>builder()
                    .data(dtos)
                    .build();

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            String error = e.getMessage();
            ResponseDTO<QnaDTO> response = ResponseDTO.<QnaDTO>builder()
                    .error(error)
                    .build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @DeleteMapping("/question")
    public ResponseEntity<?> deleteQuestion(@AuthenticationPrincipal User user, @RequestParam String id, @RequestParam Integer facilityId) {
        if (user == null) {
            ResponseDTO<QnaDTO> response = ResponseDTO.<QnaDTO>builder()
                    .error("No authorized user")
                    .build();
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }

        String savedUserId = "";
        QnaEntity original = dynamoDBMapper.load(QnaEntity.class, id);
        if (original != null) {
            savedUserId = original.getQ_userId();
        }

        if (!Objects.equals(user.getUsername(), savedUserId)) {
            ResponseDTO<QnaDTO> response = ResponseDTO.<QnaDTO>builder()
                    .error("No authorized user")
                    .build();
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }

        try {
            List<QnaEntity> entities = qnaService.deleteQuestion(original);

            List<QnaDTO> dtos = entities.stream()
                    .map(QnaDTO::new)
                    .collect(Collectors.toList());

            ResponseDTO<QnaDTO> response = ResponseDTO.<QnaDTO>builder()
                    .data(dtos)
                    .build();

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            String error = e.getMessage();
            ResponseDTO<QnaDTO> response = ResponseDTO.<QnaDTO>builder()
                    .error(error)
                    .build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @DeleteMapping("/answer/{id}")
    public ResponseEntity<?> deleteAnswer(@AuthenticationPrincipal User user, @PathVariable String id) {
        if (user == null) {
            ResponseDTO<QnaDTO> response = ResponseDTO.<QnaDTO>builder()
                    .error("No authorized user")
                    .build();
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }

        String savedUserId = "";
        QnaEntity original = dynamoDBMapper.load(QnaEntity.class, id);
        if (original != null) {
            savedUserId = original.getA_userId();
        }

        if (!Objects.equals(user.getUsername(), savedUserId)) {
            ResponseDTO<QnaDTO> response = ResponseDTO.<QnaDTO>builder()
                    .error("No authorized user")
                    .build();
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }

        try {
            List<QnaEntity> entities = qnaService.deleteAnswer(id);

            List<QnaDTO> dtos = entities.stream()
                    .map(QnaDTO::new)
                    .collect(Collectors.toList());

            ResponseDTO<QnaDTO> response = ResponseDTO.<QnaDTO>builder()
                    .data(dtos)
                    .build();

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            String error = e.getMessage();
            ResponseDTO<QnaDTO> response = ResponseDTO.<QnaDTO>builder()
                    .error(error)
                    .build();
            return ResponseEntity.badRequest().body(response);
        }
    }
}