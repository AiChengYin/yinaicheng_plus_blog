package com.personal.blog.repository;

import com.personal.blog.model.TechBlog;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TechBlogRepository extends MongoRepository<TechBlog, String> {
    List<TechBlog> findByCategoryLevel1(String categoryLevel1);
    List<TechBlog> findByCategoryLevel1AndCategoryLevel2(String categoryLevel1, String categoryLevel2);
}