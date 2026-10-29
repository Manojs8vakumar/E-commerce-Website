package com.justbuyit.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String brand;

    @Column(nullable = false)
    private String category;

    @Column(length = 3000)
    private String description;

    @Column(nullable = false)
    private Double price;

    private Double originalPrice;

    private Integer discountPercent;

    private Double rating;

    private Integer ratingCount;

    private Integer reviewCount;

    @Column(length = 1000)
    private String imageUrl;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "product_images", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "image_url", length = 1000)
    private List<String> secondaryImages = new ArrayList<>();

    private Boolean inStock = true;

    private Integer stockQuantity = 50;

    // Just Buy It features
    private Boolean isAssured = true; // JBI Assured

    private Boolean isFastDelivery = true; // 1-Day Express Delivery

    private Boolean isMeeshoTrending = false; // Top Reseller Choice

    private Double resellerMargin = 150.0; // Earn by reselling

    private String badge; // "LIGHTNING DEAL", "BESTSELLER", "HOT DROP", "SUPER VALUE"

    private Integer superCoins = 25; // SuperCoins loyalty reward

    private Boolean freeDelivery = true;

    private Integer deliveryDays = 1;

    private Boolean isMinutes = false; // Just Buy It Minutes (10-min delivery)

    private Integer deliveryMinutes = 10;

    private String unitQuantity; // e.g. "1 Litre", "500g", "Pack of 4"

    private String subCategory; // e.g. "Dairy", "Fruits", "Snacks", "Instant Food", "Drinks", "Sweets"

    @Column(length = 1000)
    private String tags;

    public Product() {
    }

    public Product(Long id, String title, String brand, String category, String description,
                   Double price, Double originalPrice, Integer discountPercent, Double rating,
                   Integer ratingCount, Integer reviewCount, String imageUrl, List<String> secondaryImages,
                   Boolean inStock, Integer stockQuantity, Boolean isAssured, Boolean isFastDelivery,
                   Boolean isMeeshoTrending, Double resellerMargin, String badge, Integer superCoins,
                   Boolean freeDelivery, Integer deliveryDays, String tags) {
        this.id = id;
        this.title = title;
        this.brand = brand;
        this.category = category;
        this.description = description;
        this.price = price;
        this.originalPrice = originalPrice;
        this.discountPercent = discountPercent;
        this.rating = rating;
        this.ratingCount = ratingCount;
        this.reviewCount = reviewCount;
        this.imageUrl = imageUrl;
        if (secondaryImages != null) {
            this.secondaryImages = secondaryImages;
        }
        this.inStock = inStock;
        this.stockQuantity = stockQuantity;
        this.isAssured = isAssured;
        this.isFastDelivery = isFastDelivery;
        this.isMeeshoTrending = isMeeshoTrending;
        this.resellerMargin = resellerMargin;
        this.badge = badge;
        this.superCoins = superCoins;
        this.freeDelivery = freeDelivery;
        this.deliveryDays = deliveryDays;
        this.tags = tags;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public Double getOriginalPrice() { return originalPrice; }
    public void setOriginalPrice(Double originalPrice) { this.originalPrice = originalPrice; }

    public Integer getDiscountPercent() { return discountPercent; }
    public void setDiscountPercent(Integer discountPercent) { this.discountPercent = discountPercent; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public Integer getRatingCount() { return ratingCount; }
    public void setRatingCount(Integer ratingCount) { this.ratingCount = ratingCount; }

    public Integer getReviewCount() { return reviewCount; }
    public void setReviewCount(Integer reviewCount) { this.reviewCount = reviewCount; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public List<String> getSecondaryImages() { return secondaryImages; }
    public void setSecondaryImages(List<String> secondaryImages) { this.secondaryImages = secondaryImages; }

    public Boolean getInStock() { return inStock; }
    public void setInStock(Boolean inStock) { this.inStock = inStock; }

    public Integer getStockQuantity() { return stockQuantity; }
    public void setStockQuantity(Integer stockQuantity) { this.stockQuantity = stockQuantity; }

    public Boolean getIsAssured() { return isAssured; }
    public void setIsAssured(Boolean isAssured) { this.isAssured = isAssured; }

    public Boolean getIsFastDelivery() { return isFastDelivery; }
    public void setIsFastDelivery(Boolean isFastDelivery) { this.isFastDelivery = isFastDelivery; }

    public Boolean getIsMeeshoTrending() { return isMeeshoTrending; }
    public void setIsMeeshoTrending(Boolean isMeeshoTrending) { this.isMeeshoTrending = isMeeshoTrending; }

    public Double getResellerMargin() { return resellerMargin; }
    public void setResellerMargin(Double resellerMargin) { this.resellerMargin = resellerMargin; }

    public String getBadge() { return badge; }
    public void setBadge(String badge) { this.badge = badge; }

    public Integer getSuperCoins() { return superCoins; }
    public void setSuperCoins(Integer superCoins) { this.superCoins = superCoins; }

    public Boolean getFreeDelivery() { return freeDelivery; }
    public void setFreeDelivery(Boolean freeDelivery) { this.freeDelivery = freeDelivery; }

    public Integer getDeliveryDays() { return deliveryDays; }
    public void setDeliveryDays(Integer deliveryDays) { this.deliveryDays = deliveryDays; }

    public Boolean getIsMinutes() { return isMinutes; }
    public void setIsMinutes(Boolean isMinutes) { this.isMinutes = isMinutes; }

    public Integer getDeliveryMinutes() { return deliveryMinutes; }
    public void setDeliveryMinutes(Integer deliveryMinutes) { this.deliveryMinutes = deliveryMinutes; }

    public String getUnitQuantity() { return unitQuantity; }
    public void setUnitQuantity(String unitQuantity) { this.unitQuantity = unitQuantity; }

    public String getSubCategory() { return subCategory; }
    public void setSubCategory(String subCategory) { this.subCategory = subCategory; }

    public String getTags() { return tags; }
    public void setTags(String tags) { this.tags = tags; }
}
