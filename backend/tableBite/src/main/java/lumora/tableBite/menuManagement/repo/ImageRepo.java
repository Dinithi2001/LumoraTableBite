package lumora.tableBite.menuManagement.repo;

import lumora.tableBite.menuManagement.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ImageRepo extends JpaRepository<Image, Long> {
    List<Image> findByFoodId(long id);
}
