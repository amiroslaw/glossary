package ovh.miroslaw.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Word.
 */
@Entity
@Table(name = "word")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Word implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(max = 50)
    @Column(name = "headword", length = 50, nullable = false)
    private String headword;

    @Size(max = 50)
    @Column(name = "pronuncation", length = 50)
    private String pronuncation;

    @Size(max = 50)
    @Column(name = "audio_url", length = 50)
    private String audioURL;

    @OneToMany(mappedBy = "word")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Example> examples = new HashSet<>();

    @OneToMany(mappedBy = "word")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Definition> definitions = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "word_dictionaries",
               joinColumns = @JoinColumn(name = "words_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "dictionaries_id", referencedColumnName = "id"))
    private Set<Dictionary> dictionaries = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getHeadword() {
        return headword;
    }

    public Word headword(String headword) {
        this.headword = headword;
        return this;
    }

    public void setHeadword(String headword) {
        this.headword = headword;
    }

    public String getPronuncation() {
        return pronuncation;
    }

    public Word pronuncation(String pronuncation) {
        this.pronuncation = pronuncation;
        return this;
    }

    public void setPronuncation(String pronuncation) {
        this.pronuncation = pronuncation;
    }

    public String getAudioURL() {
        return audioURL;
    }

    public Word audioURL(String audioURL) {
        this.audioURL = audioURL;
        return this;
    }

    public void setAudioURL(String audioURL) {
        this.audioURL = audioURL;
    }

    public Set<Example> getExamples() {
        return examples;
    }

    public Word examples(Set<Example> examples) {
        this.examples = examples;
        return this;
    }

    public Word addExample(Example example) {
        this.examples.add(example);
        example.setWord(this);
        return this;
    }

    public Word removeExample(Example example) {
        this.examples.remove(example);
        example.setWord(null);
        return this;
    }

    public void setExamples(Set<Example> examples) {
        this.examples = examples;
    }

    public Set<Definition> getDefinitions() {
        return definitions;
    }

    public Word definitions(Set<Definition> definitions) {
        this.definitions = definitions;
        return this;
    }

    public Word addDefinition(Definition definition) {
        this.definitions.add(definition);
        definition.setWord(this);
        return this;
    }

    public Word removeDefinition(Definition definition) {
        this.definitions.remove(definition);
        definition.setWord(null);
        return this;
    }

    public void setDefinitions(Set<Definition> definitions) {
        this.definitions = definitions;
    }

    public Set<Dictionary> getDictionaries() {
        return dictionaries;
    }

    public Word dictionaries(Set<Dictionary> dictionaries) {
        this.dictionaries = dictionaries;
        return this;
    }

    public Word addDictionaries(Dictionary dictionary) {
        this.dictionaries.add(dictionary);
        dictionary.getWords().add(this);
        return this;
    }

    public Word removeDictionaries(Dictionary dictionary) {
        this.dictionaries.remove(dictionary);
        dictionary.getWords().remove(this);
        return this;
    }

    public void setDictionaries(Set<Dictionary> dictionaries) {
        this.dictionaries = dictionaries;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Word word = (Word) o;
        if (word.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), word.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Word{" +
            "id=" + getId() +
            ", headword='" + getHeadword() + "'" +
            ", pronuncation='" + getPronuncation() + "'" +
            ", audioURL='" + getAudioURL() + "'" +
            "}";
    }
}
