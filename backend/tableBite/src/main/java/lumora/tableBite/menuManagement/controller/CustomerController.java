package lumora.tableBite.menuManagement.controller;

import lombok.RequiredArgsConstructor;
import lumora.tableBite.menuManagement.dto.request.CustomerSaveRequestDTO;
import lumora.tableBite.menuManagement.dto.response.ApiResponse;
import lumora.tableBite.menuManagement.entity.Customer;
import lumora.tableBite.menuManagement.entity.Table;
import lumora.tableBite.menuManagement.service.CustomerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.CONFLICT;

@RequiredArgsConstructor
@RestController
@CrossOrigin
@RequestMapping("${api.prefix}/customers")
public class CustomerController {

    private final CustomerService customerService;

    @PostMapping("/add")
    public ResponseEntity<ApiResponse> addCustomer(@RequestBody CustomerSaveRequestDTO customer) {
        try {
            Customer customer1 = customerService.addCustomer(customer);
            return ResponseEntity.ok(new ApiResponse("Add Customer success", customer1));
        } catch (Exception e) {
            return ResponseEntity.status(CONFLICT).body(new ApiResponse(e.getMessage(), null));
        }

    }
}
