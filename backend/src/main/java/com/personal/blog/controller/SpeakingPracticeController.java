package com.personal.blog.controller;

import com.personal.blog.model.SpeakingPractice;
import com.personal.blog.service.SpeakingPracticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/speakingPractice")
public class SpeakingPracticeController {

    @Autowired
    private SpeakingPracticeService speakingPracticeService;

    // 获取所有SpeakingPractice记录
    @GetMapping("/all")
    public List<SpeakingPractice> getAllSpeakingPractices() {
        return speakingPracticeService.getAllSpeakingPractices();
    }

    // 根据ID获取SpeakingPractice记录
    @GetMapping("/{id}")
    public ResponseEntity<SpeakingPractice> getSpeakingPracticeById(@PathVariable String id) {
        SpeakingPractice speakingPractice = speakingPracticeService.getSpeakingPracticeById(id);
        if (speakingPractice != null) {
            return new ResponseEntity<>(speakingPractice, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // 根据分类获取SpeakingPractice记录
    @GetMapping("/category/{category}")
    public List<SpeakingPractice> getSpeakingPracticesByCategory(@PathVariable String category) {
        return speakingPracticeService.getSpeakingPracticesByCategory(category);
    }

    // 获取所有分类
    @GetMapping("/categories")
    public List<String> getAllCategories() {
        return speakingPracticeService.getAllCategories();
    }

}