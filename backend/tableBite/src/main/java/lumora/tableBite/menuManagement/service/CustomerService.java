package lumora.tableBite.menuManagement.service;

import lumora.tableBite.menuManagement.dto.request.CustomerSaveRequestDTO;
import lumora.tableBite.menuManagement.entity.Customer;

public interface CustomerService {

    Customer addCustomer(CustomerSaveRequestDTO customer);
    Customer updateCustomer(Customer customer);
    Customer getCustomerById(long customerId);
    void deleteCustomer(long customerId);
}
