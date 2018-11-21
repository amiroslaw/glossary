package ovh.miroslaw.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(ovh.miroslaw.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(ovh.miroslaw.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(ovh.miroslaw.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(ovh.miroslaw.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(ovh.miroslaw.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(ovh.miroslaw.domain.User.class.getName() + ".dictionaries", jcacheConfiguration);
            cm.createCache(ovh.miroslaw.domain.Dictionary.class.getName(), jcacheConfiguration);
            cm.createCache(ovh.miroslaw.domain.Dictionary.class.getName() + ".words", jcacheConfiguration);
            cm.createCache(ovh.miroslaw.domain.Word.class.getName(), jcacheConfiguration);
            cm.createCache(ovh.miroslaw.domain.Word.class.getName() + ".examples", jcacheConfiguration);
            cm.createCache(ovh.miroslaw.domain.Word.class.getName() + ".definitions", jcacheConfiguration);
            cm.createCache(ovh.miroslaw.domain.Word.class.getName() + ".dictionaries", jcacheConfiguration);
            cm.createCache(ovh.miroslaw.domain.Example.class.getName(), jcacheConfiguration);
            cm.createCache(ovh.miroslaw.domain.Definition.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
