# Motivation
Having been through multiple semesters at National University of Singapore (NUS), I often find it difficult to manage my time efficiently. This is especially true during the mid-term and end of semester "crunch time", where deadlines and submissions pile up. PlanNUS was developed with the intention of helping students with work scheduling, deadline meeting and progress tracking.

# Tools and Technologies
1. ReactJS
2. Spring Boot, Spring Security
3. PostgreSQL
4. [NUSMods API](https://api.nusmods.com/v2/)

# Features

## Timetable Scheduling

A fully customizable timetable that supports multi-week planning. Users are able to create, read, update and delete events on the timetable.

## Deadline Tracking

List of deadlines to remind users of outstanding assignment/project submissions. Similar to the timetable, CRUD operations are supported as well.

## Diary

Calendar that provides an overview of each day. After selecting a day, users can view tasks and deadlines, and write diary entries to log their thoughts for the day.

Users can also mark tasks as complete/incomplete to keep track of their progress.

## Statistics

In NUS, each module has a recommended weekly workload (in hours). To help users track progress for each module, the statistics page displays a bar chart to visualize the recommended, plotted, completed work hours for each module taken by the user. Plotted work hours corresponds to the total number of hours attained from summing up all events in the timetable. Completed work hours corresponds to the total number of hours attained from summing up all events that are marked as completed in the diary.

## Import from NUSMods

PlanNUS supports integration with popular module planning website [NUSMods](https://nusmods.com/). After selecting their preferred modules to take, users can export the timetable from NUSMods to PlanNUS to further customize their timetables.

## Authentication and Authorization

The application supports basic authentication and authorization using Spring Security. Upon authentication, users will be assigned JSON Web Token (JWT) access and refresh tokens. Access tokens are used for user authorization for application usage. Upon expiry of access tokens, refresh tokens are used to renew access tokens for continued application usage.

# Further Extensions

1. Constraint based timetable scheduling. Utilize NUSMods to design a timetable automatically based on users' preferences.
2. Import/Export PlanNUS timetable. Allow friends to synchronize their schedules to study together.