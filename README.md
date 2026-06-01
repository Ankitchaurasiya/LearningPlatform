Backend Assessment - Learning Platform

Build a REST API backend using Node.js, Express, and PostgreSQL.

Problem Statement

You are building a backend service for an online learning platform.

The platform allows users to enroll in courses and track their progress.

Requirements

1. User Management

Create an API to register a user.

Each user should have:

* Name
* Email

Email must be unique.

2. Course Management

Create an API to create a course.

Each course should have:

* Title
* Description
* Category

3. Enrollment

Users can enroll in courses.

A user cannot enroll in the same course more than once.

4. Course Progress

Users can update their progress in a course.

Progress should be stored as a percentage value between 0 and 100.

5. User Dashboard

Create an API that returns:

* User details
* Total enrolled courses
* Completed courses (progress = 100)
* Average progress across all enrolled courses

6. Leaderboard

Create an API that returns the top users ranked by:

1. Number of completed courses
2. Average progress (used as a tie-breaker)

Leaderboard should support pagination.

Additional Requirements

* Follow REST principles.
* Use PostgreSQL.
* Use parameterized queries.
* Implement proper error handling.
* Validate incoming requests.
* Return meaningful HTTP status codes.
* Organize code into routes, controllers, services, and database layers.
* Add indexes wherever appropriate.
* Prevent duplicate enrollments.
* APIs should be testable using Postman.

Bonus Tasks

1. Search courses by title.
2. Filter courses by category.
3. Add pagination to course listing.
4. Return leaderboard rank for a specific user.
5. Use database transactions where appropriate.

Expected Deliverables

* Database schema
* API implementation
* Validation
* Error handling
* README containing setup instructions and API documentation
