package ovh.miroslaw.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A GLUser.
 */
@Entity
@Table(name = "gl_user")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class GLUser implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @OneToMany(mappedBy = "gLUser")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Dictionary> dictionaries = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<Dictionary> getDictionaries() {
        return dictionaries;
    }

    public GLUser dictionaries(Set<Dictionary> dictionaries) {
        this.dictionaries = dictionaries;
        return this;
    }

    public GLUser addDictionaries(Dictionary dictionary) {
        this.dictionaries.add(dictionary);
        dictionary.setGLUser(this);
        return this;
    }

    public GLUser removeDictionaries(Dictionary dictionary) {
        this.dictionaries.remove(dictionary);
        dictionary.setGLUser(null);
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
        GLUser gLUser = (GLUser) o;
        if (gLUser.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gLUser.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GLUser{" +
            "id=" + getId() +
            "}";
    }
}
