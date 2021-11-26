package com.firstbusan.wkos.facility.persistence;

import com.firstbusan.wkos.facility.model.FacilityEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FacilityRepository extends JpaRepository<FacilityEntity, Long> {
    List<FacilityEntity> findByLocationContainingAndCategory(String location, String category);
    List<FacilityEntity> findByLocationContaining(String location);
    List<FacilityEntity> findByCategory(String category);
}