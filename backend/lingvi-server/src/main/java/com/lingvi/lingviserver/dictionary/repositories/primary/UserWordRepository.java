package com.lingvi.lingviserver.dictionary.repositories.primary;

import com.lingvi.lingviserver.commons.entities.Language;
import com.lingvi.lingviserver.dictionary.entities.UserDictMeta;
import com.lingvi.lingviserver.dictionary.entities.primary.UserWord;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserWordRepository extends PagingAndSortingRepository<UserWord, Long> {
    UserWord findByWordIdAndWordLanguageAndTranslationLanguageAndAccountId(Long wordId, Language wordLanguage, Language trLanguage, Long accId);
    Slice<UserWord> findByAccountIdAndWordTextLikeAndWordLanguageAndTranslationLanguage(Long id, String text, Language wordLanguage, Language translationLanguage, Pageable pageable);
    void deleteByIdAndAccountId(Long id, Long accId);

    @Query("select id from user_dictionary as d where d.word.text like %?1% and d.word.language = ?2 and d.translationLanguage = ?3 and accountid = ?4")
    List<Long> findAllIds(String text, Language wordLanguage, Language trLanguage, Long accId);

    @Query(value = "select language as FROM, translation_language as TO, count(*) as num from user_dictionary, dictionary where user_dictionary.word_id = dictionary.id and accountid = ?1 group by language, translation_language", nativeQuery = true)
    List<UserDictMeta> getDictionaryMeta(Long accountId);
}
