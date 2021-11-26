package com.firstbusan.wkos.qna.model;

import com.amazonaws.services.dynamodbv2.datamodeling.*;
import com.firstbusan.wkos.dynamodb.LocalDateConverter;
import lombok.*;

import java.time.LocalDateTime;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@DynamoDBTable(tableName = "wkos")
public class QnaEntity {

    @DynamoDBHashKey
    @DynamoDBAutoGeneratedKey
    private String id;

    @DynamoDBIndexHashKey(globalSecondaryIndexName = "tableName-facilityId-index", attributeName = "tableName")
    @DynamoDBAttribute
    private String tableName;

    @DynamoDBIndexRangeKey(globalSecondaryIndexName = "tableName-facilityId-index", attributeName = "facilityId")
    @DynamoDBAttribute
    private Integer facilityId;

    @DynamoDBAttribute
    private String q_userId;

    @DynamoDBAttribute
    private String q_username;

    @DynamoDBAttribute
    private String q_content;

    @DynamoDBAttribute
    private String a_userId;

    @DynamoDBAttribute
    private String a_username;

    @DynamoDBAttribute
    private String a_content;

    @DynamoDBAttribute
    @DynamoDBTypeConverted(converter = LocalDateConverter.class)
    private LocalDateTime q_date;

    @DynamoDBAttribute
    @DynamoDBTypeConverted(converter = LocalDateConverter.class)
    private LocalDateTime a_date;
}