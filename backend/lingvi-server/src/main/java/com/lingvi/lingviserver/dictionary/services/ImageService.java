package com.lingvi.lingviserver.dictionary.services;

import com.lingvi.lingviserver.dictionary.entities.primary.Image;
import com.lingvi.lingviserver.dictionary.entities.primary.Word;
import com.lingvi.lingviserver.dictionary.repositories.primary.ImageRepository;
import com.lingvi.lingviserver.dictionary.repositories.primary.WordRepository;
import com.lingvi.lingviserver.dictionary.utils.StorageUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import static com.lingvi.lingviserver.commons.utils.Utils.getUserId;

@Service
public class ImageService {

    private ImageRepository imageRepository;
    private WordRepository wordRepository;
    private StorageUtil storageUtil;
    private Logger logger = LoggerFactory.getLogger(ImageService.class);

    public ImageService(ImageRepository imageRepository, WordRepository wordRepository, StorageUtil storageUtil) {
        this.imageRepository = imageRepository;
        this.wordRepository = wordRepository;
        this.storageUtil = storageUtil;
    }

    public Image create(Long wordId, MultipartFile file) {
        Word word;
        if ((word = wordRepository.findById(wordId).orElse(null)) != null) {
            Image image = storageUtil.saveWordImageToStorage(file);
            image.setWord(word);
            image.setAddedBy(getUserId());
            imageRepository.save(image);
            return image;
        }
        return null;
    }

    public Image create(Word word, byte[] imageData, String extension, Long userId) {
        try {
            Image image = storageUtil.saveWordImageToStorage(imageData, extension);
            image.setWord(word);
            image.setAddedBy(userId);
            imageRepository.save(image);
            return image;
        } catch (Exception e) {
            logger.error("Error occurred while save image to storage");
            return null;
        }
    }

    public Slice<Image> getImages(Long wordId, int page, Integer limit) {
        final int DEFAULT_LIMIT = 20;
        if (limit == null) limit = DEFAULT_LIMIT;
        return imageRepository.findAllByWordId(wordId, PageRequest.of(page, limit));
    }

    public Image getImageById(Long id) {
        return imageRepository.findById(id).orElse(null);
    }
}
