package com.lingvi.lingviserver.commons.repositories.primary;

import com.lingvi.lingviserver.commons.entities.primary.StorageFile;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StorageFileRepository extends CrudRepository<StorageFile, Long> {
}
