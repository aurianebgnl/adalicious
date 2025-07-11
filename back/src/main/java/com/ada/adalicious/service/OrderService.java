package com.ada.adalicious.service;

import com.ada.adalicious.model.Order;
import com.ada.adalicious.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

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

    public void delete(Long id) {
        orderRepository.deleteById(id);
    }
}