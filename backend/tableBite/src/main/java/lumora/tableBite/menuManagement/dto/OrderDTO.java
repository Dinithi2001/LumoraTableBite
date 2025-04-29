package lumora.tableBite.menuManagement.dto;

import lombok.Data;
import lumora.tableBite.menuManagement.entity.enums.Status;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderDTO {
    private Long id;
    private Long customerId;
    private LocalDateTime orderDate;
    private BigDecimal totalAmount;
    private Status status;

    private List<OrderItemDTO> items;
}
