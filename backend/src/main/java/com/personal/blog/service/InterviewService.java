package com.personal.blog.service;

import com.personal.blog.model.Interview;
import com.personal.blog.repository.InterviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InterviewService {

    @Autowired
    private InterviewRepository interviewRepository;

    // 获取所有Interview记录
    public List<Interview> getAllInterviews() {
        return interviewRepository.findAll();
    }

    // 根据ID获取Interview记录
    public Interview getInterviewById(String id) {
        return interviewRepository.findById(id).orElse(null);
    }

    // 根据分类获取Interview记录
    public List<Interview> getInterviewsByCategory(String category) {
        return interviewRepository.findByCategory(category);
    }

    // 获取所有分类（去重）
    public List<String> getAllCategories() {
        List<Interview> allInterviews = interviewRepository.findAll();
        return allInterviews.stream()
                .map(Interview::getCategory)
                .distinct()
                .sorted()
                .collect(Collectors.toList());
    }

}