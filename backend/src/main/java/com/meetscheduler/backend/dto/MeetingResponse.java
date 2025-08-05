package com.meetscheduler.backend.dto;


import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MeetingResponse {

    private Long id;
    private String title;
    private String organizer;
    private String participants;
    private String startTime;
    private String endTime;
    private String location;
}
