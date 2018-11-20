package ovh.miroslaw.repository;

import ovh.miroslaw.domain.GLUser;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the GLUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GLUserRepository extends JpaRepository<GLUser, Long> {

}
