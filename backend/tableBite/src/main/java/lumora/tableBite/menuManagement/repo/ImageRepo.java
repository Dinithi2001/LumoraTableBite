package lumora.tableBite.menuManagement.repo;

import lumora.tableBite.menuManagement.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepo extends JpaRepository<Image, Long> {
}
