package com.lingvi.lingviserver.dictionary.repositories.primary;

import com.lingvi.lingviserver.dictionary.entities.primary.UserWord;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserWordRepository extends CrudRepository<UserWord, Long> {
    List<UserWord> findByWordIdAndAccountId(Long wordId, Long id);
}
