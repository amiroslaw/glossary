package ovh.miroslaw.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import ovh.miroslaw.domain.*;
import ovh.miroslaw.repository.*;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.stream.Collectors;


@Component
public class GlossaryBootstrap implements CommandLineRunner {
    private final PasswordEncoder passwordEncoder;
    private final AuthorityRepository authorityRepository;
    private final UserRepository userRepository;
    private final WordRepository wordRepository;
    private final DictionaryRepository dictionaryRepository;
    private final DefinitionRepository definitionRepository;
    private final ExampleRepository exampleRepository;

    public GlossaryBootstrap(PasswordEncoder passwordEncoder, AuthorityRepository authorityRepository,
    UserRepository userRepository, WordRepository wordRepository, DictionaryRepository dictionaryRepository, DefinitionRepository definitionRepository, ExampleRepository exampleRepository){
        this.passwordEncoder = passwordEncoder;
        this.authorityRepository = authorityRepository;
        this.userRepository = userRepository;
        this.wordRepository = wordRepository;
        this.dictionaryRepository = dictionaryRepository;
        this.definitionRepository = definitionRepository;
        this.exampleRepository = exampleRepository;
        }
    @Override
    public void run(String... args) throws Exception {
        User normalUser = createUser("Hulio", "pass", "hulio", "hulio@gmail.com", true, "USER_ROLE");
        Word wordCat = getWord("cat", "kat", "http://api.wordnik.com/v4/audioFile.mp3/fa8ee00c79a4c3ca5427398962fba68afbf52b40a8e64ca29b5a91fce8c4be2f");
        wordRepository.save(wordCat);
        createExample(wordCat, "cat is an animal");
        createDefinition(wordCat, "noun", "definitionText");
        createDictionary(normalUser, "title", true, wordCat);
    }

    private void createDictionary(User user, String title, boolean isPublic, Word... words) {
        Dictionary dictionary = new Dictionary();
        dictionary.setUser(user);
        dictionary.setTitle(title);
        dictionary.setIsPublic(isPublic);
        dictionary.setWords(Arrays.stream(words).collect(Collectors.toSet()));
        dictionaryRepository.save(dictionary);
    }

    private void createDefinition(Word word, String partOfSpeech, String definitionText) {
        Definition definition = new Definition();
        definition.setWord(word);
        definition.setPartOfSpeech(partOfSpeech);
        definition.setDefinitionText(definitionText);
        definitionRepository.save(definition);
    }

    private void createExample(Word word, String exampleText) {
        Example example = new Example();
        example.setWord(word);
        example.setExampleText(exampleText);
        exampleRepository.save(example);
    }

    private Word getWord(String headword, String pronunciation, String audioURL){
        Word word = new Word();
        word.setHeadword(headword);
        word.pronunciation(pronunciation);
        word.audioURL(audioURL);
        return word;
    }
    private User createUser(String name, String pass, String login, String email, boolean isActivated, String user_role) {
        User user = new User();
        user.setFirstName(name);
        user.setPassword(passwordEncoder.encode(pass));
        user.setLogin(login);
        user.setEmail(email);
        user.setActivated(isActivated);
        Authority auth = new Authority();
        auth.setName(user_role);
        authorityRepository.save(auth);
        user.setAuthorities(new HashSet<Authority>(Collections.singleton(auth)));
        return userRepository.save(user);
    }
}
