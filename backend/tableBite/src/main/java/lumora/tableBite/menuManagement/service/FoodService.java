package lumora.tableBite.menuManagement.service;

import lumora.tableBite.menuManagement.dto.request.AddFoodRequestDTO;
import lumora.tableBite.menuManagement.dto.request.FoodUpdateRequestDTO;
import lumora.tableBite.menuManagement.dto.response.FoodDTO;
import lumora.tableBite.menuManagement.entity.Food;
import lumora.tableBite.menuManagement.entity.enums.Cuisine;

import java.util.List;

public interface FoodService {

    Food addFood(AddFoodRequestDTO food);
    Food getFoodById(Long id);
    void deleteFood(Long id);
    Food updateFood(FoodUpdateRequestDTO food , Long foodId);
    List<Food> getAllFoods();
    List<Food> getFoodsByCategory(String category);
    List<Food> getFoodsByCuisine(Cuisine cuisine);
    List<Food> getFoodsByCategoryAndCuisine(String category, Cuisine cuisine);
    List<Food> getFoodsByName(String name);
    List<Food> getFoodsByCategoryAndName(String category, String name);

    List<FoodDTO> getConvertedFoods(List<Food> foods);

    FoodDTO convertToDto(Food food);
}
