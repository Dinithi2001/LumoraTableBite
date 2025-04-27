package lumora.tableBite.menuManagement.controller;

import lombok.RequiredArgsConstructor;
import lumora.tableBite.menuManagement.dto.request.AddFoodRequestDTO;
import lumora.tableBite.menuManagement.dto.request.FoodUpdateRequestDTO;
import lumora.tableBite.menuManagement.dto.response.ApiResponse;
import lumora.tableBite.menuManagement.dto.response.FoodDTO;
import lumora.tableBite.menuManagement.entity.Food;
import lumora.tableBite.menuManagement.entity.enums.Cuisine;
import lumora.tableBite.menuManagement.exception.ResourceNotFoundException;
import lumora.tableBite.menuManagement.service.FoodService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.*;

@RequiredArgsConstructor
@RestController
@CrossOrigin
@RequestMapping("${api.prefix}/foods")
public class FoodController {

    private final FoodService foodService;

    @GetMapping("/all")
    public ResponseEntity<ApiResponse> getAllFoods() {
        try {
            List<Food> foods = foodService.getAllFoods();
            List<FoodDTO> convertedFoods = foodService.getConvertedFoods(foods);
            return ResponseEntity.ok(new ApiResponse("Found", convertedFoods));
        } catch (Exception e) {
            return ResponseEntity.status(INTERNAL_SERVER_ERROR).body(new ApiResponse("Error",INTERNAL_SERVER_ERROR));
        }
    }

    @GetMapping("/food/{id}/food")
    public ResponseEntity<ApiResponse> getFoodById(@PathVariable Long id) {
        try {
            Food food = foodService.getFoodById(id);
            FoodDTO convertedFood = foodService.convertToDto(food);
            return ResponseEntity.ok(new ApiResponse("Found", convertedFood));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse("Error", null));
        }
    }

    @PostMapping("/add")
    public ResponseEntity<ApiResponse> addFood(@RequestBody AddFoodRequestDTO food) {
        try {
            Food theFood = foodService.addFood(food);
            FoodDTO convertedFood = foodService.convertToDto(theFood);
            return ResponseEntity.ok(new ApiResponse("Add Food success", convertedFood));
        } catch (Exception e) {
            return ResponseEntity.status(CONFLICT).body(new ApiResponse(e.getMessage(), null));
        }
    }

    @PutMapping("food/{id}/update")
    public ResponseEntity<ApiResponse> updateFood(@PathVariable Long id, @RequestBody FoodUpdateRequestDTO food) {
        try {
            Food theFood = foodService.updateFood(food, id);
            FoodDTO convertedFood = foodService.convertToDto(theFood);
            return ResponseEntity.ok(new ApiResponse("Update food suceess ", convertedFood));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse("Error", null));
        }
    }

    @DeleteMapping("food/{id}/delete")
    public ResponseEntity<ApiResponse> deleteFood(@PathVariable Long id) {
        try {
            foodService.deleteFood(id);
            return ResponseEntity.ok(new ApiResponse("Found", null));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse("Error", null));
        }
    }

    @GetMapping("/food/by-cuisine")
    public ResponseEntity<ApiResponse> findFoodByCuisine(@RequestParam Cuisine cuisine) {
        try {
            List<Food> foods = foodService.getFoodsByCuisine(cuisine);

            if (foods.isEmpty()) {
                return ResponseEntity.status(NOT_FOUND).body(new ApiResponse("No foods found ", null));
            }
            List<FoodDTO> convertedFood = foodService.getConvertedFoods(foods);
            return  ResponseEntity.ok(new ApiResponse("success", convertedFood));
        } catch (Exception e) {
            return ResponseEntity.ok(new ApiResponse(e.getMessage(), null));
        }
    }

    @GetMapping("/food/{category}/all/foods")
    public ResponseEntity<ApiResponse> findFoodByCategory(@PathVariable String category) {
        try {
            List<Food> foods = foodService.getFoodsByCategory(category);
            if (foods.isEmpty()) {
                return ResponseEntity.status(NOT_FOUND).body(new ApiResponse("No foods found ", null));
            }
            List<FoodDTO> convertedFood = foodService.getConvertedFoods(foods);
            return  ResponseEntity.ok(new ApiResponse("success", convertedFood));
        } catch (Exception e) {
            return ResponseEntity.ok(new ApiResponse(e.getMessage(), null));
        }
    }
    @GetMapping("/foods/by/category-and-cuisine")
    public ResponseEntity<ApiResponse> getFoodsByCategoryAndCuisine(@RequestParam String category, @RequestParam Cuisine cuisine){
        try {
            List<Food> foods = foodService.getFoodsByCategoryAndCuisine(category, cuisine);
            if (foods.isEmpty()) {
                return ResponseEntity.status(NOT_FOUND).body(new ApiResponse("No foods found ", null));
            }
            List<FoodDTO> convertedFood = foodService.getConvertedFoods(foods);
            return  ResponseEntity.ok(new ApiResponse("success", convertedFood));
        } catch (Exception e) {
            return ResponseEntity.status(INTERNAL_SERVER_ERROR).body(new ApiResponse("error", e.getMessage()));
        }
    }

    @GetMapping("/foods/{name}/foods")
    public ResponseEntity<ApiResponse> getFoodsByName(@PathVariable String name){
        try {
            List<Food> foods = foodService.getFoodsByName(name);
            if (foods.isEmpty()) {
                return ResponseEntity.status(NOT_FOUND).body(new ApiResponse("No foods found ", null));
            }
            List<FoodDTO> convertedFood = foodService.getConvertedFoods(foods);
            return  ResponseEntity.ok(new ApiResponse("success", convertedFood));
        } catch (Exception e) {
            return ResponseEntity.status(INTERNAL_SERVER_ERROR).body(new ApiResponse("error", e.getMessage()));
        }
    }


}
