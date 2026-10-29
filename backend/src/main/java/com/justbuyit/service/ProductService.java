package com.justbuyit.service;

import com.justbuyit.model.Product;
import com.justbuyit.model.Review;
import com.justbuyit.repository.ProductRepository;
import com.justbuyit.repository.ReviewRepository;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final ReviewRepository reviewRepository;

    public ProductService(ProductRepository productRepository, ReviewRepository reviewRepository) {
        this.productRepository = productRepository;
        this.reviewRepository = reviewRepository;
    }

    public List<Product> getProducts(String category, String search, String sort,
                                    Double minPrice, Double maxPrice,
                                    Boolean assuredOnly, Boolean meeshoOnly, String badge) {
        List<Product> list;

        if (search != null && !search.trim().isEmpty()) {
            list = productRepository.searchProducts(search.trim());
        } else if (category != null && !category.trim().isEmpty() && !category.equalsIgnoreCase("all")) {
            list = productRepository.findByCategoryIgnoreCase(category.trim());
        } else if (badge != null && !badge.trim().isEmpty()) {
            list = productRepository.findByBadge(badge.trim());
        } else {
            list = productRepository.findAll();
        }

        // Apply filters
        return list.stream()
            .filter(p -> category == null || category.equalsIgnoreCase("all") || (search != null && !search.isEmpty()) || p.getCategory().equalsIgnoreCase(category))
            .filter(p -> minPrice == null || p.getPrice() >= minPrice)
            .filter(p -> maxPrice == null || p.getPrice() <= maxPrice)
            .filter(p -> assuredOnly == null || !assuredOnly || (p.getIsAssured() != null && p.getIsAssured()))
            .filter(p -> meeshoOnly == null || !meeshoOnly || (p.getIsMeeshoTrending() != null && p.getIsMeeshoTrending()))
            .sorted((a, b) -> {
                if ("price_asc".equalsIgnoreCase(sort)) {
                    return Double.compare(a.getPrice(), b.getPrice());
                } else if ("price_desc".equalsIgnoreCase(sort)) {
                    return Double.compare(b.getPrice(), a.getPrice());
                } else if ("rating".equalsIgnoreCase(sort)) {
                    return Double.compare(b.getRating(), a.getRating());
                } else if ("discount".equalsIgnoreCase(sort)) {
                    return Integer.compare(b.getDiscountPercent(), a.getDiscountPercent());
                }
                return Long.compare(a.getId(), b.getId());
            })
            .collect(Collectors.toList());
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public List<String> getCategories() {
        return productRepository.findDistinctCategories();
    }

    public List<Product> getDeals() {
        return productRepository.findAll().stream()
            .filter(p -> p.getDiscountPercent() != null && p.getDiscountPercent() >= 30)
            .sorted(Comparator.comparing(Product::getDiscountPercent).reversed())
            .collect(Collectors.toList());
    }

    public List<Product> getMinutesProducts() {
        return productRepository.findByIsMinutesTrue();
    }

    public List<Product> getTrending() {
        return productRepository.findAll().stream()
            .filter(p -> (p.getIsMeeshoTrending() != null && p.getIsMeeshoTrending()) || (p.getRating() != null && p.getRating() >= 4.7))
            .collect(Collectors.toList());
    }

    public List<Review> getProductReviews(Long productId) {
        return reviewRepository.findByProductIdOrderByCreatedAtDesc(productId);
    }

    public Review addReview(Review review) {
        return reviewRepository.save(review);
    }

    public Product saveProduct(Product product) {
        if (product.getRating() == null) product.setRating(4.5);
        if (product.getRatingCount() == null) product.setRatingCount(100);
        if (product.getReviewCount() == null) product.setReviewCount(25);
        if (product.getInStock() == null) product.setInStock(true);
        if (product.getStockQuantity() == null) product.setStockQuantity(50);
        if (product.getIsAssured() == null) product.setIsAssured(true);
        if (product.getIsFastDelivery() == null) product.setIsFastDelivery(true);
        if (product.getSuperCoins() == null) {
            product.setSuperCoins((int) ((product.getPrice() != null ? product.getPrice() : 100) / 50.0));
        }
        return productRepository.save(product);
    }

    public Optional<Product> updateProduct(Long id, Product updated) {
        return productRepository.findById(id).map(existing -> {
            if (updated.getTitle() != null) existing.setTitle(updated.getTitle());
            if (updated.getBrand() != null) existing.setBrand(updated.getBrand());
            if (updated.getCategory() != null) existing.setCategory(updated.getCategory());
            if (updated.getDescription() != null) existing.setDescription(updated.getDescription());
            if (updated.getPrice() != null) existing.setPrice(updated.getPrice());
            if (updated.getOriginalPrice() != null) existing.setOriginalPrice(updated.getOriginalPrice());
            if (updated.getDiscountPercent() != null) existing.setDiscountPercent(updated.getDiscountPercent());
            if (updated.getImageUrl() != null) existing.setImageUrl(updated.getImageUrl());
            if (updated.getInStock() != null) existing.setInStock(updated.getInStock());
            if (updated.getStockQuantity() != null) existing.setStockQuantity(updated.getStockQuantity());
            if (updated.getIsAssured() != null) existing.setIsAssured(updated.getIsAssured());
            if (updated.getIsFastDelivery() != null) existing.setIsFastDelivery(updated.getIsFastDelivery());
            if (updated.getIsMinutes() != null) existing.setIsMinutes(updated.getIsMinutes());
            if (updated.getDeliveryMinutes() != null) existing.setDeliveryMinutes(updated.getDeliveryMinutes());
            if (updated.getUnitQuantity() != null) existing.setUnitQuantity(updated.getUnitQuantity());
            if (updated.getSubCategory() != null) existing.setSubCategory(updated.getSubCategory());
            if (updated.getBadge() != null) existing.setBadge(updated.getBadge());
            if (updated.getTags() != null) existing.setTags(updated.getTags());
            return productRepository.save(existing);
        });
    }

    public boolean deleteProduct(Long id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Optional<Product> toggleMinutes(Long id) {
        return productRepository.findById(id).map(existing -> {
            boolean current = existing.getIsMinutes() != null && existing.getIsMinutes();
            existing.setIsMinutes(!current);
            return productRepository.save(existing);
        });
    }
}
