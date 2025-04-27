package lumora.tableBite.menuManagement.service;

import lumora.tableBite.menuManagement.dto.request.AddTableRequestDTO;
import lumora.tableBite.menuManagement.entity.Table;

import java.util.List;

public interface TableService {

    Table addTable(AddTableRequestDTO table);
    Table updateTable(Table table);
    Table getTableById(long tableId);
    void deleteTable(long tableId);

    List<Table> getAllTables();
}
