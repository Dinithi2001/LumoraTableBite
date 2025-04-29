package lumora.tableBite.menuManagement.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity(name = "restaurant_table")
public class Table {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tableId;

    private String name;

    @Column(name = "is_available")
    private boolean status;

    @OneToOne
    @JsonIgnore
    @JoinColumn(name = "table_id")
    private Order order; // This references the 'table' table
}
