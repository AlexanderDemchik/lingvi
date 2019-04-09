package com.lingvi.lingviserver.dictionary.repositories.primary;

import com.lingvi.lingviserver.dictionary.entities.primary.Image;
import com.lingvi.lingviserver.dictionary.entities.primary.Word;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends PagingAndSortingRepository<Image, Long> {
    Image findFirstByWord(Word word);
    Image findFirstByWordId(Long word);
    Slice<Image> findAllByWordId(Long word, Pageable pageable);
}
