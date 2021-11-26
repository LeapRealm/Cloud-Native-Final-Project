package com.firstbusan.wkos.dto;

import lombok.*;

import java.util.List;

@Builder
@Getter
@Setter
public class ResponseDTO<T> {

    private String error;
    private List<T> data;
}