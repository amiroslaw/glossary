package ovh.miroslaw.web.rest;

import com.codahale.metrics.annotation.Timed;
import ovh.miroslaw.domain.Example;
import ovh.miroslaw.repository.ExampleRepository;
import ovh.miroslaw.web.rest.errors.BadRequestAlertException;
import ovh.miroslaw.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Example.
 */
@RestController
@RequestMapping("/api")
public class ExampleResource {

    private final Logger log = LoggerFactory.getLogger(ExampleResource.class);

    private static final String ENTITY_NAME = "example";

    private final ExampleRepository exampleRepository;

    public ExampleResource(ExampleRepository exampleRepository) {
        this.exampleRepository = exampleRepository;
    }

    /**
     * POST  /examples : Create a new example.
     *
     * @param example the example to create
     * @return the ResponseEntity with status 201 (Created) and with body the new example, or with status 400 (Bad Request) if the example has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/examples")
    @Timed
    public ResponseEntity<Example> createExample(@Valid @RequestBody Example example) throws URISyntaxException {
        log.debug("REST request to save Example : {}", example);
        if (example.getId() != null) {
            throw new BadRequestAlertException("A new example cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Example result = exampleRepository.save(example);
        return ResponseEntity.created(new URI("/api/examples/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /examples : Updates an existing example.
     *
     * @param example the example to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated example,
     * or with status 400 (Bad Request) if the example is not valid,
     * or with status 500 (Internal Server Error) if the example couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/examples")
    @Timed
    public ResponseEntity<Example> updateExample(@Valid @RequestBody Example example) throws URISyntaxException {
        log.debug("REST request to update Example : {}", example);
        if (example.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Example result = exampleRepository.save(example);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, example.getId().toString()))
            .body(result);
    }

    /**
     * GET  /examples : get all the examples.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of examples in body
     */
    @GetMapping("/examples")
    @Timed
    public List<Example> getAllExamples() {
        log.debug("REST request to get all Examples");
        return exampleRepository.findAll();
    }

    /**
     * GET  /examples/:id : get the "id" example.
     *
     * @param id the id of the example to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the example, or with status 404 (Not Found)
     */
    @GetMapping("/examples/{id}")
    @Timed
    public ResponseEntity<Example> getExample(@PathVariable Long id) {
        log.debug("REST request to get Example : {}", id);
        Optional<Example> example = exampleRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(example);
    }

    /**
     * DELETE  /examples/:id : delete the "id" example.
     *
     * @param id the id of the example to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/examples/{id}")
    @Timed
    public ResponseEntity<Void> deleteExample(@PathVariable Long id) {
        log.debug("REST request to delete Example : {}", id);

        exampleRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
