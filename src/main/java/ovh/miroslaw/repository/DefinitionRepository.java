package ovh.miroslaw.repository;

import ovh.miroslaw.domain.Definition;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Definition entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DefinitionRepository extends JpaRepository<Definition, Long> {

}
