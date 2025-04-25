package lumora.tableBite.menuManagement.repo;

import lumora.tableBite.menuManagement.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepo extends JpaRepository<CartItem, Long> {
    void deleteAllByCartId(Long id);
}
