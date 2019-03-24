package com.lingvi.lingviserver.dictionary.repositories.primary;

import com.lingvi.lingviserver.commons.entities.Language;
import com.lingvi.lingviserver.dictionary.entities.TranslationSource;
import com.lingvi.lingviserver.dictionary.entities.primary.Translation;
import com.lingvi.lingviserver.dictionary.entities.primary.Word;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TranslationRepository extends CrudRepository<Translation, Long> {
    List<Translation> findTop5ByWordOrderByPopularityDesc(Word word);
    List<Translation> findByWordAndSourceIn(Word word, List<TranslationSource> sources);
    List<Translation> findByWordAndLanguageAndSourceIn(Word word, Language language, List<TranslationSource> sources);
}
