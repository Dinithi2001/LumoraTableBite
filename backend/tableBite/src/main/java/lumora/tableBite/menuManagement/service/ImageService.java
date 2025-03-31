package lumora.tableBite.menuManagement.service;

import lumora.tableBite.menuManagement.dto.ImageDTO;
import lumora.tableBite.menuManagement.entity.Image;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


public interface ImageService {

    Image getImageById(Long id);
    void deleteImageById(Long id);
    List<ImageDTO> saveImage(List<MultipartFile> files, Long foodId);
    void updateImage(MultipartFile file, Long imageId);

}
