package com.lingvi.lingviserver.dictionary.repositories.primary;

import com.lingvi.lingviserver.dictionary.entities.primary.Image;
import com.lingvi.lingviserver.dictionary.entities.primary.Word;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends CrudRepository<Image, Long> {
    Image findFirstByWord(Word word);
}
