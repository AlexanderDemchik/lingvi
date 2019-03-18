package com.lingvi.lingviserver.dictionary.repositories.primary;

import com.lingvi.lingviserver.commons.entities.Language;
import com.lingvi.lingviserver.dictionary.entities.primary.UserWord;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserWordRepository extends PagingAndSortingRepository<UserWord, Long> {
    UserWord findByWordIdAndWordLanguageAndAccountId(Long wordId, Language language, Long accId);
    Slice<UserWord> findByAccountId(Long id, Pageable pageable);

    @Query("select id from user_dictionary")
    List<Long> findAllIds();
}
