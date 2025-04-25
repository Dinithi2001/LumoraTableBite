package lumora.tableBite.menuManagement.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lumora.tableBite.menuManagement.entity.enums.Cuisine;
import java.math.BigDecimal;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity(name = "food")
public class Food {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;
    private String description;
    private BigDecimal price;

    @Enumerated(EnumType.STRING)
    private Cuisine cuisine;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(mappedBy = "food" , cascade = CascadeType.ALL , orphanRemoval = true)
    private List<Image> images;

    public Food(String name, String description, BigDecimal price, Cuisine cuisine, Category category) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.cuisine = cuisine;
        this.category = category;
    }
}
