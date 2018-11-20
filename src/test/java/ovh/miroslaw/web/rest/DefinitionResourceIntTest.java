package ovh.miroslaw.web.rest;

import ovh.miroslaw.GlossaryApp;

import ovh.miroslaw.domain.Definition;
import ovh.miroslaw.repository.DefinitionRepository;
import ovh.miroslaw.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static ovh.miroslaw.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the DefinitionResource REST controller.
 *
 * @see DefinitionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GlossaryApp.class)
public class DefinitionResourceIntTest {

    private static final String DEFAULT_PART_OF_SPEECH = "AAAAAAAAAA";
    private static final String UPDATED_PART_OF_SPEECH = "BBBBBBBBBB";

    private static final String DEFAULT_DEFINITION_TEXT = "AAAAAAAAAA";
    private static final String UPDATED_DEFINITION_TEXT = "BBBBBBBBBB";

    @Autowired
    private DefinitionRepository definitionRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDefinitionMockMvc;

    private Definition definition;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DefinitionResource definitionResource = new DefinitionResource(definitionRepository);
        this.restDefinitionMockMvc = MockMvcBuilders.standaloneSetup(definitionResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Definition createEntity(EntityManager em) {
        Definition definition = new Definition()
            .partOfSpeech(DEFAULT_PART_OF_SPEECH)
            .definitionText(DEFAULT_DEFINITION_TEXT);
        return definition;
    }

    @Before
    public void initTest() {
        definition = createEntity(em);
    }

    @Test
    @Transactional
    public void createDefinition() throws Exception {
        int databaseSizeBeforeCreate = definitionRepository.findAll().size();

        // Create the Definition
        restDefinitionMockMvc.perform(post("/api/definitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(definition)))
            .andExpect(status().isCreated());

        // Validate the Definition in the database
        List<Definition> definitionList = definitionRepository.findAll();
        assertThat(definitionList).hasSize(databaseSizeBeforeCreate + 1);
        Definition testDefinition = definitionList.get(definitionList.size() - 1);
        assertThat(testDefinition.getPartOfSpeech()).isEqualTo(DEFAULT_PART_OF_SPEECH);
        assertThat(testDefinition.getDefinitionText()).isEqualTo(DEFAULT_DEFINITION_TEXT);
    }

    @Test
    @Transactional
    public void createDefinitionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = definitionRepository.findAll().size();

        // Create the Definition with an existing ID
        definition.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDefinitionMockMvc.perform(post("/api/definitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(definition)))
            .andExpect(status().isBadRequest());

        // Validate the Definition in the database
        List<Definition> definitionList = definitionRepository.findAll();
        assertThat(definitionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkPartOfSpeechIsRequired() throws Exception {
        int databaseSizeBeforeTest = definitionRepository.findAll().size();
        // set the field null
        definition.setPartOfSpeech(null);

        // Create the Definition, which fails.

        restDefinitionMockMvc.perform(post("/api/definitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(definition)))
            .andExpect(status().isBadRequest());

        List<Definition> definitionList = definitionRepository.findAll();
        assertThat(definitionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDefinitionTextIsRequired() throws Exception {
        int databaseSizeBeforeTest = definitionRepository.findAll().size();
        // set the field null
        definition.setDefinitionText(null);

        // Create the Definition, which fails.

        restDefinitionMockMvc.perform(post("/api/definitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(definition)))
            .andExpect(status().isBadRequest());

        List<Definition> definitionList = definitionRepository.findAll();
        assertThat(definitionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDefinitions() throws Exception {
        // Initialize the database
        definitionRepository.saveAndFlush(definition);

        // Get all the definitionList
        restDefinitionMockMvc.perform(get("/api/definitions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(definition.getId().intValue())))
            .andExpect(jsonPath("$.[*].partOfSpeech").value(hasItem(DEFAULT_PART_OF_SPEECH.toString())))
            .andExpect(jsonPath("$.[*].definitionText").value(hasItem(DEFAULT_DEFINITION_TEXT.toString())));
    }
    

    @Test
    @Transactional
    public void getDefinition() throws Exception {
        // Initialize the database
        definitionRepository.saveAndFlush(definition);

        // Get the definition
        restDefinitionMockMvc.perform(get("/api/definitions/{id}", definition.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(definition.getId().intValue()))
            .andExpect(jsonPath("$.partOfSpeech").value(DEFAULT_PART_OF_SPEECH.toString()))
            .andExpect(jsonPath("$.definitionText").value(DEFAULT_DEFINITION_TEXT.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingDefinition() throws Exception {
        // Get the definition
        restDefinitionMockMvc.perform(get("/api/definitions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDefinition() throws Exception {
        // Initialize the database
        definitionRepository.saveAndFlush(definition);

        int databaseSizeBeforeUpdate = definitionRepository.findAll().size();

        // Update the definition
        Definition updatedDefinition = definitionRepository.findById(definition.getId()).get();
        // Disconnect from session so that the updates on updatedDefinition are not directly saved in db
        em.detach(updatedDefinition);
        updatedDefinition
            .partOfSpeech(UPDATED_PART_OF_SPEECH)
            .definitionText(UPDATED_DEFINITION_TEXT);

        restDefinitionMockMvc.perform(put("/api/definitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDefinition)))
            .andExpect(status().isOk());

        // Validate the Definition in the database
        List<Definition> definitionList = definitionRepository.findAll();
        assertThat(definitionList).hasSize(databaseSizeBeforeUpdate);
        Definition testDefinition = definitionList.get(definitionList.size() - 1);
        assertThat(testDefinition.getPartOfSpeech()).isEqualTo(UPDATED_PART_OF_SPEECH);
        assertThat(testDefinition.getDefinitionText()).isEqualTo(UPDATED_DEFINITION_TEXT);
    }

    @Test
    @Transactional
    public void updateNonExistingDefinition() throws Exception {
        int databaseSizeBeforeUpdate = definitionRepository.findAll().size();

        // Create the Definition

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restDefinitionMockMvc.perform(put("/api/definitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(definition)))
            .andExpect(status().isBadRequest());

        // Validate the Definition in the database
        List<Definition> definitionList = definitionRepository.findAll();
        assertThat(definitionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDefinition() throws Exception {
        // Initialize the database
        definitionRepository.saveAndFlush(definition);

        int databaseSizeBeforeDelete = definitionRepository.findAll().size();

        // Get the definition
        restDefinitionMockMvc.perform(delete("/api/definitions/{id}", definition.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Definition> definitionList = definitionRepository.findAll();
        assertThat(definitionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Definition.class);
        Definition definition1 = new Definition();
        definition1.setId(1L);
        Definition definition2 = new Definition();
        definition2.setId(definition1.getId());
        assertThat(definition1).isEqualTo(definition2);
        definition2.setId(2L);
        assertThat(definition1).isNotEqualTo(definition2);
        definition1.setId(null);
        assertThat(definition1).isNotEqualTo(definition2);
    }
}
