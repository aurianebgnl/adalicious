package com.ada.adalicious.repository;

import com.ada.adalicious.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}