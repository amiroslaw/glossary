package ovh.miroslaw.repository;

import ovh.miroslaw.domain.Word;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Word entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WordRepository extends JpaRepository<Word, Long> {

    @Query(value = "select distinct word from Word word left join fetch word.dictionaries",
        countQuery = "select count(distinct word) from Word word")
    Page<Word> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct word from Word word left join fetch word.dictionaries")
    List<Word> findAllWithEagerRelationships();

    @Query("select word from Word word left join fetch word.dictionaries where word.id =:id")
    Optional<Word> findOneWithEagerRelationships(@Param("id") Long id);

}
