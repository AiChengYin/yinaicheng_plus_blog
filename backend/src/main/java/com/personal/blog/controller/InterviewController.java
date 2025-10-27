package com.personal.blog.controller;

import com.personal.blog.model.Interview;
import com.personal.blog.service.InterviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/interview")
public class InterviewController {

    @Autowired
    private InterviewService interviewService;

    // 获取所有Interview记录
    @GetMapping("/all")
    public List<Interview> getAllInterviews() {
        return interviewService.getAllInterviews();
    }

    // 根据ID获取Interview记录
    @GetMapping("/{id}")
    public ResponseEntity<Interview> getInterviewById(@PathVariable String id) {
        Interview interview = interviewService.getInterviewById(id);
        if (interview != null) {
            return new ResponseEntity<>(interview, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // 根据分类获取Interview记录
    @GetMapping("/category/{category}")
    public List<Interview> getInterviewsByCategory(@PathVariable String category) {
        return interviewService.getInterviewsByCategory(category);
    }

    // 获取所有分类
    @GetMapping("/categories")
    public List<String> getAllCategories() {
        return interviewService.getAllCategories();
    }

}