package ovh.miroslaw.service;

import ovh.miroslaw.domain.Dictionary;

import java.io.File;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Dictionary.
 */
public interface DictionaryService {

    /**
     * Save a dictionary.
     *
     * @param dictionary the entity to save
     * @return the persisted entity
     */
    Dictionary save(Dictionary dictionary);

    /**
     * Get all the dictionaries.
     *
     * @return the list of entities
     */
    List<Dictionary> findAll();


    /**
     * Get the "id" dictionary.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Dictionary> findOne(Long id);

    /**
     * Delete the "id" dictionary.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    List<Dictionary> findAllUserDictionaries();

    List<Dictionary> findAllPublicDictionaries();

    Optional<Dictionary> saveWordsFromFile(File convertToFile, Long dictionaryId);
}
