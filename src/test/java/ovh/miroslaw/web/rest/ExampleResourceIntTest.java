package ovh.miroslaw.web.rest;

import ovh.miroslaw.GlossaryApp;

import ovh.miroslaw.domain.Example;
import ovh.miroslaw.repository.ExampleRepository;
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
 * Test class for the ExampleResource REST controller.
 *
 * @see ExampleResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GlossaryApp.class)
public class ExampleResourceIntTest {

    private static final String DEFAULT_EXAMPLE_TEXT = "AAAAAAAAAA";
    private static final String UPDATED_EXAMPLE_TEXT = "BBBBBBBBBB";

    @Autowired
    private ExampleRepository exampleRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restExampleMockMvc;

    private Example example;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ExampleResource exampleResource = new ExampleResource(exampleRepository);
        this.restExampleMockMvc = MockMvcBuilders.standaloneSetup(exampleResource)
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
    public static Example createEntity(EntityManager em) {
        Example example = new Example()
            .exampleText(DEFAULT_EXAMPLE_TEXT);
        return example;
    }

    @Before
    public void initTest() {
        example = createEntity(em);
    }

    @Test
    @Transactional
    public void createExample() throws Exception {
        int databaseSizeBeforeCreate = exampleRepository.findAll().size();

        // Create the Example
        restExampleMockMvc.perform(post("/api/examples")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(example)))
            .andExpect(status().isCreated());

        // Validate the Example in the database
        List<Example> exampleList = exampleRepository.findAll();
        assertThat(exampleList).hasSize(databaseSizeBeforeCreate + 1);
        Example testExample = exampleList.get(exampleList.size() - 1);
        assertThat(testExample.getExampleText()).isEqualTo(DEFAULT_EXAMPLE_TEXT);
    }

    @Test
    @Transactional
    public void createExampleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = exampleRepository.findAll().size();

        // Create the Example with an existing ID
        example.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restExampleMockMvc.perform(post("/api/examples")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(example)))
            .andExpect(status().isBadRequest());

        // Validate the Example in the database
        List<Example> exampleList = exampleRepository.findAll();
        assertThat(exampleList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkExampleTextIsRequired() throws Exception {
        int databaseSizeBeforeTest = exampleRepository.findAll().size();
        // set the field null
        example.setExampleText(null);

        // Create the Example, which fails.

        restExampleMockMvc.perform(post("/api/examples")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(example)))
            .andExpect(status().isBadRequest());

        List<Example> exampleList = exampleRepository.findAll();
        assertThat(exampleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllExamples() throws Exception {
        // Initialize the database
        exampleRepository.saveAndFlush(example);

        // Get all the exampleList
        restExampleMockMvc.perform(get("/api/examples?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(example.getId().intValue())))
            .andExpect(jsonPath("$.[*].exampleText").value(hasItem(DEFAULT_EXAMPLE_TEXT.toString())));
    }
    

    @Test
    @Transactional
    public void getExample() throws Exception {
        // Initialize the database
        exampleRepository.saveAndFlush(example);

        // Get the example
        restExampleMockMvc.perform(get("/api/examples/{id}", example.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(example.getId().intValue()))
            .andExpect(jsonPath("$.exampleText").value(DEFAULT_EXAMPLE_TEXT.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingExample() throws Exception {
        // Get the example
        restExampleMockMvc.perform(get("/api/examples/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateExample() throws Exception {
        // Initialize the database
        exampleRepository.saveAndFlush(example);

        int databaseSizeBeforeUpdate = exampleRepository.findAll().size();

        // Update the example
        Example updatedExample = exampleRepository.findById(example.getId()).get();
        // Disconnect from session so that the updates on updatedExample are not directly saved in db
        em.detach(updatedExample);
        updatedExample
            .exampleText(UPDATED_EXAMPLE_TEXT);

        restExampleMockMvc.perform(put("/api/examples")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedExample)))
            .andExpect(status().isOk());

        // Validate the Example in the database
        List<Example> exampleList = exampleRepository.findAll();
        assertThat(exampleList).hasSize(databaseSizeBeforeUpdate);
        Example testExample = exampleList.get(exampleList.size() - 1);
        assertThat(testExample.getExampleText()).isEqualTo(UPDATED_EXAMPLE_TEXT);
    }

    @Test
    @Transactional
    public void updateNonExistingExample() throws Exception {
        int databaseSizeBeforeUpdate = exampleRepository.findAll().size();

        // Create the Example

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restExampleMockMvc.perform(put("/api/examples")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(example)))
            .andExpect(status().isBadRequest());

        // Validate the Example in the database
        List<Example> exampleList = exampleRepository.findAll();
        assertThat(exampleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteExample() throws Exception {
        // Initialize the database
        exampleRepository.saveAndFlush(example);

        int databaseSizeBeforeDelete = exampleRepository.findAll().size();

        // Get the example
        restExampleMockMvc.perform(delete("/api/examples/{id}", example.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Example> exampleList = exampleRepository.findAll();
        assertThat(exampleList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Example.class);
        Example example1 = new Example();
        example1.setId(1L);
        Example example2 = new Example();
        example2.setId(example1.getId());
        assertThat(example1).isEqualTo(example2);
        example2.setId(2L);
        assertThat(example1).isNotEqualTo(example2);
        example1.setId(null);
        assertThat(example1).isNotEqualTo(example2);
    }
}
