package lumora.tableBite.menuManagement.service.impl;

import lombok.RequiredArgsConstructor;
import lumora.tableBite.menuManagement.dto.request.CustomerSaveRequestDTO;
import lumora.tableBite.menuManagement.entity.Customer;
import lumora.tableBite.menuManagement.repo.CustomerRepo;
import lumora.tableBite.menuManagement.service.CustomerService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomerServiceIMPL implements CustomerService {

    private final CustomerRepo customerRepo;
    private final ModelMapper modelMapper;

    @Override
    public Customer addCustomer(CustomerSaveRequestDTO customer) {
        Customer customerEntity = new Customer();
        customerEntity.setName(customer.getName());
        customerEntity.setPhoneNumber(customer.getPhoneNumber());

        return customerRepo.save(customerEntity);
    }

    @Override
    public Customer updateCustomer(Customer customer) {
        return null;
    }

    @Override
    public Customer getCustomerById(long customerId) {
        return null;
    }

    @Override
    public void deleteCustomer(long customerId) {

    }
}
