package com.lingvi.lingviserver.dictionary.repositories.primary;

import com.lingvi.lingviserver.commons.entities.Language;
import com.lingvi.lingviserver.dictionary.entities.UserDictMeta;
import com.lingvi.lingviserver.dictionary.entities.primary.DictionaryMeta;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DictionaryMetaRepository extends CrudRepository<DictionaryMeta, Long> {
    List<DictionaryMeta> getByUserId(Long userId);
    DictionaryMeta findByUserIdAndFromAndTo(Long userId, Language from, Language to);

    @Query(value = "select language as FROM, translation_language as TO, count(*) as num from user_dictionary, dictionary where user_dictionary.word_id = dictionary.id and accountid = ?1 group by language, translation_language", nativeQuery = true)
    List<UserDictMeta> getDictionaryMeta(Long accountId);
}
