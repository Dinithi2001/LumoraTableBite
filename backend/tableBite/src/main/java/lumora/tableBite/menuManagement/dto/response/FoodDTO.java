package lumora.tableBite.menuManagement.dto.response;

import jakarta.persistence.*;
import lombok.Data;
import lumora.tableBite.menuManagement.dto.ImageDTO;
import lumora.tableBite.menuManagement.entity.Category;
import lumora.tableBite.menuManagement.entity.Image;
import lumora.tableBite.menuManagement.entity.enums.Cuisine;

import java.math.BigDecimal;
import java.util.List;

@Data
public class FoodDTO {
    private long id;
    private String name;
    private String description;
    private BigDecimal price;
    private Cuisine cuisine;
    private Category category;
    private List<ImageDTO> images;
}
