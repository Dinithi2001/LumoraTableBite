package lumora.tableBite.menuManagement.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class OrderItemDTO {
    private Long id;
    private Long foodItemId;
    private Integer quantity;
    private BigDecimal price;
}
