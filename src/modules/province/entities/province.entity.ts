import { District } from "src/modules/district/entities/district.entity";
import { Product } from "src/modules/products/products.entity";
import { Region } from "src/modules/region/entities/region.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Province {
  @PrimaryGeneratedColumn()
  id: number; // Primary key

  @Column({ unique: true })
  provinceCode: number; // Should be unique if it's used as a foreign key

  @Column()
  name: string;
 
  @ManyToOne(() => Region, (region) => region.provinces)
  regionid: Region;

  @OneToMany(() => District, (district) => district.provinceid)
  districts: District[]; // Updated relationship
}