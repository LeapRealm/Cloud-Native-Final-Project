package com.firstbusan.wkos.user.api.service;

import com.firstbusan.wkos.user.api.entity.user.User;
import com.firstbusan.wkos.user.api.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User getUser(String userId) {
        return userRepository.findByUserId(userId);
    }
}