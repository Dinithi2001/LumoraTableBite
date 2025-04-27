package lumora.tableBite.menuManagement.service;

public interface CartItemService {

    void addItemToCart(Long cartId, Long foodId, int quantity);
    void removeItemFromCart(Long cartId, Long foodId);
    void updateItemQuantity(Long cartId, Long foodId, int quantity);
}
