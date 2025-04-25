package lumora.tableBite.menuManagement.service.impl;

import lombok.RequiredArgsConstructor;
import lumora.tableBite.menuManagement.dto.ImageDTO;
import lumora.tableBite.menuManagement.entity.Food;
import lumora.tableBite.menuManagement.entity.Image;
import lumora.tableBite.menuManagement.exception.ResourceNotFoundException;
import lumora.tableBite.menuManagement.repo.ImageRepo;
import lumora.tableBite.menuManagement.service.FoodService;
import lumora.tableBite.menuManagement.service.ImageService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ImageServiceIMPL implements ImageService {

    private final ImageRepo imageRepo;
    private final FoodService foodService;

    @Override
    public Image getImageById(Long id) {
        return imageRepo.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("No image found with id:"+id));
    }

    @Override
    public void deleteImageById(Long id) {
        imageRepo.findById(id).ifPresentOrElse(imageRepo::delete,()->new ResourceNotFoundException("No image found with id:"+id));
    }

    @Override
    public List<ImageDTO> saveImage(List<MultipartFile> files, Long foodId) {
        Food food = foodService.getFoodById(foodId);
        List<ImageDTO> savedImageDTOList = new ArrayList<>();
        for (MultipartFile file : files) {
           try{
               Image image = new Image();
               image.setFileName(file.getOriginalFilename());
               image.setFileType(file.getContentType());
               image.setImage(new SerialBlob(file.getBytes()));
               image.setFood(food);

               String buildDownloadURL = "/api/v1/images/image/download/";
               String downloadURL = buildDownloadURL + image.getId();
               image.setDownloadUrl(downloadURL);
               Image savedImage = imageRepo.save(image);

               savedImage.setDownloadUrl(buildDownloadURL+savedImage.getId());
               imageRepo.save(savedImage);

               ImageDTO imageDTO = new ImageDTO();
               imageDTO.setId(savedImage.getId());
               imageDTO.setFileName(savedImage.getFileName());
               imageDTO.setDownloadUrl(savedImage.getDownloadUrl());
               savedImageDTOList.add(imageDTO);

           }catch (IOException | SQLException e){
               throw new RuntimeException(e.getMessage());
           }
        }
        return savedImageDTOList;
    }

    @Override
    public void updateImage(MultipartFile file, Long imageId) {
        Image images = getImageById(imageId);

        try {
            images.setFileName(file.getOriginalFilename());
            images.setFileName(file.getOriginalFilename());
            images.setImage(new SerialBlob(file.getBytes()));
            imageRepo.save(images);
        } catch (IOException | SQLException e) {
            throw new RuntimeException(e.getMessage());
        }

    }
}
