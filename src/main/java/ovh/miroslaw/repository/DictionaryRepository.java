package ovh.miroslaw.repository;

import ovh.miroslaw.domain.Dictionary;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the Dictionary entity.
 */
//@SuppressWarnings("unused")
@Repository
public interface DictionaryRepository extends JpaRepository<Dictionary, Long> {
    List<Dictionary> findAllByUserId(Long userID);
    List<Dictionary> findAllByIsPrivateFalse();
}
