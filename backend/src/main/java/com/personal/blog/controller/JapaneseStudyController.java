package com.personal.blog.controller;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/japanese")
public class JapaneseStudyController {

    private final RestTemplate restTemplate = new RestTemplate();

    /**
     * 获取所有日语学习内容
     */
    @ResponseBody
    @GetMapping("/all")
    public Object getAllStudies() {
        String url = "http://localhost:12580/japaneseAll/blogNeed/get";
        // 使用 Map.class 直接接收 JSON → Map
        Map<String, Object> result = restTemplate.getForObject(url, Map.class);
        return result.get("data");
    }

}