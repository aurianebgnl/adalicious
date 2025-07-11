package com.ada.adalicious.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "order_status")
public class OrderStatus {

    @Id
    private Long id;

    @Column(name = "status_name")  
    private String name;

}