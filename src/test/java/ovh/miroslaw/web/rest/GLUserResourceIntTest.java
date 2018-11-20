package ovh.miroslaw.web.rest;

import ovh.miroslaw.GlossaryApp;

import ovh.miroslaw.domain.GLUser;
import ovh.miroslaw.repository.GLUserRepository;
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
 * Test class for the GLUserResource REST controller.
 *
 * @see GLUserResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GlossaryApp.class)
public class GLUserResourceIntTest {

    @Autowired
    private GLUserRepository gLUserRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGLUserMockMvc;

    private GLUser gLUser;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GLUserResource gLUserResource = new GLUserResource(gLUserRepository);
        this.restGLUserMockMvc = MockMvcBuilders.standaloneSetup(gLUserResource)
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
    public static GLUser createEntity(EntityManager em) {
        GLUser gLUser = new GLUser();
        return gLUser;
    }

    @Before
    public void initTest() {
        gLUser = createEntity(em);
    }

    @Test
    @Transactional
    public void createGLUser() throws Exception {
        int databaseSizeBeforeCreate = gLUserRepository.findAll().size();

        // Create the GLUser
        restGLUserMockMvc.perform(post("/api/gl-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gLUser)))
            .andExpect(status().isCreated());

        // Validate the GLUser in the database
        List<GLUser> gLUserList = gLUserRepository.findAll();
        assertThat(gLUserList).hasSize(databaseSizeBeforeCreate + 1);
        GLUser testGLUser = gLUserList.get(gLUserList.size() - 1);
    }

    @Test
    @Transactional
    public void createGLUserWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gLUserRepository.findAll().size();

        // Create the GLUser with an existing ID
        gLUser.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGLUserMockMvc.perform(post("/api/gl-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gLUser)))
            .andExpect(status().isBadRequest());

        // Validate the GLUser in the database
        List<GLUser> gLUserList = gLUserRepository.findAll();
        assertThat(gLUserList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllGLUsers() throws Exception {
        // Initialize the database
        gLUserRepository.saveAndFlush(gLUser);

        // Get all the gLUserList
        restGLUserMockMvc.perform(get("/api/gl-users?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gLUser.getId().intValue())));
    }
    

    @Test
    @Transactional
    public void getGLUser() throws Exception {
        // Initialize the database
        gLUserRepository.saveAndFlush(gLUser);

        // Get the gLUser
        restGLUserMockMvc.perform(get("/api/gl-users/{id}", gLUser.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(gLUser.getId().intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingGLUser() throws Exception {
        // Get the gLUser
        restGLUserMockMvc.perform(get("/api/gl-users/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGLUser() throws Exception {
        // Initialize the database
        gLUserRepository.saveAndFlush(gLUser);

        int databaseSizeBeforeUpdate = gLUserRepository.findAll().size();

        // Update the gLUser
        GLUser updatedGLUser = gLUserRepository.findById(gLUser.getId()).get();
        // Disconnect from session so that the updates on updatedGLUser are not directly saved in db
        em.detach(updatedGLUser);

        restGLUserMockMvc.perform(put("/api/gl-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedGLUser)))
            .andExpect(status().isOk());

        // Validate the GLUser in the database
        List<GLUser> gLUserList = gLUserRepository.findAll();
        assertThat(gLUserList).hasSize(databaseSizeBeforeUpdate);
        GLUser testGLUser = gLUserList.get(gLUserList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingGLUser() throws Exception {
        int databaseSizeBeforeUpdate = gLUserRepository.findAll().size();

        // Create the GLUser

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restGLUserMockMvc.perform(put("/api/gl-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gLUser)))
            .andExpect(status().isBadRequest());

        // Validate the GLUser in the database
        List<GLUser> gLUserList = gLUserRepository.findAll();
        assertThat(gLUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGLUser() throws Exception {
        // Initialize the database
        gLUserRepository.saveAndFlush(gLUser);

        int databaseSizeBeforeDelete = gLUserRepository.findAll().size();

        // Get the gLUser
        restGLUserMockMvc.perform(delete("/api/gl-users/{id}", gLUser.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<GLUser> gLUserList = gLUserRepository.findAll();
        assertThat(gLUserList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GLUser.class);
        GLUser gLUser1 = new GLUser();
        gLUser1.setId(1L);
        GLUser gLUser2 = new GLUser();
        gLUser2.setId(gLUser1.getId());
        assertThat(gLUser1).isEqualTo(gLUser2);
        gLUser2.setId(2L);
        assertThat(gLUser1).isNotEqualTo(gLUser2);
        gLUser1.setId(null);
        assertThat(gLUser1).isNotEqualTo(gLUser2);
    }
}
