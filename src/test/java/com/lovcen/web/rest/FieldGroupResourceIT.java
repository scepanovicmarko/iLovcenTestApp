package com.lovcen.web.rest;

import com.lovcen.ILovcenTestApp;
import com.lovcen.domain.FieldGroup;
import com.lovcen.repository.FieldGroupRepository;
import com.lovcen.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.lovcen.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link FieldGroupResource} REST controller.
 */
@SpringBootTest(classes = ILovcenTestApp.class)
public class FieldGroupResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_VALUE = "BBBBBBBBBB";

    @Autowired
    private FieldGroupRepository fieldGroupRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restFieldGroupMockMvc;

    private FieldGroup fieldGroup;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FieldGroupResource fieldGroupResource = new FieldGroupResource(fieldGroupRepository);
        this.restFieldGroupMockMvc = MockMvcBuilders.standaloneSetup(fieldGroupResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FieldGroup createEntity(EntityManager em) {
        FieldGroup fieldGroup = new FieldGroup()
            .name(DEFAULT_NAME)
            .value(DEFAULT_VALUE);
        return fieldGroup;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FieldGroup createUpdatedEntity(EntityManager em) {
        FieldGroup fieldGroup = new FieldGroup()
            .name(UPDATED_NAME)
            .value(UPDATED_VALUE);
        return fieldGroup;
    }

    @BeforeEach
    public void initTest() {
        fieldGroup = createEntity(em);
    }

    @Test
    @Transactional
    public void createFieldGroup() throws Exception {
        int databaseSizeBeforeCreate = fieldGroupRepository.findAll().size();

        // Create the FieldGroup
        restFieldGroupMockMvc.perform(post("/api/field-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fieldGroup)))
            .andExpect(status().isCreated());

        // Validate the FieldGroup in the database
        List<FieldGroup> fieldGroupList = fieldGroupRepository.findAll();
        assertThat(fieldGroupList).hasSize(databaseSizeBeforeCreate + 1);
        FieldGroup testFieldGroup = fieldGroupList.get(fieldGroupList.size() - 1);
        assertThat(testFieldGroup.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testFieldGroup.getValue()).isEqualTo(DEFAULT_VALUE);
    }

    @Test
    @Transactional
    public void createFieldGroupWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = fieldGroupRepository.findAll().size();

        // Create the FieldGroup with an existing ID
        fieldGroup.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFieldGroupMockMvc.perform(post("/api/field-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fieldGroup)))
            .andExpect(status().isBadRequest());

        // Validate the FieldGroup in the database
        List<FieldGroup> fieldGroupList = fieldGroupRepository.findAll();
        assertThat(fieldGroupList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = fieldGroupRepository.findAll().size();
        // set the field null
        fieldGroup.setName(null);

        // Create the FieldGroup, which fails.

        restFieldGroupMockMvc.perform(post("/api/field-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fieldGroup)))
            .andExpect(status().isBadRequest());

        List<FieldGroup> fieldGroupList = fieldGroupRepository.findAll();
        assertThat(fieldGroupList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllFieldGroups() throws Exception {
        // Initialize the database
        fieldGroupRepository.saveAndFlush(fieldGroup);

        // Get all the fieldGroupList
        restFieldGroupMockMvc.perform(get("/api/field-groups?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fieldGroup.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE.toString())));
    }
    
    @Test
    @Transactional
    public void getFieldGroup() throws Exception {
        // Initialize the database
        fieldGroupRepository.saveAndFlush(fieldGroup);

        // Get the fieldGroup
        restFieldGroupMockMvc.perform(get("/api/field-groups/{id}", fieldGroup.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(fieldGroup.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingFieldGroup() throws Exception {
        // Get the fieldGroup
        restFieldGroupMockMvc.perform(get("/api/field-groups/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFieldGroup() throws Exception {
        // Initialize the database
        fieldGroupRepository.saveAndFlush(fieldGroup);

        int databaseSizeBeforeUpdate = fieldGroupRepository.findAll().size();

        // Update the fieldGroup
        FieldGroup updatedFieldGroup = fieldGroupRepository.findById(fieldGroup.getId()).get();
        // Disconnect from session so that the updates on updatedFieldGroup are not directly saved in db
        em.detach(updatedFieldGroup);
        updatedFieldGroup
            .name(UPDATED_NAME)
            .value(UPDATED_VALUE);

        restFieldGroupMockMvc.perform(put("/api/field-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFieldGroup)))
            .andExpect(status().isOk());

        // Validate the FieldGroup in the database
        List<FieldGroup> fieldGroupList = fieldGroupRepository.findAll();
        assertThat(fieldGroupList).hasSize(databaseSizeBeforeUpdate);
        FieldGroup testFieldGroup = fieldGroupList.get(fieldGroupList.size() - 1);
        assertThat(testFieldGroup.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testFieldGroup.getValue()).isEqualTo(UPDATED_VALUE);
    }

    @Test
    @Transactional
    public void updateNonExistingFieldGroup() throws Exception {
        int databaseSizeBeforeUpdate = fieldGroupRepository.findAll().size();

        // Create the FieldGroup

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFieldGroupMockMvc.perform(put("/api/field-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fieldGroup)))
            .andExpect(status().isBadRequest());

        // Validate the FieldGroup in the database
        List<FieldGroup> fieldGroupList = fieldGroupRepository.findAll();
        assertThat(fieldGroupList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFieldGroup() throws Exception {
        // Initialize the database
        fieldGroupRepository.saveAndFlush(fieldGroup);

        int databaseSizeBeforeDelete = fieldGroupRepository.findAll().size();

        // Delete the fieldGroup
        restFieldGroupMockMvc.perform(delete("/api/field-groups/{id}", fieldGroup.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<FieldGroup> fieldGroupList = fieldGroupRepository.findAll();
        assertThat(fieldGroupList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FieldGroup.class);
        FieldGroup fieldGroup1 = new FieldGroup();
        fieldGroup1.setId(1L);
        FieldGroup fieldGroup2 = new FieldGroup();
        fieldGroup2.setId(fieldGroup1.getId());
        assertThat(fieldGroup1).isEqualTo(fieldGroup2);
        fieldGroup2.setId(2L);
        assertThat(fieldGroup1).isNotEqualTo(fieldGroup2);
        fieldGroup1.setId(null);
        assertThat(fieldGroup1).isNotEqualTo(fieldGroup2);
    }
}
