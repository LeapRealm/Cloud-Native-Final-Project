package com.firstbusan.wkos.qna.persistence;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBQueryExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.firstbusan.wkos.qna.model.QnaEntity;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.*;

@Slf4j
@RequiredArgsConstructor
@Repository
public class QnaRepository {

    private final DynamoDBMapper dynamoDBMapper;

    public List<QnaEntity> createQuestion(final QnaEntity entity) {
        dynamoDBMapper.save(entity);
        log.info("Entity Id : {} is saved.", entity.getId());

        return retrieveQnaByFacilityId(entity.getFacilityId());
    }

    public List<QnaEntity> createAnswer(final QnaEntity entity) {
        QnaEntity qna = retrieveQnaById(entity.getId()).get(0);

        if (qna != null) {
            qna.setA_userId(entity.getA_userId());
            qna.setA_username(entity.getA_username());
            qna.setA_content(entity.getA_content());
            qna.setA_date(LocalDateTime.now());
            dynamoDBMapper.save(qna);
            return retrieveQnaByFacilityId(qna.getFacilityId());
        }
        return new ArrayList<>();
    }

    public List<QnaEntity> retrieveQnaById(final String id) {
        QnaEntity original = dynamoDBMapper.load(QnaEntity.class, id);
        List<QnaEntity> list = new ArrayList<>();
        if (original != null) {
            list.add(original);
        }
        return list;
    }

    public List<QnaEntity> retrieveQnaByFacilityId(final Integer facilityId) {
        HashMap<String, AttributeValue> eav = new HashMap<>();
        eav.put(":v1", new AttributeValue().withS("Qna"));
        eav.put(":v2", new AttributeValue().withN(facilityId.toString()));

        DynamoDBQueryExpression<QnaEntity> queryExpression = new DynamoDBQueryExpression<QnaEntity>()
                .withIndexName("tableName-facilityId-index")
                .withConsistentRead(false)
                .withKeyConditionExpression("tableName = :v1 and facilityId = :v2")
                .withExpressionAttributeValues(eav);

        return dynamoDBMapper.query(QnaEntity.class, queryExpression);
    }

    public List<QnaEntity> deleteQuestion(final QnaEntity entity) {
        try {
            dynamoDBMapper.delete(entity);
        } catch (Exception e) {
            log.error("error deleting entity {} {}", entity.getId(), e);
            throw new RuntimeException("error deleting entity " + entity.getId());
        }
        return retrieveQnaByFacilityId(entity.getFacilityId());
    }

    public List<QnaEntity> deleteAnswer(final String id) {
        try {
            QnaEntity qna = retrieveQnaById(id).get(0);

            List<QnaEntity> list = new ArrayList<>();

            if (qna != null) {
                qna.setA_userId(null);
                qna.setA_username(null);
                qna.setA_content(null);
                qna.setA_date(null);
                dynamoDBMapper.save(qna);
                return retrieveQnaByFacilityId(qna.getFacilityId());
            }
            return new ArrayList<>();
        } catch (Exception e) {
            log.error("error deleting answer {} {}", id, e);
            throw new RuntimeException("error deleting answer " + id);
        }
    }
}