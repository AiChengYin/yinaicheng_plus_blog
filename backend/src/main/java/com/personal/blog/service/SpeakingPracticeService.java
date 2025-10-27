package com.personal.blog.service;

import com.personal.blog.model.SpeakingPractice;
import com.personal.blog.repository.SpeakingPracticeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SpeakingPracticeService {

    @Autowired
    private SpeakingPracticeRepository speakingPracticeRepository;

    // 获取所有SpeakingPractice记录
    public List<SpeakingPractice> getAllSpeakingPractices() {
        return speakingPracticeRepository.findAll();
    }

    // 根据ID获取SpeakingPractice记录
    public SpeakingPractice getSpeakingPracticeById(String id) {
        return speakingPracticeRepository.findById(id).orElse(null);
    }

    // 根据分类获取SpeakingPractice记录
    public List<SpeakingPractice> getSpeakingPracticesByCategory(String category) {
        return speakingPracticeRepository.findByCategory(category);
    }

    // 获取所有分类（去重）
    public List<String> getAllCategories() {
        List<SpeakingPractice> allSpeakingPractices = speakingPracticeRepository.findAll();
        return allSpeakingPractices.stream()
                .map(SpeakingPractice::getCategory)
                .distinct()
                .sorted()
                .collect(Collectors.toList());
    }

}