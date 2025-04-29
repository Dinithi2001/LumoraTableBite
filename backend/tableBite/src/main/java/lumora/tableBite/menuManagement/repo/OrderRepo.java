package lumora.tableBite.menuManagement.repo;

import lumora.tableBite.menuManagement.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepo extends JpaRepository<Order, Long> {
    // Custom query methods can be defined here if needed
    // For example, you can add methods to find orders by user ID or status
    // Optional<Order> findByUserId(Long userId);
    // List<Order> findByStatus(String status);
}
