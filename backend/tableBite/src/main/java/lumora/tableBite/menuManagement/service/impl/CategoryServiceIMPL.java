package lumora.tableBite.menuManagement.service.impl;

import lumora.tableBite.menuManagement.entity.Category;
import lumora.tableBite.menuManagement.exception.AlreadyExistsException;
import lumora.tableBite.menuManagement.exception.ResourceNotFoundException;
import lumora.tableBite.menuManagement.repo.CategoryRepo;
import lumora.tableBite.menuManagement.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceIMPL implements CategoryService {

    @Autowired
    private CategoryRepo categoryRepo;

    @Override
    public Category getCategoryById(Long id) {
        return categoryRepo.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("category not found"));
    }

    @Override
    public Category getCategoryByName(String name) {
        return categoryRepo.findByName(name);
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepo.findAll();
    }

    @Override
    public Category addCategory(Category category) {
        return Optional.of(category).filter(c-> !categoryRepo.existsByName(category.getName()))
                .map(categoryRepo::save)
                .orElseThrow(()->new AlreadyExistsException(category.getName()+ " already exists"));
    }

    @Override
    public Category updateCategory(Category category, Long id) {
        return Optional.ofNullable(getCategoryById(id)).map(oldCategory->{
            oldCategory.setName(category.getName());
            return categoryRepo.save(oldCategory);
        }).orElseThrow(()->new ResourceNotFoundException("category not found"));
    }

    @Override
    public void deleteCategoryById(Long id) {
        categoryRepo.findById(id)
                .ifPresentOrElse(categoryRepo::delete,
                        ()->{throw new ResourceNotFoundException("category not found");});
    }
}
