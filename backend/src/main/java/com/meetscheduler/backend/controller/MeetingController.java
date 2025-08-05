package com.meetscheduler.backend.controller;


import com.meetscheduler.backend.dto.MeetingRequest;
import com.meetscheduler.backend.dto.MeetingResponse;
import com.meetscheduler.backend.service.MeetingService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/meetings")
@CrossOrigin(origins = "http://localhost:5173")
public class MeetingController {

    private final MeetingService meetingService;

    public MeetingController(MeetingService meetingService) {
        this.meetingService = meetingService;
    }

    @PostMapping
    public MeetingResponse createMeeting(@Valid @RequestBody MeetingRequest request) {
        return meetingService.createMeeting(request);
    }

    @GetMapping
    public List<MeetingResponse> getAllMeetings() {
        return meetingService.getAllMeetings();
    }

    @DeleteMapping("/{id}")
    public void deleteMeeting(@PathVariable Long id) {
        meetingService.deleteMeeting(id);
    }

    @PutMapping("/{id}")
    public MeetingResponse updateMeeting(@PathVariable Long id, @Valid @RequestBody MeetingRequest request) {
        return meetingService.updateMeeting(id, request);
    }


}
