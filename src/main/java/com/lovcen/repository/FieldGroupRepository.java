package com.lovcen.repository;

import com.lovcen.domain.FieldGroup;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the FieldGroup entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FieldGroupRepository extends JpaRepository<FieldGroup, Long> {

}
