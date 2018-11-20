package ovh.miroslaw.web.rest;

import com.codahale.metrics.annotation.Timed;
import ovh.miroslaw.domain.GLUser;
import ovh.miroslaw.repository.GLUserRepository;
import ovh.miroslaw.web.rest.errors.BadRequestAlertException;
import ovh.miroslaw.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing GLUser.
 */
@RestController
@RequestMapping("/api")
public class GLUserResource {

    private final Logger log = LoggerFactory.getLogger(GLUserResource.class);

    private static final String ENTITY_NAME = "gLUser";

    private final GLUserRepository gLUserRepository;

    public GLUserResource(GLUserRepository gLUserRepository) {
        this.gLUserRepository = gLUserRepository;
    }

    /**
     * POST  /gl-users : Create a new gLUser.
     *
     * @param gLUser the gLUser to create
     * @return the ResponseEntity with status 201 (Created) and with body the new gLUser, or with status 400 (Bad Request) if the gLUser has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/gl-users")
    @Timed
    public ResponseEntity<GLUser> createGLUser(@RequestBody GLUser gLUser) throws URISyntaxException {
        log.debug("REST request to save GLUser : {}", gLUser);
        if (gLUser.getId() != null) {
            throw new BadRequestAlertException("A new gLUser cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GLUser result = gLUserRepository.save(gLUser);
        return ResponseEntity.created(new URI("/api/gl-users/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /gl-users : Updates an existing gLUser.
     *
     * @param gLUser the gLUser to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated gLUser,
     * or with status 400 (Bad Request) if the gLUser is not valid,
     * or with status 500 (Internal Server Error) if the gLUser couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/gl-users")
    @Timed
    public ResponseEntity<GLUser> updateGLUser(@RequestBody GLUser gLUser) throws URISyntaxException {
        log.debug("REST request to update GLUser : {}", gLUser);
        if (gLUser.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GLUser result = gLUserRepository.save(gLUser);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, gLUser.getId().toString()))
            .body(result);
    }

    /**
     * GET  /gl-users : get all the gLUsers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of gLUsers in body
     */
    @GetMapping("/gl-users")
    @Timed
    public List<GLUser> getAllGLUsers() {
        log.debug("REST request to get all GLUsers");
        return gLUserRepository.findAll();
    }

    /**
     * GET  /gl-users/:id : get the "id" gLUser.
     *
     * @param id the id of the gLUser to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the gLUser, or with status 404 (Not Found)
     */
    @GetMapping("/gl-users/{id}")
    @Timed
    public ResponseEntity<GLUser> getGLUser(@PathVariable Long id) {
        log.debug("REST request to get GLUser : {}", id);
        Optional<GLUser> gLUser = gLUserRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(gLUser);
    }

    /**
     * DELETE  /gl-users/:id : delete the "id" gLUser.
     *
     * @param id the id of the gLUser to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/gl-users/{id}")
    @Timed
    public ResponseEntity<Void> deleteGLUser(@PathVariable Long id) {
        log.debug("REST request to delete GLUser : {}", id);

        gLUserRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
