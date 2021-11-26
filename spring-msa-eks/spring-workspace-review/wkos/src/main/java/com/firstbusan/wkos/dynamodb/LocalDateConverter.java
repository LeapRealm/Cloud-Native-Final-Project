package com.firstbusan.wkos.dynamodb;

import java.time.LocalDateTime;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTypeConverter;

public class LocalDateConverter implements DynamoDBTypeConverter<String, LocalDateTime> {

    @Override
    public String convert(LocalDateTime object) {
        return object.toString();
    }

    @Override
    public LocalDateTime unconvert(String object) {
        return LocalDateTime.parse(object);
    }
}