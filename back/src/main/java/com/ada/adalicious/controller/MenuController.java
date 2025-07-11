package com.ada.adalicious.controller;

import com.ada.adalicious.model.Menu;
import com.ada.adalicious.service.MenuService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/menu")
public class MenuController {

    private final MenuService menuService;

    public MenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    @GetMapping
    public List<Menu> getAllMenuItems() {
        return menuService.getAllMenuItems();
    }
}