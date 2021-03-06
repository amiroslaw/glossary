package ovh.miroslaw.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Dictionary.
 */
@Entity
@Table(name = "dictionary")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Dictionary implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "is_private")
    private Boolean isPrivate;

    @ManyToOne
    @JsonIgnoreProperties("dictionaries")
    private User user;

    @ManyToMany(mappedBy = "dictionaries")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Word> words = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Dictionary title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Boolean getIsPrivate() {
        return isPrivate;
    }

    public Dictionary isPrivate(Boolean isPrivate) {
        this.isPrivate = isPrivate;
        return this;
    }

    public void setIsPrivate(Boolean isPrivate) {
        this.isPrivate = isPrivate;
    }

    public User getUser() {
        return user;
    }

    public Dictionary user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Word> getWords() {
        return words;
    }

    public Dictionary words(Set<Word> words) {
        this.words = words;
        return this;
    }

    public Dictionary addWord(Word word) {
        this.words.add(word);
        word.getDictionaries().add(this);
        return this;
    }

    public Dictionary removeWord(Word word) {
        this.words.remove(word);
        word.getDictionaries().remove(this);
        return this;
    }

    public void setWords(Set<Word> words) {
        this.words = words;
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
        Dictionary dictionary = (Dictionary) o;
        if (dictionary.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), dictionary.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Dictionary{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", isPrivate='" + getIsPrivate() + "'" +
            "}";
    }
}
