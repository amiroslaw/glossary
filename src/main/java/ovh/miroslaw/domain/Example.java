package ovh.miroslaw.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Example.
 */
@Entity
@Table(name = "example")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Example implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "example_text", nullable = false)
    private String exampleText;

    @ManyToOne
    @JsonIgnoreProperties("examples")
    private Word word;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getExampleText() {
        return exampleText;
    }

    public Example exampleText(String exampleText) {
        this.exampleText = exampleText;
        return this;
    }

    public void setExampleText(String exampleText) {
        this.exampleText = exampleText;
    }

    public Word getWord() {
        return word;
    }

    public Example word(Word word) {
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
        Example example = (Example) o;
        if (example.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), example.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Example{" +
            "id=" + getId() +
            ", exampleText='" + getExampleText() + "'" +
            "}";
    }
}
