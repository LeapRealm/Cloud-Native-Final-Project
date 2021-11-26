package com.firstbusan.wkos.review.dto;

import com.firstbusan.wkos.review.model.ReviewEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ReviewDTO {

    private String id;
    private Integer facilityId;
    private String username;
    private String userId;
    private Integer score;
    private String content;
    private LocalDateTime reviewDate;

    public ReviewDTO(final ReviewEntity entity) {
        this.id = entity.getId();
        this.facilityId = entity.getFacilityId();
        this.username = entity.getUsername();
        this.userId = entity.getUserId();
        this.score = entity.getScore();
        this.content = entity.getContent();
        this.reviewDate = entity.getDate();
    }

    public static ReviewEntity toEntity(final ReviewDTO dto) {
        return ReviewEntity.builder()
                .id(dto.getId())
                .facilityId(dto.getFacilityId())
                .username(dto.getUsername())
                .userId(dto.getUserId())
                .score(dto.getScore())
                .content(dto.getContent())
                .date(dto.getReviewDate())
                .build();
    }
}