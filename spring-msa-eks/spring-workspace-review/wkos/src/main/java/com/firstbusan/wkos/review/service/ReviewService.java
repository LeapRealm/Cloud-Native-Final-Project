package com.firstbusan.wkos.review.service;

import com.firstbusan.wkos.review.model.ReviewEntity;
import com.firstbusan.wkos.review.persistence.ReviewRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;

    public List<ReviewEntity> createReview(final ReviewEntity entity) {
        return reviewRepository.createReview(entity);
    }

    public List<ReviewEntity> retrieveReviewByFacilityId(final Integer facilityId) {
        return reviewRepository.retrieveReviewByFacilityId(facilityId);
    }

    public List<ReviewEntity> deleteReview(final ReviewEntity entity) {
        return reviewRepository.deleteReview(entity);
    }
}