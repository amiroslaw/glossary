package ovh.miroslaw.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonSetter;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Definition.
 */
@Entity
@Table(name = "definition")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Definition implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(max = 20)
    @Column(name = "part_of_speech", length = 20, nullable = false)
    private String partOfSpeech;

    @NotNull
    @Column(name = "definition_text", nullable = false)
//    @JsonProperty("text")
    private String definitionText;

    @ManyToOne
    @JsonIgnoreProperties("definitions")
    @JsonIgnore
    private Word word;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPartOfSpeech() {
        return partOfSpeech;
    }

    public Definition partOfSpeech(String partOfSpeech) {
        this.partOfSpeech = partOfSpeech;
        return this;
    }

    public void setPartOfSpeech(String partOfSpeech) {
        this.partOfSpeech = partOfSpeech;
    }

    public String getDefinitionText() {
        return definitionText;
    }

    public Definition definitionText(String definitionText) {
        this.definitionText = definitionText;
        return this;
    }
    @JsonSetter("text")
    public void setDefinitionText(String definitionText) {
        this.definitionText = definitionText;
    }

    public Word getWord() {
        return word;
    }

    public Definition word(Word word) {
        this.word = word;
        return this;
    }

    public void setWord(Word word) {
        this.word = word;
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
        Definition definition = (Definition) o;
        if (definition.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), definition.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Definition{" +
            "id=" + getId() +
            ", partOfSpeech='" + getPartOfSpeech() + "'" +
            ", definitionText='" + getDefinitionText() + "'" +
            "}";
    }
}
