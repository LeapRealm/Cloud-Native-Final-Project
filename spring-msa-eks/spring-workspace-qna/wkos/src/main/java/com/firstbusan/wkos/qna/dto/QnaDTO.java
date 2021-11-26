package com.firstbusan.wkos.qna.dto;

import com.firstbusan.wkos.qna.model.QnaEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class QnaDTO {

    private String id;
    private Integer facilityId;
    private String q_userId;
    private String q_username;
    private String q_content;
    private String a_userId;
    private String a_username;
    private String a_content;
    private LocalDateTime q_date;
    private LocalDateTime a_date;

    public QnaDTO(final QnaEntity entity) {
        this.id = entity.getId();
        this.facilityId = entity.getFacilityId();
        this.q_userId = entity.getQ_userId();
        this.q_username = entity.getQ_username();
        this.q_content = entity.getQ_content();
        this.q_date = entity.getQ_date();
        this.a_userId = entity.getA_userId();
        this.a_username = entity.getA_username();
        this.a_content = entity.getA_content();
        this.a_date = entity.getA_date();
    }

    public static QnaEntity toEntity(final QnaDTO dto) {
        return QnaEntity.builder()
                .id(dto.getId())
                .facilityId(dto.getFacilityId())
                .q_userId(dto.getQ_userId())
                .q_username(dto.getQ_username())
                .q_content(dto.getQ_content())
                .q_date(dto.getQ_date())
                .a_userId(dto.getA_userId())
                .a_username(dto.getA_username())
                .a_content(dto.getA_content())
                .a_date(dto.getA_date())
                .build();
    }
}