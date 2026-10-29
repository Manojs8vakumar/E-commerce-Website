package com.justbuyit.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "reviews")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long productId;

    private String author;

    private Double rating;

    @Column(length = 2000)
    private String comment;

    private String title;

    private Boolean verifiedBuyer = true;

    private LocalDateTime createdAt = LocalDateTime.now();

    public Review() {}

    public Review(Long productId, String author, Double rating, String title, String comment) {
        this.productId = productId;
        this.author = author;
        this.rating = rating;
        this.title = title;
        this.comment = comment;
        this.verifiedBuyer = true;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public Boolean getVerifiedBuyer() { return verifiedBuyer; }
    public void setVerifiedBuyer(Boolean verifiedBuyer) { this.verifiedBuyer = verifiedBuyer; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
