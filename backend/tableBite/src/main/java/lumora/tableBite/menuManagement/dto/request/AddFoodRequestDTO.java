package lumora.tableBite.menuManagement.dto.request;

import jakarta.persistence.*;
import lombok.Data;
import lumora.tableBite.menuManagement.entity.Category;
import lumora.tableBite.menuManagement.entity.enums.Cuisine;

import java.math.BigDecimal;

@Data
public class AddFoodRequestDTO {
    private long id;
    private String name;
    private String description;
    private BigDecimal price;
    private Cuisine cuisine;
    private Category category;
}
