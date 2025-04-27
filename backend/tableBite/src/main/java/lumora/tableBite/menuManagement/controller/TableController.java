package lumora.tableBite.menuManagement.controller;

import lombok.RequiredArgsConstructor;
import lumora.tableBite.menuManagement.dto.request.AddFoodRequestDTO;
import lumora.tableBite.menuManagement.dto.request.AddTableRequestDTO;
import lumora.tableBite.menuManagement.dto.response.ApiResponse;
import lumora.tableBite.menuManagement.entity.Table;
import lumora.tableBite.menuManagement.service.TableService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.CONFLICT;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@RequiredArgsConstructor
@RestController
@CrossOrigin
@RequestMapping("${api.prefix}/tables")
public class TableController {

    private final TableService tableService;

    @PostMapping("/add")
    public ResponseEntity<ApiResponse> addTable(@RequestBody AddTableRequestDTO table) {
        try {
            Table table1 = tableService.addTable(table);
            return ResponseEntity.ok(new ApiResponse("Add Table success", table1));
        } catch (Exception e) {
            return ResponseEntity.status(CONFLICT).body(new ApiResponse(e.getMessage(), null));
        }

    }

    @DeleteMapping("/delete/{tableId}")
    public ResponseEntity<ApiResponse> deleteTable(@PathVariable Long tableId) {
        try {
            tableService.deleteTable(tableId);
            return ResponseEntity.ok(new ApiResponse("Found", null));
        } catch (Exception e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse("Error", null));
        }
    }

    @GetMapping("/getall")
    public ResponseEntity<ApiResponse> getAllTables() {
        try {
            List<Table> tables = tableService.getAllTables();
            return ResponseEntity.ok(new ApiResponse("Found", tables));
        } catch (Exception e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse("Error", null));
        }
    }
}
