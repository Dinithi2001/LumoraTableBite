package lumora.tableBite.menuManagement.service;

import lumora.tableBite.menuManagement.entity.Cart;

import java.math.BigDecimal;

public interface CartService {

    Cart getCart(Long id);
    void clearCart(Long id);
    BigDecimal getTotalPrice(Long id);

}
