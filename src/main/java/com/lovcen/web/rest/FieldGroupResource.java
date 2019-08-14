package com.lovcen.web.rest;

import com.lovcen.domain.FieldGroup;
import com.lovcen.repository.FieldGroupRepository;
import com.lovcen.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.lovcen.domain.FieldGroup}.
 */
@RestController
@RequestMapping("/api")
public class FieldGroupResource {

    private final Logger log = LoggerFactory.getLogger(FieldGroupResource.class);

    private static final String ENTITY_NAME = "fieldGroup";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FieldGroupRepository fieldGroupRepository;

    public FieldGroupResource(FieldGroupRepository fieldGroupRepository) {
        this.fieldGroupRepository = fieldGroupRepository;
    }

    /**
     * {@code POST  /field-groups} : Create a new fieldGroup.
     *
     * @param fieldGroup the fieldGroup to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new fieldGroup, or with status {@code 400 (Bad Request)} if the fieldGroup has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/field-groups")
    public ResponseEntity<FieldGroup> createFieldGroup(@Valid @RequestBody FieldGroup fieldGroup) throws URISyntaxException {
        log.debug("REST request to save FieldGroup : {}", fieldGroup);
        if (fieldGroup.getId() != null) {
            throw new BadRequestAlertException("A new fieldGroup cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FieldGroup result = fieldGroupRepository.save(fieldGroup);
        return ResponseEntity.created(new URI("/api/field-groups/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /field-groups} : Updates an existing fieldGroup.
     *
     * @param fieldGroup the fieldGroup to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated fieldGroup,
     * or with status {@code 400 (Bad Request)} if the fieldGroup is not valid,
     * or with status {@code 500 (Internal Server Error)} if the fieldGroup couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/field-groups")
    public ResponseEntity<FieldGroup> updateFieldGroup(@Valid @RequestBody FieldGroup fieldGroup) throws URISyntaxException {
        log.debug("REST request to update FieldGroup : {}", fieldGroup);
        if (fieldGroup.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FieldGroup result = fieldGroupRepository.save(fieldGroup);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, fieldGroup.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /field-groups} : get all the fieldGroups.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of fieldGroups in body.
     */
    @GetMapping("/field-groups")
    public List<FieldGroup> getAllFieldGroups() {
        log.debug("REST request to get all FieldGroups");
        return fieldGroupRepository.findAll();
    }

    /**
     * {@code GET  /field-groups/:id} : get the "id" fieldGroup.
     *
     * @param id the id of the fieldGroup to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the fieldGroup, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/field-groups/{id}")
    public ResponseEntity<FieldGroup> getFieldGroup(@PathVariable Long id) {
        log.debug("REST request to get FieldGroup : {}", id);
        Optional<FieldGroup> fieldGroup = fieldGroupRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(fieldGroup);
    }

    /**
     * {@code DELETE  /field-groups/:id} : delete the "id" fieldGroup.
     *
     * @param id the id of the fieldGroup to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/field-groups/{id}")
    public ResponseEntity<Void> deleteFieldGroup(@PathVariable Long id) {
        log.debug("REST request to delete FieldGroup : {}", id);
        fieldGroupRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
