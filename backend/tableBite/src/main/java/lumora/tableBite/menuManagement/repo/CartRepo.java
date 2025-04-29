package lumora.tableBite.menuManagement.repo;

import lumora.tableBite.menuManagement.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepo extends JpaRepository<Cart, Long> {
    Cart findByCustomerId(Long customerId);
}
