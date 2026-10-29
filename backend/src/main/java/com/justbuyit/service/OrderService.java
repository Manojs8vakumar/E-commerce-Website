package com.justbuyit.service;

import com.justbuyit.model.Order;
import com.justbuyit.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final Random random = new Random();

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public Order createOrder(Order order) {
        String randomSuffix = String.format("%05d", random.nextInt(100000));
        order.setOrderNumber("JBI-" + System.currentTimeMillis() % 100000 + "-" + randomSuffix);
        order.setCreatedAt(LocalDateTime.now());
        order.setEstimatedDelivery(LocalDateTime.now().plusDays(2));
        order.setOrderStatus("CONFIRMED");

        if (order.getPaymentMethod() == null) {
            order.setPaymentMethod("UPI");
        }

        if ("COD".equalsIgnoreCase(order.getPaymentMethod())) {
            order.setPaymentStatus("PAY_ON_DELIVERY");
        } else {
            order.setPaymentStatus("PAID_SUCCESSFUL");
        }

        if (order.getTotalAmount() != null) {
            // Just Buy It SuperCoins: 2 coins per 100 rupees
            int coins = (int) (order.getTotalAmount() / 50.0);
            order.setEarnedSuperCoins(Math.max(coins, 10));
        }

        return orderRepository.save(order);
    }

    public Optional<Order> getOrderByNumber(String orderNumber) {
        return orderRepository.findByOrderNumber(orderNumber);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAllByOrderByCreatedAtDesc();
    }

    public Optional<Order> updateOrderStatus(String orderNumber, String newStatus) {
        return orderRepository.findByOrderNumber(orderNumber).map(order -> {
            order.setOrderStatus(newStatus);
            if ("DELIVERED".equalsIgnoreCase(newStatus)) {
                order.setPaymentStatus("PAID_SUCCESSFUL");
            }
            return orderRepository.save(order);
        });
    }

    public boolean deleteOrderByNumber(String orderNumber) {
        Optional<Order> order = orderRepository.findByOrderNumber(orderNumber);
        if (order.isPresent()) {
            orderRepository.delete(order.get());
            return true;
        }
        return false;
    }
}
