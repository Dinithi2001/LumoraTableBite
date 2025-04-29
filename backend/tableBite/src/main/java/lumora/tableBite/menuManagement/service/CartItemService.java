package lumora.tableBite.menuManagement.service;

import lumora.tableBite.menuManagement.entity.CartItem;

public interface CartItemService {

    void addItemToCart(Long cartId, Long foodId, int quantity);
    void removeItemFromCart(Long cartId, Long foodId);
    void updateItemQuantity(Long cartId, Long foodId, int quantity);

    CartItem getCartItem(Long cartId, Long foodId);
}
