package lumora.tableBite.menuManagement.dto.request;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class UpdateOrderRequestDTO {
    private BigDecimal totalAmount;
}
