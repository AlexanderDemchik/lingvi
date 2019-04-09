package com.lingvi.lingviserver.dictionary.controllers;

import com.lingvi.lingviserver.dictionary.config.ControllerPaths;
import com.lingvi.lingviserver.dictionary.entities.primary.Image;
import com.lingvi.lingviserver.dictionary.services.ImageService;
import org.springframework.data.domain.Slice;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(ControllerPaths.DICTIONARY)
public class ImageController {

    private ImageService imageService;

    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @PostMapping(ControllerPaths.WORD + "/{id}" + ControllerPaths.IMAGE)
    public Image addImageToWord(@PathVariable Long id, @RequestParam("image") MultipartFile image) {
        return imageService.create(id, image);
    }

    @GetMapping(ControllerPaths.WORD + "/{id}" + ControllerPaths.IMAGE)
    public Slice<Image> getImagesSlice(@PathVariable Long id, @RequestParam("page") int page, @RequestParam(name = "limit", required = false) Integer limit) {
        return imageService.getImages(id, page, limit);
    }
}
