package com.firstbusan.wkos.facility.dto;

import com.firstbusan.wkos.facility.model.FacilityEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class FacilityDTO {

    private Long id;
    private String name;
    private String category;
    private String latitude;
    private String longitude;
    private String fa_time;
    private String phone;
    private String location;
    private Integer price;
    private String image;

    public FacilityDTO(final FacilityEntity entity) {
        this.id = entity.getId();
        this.name = entity.getName();
        this.category = entity.getCategory();
        this.latitude = entity.getLatitude();
        this.longitude = entity.getLongitude();
        this.fa_time = entity.getFa_time();
        this.phone = entity.getPhone();
        this.location = entity.getLocation();
        this.price = entity.getPrice();
        this.image = entity.getImage();
    }

    public static FacilityEntity toEntity(final FacilityDTO dto) {
        return FacilityEntity.builder()
                .id(dto.getId())
                .name(dto.getName())
                .category(dto.getCategory())
                .latitude(dto.getLatitude())
                .longitude(dto.getLongitude())
                .fa_time(dto.getFa_time())
                .phone(dto.getPhone())
                .location(dto.getLocation())
                .price(dto.getPrice())
                .image(dto.getImage())
                .build();
    }
}