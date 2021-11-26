package com.firstbusan.wkos.review.controller;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.firstbusan.wkos.dto.ResponseDTO;
import com.firstbusan.wkos.review.dto.ReviewDTO;
import com.firstbusan.wkos.review.model.ReviewEntity;
import com.firstbusan.wkos.review.service.ReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("review")
public class ReviewController {

    private final ReviewService reviewService;
    private final DynamoDBMapper dynamoDBMapper;

    @PostMapping
    public ResponseEntity<?> createReview(@AuthenticationPrincipal User user, @RequestBody ReviewDTO dto) {
        if (user == null) {
            ResponseDTO<ReviewDTO> response = ResponseDTO.<ReviewDTO>builder()
                    .error("No authorized user")
                    .build();
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }

        try {
            ReviewEntity entity = ReviewDTO.toEntity(dto);
            entity.setId(null);
            entity.setTableName("Review");
            entity.setDate(LocalDateTime.now());

            List<ReviewEntity> entities = reviewService.createReview(entity);

            List<ReviewDTO> dtos = entities.stream()
                    .map(ReviewDTO::new)
                    .collect(Collectors.toList());

            ResponseDTO<ReviewDTO> response = ResponseDTO.<ReviewDTO>builder()
                    .data(dtos)
                    .build();

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            String error = e.getMessage();
            ResponseDTO<ReviewDTO> response = ResponseDTO.<ReviewDTO>builder()
                    .error(error)
                    .build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping
    public ResponseEntity<?> retrieveReviewByFacilityId(@RequestParam Integer facilityId) {
        try {
            List<ReviewEntity> list = reviewService.retrieveReviewByFacilityId(facilityId);
            list = list.stream()
                    .sorted(Comparator.comparing(ReviewEntity::getDate).reversed())
                    .collect(Collectors.toList());

            List<ReviewDTO> dtos = list.stream()
                    .map(ReviewDTO::new)
                    .collect(Collectors.toList());

            ResponseDTO<ReviewDTO> response = ResponseDTO.<ReviewDTO>builder()
                    .data(dtos)
                    .build();

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            String error = e.getMessage();
            ResponseDTO<ReviewDTO> response = ResponseDTO.<ReviewDTO>builder()
                    .error(error)
                    .build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @DeleteMapping
    public ResponseEntity<?> deleteReview(@AuthenticationPrincipal User user, @RequestParam String id, @RequestParam Integer facilityId) {
        if (user == null) {
            ResponseDTO<ReviewDTO> response = ResponseDTO.<ReviewDTO>builder()
                    .error("No authorized user")
                    .build();
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }

        String savedUserId = "";
        ReviewEntity original = dynamoDBMapper.load(ReviewEntity.class, id);
        if (original != null) {
            savedUserId = original.getUserId();
        }

        if (!Objects.equals(user.getUsername(), savedUserId)) {
            ResponseDTO<ReviewDTO> response = ResponseDTO.<ReviewDTO>builder()
                    .error("No authorized user")
                    .build();
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }

        try {
            List<ReviewEntity> entities = reviewService.deleteReview(original);

            List<ReviewDTO> dtos = entities.stream()
                    .map(ReviewDTO::new)
                    .collect(Collectors.toList());

            ResponseDTO<ReviewDTO> response = ResponseDTO.<ReviewDTO>builder()
                    .data(dtos)
                    .build();

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            String error = e.getMessage();
            ResponseDTO<ReviewDTO> response = ResponseDTO.<ReviewDTO>builder()
                    .error(error)
                    .build();
            return ResponseEntity.badRequest().body(response);
        }
    }
}