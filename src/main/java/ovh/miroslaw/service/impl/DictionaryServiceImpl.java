package ovh.miroslaw.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import ovh.miroslaw.domain.User;
import ovh.miroslaw.service.DictionaryService;
import ovh.miroslaw.domain.Dictionary;
import ovh.miroslaw.repository.DictionaryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ovh.miroslaw.service.UserService;
import ovh.miroslaw.service.util.FileUtil;
import ovh.miroslaw.web.rest.errors.InvalidPasswordException;


import java.io.File;
import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Dictionary.
 */
@Service
@Transactional
public class DictionaryServiceImpl implements DictionaryService {

    private final Logger log = LoggerFactory.getLogger(DictionaryServiceImpl.class);

    private final DictionaryRepository dictionaryRepository;

    private final UserService userService;

    @Autowired
    public DictionaryServiceImpl(DictionaryRepository dictionaryRepository, UserService userService) {
        this.dictionaryRepository = dictionaryRepository;
        this.userService = userService;
    }

    /**
     * Save a dictionary.
     *
     * @param dictionary the entity to save
     * @return the persisted entity
     */
    @Override
    public Dictionary save(Dictionary dictionary) {
        log.debug("Request to save Dictionary : {}", dictionary);
        addCurrentUser(dictionary);
        return dictionaryRepository.save(dictionary);
    }

    private void addCurrentUser(Dictionary dictionary) {
        if (dictionary.getUser() == null) {
            User currentUser = userService.getUserWithAuthorities().orElseThrow(RuntimeException::new);
            dictionary.setUser(currentUser);
        }
    }

    @Override
    public Optional<Dictionary> saveWordsFromFile(File file, Long dictionaryId) {
        log.debug("saveWordsFromFile dic id" + dictionaryId);
        FileUtil.printFile(file);
        Dictionary fake = new Dictionary();
        fake.setId(-1L);
        return Optional.ofNullable(fake);
    }

    /**
     * Get all the dictionaries.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Dictionary> findAll() {
        log.debug("Request to get all Dictionaries");
        return dictionaryRepository.findAll();
    }

    @Override
    public List<Dictionary> findAllUserDictionaries() {
//        Optional<Long> = userService.getUserWithAuthorities().ifPresent(User::getId);
        Long id = userService.getUserWithAuthorities().map(User::getId).orElseThrow(InvalidPasswordException::new);
        return dictionaryRepository.findAllByUserId(id);
    }

    @Override
    public List<Dictionary> findAllPublicDictionaries() {
        return dictionaryRepository.findAllByIsPrivateFalse();
    }


    /**
     * Get one dictionary by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Dictionary> findOne(Long id) {
        log.debug("Request to get Dictionary : {}", id);
        return dictionaryRepository.findById(id);
    }

    /**
     * Delete the dictionary by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Dictionary : {}", id);
        dictionaryRepository.deleteById(id);
    }

}
