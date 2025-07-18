package com.ada.adalicious.service;

import com.ada.adalicious.model.Order;
import com.ada.adalicious.model.OrderStatus;
import com.ada.adalicious.repository.OrderRepository;
import com.ada.adalicious.repository.OrderStatusRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    @Autowired
    private OrderStatusRepository orderStatusRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public List<Order> findAll() {
        return orderRepository.findAll();
    }

    public Optional<Order> findById(Long id) {
        return orderRepository.findById(id);
    }

    public Order create(Order order) {
        order.setCreatedAt(java.time.LocalDateTime.now());
        return orderRepository.save(order);
    }

    public Order update(Long id, Order updatedOrder) {
        return orderRepository.findById(id).map(order -> {
            order.setUserName(updatedOrder.getUserName());
            order.setMenu(updatedOrder.getMenu());
            order.setStatus(updatedOrder.getStatus());
            return orderRepository.save(order);
        }).orElseThrow(() -> new RuntimeException("Order not found"));
    }

    public Order updateStatus(Long orderId, Long statusId) {
        OrderStatus status = orderStatusRepository.findById(statusId)
            .orElseThrow(() -> new RuntimeException("Status not found"));

        return orderRepository.findById(orderId).map(order -> {
            order.setStatus(status);
            return orderRepository.save(order);
        }).orElseThrow(() -> new RuntimeException("Order not found"));
    }

    public void delete(Long id) {
        orderRepository.deleteById(id);
    }
}