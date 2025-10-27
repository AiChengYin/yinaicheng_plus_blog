package com.personal.blog.repository;

import com.personal.blog.model.ProjectShowcase;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectShowcaseRepository extends MongoRepository<ProjectShowcase, String> {
    List<ProjectShowcase> findByProjectCategory(String projectCategory);
}