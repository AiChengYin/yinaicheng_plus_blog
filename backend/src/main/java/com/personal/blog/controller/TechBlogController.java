package com.personal.blog.controller;

import com.personal.blog.model.TechBlog;
import com.personal.blog.repository.TechBlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blog")
public class TechBlogController {

    @Autowired
    private TechBlogRepository techBlogRepository;

    /**
     * 获取所有技术博客文章
     */
    @GetMapping("/all")
    public List<TechBlog> getAllBlogs() {
        return techBlogRepository.findAll();
    }

    /**
     * 根据一级分类获取文章
     */
    @GetMapping("/category/{categoryLevel1}")
    public List<TechBlog> getBlogsByCategoryLevel1(@PathVariable String categoryLevel1) {
        return techBlogRepository.findByCategoryLevel1(categoryLevel1);
    }

    /**
     * 根据一级和二级分类获取文章
     */
    @GetMapping("/category/{categoryLevel1}/{categoryLevel2}")
    public List<TechBlog> getBlogsByCategories(@PathVariable String categoryLevel1, 
                                              @PathVariable String categoryLevel2) {
        return techBlogRepository.findByCategoryLevel1AndCategoryLevel2(categoryLevel1, categoryLevel2);
    }

}