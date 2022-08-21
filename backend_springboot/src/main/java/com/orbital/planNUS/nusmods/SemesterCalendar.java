package com.orbital.planNUS.nusmods;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class SemesterCalendar {
    public static List<List<LocalDate>> getSemesterOneDates() {
        int numWeeks = 13;
        List<List<LocalDate>> weeks = new ArrayList<>();
        List<LocalDate> week = new ArrayList<>();
        LocalDate date = LocalDate.of(2022,8,8);
        for (int i = 1; i <= numWeeks; i++) {
            if (i == 7) {
                // recess week
                date = date.plusDays(7);
            }
            for (int j = 0; j < 7; j++) {
                week.add(date);
                date = date.plusDays(1);
            }
            weeks.add(week);
            week = new ArrayList<>();
        }
        return weeks;
    }
}
