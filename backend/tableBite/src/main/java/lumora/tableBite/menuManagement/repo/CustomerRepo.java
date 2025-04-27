package lumora.tableBite.menuManagement.repo;

import lumora.tableBite.menuManagement.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepo extends JpaRepository<Customer, Long> {
}
