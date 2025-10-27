package com.personal.blog.repository;

import com.personal.blog.model.SpeakingPractice;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SpeakingPracticeRepository extends MongoRepository<SpeakingPractice, String> {
    // 根据分类查找
    List<SpeakingPractice> findByCategory(String category);
}