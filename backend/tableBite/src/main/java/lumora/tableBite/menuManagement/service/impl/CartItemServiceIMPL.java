package lumora.tableBite.menuManagement.service.impl;

import lombok.RequiredArgsConstructor;
import lumora.tableBite.menuManagement.entity.Cart;
import lumora.tableBite.menuManagement.entity.CartItem;
import lumora.tableBite.menuManagement.entity.Food;
import lumora.tableBite.menuManagement.exception.ResourceNotFoundException;
import lumora.tableBite.menuManagement.repo.CartItemRepo;
import lumora.tableBite.menuManagement.repo.CartRepo;
import lumora.tableBite.menuManagement.service.CartItemService;
import lumora.tableBite.menuManagement.service.CartService;
import lumora.tableBite.menuManagement.service.FoodService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class CartItemServiceIMPL implements CartItemService {

    ;
    private final FoodService foodService;
    private final CartService cartService;
    private final CartItemRepo cartItemRepository;
    private final CartRepo cartRepository;

    @Override
    public void addItemToCart(Long cartId, Long foodId, int quantity) {
        //1.Get the cart
        //2.Get the food
        //3.Check if the food is already in the cart
        //4.If the food is already in the cart, update the quantity
        //5.If the food is not in the cart, add the food to the cart
        Cart cart = cartService.getCart(cartId);
        Food food = foodService.getFoodById(foodId);
        CartItem cartItem = cart.getItems()
                .stream()
                .filter(item -> item.getFood().getId().equals(foodId))
                .findFirst()
                .orElse(new CartItem());

        if(cartItem.getId() == null) {
            cartItem.setCart(cart);
            cartItem.setFood(food);
            cartItem.setQuantity(quantity);
            cartItem.setUnitPrice(food.getPrice());
        }else {
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
        }

        cartItem.setTotalPrice();
        cart.addItem(cartItem);
        cartItemRepository.save(cartItem);
        cartRepository.save(cart);
    }

    @Override
    public void removeItemFromCart(Long cartId, Long foodId) {
        Cart cart = cartService.getCart(cartId);
        CartItem itemToRemove = getCartItem(cartId, foodId);
        cart.removeItem(itemToRemove);
        cartRepository.save(cart);
    }

    @Override
    public void updateItemQuantity(Long cartId, Long foodId, int quantity) {

        Cart cart = cartService.getCart(cartId);
        cart.getItems()
                .stream()
                .filter(item -> item.getFood().getId().equals(foodId))
                .findFirst()
                .ifPresent(item -> {
                    item.setQuantity(quantity);
                    item.setUnitPrice(item.getFood().getPrice());
                    item.setTotalPrice();
                });
        BigDecimal totalAmount = cart.getItems()
                .stream()
                .map(CartItem::getTotalPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        cart.setTotalAmount(totalAmount);
        cartRepository.save(cart);
    }

    @Override
    public CartItem getCartItem(Long cartId, Long foodId) {
        Cart cart = cartService.getCart(cartId);
        return cart.getItems()
                .stream()
                .filter(item -> item.getFood().getId().equals(foodId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Item not found"));
    }
}
