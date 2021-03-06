package com.lingvi.lingviserver.dictionary.repositories.primary;

import com.lingvi.lingviserver.commons.entities.Language;
import com.lingvi.lingviserver.dictionary.entities.primary.Word;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WordRepository extends CrudRepository<Word, Long> {
    Word findByTextIgnoreCaseAndLanguage(String text, Language language);
    List<Word> findAllByLanguage(Language language);
}
