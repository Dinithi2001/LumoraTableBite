package lumora.tableBite.menuManagement.service.impl;

import lombok.RequiredArgsConstructor;
import lumora.tableBite.menuManagement.entity.Cart;
import lumora.tableBite.menuManagement.entity.CartItem;
import lumora.tableBite.menuManagement.entity.Food;
import lumora.tableBite.menuManagement.repo.CartItemRepo;
import lumora.tableBite.menuManagement.service.CartItemService;
import lumora.tableBite.menuManagement.service.CartService;
import lumora.tableBite.menuManagement.service.FoodService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CartItemServiceIMPL implements CartItemService {

    private final CartItemRepo cartItemRepo;
    private final FoodService foodService;
    private final CartService cartService;

    @Override
    public void addItemToCart(Long cartId, Long foodId, int quantity) {
        //1.get the cart
        //2.get the food
        //3.check if the food already exists in the cart
        //4.if it does, update the quantity
        //5.if not, add a new cartItem

        Cart cart = cartService.getCart(cartId);
        Food food = foodService.getFoodById(foodId);

//        CartItem cartItem = cart.getItems()
//                .stream()
//                .filter(item->item.getFood().equals(foodId))
//                .findFirst().orElse(new CartItem());
//
//        if(cartItem.getId() == null){
//            cartItem.setCart(cart);
//            cartItem.setFood(food);
//            cartItem.setQuantity(quantity);
//            cartItem.setUnitPrice(food.getPrice());
//
//        }else{
//            cartItem.setQuantity(cartItem.getQuantity() + quantity);
//
//        }
    }

    @Override
    public void removeItemFromCart(Long cartId, Long foodId) {

    }

    @Override
    public void updateItemQuantity(Long cartId, Long foodId, int quantity) {

    }
}
