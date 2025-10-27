package com.personal.blog.repository;

import com.personal.blog.model.Interview;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InterviewRepository extends MongoRepository<Interview, String> {
    // 根据分类查找
    List<Interview> findByCategory(String category);
}