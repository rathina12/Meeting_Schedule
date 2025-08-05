package com.meetscheduler.backend.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MeetingRequest {

    @NotBlank
    private String title;

    @NotBlank
    private String organizer;

    @NotBlank
    private String participants;

    @NotNull
    private String startTime;

    @NotNull
    private String endTime;

    private String location;
}
