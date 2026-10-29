package com.justbuyit.model;

import jakarta.persistence.Embeddable;

@Embeddable
public class OrderItem {

    private Long productId;
    private String title;
    private String imageUrl;
    private Double price;
    private Integer quantity;

    public OrderItem() {}

    public OrderItem(Long productId, String title, String imageUrl, Double price, Integer quantity) {
        this.productId = productId;
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.quantity = quantity;
    }

    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
}
