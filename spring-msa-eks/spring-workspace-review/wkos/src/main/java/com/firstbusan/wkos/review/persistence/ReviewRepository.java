package com.firstbusan.wkos.review.persistence;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBQueryExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.firstbusan.wkos.review.model.ReviewEntity;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Repository
public class ReviewRepository {

    private final DynamoDBMapper dynamoDBMapper;

    public List<ReviewEntity> createReview(final ReviewEntity entity) {
        dynamoDBMapper.save(entity);
        log.info("Entity Id : {} is saved.", entity.getId());

        return retrieveReviewByFacilityId(entity.getFacilityId());
    }

    public List<ReviewEntity> retrieveReviewByFacilityId(final Integer facilityId) {
        HashMap<String, AttributeValue> eav = new HashMap<>();
        eav.put(":v1", new AttributeValue().withS("Review"));
        eav.put(":v2", new AttributeValue().withN(facilityId.toString()));

        DynamoDBQueryExpression<ReviewEntity> queryExpression = new DynamoDBQueryExpression<ReviewEntity>()
                .withIndexName("tableName-facilityId-index")
                .withConsistentRead(false)
                .withKeyConditionExpression("tableName = :v1 and facilityId = :v2")
                .withExpressionAttributeValues(eav);

        return dynamoDBMapper.query(ReviewEntity.class, queryExpression);
    }

    public List<ReviewEntity> deleteReview(final ReviewEntity entity) {
        try {
            dynamoDBMapper.delete(entity);
        } catch (Exception e) {
            log.error("error deleting entity {} {}", entity.getId(), e);
            throw new RuntimeException("error deleting entity " + entity.getId());
        }
        return retrieveReviewByFacilityId(entity.getFacilityId());
    }
}