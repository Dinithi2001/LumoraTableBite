package lumora.tableBite.menuManagement.controller;

import lombok.RequiredArgsConstructor;
import lumora.tableBite.menuManagement.dto.request.AddFoodRequestDTO;
import lumora.tableBite.menuManagement.dto.request.FoodUpdateRequestDTO;
import lumora.tableBite.menuManagement.dto.response.ApiResponse;
import lumora.tableBite.menuManagement.entity.Category;
import lumora.tableBite.menuManagement.entity.Food;
import lumora.tableBite.menuManagement.entity.enums.Cuisine;
import lumora.tableBite.menuManagement.exception.AlreadyExistsException;
import lumora.tableBite.menuManagement.exception.ResourceNotFoundException;
import lumora.tableBite.menuManagement.service.FoodService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("${api.prefix}/foods")
public class FoodController {

    private final FoodService foodService;

    @GetMapping("/all")
    public ResponseEntity<ApiResponse> getAllFoods() {
        try {
            List<Food> foods = foodService.getAllFoods();
            return ResponseEntity.ok(new ApiResponse("Found", foods));
        } catch (Exception e) {
            return ResponseEntity.status(INTERNAL_SERVER_ERROR).body(new ApiResponse("Error",INTERNAL_SERVER_ERROR));
        }
    }

    @GetMapping("food/{id}/food")
    public ResponseEntity<ApiResponse> getFoodById(@PathVariable Long id) {
        try {
            Food food = foodService.getFoodById(id);
            return ResponseEntity.ok(new ApiResponse("Found", food));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse("Error", null));
        }
    }

    @PostMapping("/add")
    public ResponseEntity<ApiResponse> addFood(@RequestBody AddFoodRequestDTO food) {
        try {
            Food theFood = foodService.addFood(food);
            return ResponseEntity.ok(new ApiResponse("Add Food success", theFood));
        } catch (Exception e) {
            return ResponseEntity.status(CONFLICT).body(new ApiResponse(e.getMessage(),null));
        }
    }

    @PutMapping("food/{id}/update")
    public ResponseEntity<ApiResponse> updateFood(@PathVariable Long id, @RequestBody FoodUpdateRequestDTO food) {
        try {
            Food theFood = foodService.updateFood(food, id);
            return ResponseEntity.ok(new ApiResponse("Update food suceess ", theFood));
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


}
