package lumora.tableBite.menuManagement.service.impl;

import lombok.RequiredArgsConstructor;
import lumora.tableBite.menuManagement.dto.request.AddTableRequestDTO;
import lumora.tableBite.menuManagement.entity.Table;
import lumora.tableBite.menuManagement.repo.TableRepo;
import lumora.tableBite.menuManagement.service.TableService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TableServiceIMPL implements TableService {

    private final TableRepo tableRepo;

    @Override
    public Table addTable(AddTableRequestDTO table) {
        Table table1 = new Table();
        table1.setName(table.getName());
        table1.setStatus(false);
        return tableRepo.save(table1);
    }

    @Override
    public Table updateTable(Table table) {
        return null;
    }

    @Override
    public Table getTableById(long tableId) {
        return null;
    }

    @Override
    public void deleteTable(long tableId) {
        tableRepo.deleteById(tableId);
    }

    @Override
    public List<Table> getAllTables() {
        return tableRepo.findAll();
    }
}
