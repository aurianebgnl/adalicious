package com.ada.adalicious.controller;

import com.ada.adalicious.model.Order;
import com.ada.adalicious.service.OrderService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping
    public List<Order> getAll() {
        return orderService.findAll();
    }

    @GetMapping("/{id}")
    public Order getOne(@PathVariable Long id) {
        return orderService.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
    }

    @PostMapping
    public Order create(@RequestBody Order order) {
        return orderService.create(order);
    }

    @PutMapping("/{id}")
    public Order update(@PathVariable Long id, @RequestBody Order order) {
        return orderService.update(id, order);
    }

    @PatchMapping("/{id}")
    public Order updateStatus(@PathVariable Long id, @RequestBody Order partialOrder) {
        if (partialOrder.getStatus() == null || partialOrder.getStatus().getId() == null) {
            throw new IllegalArgumentException("Missing status.id in request body");
        }

        return orderService.updateStatus(id, partialOrder.getStatus().getId());
    }
    

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        orderService.delete(id);
    }
}