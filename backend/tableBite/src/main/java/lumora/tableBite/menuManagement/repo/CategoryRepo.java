package lumora.tableBite.menuManagement.repo;

import lumora.tableBite.menuManagement.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepo extends JpaRepository<Category, Long> {
    Category findByName(String name);

    boolean existsByName(String name);
}
