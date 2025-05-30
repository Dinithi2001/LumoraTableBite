package lumora.tableBite.menuManagement.entity;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Blob;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity(name="image")
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String FileName;
    private String FileType;

    @Lob
    private Blob image;
    private String downloadUrl;

    @ManyToOne
    @JoinColumn(name = "food_id")
    private Food food;


}
