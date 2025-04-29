package lumora.tableBite.menuManagement.controller;

import lombok.RequiredArgsConstructor;
import lumora.tableBite.menuManagement.dto.OrderDTO;
import lumora.tableBite.menuManagement.dto.response.ApiResponse;
import lumora.tableBite.menuManagement.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@RequiredArgsConstructor
@RestController
@RequestMapping("${api.prefix}/orders")
public class OrderController {

    private final OrderService orderService;

    // Create a new Order
    @PostMapping
    public ResponseEntity<ApiResponse> createOrder(@RequestBody OrderDTO orderDTO) {
        try {
            OrderDTO createdOrder = orderService.createOrder(orderDTO);
            return ResponseEntity.ok(new ApiResponse("Order created successfully", createdOrder));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse("Failed to create order", e.getMessage()));
        }
    }

    // Get an Order by ID
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getOrderById(@PathVariable Long id) {
        try {
            OrderDTO order = orderService.getOrderById(id);
            return ResponseEntity.ok(new ApiResponse("Order fetched successfully", order));
        } catch (Exception e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse("Order not found", e.getMessage()));
        }
    }

    // Get all Orders
    @GetMapping
    public ResponseEntity<ApiResponse> getAllOrders() {
        List<OrderDTO> orders = orderService.getAllOrders();
        return ResponseEntity.ok(new ApiResponse("All orders fetched", orders));
    }

    // Update an Order
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateOrder(@PathVariable Long id, @RequestBody OrderDTO orderDTO) {
        try {
            OrderDTO updatedOrder = orderService.updateOrder(id, orderDTO);
            return ResponseEntity.ok(new ApiResponse("Order updated successfully", updatedOrder));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse("Failed to update order", e.getMessage()));
        }
    }

    // Delete an Order
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteOrder(@PathVariable Long id) {
        try {
            orderService.deleteOrder(id);
            return ResponseEntity.ok(new ApiResponse("Order deleted successfully", null));
        } catch (Exception e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse("Order not found", e.getMessage()));
        }
    }
}
