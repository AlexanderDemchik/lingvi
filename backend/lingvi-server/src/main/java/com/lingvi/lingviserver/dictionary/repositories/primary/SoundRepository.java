package com.lingvi.lingviserver.dictionary.repositories.primary;

import com.lingvi.lingviserver.dictionary.entities.SoundType;
import com.lingvi.lingviserver.dictionary.entities.primary.Sound;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SoundRepository extends CrudRepository<Sound, Long> {
    Sound findTop1ByWordIdAndSoundType(Long wordId, SoundType soundType);
}
