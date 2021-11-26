package com.firstbusan.wkos.facility.service;

import com.firstbusan.wkos.facility.model.FacilityEntity;
import com.firstbusan.wkos.facility.persistence.FacilityRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service
public class FacilityService {

    private final FacilityRepository facilityRepository;

    public List<FacilityEntity> create(final FacilityEntity entity) {
        FacilityEntity result = facilityRepository.save(entity);
        log.info("Entity Id : {} is saved.", result.getId());
        List<FacilityEntity> list = new ArrayList<>();
        list.add(result);
        return list;
    }

    public List<FacilityEntity> retrieveById(final Long id) {
        Optional<FacilityEntity> original = facilityRepository.findById(id);
        List<FacilityEntity> list = new ArrayList<>();
        original.ifPresent(list::add);
        return list;
    }

    public List<FacilityEntity> retrieveByLocationAndCategory(final String location, final String category) {
        if (location.equals("") && category.equals("")) {
            return facilityRepository.findAll();
        } else if (location.equals("")) {
            return facilityRepository.findByCategory(category);
        } else if (category.equals("")) {
            return facilityRepository.findByLocationContaining(location);
        } else {
            return facilityRepository.findByLocationContainingAndCategory(location, category);
        }
    }

    public List<FacilityEntity> update(final FacilityEntity entity) {
        Optional<FacilityEntity> original = facilityRepository.findById(entity.getId());

        List<FacilityEntity> list = new ArrayList<>();

        if (original.isPresent()) {
            FacilityEntity facility = original.get();
            facility.setName(entity.getName());
            facility.setCategory(entity.getCategory());
            facility.setLatitude(entity.getLatitude());
            facility.setLongitude(entity.getLongitude());
            facility.setFa_time(entity.getFa_time());
            facility.setPhone(entity.getPhone());
            facility.setLocation(entity.getLocation());
            facility.setPrice(entity.getPrice());
            facility.setImage(entity.getImage());
            FacilityEntity result = facilityRepository.save(facility);
            list.add(result);
        }
        return list;
    }

    public List<FacilityEntity> delete(final Long id) {
        try {
            Optional<FacilityEntity> original = facilityRepository.findById(id);
            original.ifPresent(facilityRepository::delete);
        } catch (Exception e) {
            log.error("error deleting entity {} {}", id, e);
            throw new RuntimeException("error deleting entity " + id);
        }
        return retrieveByLocationAndCategory("", "");
    }
}