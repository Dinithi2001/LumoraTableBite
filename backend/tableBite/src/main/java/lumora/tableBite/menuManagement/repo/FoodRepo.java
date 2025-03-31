package lumora.tableBite.menuManagement.repo;

import lumora.tableBite.menuManagement.entity.Food;
import lumora.tableBite.menuManagement.entity.enums.Cuisine;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FoodRepo extends JpaRepository<Food, Long> {
    List<Food> findByCategoryName(String category);

    List<Food> findByCuisine(Cuisine cuisine);

    List<Food> findByCategoryNameAndCuisine(String category, Cuisine cuisine);

    List<Food> findByName(String name);

    List<Food> findByCategoryNameAndName(String category, String name);
}
