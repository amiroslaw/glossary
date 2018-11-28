package ovh.miroslaw.service.impl;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import ovh.miroslaw.domain.Definition;
import ovh.miroslaw.service.DictionaryProviderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ovh.miroslaw.service.dto.WordAudioJson;
import ovh.miroslaw.service.util.CollectionUtil;

import java.io.IOException;
import java.util.*;

import static java.util.stream.Collectors.toSet;

@Service
@Transactional
public class WordnikProviderService implements DictionaryProviderService {

    private final Logger log = LoggerFactory.getLogger(WordnikProviderService.class);

    private final String API_KEY = "e462dcde8318166a3900a0496510b1d406ba6cfb11a0bdc26";

    public void saveWord(final String word) {
        Set<Definition> definitions = getDefinitions(word);
        log.info("definitions " + definitions);

        log.info(getAudioURL(word));
        String wordExample  = getExample(word);
        log.info("example "+ wordExample);
    }

    private String getExample(String word) {
        final String uri = "https://api.wordnik.com/v4/word.json/" + word + "/topExample?useCanonical=true&api_key=" + API_KEY;
        String result = null;
        try {
            RestTemplate restTemplate = restTemplate = new RestTemplate();
             result = restTemplate.getForObject(uri, String.class);
        } catch (final HttpClientErrorException e) {
            return "";
        }
        String example = "";
        try {
            JsonNode jsonNode = new ObjectMapper().readTree(result);
            JsonNode textNode = jsonNode.get("text");
            example = textNode.textValue();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return example;
    }

    private Set<Definition> getDefinitions(String word) {
        //get with id null
        String definitionUrlSuffix = "/definitions?limit=200&includeRelated=false&useCanonical=true&includeTags=false&api_key=";
        TypeReference<List<Definition>> typeReference = new TypeReference<List<Definition>>() {
        };
        final List<Definition> definitions = getListFromJson(word, definitionUrlSuffix, typeReference);
        return removePartOfSpeechRepetitions(definitions);
    }

    private Set<Definition> removePartOfSpeechRepetitions(List<Definition> definitions) {
        return definitions.stream()
            .filter(CollectionUtil.distinctByKey(Definition::getPartOfSpeech)).collect(toSet());
    }

    private String getAudioURL(String word) {
        String audioUrlSuffix = "/audio?useCanonical=true&limit=1&api_key=";
        TypeReference<List<WordAudioJson>> typeReference = new TypeReference<List<WordAudioJson>>() {
        };
        List<WordAudioJson> audioURLs = getListFromJson(word, audioUrlSuffix, typeReference);
        final boolean exist = audioURLs.size() >= 1;
        return exist ? audioURLs.get(0).getFileUrl() : "";
    }

    private <T> List<T> getListFromJson(String word, String suffix, TypeReference<List<T>> typeReference) {
        final String uri = "https://api.wordnik.com/v4/word.json/" + word + suffix + API_KEY;

        RestTemplate restTemplate = new RestTemplate();
        final String restResult = restTemplate.getForObject(uri, String.class);
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        List<T> audioJSONs = new ArrayList<>();
        try {
            audioJSONs = mapper.readValue(restResult, typeReference);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return audioJSONs;
    }


}
