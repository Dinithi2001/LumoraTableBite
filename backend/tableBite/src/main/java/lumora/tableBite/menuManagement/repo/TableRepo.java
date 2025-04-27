package lumora.tableBite.menuManagement.repo;

import lumora.tableBite.menuManagement.entity.Table;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TableRepo extends JpaRepository<Table,Long> {
}
