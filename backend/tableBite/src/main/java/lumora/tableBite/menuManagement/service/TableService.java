package lumora.tableBite.menuManagement.service;

import lumora.tableBite.menuManagement.entity.Table;

public interface TableService {

    Table addTable(Table table);
    Table updateTable(Table table);
    Table getTableById(long tableId);
    void deleteTable(long tableId);
}
