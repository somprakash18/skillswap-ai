package com.skillswap.ai.service;

import com.skillswap.ai.entity.Booking;
import com.skillswap.ai.entity.Message;
import com.skillswap.ai.entity.Notification;
import com.skillswap.ai.entity.User;
import com.skillswap.ai.exception.ResourceNotFoundException;
import com.skillswap.ai.repository.BookingRepository;
import com.skillswap.ai.repository.MessageRepository;
import com.skillswap.ai.repository.NotificationRepository;
import com.skillswap.ai.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatService {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    public Message sendMessage(Long senderId, Long receiverId, Long bookingId, String content) {
        User sender = userRepository.findById(senderId).orElseThrow(() -> new ResourceNotFoundException("Sender not found"));
        User receiver = userRepository.findById(receiverId).orElseThrow(() -> new ResourceNotFoundException("Receiver not found"));

        Booking booking = null;
        if (bookingId != null) {
            booking = bookingRepository.findById(bookingId).orElse(null);
        }

        Message message = new Message();
        message.setSender(sender);
        message.setReceiver(receiver);
        message.setBooking(booking);
        message.setContent(content);
        message.setIsRead(false);

        Message savedMessage = messageRepository.save(message);

        notificationRepository.save(new Notification(receiver, "New Message from " + sender.getFullName(),
                content.length() > 50 ? content.substring(0, 47) + "..." : content, "CHAT"));

        return savedMessage;
    }

    public List<Message> getConversation(Long user1, Long user2) {
        return messageRepository.findConversation(user1, user2);
    }

    public List<Message> getBookingMessages(Long bookingId) {
        return messageRepository.findByBookingIdOrderByCreatedAtAsc(bookingId);
    }
}
