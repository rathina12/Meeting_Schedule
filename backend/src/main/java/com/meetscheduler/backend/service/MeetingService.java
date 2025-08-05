package com.meetscheduler.backend.service;

import com.meetscheduler.backend.dto.MeetingRequest;
import com.meetscheduler.backend.dto.MeetingResponse;
import com.meetscheduler.backend.model.Meeting;
import com.meetscheduler.backend.repository.MeetingRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MeetingService {

    private final MeetingRepository repository;

    public MeetingService(MeetingRepository repository) {
        this.repository = repository;
    }

    public MeetingResponse createMeeting(MeetingRequest request) {
        Meeting meeting = Meeting.builder()
                .title(request.getTitle())
                .organizer(request.getOrganizer())
                .participants(request.getParticipants())
                .startTime(LocalDateTime.parse(request.getStartTime()))
                .endTime(LocalDateTime.parse(request.getEndTime()))
                .location(request.getLocation())
                .build();

        Meeting saved = repository.save(meeting);

        return toResponse(saved);
    }

    public List<MeetingResponse> getAllMeetings() {
        return repository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public void deleteMeeting(Long id) {
        repository.deleteById(id);
    }

    public MeetingResponse updateMeeting(Long id, MeetingRequest request) {
        Meeting meeting = repository.findById(id).orElseThrow(() -> new RuntimeException("Meeting not found"));

        meeting.setTitle(request.getTitle());
        meeting.setOrganizer(request.getOrganizer());
        meeting.setParticipants(request.getParticipants());
        meeting.setStartTime(LocalDateTime.parse(request.getStartTime()));
        meeting.setEndTime(LocalDateTime.parse(request.getEndTime()));
        meeting.setLocation(request.getLocation());

        Meeting updated = repository.save(meeting);
        return toResponse(updated);
    }


    private MeetingResponse toResponse(Meeting m) {
        return MeetingResponse.builder()
                .id(m.getId())
                .title(m.getTitle())
                .organizer(m.getOrganizer())
                .participants(m.getParticipants())
                .startTime(m.getStartTime().toString())
                .endTime(m.getEndTime().toString())
                .location(m.getLocation())
                .build();
    }
}
