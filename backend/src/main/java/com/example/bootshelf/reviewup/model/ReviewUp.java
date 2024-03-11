package com.example.bootshelf.reviewup.model;

import com.example.bootshelf.review.model.entity.Review;
import com.example.bootshelf.user.model.entity.User;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewUp {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idx;

    @ManyToOne
    @JoinColumn(name = "User_idx")
    private User userIdx;

    @ManyToOne
    @JoinColumn(name = "Review_idx")
    private Review reviewIdx;
}
