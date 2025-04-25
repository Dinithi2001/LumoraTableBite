package lumora.tableBite.menuManagement.service.impl;

import lombok.RequiredArgsConstructor;
import lumora.tableBite.menuManagement.dto.ImageDTO;
import lumora.tableBite.menuManagement.dto.request.AddFoodRequestDTO;
import lumora.tableBite.menuManagement.dto.request.FoodUpdateRequestDTO;
import lumora.tableBite.menuManagement.dto.response.FoodDTO;
import lumora.tableBite.menuManagement.entity.Category;
import lumora.tableBite.menuManagement.entity.Food;
import lumora.tableBite.menuManagement.entity.Image;
import lumora.tableBite.menuManagement.entity.enums.Cuisine;
import lumora.tableBite.menuManagement.exception.FoodNotFountException;
import lumora.tableBite.menuManagement.repo.CategoryRepo;
import lumora.tableBite.menuManagement.repo.FoodRepo;
import lumora.tableBite.menuManagement.repo.ImageRepo;
import lumora.tableBite.menuManagement.service.FoodService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FoodServiceIMPL implements FoodService {


    private final FoodRepo foodRepo;
    private final CategoryRepo categoryRepo;
    private final ModelMapper modelMapper;
    private final ImageRepo imageRepo;

    @Override
    public Food addFood(AddFoodRequestDTO food) {

        Category category = Optional.ofNullable(categoryRepo.findByName(food.getCategory().getName()))
                .orElseGet(()->{
                   Category newCategory = new Category(food.getCategory().getName());
                   return categoryRepo.save(newCategory);
                });

        food.setCategory(category);
        return foodRepo.save(createFood(food,category));

    }

    private Food createFood(AddFoodRequestDTO food, Category category) {
        return new Food(
                food.getName(),
                food.getDescription(),
                food.getPrice(),
                food.getCuisine(),
                category
        );

    }

    @Override
    public Food getFoodById(Long id) {
        return foodRepo.findById(id).orElseThrow(()->new FoodNotFountException("Food not found"));
    }

    @Override
    public void deleteFood(Long id) {
        foodRepo.findById(id).ifPresentOrElse(foodRepo::delete,()->{throw new FoodNotFountException("Food not found");});
    }

    @Override
    public Food updateFood(FoodUpdateRequestDTO food, Long foodId) {
        return foodRepo.findById(foodId)
                .map(existingFood -> updateExistingFood(existingFood,food))
                .map(foodRepo :: save)
                .orElseThrow(()->new FoodNotFountException("Food not found"));
    }

    private Food updateExistingFood(Food existingFood, FoodUpdateRequestDTO food) {
        existingFood.setName(food.getName());
        existingFood.setDescription(food.getDescription());
        existingFood.setPrice(food.getPrice());
        existingFood.setCuisine(food.getCuisine());

        Category category = categoryRepo.findByName(food.getCategory().getName());
        existingFood.setCategory(category);

        return existingFood;
    }

    @Override
    public List<Food> getAllFoods() {
        return foodRepo.findAll();
    }

    @Override
    public List<Food> getFoodsByCategory(String category) {
        return foodRepo.findByCategoryName(category);
    }

    @Override
    public List<Food> getFoodsByCuisine(Cuisine cuisine) {
        return foodRepo.findByCuisine(cuisine);
    }

    @Override
    public List<Food> getFoodsByCategoryAndCuisine(String category, Cuisine cuisine) {
        return foodRepo.findByCategoryNameAndCuisine(category,cuisine);
    }

    @Override
    public List<Food> getFoodsByName(String name) {
        return foodRepo.findByName(name);
    }

    @Override
    public List<Food> getFoodsByCategoryAndName(String category, String name) {
        return foodRepo.findByCategoryNameAndName(category,name);
    }

    @Override
    public List<FoodDTO> getConvertedFoods(List<Food> foods) {
        return foods.stream().map(this::convertToDto).toList();
    }

    @Override
    public FoodDTO convertToDto(Food food){
        FoodDTO foodDTO = modelMapper.map(food,FoodDTO.class);
        List<Image> images = imageRepo.findByFoodId(food.getId());
        List<ImageDTO> imageDTOS = images.stream()
                .map(image -> modelMapper.map(image,ImageDTO.class))
                .toList();
        foodDTO.setImages(imageDTOS);
        return foodDTO;
    }
}
