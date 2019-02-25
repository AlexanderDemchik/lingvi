package com.lingvi.lingviserver.dictionary.repositories.primary;

import com.lingvi.lingviserver.dictionary.entities.primary.Translation;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TranslationRepository extends CrudRepository<Translation, Long> {
}
