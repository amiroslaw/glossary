package ovh.miroslaw.web.rest;

import com.codahale.metrics.annotation.Timed;
import ovh.miroslaw.domain.Definition;
import ovh.miroslaw.repository.DefinitionRepository;
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
 * REST controller for managing Definition.
 */
@RestController
@RequestMapping("/api")
public class DefinitionResource {

    private final Logger log = LoggerFactory.getLogger(DefinitionResource.class);

    private static final String ENTITY_NAME = "definition";

    private final DefinitionRepository definitionRepository;

    public DefinitionResource(DefinitionRepository definitionRepository) {
        this.definitionRepository = definitionRepository;
    }

    /**
     * POST  /definitions : Create a new definition.
     *
     * @param definition the definition to create
     * @return the ResponseEntity with status 201 (Created) and with body the new definition, or with status 400 (Bad Request) if the definition has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/definitions")
    @Timed
    public ResponseEntity<Definition> createDefinition(@Valid @RequestBody Definition definition) throws URISyntaxException {
        log.debug("REST request to save Definition : {}", definition);
        if (definition.getId() != null) {
            throw new BadRequestAlertException("A new definition cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Definition result = definitionRepository.save(definition);
        return ResponseEntity.created(new URI("/api/definitions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /definitions : Updates an existing definition.
     *
     * @param definition the definition to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated definition,
     * or with status 400 (Bad Request) if the definition is not valid,
     * or with status 500 (Internal Server Error) if the definition couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/definitions")
    @Timed
    public ResponseEntity<Definition> updateDefinition(@Valid @RequestBody Definition definition) throws URISyntaxException {
        log.debug("REST request to update Definition : {}", definition);
        if (definition.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Definition result = definitionRepository.save(definition);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, definition.getId().toString()))
            .body(result);
    }

    /**
     * GET  /definitions : get all the definitions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of definitions in body
     */
    @GetMapping("/definitions")
    @Timed
    public List<Definition> getAllDefinitions() {
        log.debug("REST request to get all Definitions");
        return definitionRepository.findAll();
    }

    /**
     * GET  /definitions/:id : get the "id" definition.
     *
     * @param id the id of the definition to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the definition, or with status 404 (Not Found)
     */
    @GetMapping("/definitions/{id}")
    @Timed
    public ResponseEntity<Definition> getDefinition(@PathVariable Long id) {
        log.debug("REST request to get Definition : {}", id);
        Optional<Definition> definition = definitionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(definition);
    }

    /**
     * DELETE  /definitions/:id : delete the "id" definition.
     *
     * @param id the id of the definition to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/definitions/{id}")
    @Timed
    public ResponseEntity<Void> deleteDefinition(@PathVariable Long id) {
        log.debug("REST request to delete Definition : {}", id);

        definitionRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
