package com.ada.adalicious.repository;


import com.ada.adalicious.model.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface OrderStatusRepository extends JpaRepository<OrderStatus, Long> {
}
