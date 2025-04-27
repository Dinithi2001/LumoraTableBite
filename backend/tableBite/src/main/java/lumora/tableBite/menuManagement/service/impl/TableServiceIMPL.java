package lumora.tableBite.menuManagement.service.impl;

import lombok.RequiredArgsConstructor;
import lumora.tableBite.menuManagement.entity.Table;
import lumora.tableBite.menuManagement.repo.TableRepo;
import lumora.tableBite.menuManagement.service.TableService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TableServiceIMPL implements TableService {

    private final TableRepo tableRepo;

    @Override
    public Table addTable(Table table) {
        return tableRepo.save(table);
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
}
