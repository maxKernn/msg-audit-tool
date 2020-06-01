package com.amos2020.javabackend.controller.request;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.util.List;

public class UpdateAuditRequest {

    // mandatory
    @Getter
    @Setter
    private String auditName;

    // mandatory
    @Getter
    @Setter
    private Date startDate;

    // Not mandatory
    @Getter
    @Setter
    private Date endDate;

    // Not mandatory
    @Getter
    @Setter
    private List<Integer> contactPeople;


    public void isValid() throws IllegalArgumentException {
        assertName();
        assertDate();
        assertContactPersonIds();
    }

    private void assertName() {
        if (auditName == null || auditName.isBlank() || auditName.length() < 3 || auditName.length() > 45) {
            throw new IllegalArgumentException("audit name is invalid");
        }
    }

    private void assertDate() {
        if (startDate == null || endDate == null || endDate.before(startDate)) {
            throw new IllegalArgumentException("Invalid date");
        }
    }

    private void assertContactPersonIds() {
        for (int id : contactPeople) {
            if (id < 1) {
                throw new IllegalArgumentException("Invalid id");
            }
        }
    }
}