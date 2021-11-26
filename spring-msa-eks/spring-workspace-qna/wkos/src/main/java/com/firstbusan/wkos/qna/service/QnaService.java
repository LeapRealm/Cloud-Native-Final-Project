package com.firstbusan.wkos.qna.service;

import com.firstbusan.wkos.qna.model.QnaEntity;
import com.firstbusan.wkos.qna.persistence.QnaRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class QnaService {

    private final QnaRepository qnaRepository;

    public List<QnaEntity> createQuestion(final QnaEntity entity) {
        return qnaRepository.createQuestion(entity);
    }

    public List<QnaEntity> createAnswer(final QnaEntity entity) {
        return qnaRepository.createAnswer(entity);
    }

    public List<QnaEntity> retrieveQnaById(final String id) {
        return qnaRepository.retrieveQnaById(id);
    }

    public List<QnaEntity> retrieveQnaByFacilityId(final Integer facilityId) {
        return qnaRepository.retrieveQnaByFacilityId(facilityId);
    }

    public List<QnaEntity> deleteQuestion(final QnaEntity entity) {
        return qnaRepository.deleteQuestion(entity);
    }

    public List<QnaEntity> deleteAnswer(final String id) {
        return qnaRepository.deleteAnswer(id);
    }
}