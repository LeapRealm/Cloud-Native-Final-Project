package com.firstbusan.wkos.dynamodb;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTypeConverter;

import java.time.LocalDateTime;

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