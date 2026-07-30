# Build a Spring Boot User API with AI Agents and Skills

# Project Goal

This document demonstrates the difference between an **AI Agent** and an **AI Skill** using two practical Spring Boot use cases:

1. **Add User API using an AI Agent**
2. **Update User API using a reusable Skill**

The code uses:

- Java 21
- Spring Boot 3
- Spring Web
- Spring Data JPA
- Jakarta Bean Validation
- PostgreSQL
- Maven
- JUnit 5
- Mockito
- MockMvc
- Lombok

## What You Will Build

This hands-on project builds a Spring Boot REST API for creating and updating users. You will use an AI Agent for the complete Add User API goal and a reusable AI Skill for the Update User API workflow.

By the end, you will have practiced:

- Spring Boot REST API design with layered architecture
- PostgreSQL persistence with Spring Data JPA
- Jakarta Bean Validation and consistent API errors
- Unit and controller testing with JUnit 5, Mockito, and MockMvc
- AI-assisted implementation, debugging, documentation, and code review

## Project Requirements

Install Java 21, Maven, PostgreSQL, and an AI coding assistant that can inspect files, edit code, run tests, and review a Git diff.

## How to Use an AI Agent for Spring Boot Development

An AI Agent owns the complete business goal. It can inspect the repository, plan the work, implement the User API, generate tests, run Maven verification, fix failures, and summarize the final change.

## How to Create a Reusable AI Skill

An AI Skill stores repeatable implementation rules in a focused workflow. In this project, `spring-update-user/SKILL.md` defines the validation, protected fields, transaction, error response, test, and verification rules for updating a user.


# 1. Agent and Skill Overview

## What is an Agent?

An **agent** owns a complete business goal.

For the Add User use case, the agent can:

1. Read the requirement.
2. Inspect the existing project.
3. Identify affected files.
4. Create a plan.
5. Generate entity, DTO, repository, service, and controller code.
6. Add validation and exception handling.
7. Generate tests.
8. Run the Maven build.
9. Fix compilation or test failures.
10. Review the final Git diff.
11. Return a completion summary.

The agent decides which steps and tools are needed.

## What is a Skill?

A **skill** is a reusable workflow that teaches the agent how to perform one focused type of work consistently.

For the Update User use case, we create a skill named:

```text
spring-update-user
```

The skill tells Codex:

- Which files to inspect
- Which validation rules to apply
- How to implement update logic
- Where to place transactions
- Which error responses to return
- Which tests are mandatory
- Which commands to run

The skill does not independently own the overall goal. The agent uses the skill to perform the update workflow.


# 2. Project Structure

```text
user-service/
|-- AGENTS.md
|-- .codex/
|   `-- skills/
|       `-- spring-update-user/
|           `-- SKILL.md
|-- pom.xml
`-- src/
    |-- main/
    |   |-- java/com/javacodeex/userservice/
    |   |   |-- UserServiceApplication.java
    |   |   |-- controller/
    |   |   |   `-- UserController.java
    |   |   |-- dto/
    |   |   |   |-- CreateUserRequest.java
    |   |   |   |-- UpdateUserRequest.java
    |   |   |   |-- UserResponse.java
    |   |   |   `-- ApiError.java
    |   |   |-- entity/
    |   |   |   |-- User.java
    |   |   |   `-- UserStatus.java
    |   |   |-- exception/
    |   |   |   |-- DuplicateUserException.java
    |   |   |   |-- UserNotFoundException.java
    |   |   |   `-- GlobalExceptionHandler.java
    |   |   |-- mapper/
    |   |   |   `-- UserMapper.java
    |   |   |-- repository/
    |   |   |   `-- UserRepository.java
    |   |   `-- service/
    |   |       `-- UserService.java
    |   |-- resources/
    |   |   `-- application.yml
    |   `-- test/
    |       `-- java/com/javacodeex/userservice/
    |           |-- controller/
    |           |   `-- UserControllerTest.java
    |           `-- service/
    |               `-- UserServiceTest.java
```


# 3. Maven Configuration

## `pom.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="
            http://maven.apache.org/POM/4.0.0
            https://maven.apache.org/xsd/maven-4.0.0.xsd">

    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.3.2</version>
        <relativePath/>
    </parent>

    <groupId>com.javacodeex</groupId>
    <artifactId>user-service</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>user-service</name>

    <properties>
        <java.version>21</java.version>
    </properties>

    <dependencies>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>

        <dependency>
            <groupId>org.postgresql</groupId>
            <artifactId>postgresql</artifactId>
            <scope>runtime</scope>
        </dependency>

        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>

    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>
```


# 4. Application Configuration

## `application.yml`

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/userdb
    username: postgres
    password: postgres

  jpa:
    hibernate:
      ddl-auto: update
    open-in-view: false
    properties:
      hibernate:
        format_sql: true

server:
  port: 8080
```

For production systems, use Flyway or Liquibase instead of `ddl-auto: update`.


# 5. Common Domain Code

## `UserStatus.java`

```java
package com.javacodeex.userservice.entity;

public enum UserStatus {
    ACTIVE,
    INACTIVE
}
```

## `User.java`

```java
package com.javacodeex.userservice.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(
    name = "users",
    uniqueConstraints = {
        @UniqueConstraint(
            name = "uk_users_email",
            columnNames = "email"
        )
    }
)
@Getter
@Setter
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String firstName;

    @Column(nullable = false, length = 100)
    private String lastName;

    @Column(nullable = false, length = 255)
    private String email;

    @Column(length = 20)
    private String phoneNumber;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private UserStatus status;
}
```

## `UserRepository.java`

```java
package com.javacodeex.userservice.repository;

import com.javacodeex.userservice.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByEmailIgnoreCase(String email);
}
```


# 6. DTOs

## `CreateUserRequest.java`

```java
package com.javacodeex.userservice.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record CreateUserRequest(

    @NotBlank(message = "First name is required")
    @Size(max = 100, message = "First name must not exceed 100 characters")
    String firstName,

    @NotBlank(message = "Last name is required")
    @Size(max = 100, message = "Last name must not exceed 100 characters")
    String lastName,

    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    @Size(max = 255, message = "Email must not exceed 255 characters")
    String email,

    @Pattern(
        regexp = "^[0-9]{10}$",
        message = "Phone number must contain exactly 10 digits"
    )
    String phoneNumber
) {
}
```

## `UpdateUserRequest.java`

```java
package com.javacodeex.userservice.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record UpdateUserRequest(

    @NotBlank(message = "First name is required")
    @Size(max = 100, message = "First name must not exceed 100 characters")
    String firstName,

    @NotBlank(message = "Last name is required")
    @Size(max = 100, message = "Last name must not exceed 100 characters")
    String lastName,

    @Pattern(
        regexp = "^[0-9]{10}$",
        message = "Phone number must contain exactly 10 digits"
    )
    String phoneNumber
) {
}
```

Notice that `UpdateUserRequest` does not contain `email` or `status`. This prevents clients from modifying protected fields.

## `UserResponse.java`

```java
package com.javacodeex.userservice.dto;

import com.javacodeex.userservice.entity.UserStatus;

public record UserResponse(
    Long id,
    String firstName,
    String lastName,
    String email,
    String phoneNumber,
    UserStatus status
) {
}
```

## `ApiError.java`

```java
package com.javacodeex.userservice.dto;

import java.time.Instant;
import java.util.Map;

public record ApiError(
    int status,
    String code,
    String message,
    Instant timestamp,
    Map<String, String> validationErrors
) {
}
```


# 7. Mapper

## `UserMapper.java`

```java
package com.javacodeex.userservice.mapper;

import com.javacodeex.userservice.dto.CreateUserRequest;
import com.javacodeex.userservice.dto.UserResponse;
import com.javacodeex.userservice.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public User toEntity(CreateUserRequest request) {
        User user = new User();
        user.setFirstName(request.firstName().trim());
        user.setLastName(request.lastName().trim());
        user.setPhoneNumber(request.phoneNumber());
        return user;
    }

    public UserResponse toResponse(User user) {
        return new UserResponse(
            user.getId(),
            user.getFirstName(),
            user.getLastName(),
            user.getEmail(),
            user.getPhoneNumber(),
            user.getStatus()
        );
    }
}
```


# 8. Exceptions

## `DuplicateUserException.java`

```java
package com.javacodeex.userservice.exception;

public class DuplicateUserException extends RuntimeException {

    public DuplicateUserException(String message) {
        super(message);
    }
}
```

## `UserNotFoundException.java`

```java
package com.javacodeex.userservice.exception;

public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException(String message) {
        super(message);
    }
}
```

## `GlobalExceptionHandler.java`

```java
package com.javacodeex.userservice.exception;

import com.javacodeex.userservice.dto.ApiError;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(DuplicateUserException.class)
    public ResponseEntity<ApiError> handleDuplicateUser(
        DuplicateUserException exception
    ) {
        ApiError error = new ApiError(
            HttpStatus.CONFLICT.value(),
            "USER_ALREADY_EXISTS",
            exception.getMessage(),
            Instant.now(),
            Map.of()
        );

        return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ApiError> handleUserNotFound(
        UserNotFoundException exception
    ) {
        ApiError error = new ApiError(
            HttpStatus.NOT_FOUND.value(),
            "USER_NOT_FOUND",
            exception.getMessage(),
            Instant.now(),
            Map.of()
        );

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> handleValidation(
        MethodArgumentNotValidException exception
    ) {
        Map<String, String> validationErrors = new LinkedHashMap<>();

        exception.getBindingResult()
            .getFieldErrors()
            .forEach(error ->
                validationErrors.put(
                    error.getField(),
                    error.getDefaultMessage()
                )
            );

        ApiError error = new ApiError(
            HttpStatus.BAD_REQUEST.value(),
            "VALIDATION_FAILED",
            "Request validation failed",
            Instant.now(),
            validationErrors
        );

        return ResponseEntity.badRequest().body(error);
    }
}
```


# 9. Add User API Using an Agent

## 9.1 Business Requirement

Create a new user with:

- First name
- Last name
- Email
- Phone number

Rules:

- Email must be unique.
- Email must be normalized to lowercase.
- New users must have `ACTIVE` status.
- Return HTTP `201 Created`.
- Return the resource URL in the `Location` header.
- Return HTTP `409 Conflict` for duplicate email.
- Validate all input fields.
- Add unit and controller tests.

## 9.2 Agent Prompt

Use this prompt in Codex CLI or another coding agent:

```text
Implement the Add User API end to end in this Spring Boot project.

Requirement:
- Endpoint: POST /api/v1/users
- Request fields: firstName, lastName, email, phoneNumber
- Validate all fields
- Normalize email using trim and lowercase
- Reject duplicate email
- Set status to ACTIVE
- Return HTTP 201
- Add Location response header
- Return HTTP 409 for duplicate email
- Follow the existing controller-service-repository architecture
- Use constructor injection
- Keep transaction boundaries in the service layer
- Add JUnit 5, Mockito, and MockMvc tests
- Run ./mvnw verify
- Review the final git diff
- Do not commit or push
```

## 9.3 How the Agent Executes

```text
User Prompt
    â†“
Agent reads AGENTS.md
    â†“
Agent inspects project structure
    â†“
Agent finds similar APIs
    â†“
Agent creates implementation plan
    â†“
Agent creates DTO, service, controller, mapper, exceptions
    â†“
Agent generates tests
    â†“
Agent runs Maven verification
    â†“
Agent fixes failures
    â†“
Agent reviews final diff
    â†“
Agent returns summary
```

The agent owns the entire Add User goal.

## 9.4 Add User Service Code

## `UserService.java`

```java
package com.javacodeex.userservice.service;

import com.javacodeex.userservice.dto.CreateUserRequest;
import com.javacodeex.userservice.dto.UpdateUserRequest;
import com.javacodeex.userservice.dto.UserResponse;
import com.javacodeex.userservice.entity.User;
import com.javacodeex.userservice.entity.UserStatus;
import com.javacodeex.userservice.exception.DuplicateUserException;
import com.javacodeex.userservice.exception.UserNotFoundException;
import com.javacodeex.userservice.mapper.UserMapper;
import com.javacodeex.userservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Locale;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Transactional
    public UserResponse createUser(CreateUserRequest request) {
        String normalizedEmail = request.email()
            .trim()
            .toLowerCase(Locale.ROOT);

        if (userRepository.existsByEmailIgnoreCase(normalizedEmail)) {
            throw new DuplicateUserException(
                "A user already exists with email: " + normalizedEmail
            );
        }

        User user = userMapper.toEntity(request);
        user.setEmail(normalizedEmail);
        user.setStatus(UserStatus.ACTIVE);

        User savedUser = userRepository.save(user);

        return userMapper.toResponse(savedUser);
    }

    @Transactional
    public UserResponse updateUser(
        Long userId,
        UpdateUserRequest request
    ) {
        User user = userRepository.findById(userId)
            .orElseThrow(() ->
                new UserNotFoundException(
                    "User not found with id: " + userId
                )
            );

        user.setFirstName(request.firstName().trim());
        user.setLastName(request.lastName().trim());
        user.setPhoneNumber(request.phoneNumber());

        return userMapper.toResponse(user);
    }
}
```

## 9.5 Add User Controller Code

## `UserController.java`

```java
package com.javacodeex.userservice.controller;

import com.javacodeex.userservice.dto.CreateUserRequest;
import com.javacodeex.userservice.dto.UpdateUserRequest;
import com.javacodeex.userservice.dto.UserResponse;
import com.javacodeex.userservice.service.UserService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@Validated
public class UserController {

    private final UserService userService;

    @PostMapping
    public ResponseEntity<UserResponse> createUser(
        @Valid @RequestBody CreateUserRequest request
    ) {
        UserResponse response = userService.createUser(request);

        URI location = ServletUriComponentsBuilder
            .fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(response.id())
            .toUri();

        return ResponseEntity
            .created(location)
            .body(response);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<UserResponse> updateUser(
        @PathVariable @Positive Long userId,
        @Valid @RequestBody UpdateUserRequest request
    ) {
        UserResponse response =
            userService.updateUser(userId, request);

        return ResponseEntity.ok(response);
    }
}
```


# 10. Add User Tests

## `UserServiceTest.java`

```java
package com.javacodeex.userservice.service;

import com.javacodeex.userservice.dto.CreateUserRequest;
import com.javacodeex.userservice.dto.UserResponse;
import com.javacodeex.userservice.entity.User;
import com.javacodeex.userservice.entity.UserStatus;
import com.javacodeex.userservice.exception.DuplicateUserException;
import com.javacodeex.userservice.mapper.UserMapper;
import com.javacodeex.userservice.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserMapper userMapper;

    private UserService userService;

    @BeforeEach
    void setUp() {
        userService = new UserService(
            userRepository,
            userMapper
        );
    }

    @Test
    void shouldCreateUserSuccessfully() {
        CreateUserRequest request = new CreateUserRequest(
            "Anand",
            "Jangali",
            " ANAND@EXAMPLE.COM ",
            "9876543210"
        );

        User mappedUser = new User();

        User savedUser = new User();
        savedUser.setId(101L);
        savedUser.setFirstName("Anand");
        savedUser.setLastName("Jangali");
        savedUser.setEmail("anand@example.com");
        savedUser.setPhoneNumber("9876543210");
        savedUser.setStatus(UserStatus.ACTIVE);

        UserResponse expectedResponse = new UserResponse(
            101L,
            "Anand",
            "Jangali",
            "anand@example.com",
            "9876543210",
            UserStatus.ACTIVE
        );

        when(userRepository.existsByEmailIgnoreCase(
            "anand@example.com"
        )).thenReturn(false);

        when(userMapper.toEntity(request))
            .thenReturn(mappedUser);

        when(userRepository.save(mappedUser))
            .thenReturn(savedUser);

        when(userMapper.toResponse(savedUser))
            .thenReturn(expectedResponse);

        UserResponse response =
            userService.createUser(request);

        assertThat(response).isEqualTo(expectedResponse);

        ArgumentCaptor<User> userCaptor =
            ArgumentCaptor.forClass(User.class);

        verify(userRepository).save(userCaptor.capture());

        User capturedUser = userCaptor.getValue();

        assertThat(capturedUser.getEmail())
            .isEqualTo("anand@example.com");

        assertThat(capturedUser.getStatus())
            .isEqualTo(UserStatus.ACTIVE);
    }

    @Test
    void shouldRejectDuplicateEmail() {
        CreateUserRequest request = new CreateUserRequest(
            "Anand",
            "Jangali",
            "anand@example.com",
            "9876543210"
        );

        when(userRepository.existsByEmailIgnoreCase(
            "anand@example.com"
        )).thenReturn(true);

        assertThatThrownBy(() ->
            userService.createUser(request)
        )
            .isInstanceOf(DuplicateUserException.class)
            .hasMessageContaining("anand@example.com");

        verify(userRepository, never()).save(any());
    }
}
```

## Add User Controller Test

```java
package com.javacodeex.userservice.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.javacodeex.userservice.dto.CreateUserRequest;
import com.javacodeex.userservice.dto.UserResponse;
import com.javacodeex.userservice.entity.UserStatus;
import com.javacodeex.userservice.exception.GlobalExceptionHandler;
import com.javacodeex.userservice.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class)
@Import(GlobalExceptionHandler.class)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private UserService userService;

    @Test
    void shouldCreateUserAndReturn201() throws Exception {
        CreateUserRequest request = new CreateUserRequest(
            "Anand",
            "Jangali",
            "anand@example.com",
            "9876543210"
        );

        UserResponse response = new UserResponse(
            101L,
            "Anand",
            "Jangali",
            "anand@example.com",
            "9876543210",
            UserStatus.ACTIVE
        );

        when(userService.createUser(request))
            .thenReturn(response);

        mockMvc.perform(
            post("/api/v1/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request))
        )
            .andExpect(status().isCreated())
            .andExpect(header().string(
                "Location",
                "http://localhost/api/v1/users/101"
            ))
            .andExpect(jsonPath("$.id").value(101))
            .andExpect(jsonPath("$.email")
                .value("anand@example.com"))
            .andExpect(jsonPath("$.status")
                .value("ACTIVE"));
    }

    @Test
    void shouldReturn400ForInvalidEmail() throws Exception {
        CreateUserRequest request = new CreateUserRequest(
            "Anand",
            "Jangali",
            "invalid-email",
            "9876543210"
        );

        mockMvc.perform(
            post("/api/v1/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request))
        )
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.code")
                .value("VALIDATION_FAILED"))
            .andExpect(jsonPath(
                "$.validationErrors.email"
            ).exists());
    }
}
```


# 11. Update User API Using a Skill

## 11.1 Why Use a Skill?

The Update User implementation is a repeatable workflow.

Many projects need the same steps:

1. Validate the user ID.
2. Validate the request body.
3. Load the existing user.
4. Return `404` when missing.
5. Update only allowed fields.
6. Protect immutable fields.
7. Use a transaction.
8. Return the updated response.
9. Add unit tests.
10. Add controller tests.
11. Run Maven verification.

Instead of repeating these instructions in every prompt, store them in a skill.


# 12. Update User Skill File

Create:

```text
.codex/skills/spring-update-user/SKILL.md
```

## `SKILL.md`

```yaml
name: spring-update-user
description: >
  Implement or update a Spring Boot user-update workflow.
  Use when adding PUT or PATCH APIs that load an existing user,
  validate editable fields, protect immutable fields, return 404
  for missing users, use service-layer transactions, and add tests.

# Spring Update User Workflow

## Goal

Implement a safe update flow for an existing user.

## Required analysis

1. Read the nearest AGENTS.md.
2. Inspect the current User entity.
3. Inspect existing DTO, controller, service, repository, mapper,
   exception, and test conventions.
4. Identify which fields are editable and immutable.
5. Reuse existing abstractions whenever possible.

## Implementation rules

1. Use `PUT /api/v1/users/{userId}` unless the requirement specifies PATCH.
2. Validate `userId` as a positive number.
3. Use a dedicated `UpdateUserRequest`.
4. Do not include immutable fields in the request DTO.
5. Load the user with `findById`.
6. Throw `UserNotFoundException` when the user does not exist.
7. Update only explicitly allowed fields.
8. Place `@Transactional` on the service method.
9. Use JPA dirty checking for a managed entity.
10. Return `UserResponse`.
11. Return HTTP 200 for a successful update.
12. Never expose the JPA entity directly from the controller.

## Mandatory tests

Create tests for:

- successful update
- user not found
- invalid request data
- invalid user ID
- protected fields not being editable
- correct HTTP 200 response
- correct HTTP 404 response

## Verification

Run:

```bash
./mvnw test
./mvnw verify
git diff --check
```

## Output

Report:

- files changed
- behavior implemented
- tests added
- verification results
- remaining risks

Do not commit or push unless explicitly requested.
```


# 13. Invoking the Skill

Start Codex in the repository:

```bash
cd user-service
codex
```

Check available skills:

```text
/skills
```

Invoke the skill explicitly:

```text
$spring-update-user Implement Update User.

Requirements:
- Endpoint: PUT /api/v1/users/{userId}
- Editable fields: firstName, lastName, phoneNumber
- Immutable fields: email, status
- Return 404 when user does not exist
- Return 200 when update succeeds
- Add all mandatory tests
- Run Maven verification
- Do not commit
```


# 14. How the Update User Skill Works

```text
Agent receives prompt
    â†“
Agent explicitly loads spring-update-user skill
    â†“
Skill provides update workflow
    â†“
Agent inspects existing User code
    â†“
Agent creates UpdateUserRequest
    â†“
Agent updates service and controller
    â†“
Agent adds not-found handling
    â†“
Agent generates tests
    â†“
Agent runs Maven verification
    â†“
Agent reports result
```

The agent still performs the work. The skill supplies the reusable implementation procedure.


# 15. Update User Code

The update method is already present in `UserService`:

```java
@Transactional
public UserResponse updateUser(
    Long userId,
    UpdateUserRequest request
) {
    User user = userRepository.findById(userId)
        .orElseThrow(() ->
            new UserNotFoundException(
                "User not found with id: " + userId
            )
        );

    user.setFirstName(request.firstName().trim());
    user.setLastName(request.lastName().trim());
    user.setPhoneNumber(request.phoneNumber());

    return userMapper.toResponse(user);
}
```

Important points:

- The user is loaded first.
- A missing user returns `404`.
- Only permitted fields are changed.
- Email and status are not part of the request.
- The method is transactional.
- JPA dirty checking persists the changes.

The controller method is:

```java
@PutMapping("/{userId}")
public ResponseEntity<UserResponse> updateUser(
    @PathVariable @Positive Long userId,
    @Valid @RequestBody UpdateUserRequest request
) {
    UserResponse response =
        userService.updateUser(userId, request);

    return ResponseEntity.ok(response);
}
```


# 16. Update User Tests

Add the following tests to `UserServiceTest`.

```java
@Test
void shouldUpdateUserSuccessfully() {
    UpdateUserRequest request = new UpdateUserRequest(
        "Anand Kumar",
        "Jangali",
        "9988776655"
    );

    User existingUser = new User();
    existingUser.setId(101L);
    existingUser.setFirstName("Anand");
    existingUser.setLastName("Jangali");
    existingUser.setEmail("anand@example.com");
    existingUser.setPhoneNumber("9876543210");
    existingUser.setStatus(UserStatus.ACTIVE);

    UserResponse expectedResponse = new UserResponse(
        101L,
        "Anand Kumar",
        "Jangali",
        "anand@example.com",
        "9988776655",
        UserStatus.ACTIVE
    );

    when(userRepository.findById(101L))
        .thenReturn(java.util.Optional.of(existingUser));

    when(userMapper.toResponse(existingUser))
        .thenReturn(expectedResponse);

    UserResponse response =
        userService.updateUser(101L, request);

    assertThat(response).isEqualTo(expectedResponse);
    assertThat(existingUser.getFirstName())
        .isEqualTo("Anand Kumar");
    assertThat(existingUser.getPhoneNumber())
        .isEqualTo("9988776655");
    assertThat(existingUser.getEmail())
        .isEqualTo("anand@example.com");
    assertThat(existingUser.getStatus())
        .isEqualTo(UserStatus.ACTIVE);

    verify(userRepository).findById(101L);
    verify(userRepository, never()).save(any());
}

@Test
void shouldThrowExceptionWhenUserDoesNotExist() {
    UpdateUserRequest request = new UpdateUserRequest(
        "Anand Kumar",
        "Jangali",
        "9988776655"
    );

    when(userRepository.findById(999L))
        .thenReturn(java.util.Optional.empty());

    assertThatThrownBy(() ->
        userService.updateUser(999L, request)
    )
        .isInstanceOf(UserNotFoundException.class)
        .hasMessageContaining("999");

    verify(userMapper, never()).toResponse(any());
}
```

## Update User Controller Test

```java
@Test
void shouldUpdateUserAndReturn200() throws Exception {
    UpdateUserRequest request = new UpdateUserRequest(
        "Anand Kumar",
        "Jangali",
        "9988776655"
    );

    UserResponse response = new UserResponse(
        101L,
        "Anand Kumar",
        "Jangali",
        "anand@example.com",
        "9988776655",
        UserStatus.ACTIVE
    );

    when(userService.updateUser(101L, request))
        .thenReturn(response);

    mockMvc.perform(
        put("/api/v1/users/{userId}", 101L)
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request))
    )
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.id").value(101))
        .andExpect(jsonPath("$.firstName")
            .value("Anand Kumar"))
        .andExpect(jsonPath("$.email")
            .value("anand@example.com"));
}
```

Add this static import:

```java
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
```

## Not Found Controller Test

```java
@Test
void shouldReturn404WhenUpdatingMissingUser() throws Exception {
    UpdateUserRequest request = new UpdateUserRequest(
        "Anand Kumar",
        "Jangali",
        "9988776655"
    );

    when(userService.updateUser(999L, request))
        .thenThrow(
            new UserNotFoundException(
                "User not found with id: 999"
            )
        );

    mockMvc.perform(
        put("/api/v1/users/{userId}", 999L)
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request))
    )
        .andExpect(status().isNotFound())
        .andExpect(jsonPath("$.code")
            .value("USER_NOT_FOUND"));
}
```


# 17. Sample API Requests

## Add User

```bash
curl --request POST \
  --url http://localhost:8080/api/v1/users \
  --header "Content-Type: application/json" \
  --data '{
    "firstName": "Anand",
    "lastName": "Jangali",
    "email": "anand@example.com",
    "phoneNumber": "9876543210"
  }'
```

Expected status:

```text
201 Created
```

Expected response:

```json
{
  "id": 101,
  "firstName": "Anand",
  "lastName": "Jangali",
  "email": "anand@example.com",
  "phoneNumber": "9876543210",
  "status": "ACTIVE"
}
```

## Update User

```bash
curl --request PUT \
  --url http://localhost:8080/api/v1/users/101 \
  --header "Content-Type: application/json" \
  --data '{
    "firstName": "Anand Kumar",
    "lastName": "Jangali",
    "phoneNumber": "9988776655"
  }'
```

Expected status:

```text
200 OK
```

Expected response:

```json
{
  "id": 101,
  "firstName": "Anand Kumar",
  "lastName": "Jangali",
  "email": "anand@example.com",
  "phoneNumber": "9988776655",
  "status": "ACTIVE"
}
```


# 18. Add User Agent vs Update User Skill

| Area | Add User Using Agent | Update User Using Skill |
|---|---|---|
| Goal ownership | Agent owns complete feature | Agent owns goal and uses skill |
| Instructions | Provided in the prompt | Stored in `SKILL.md` |
| Reusability | Prompt may be rewritten | Skill can be reused |
| Planning | Agent creates full plan | Agent follows skill workflow |
| Best use | New or broad feature | Repeated implementation pattern |
| Example | Build Add User end to end | Safely update an existing user |
| Test requirements | Agent determines from prompt | Skill enforces mandatory tests |
| Consistency | Depends on prompt quality | Higher consistency across tasks |


# 19. Suggested `AGENTS.md`

```markdown
# User Service Instructions

## Technology

- Java 21
- Spring Boot 3
- Maven
- PostgreSQL
- JUnit 5
- Mockito
- MockMvc

## Architecture

- Follow Controller â†’ Service â†’ Repository.
- Use constructor injection.
- Keep business logic in the service layer.
- Use DTOs for API requests and responses.
- Never expose JPA entities from controllers.
- Put transaction boundaries in service methods.

## API

- Use `/api/v1` endpoints.
- Apply Jakarta Bean Validation.
- Return 201 for resource creation.
- Return 200 for successful updates.
- Return 404 for missing resources.
- Return 409 for duplicate-resource conflicts.

## Database

- Normalize email before persistence.
- Enforce unique email at both service and database levels.
- Review JPA code for N+1 and unbounded queries.
- Use Flyway for production schema changes.

## Verification

Run:

```bash
./mvnw test
./mvnw verify
git diff --check
```

Do not claim completion when tests fail.

## Git Safety

Do not commit, push, or create a pull request unless explicitly requested.
```


# 20. Demo Flow for Your AI Session

## Part 1: Explain the Agent

Say:

```text
The agent owns the complete Add User business goal.
It reads the requirement, inspects the project, generates code,
runs tests, fixes failures, and returns the final result.
```

Run:

```text
Implement the Add User API end to end.
```

Show:

- Agent planning
- File exploration
- Code generation
- Test execution
- Final summary

## Part 2: Explain the Skill

Say:

```text
The Update User flow is repetitive.
Instead of repeating all implementation rules,
we store them in spring-update-user/SKILL.md.
```

Run:

```text
$spring-update-user Implement Update User.
```

Show:

- Skill discovery
- Skill instructions
- Update logic
- Protected fields
- Tests
- Verification

## Part 3: Explain the Difference

```text
Agent = owns and completes the goal.
Skill = reusable procedure used by the agent.
```


## Frequently Asked Questions

## What is the difference between an AI Agent and an AI Skill?

An AI Agent owns and completes a broad development goal. An AI Skill is a reusable procedure that the agent follows for a focused task, such as updating a User API.

## Can this project be used with Spring Boot 3?

Yes. The examples target Spring Boot 3, Java 21, Spring Web, Spring Data JPA, Jakarta Validation, PostgreSQL, and Maven.

## Does the AI write production-ready code automatically?

No. Generated code must be reviewed for correctness, security, licensing, maintainability, and project-specific requirements. Tests and human engineering judgment remain essential.

## What APIs are included in the project?

The guide covers an Add User API and an Update User API, including validation, duplicate-user handling, protected fields, tests, and Maven verification.


### About This Guide

This practical guide was prepared by Java Codeex for Java and Spring Boot developers learning AI-assisted software development. It focuses on repeatable engineering workflows rather than blindly accepting generated code.


# 21. Final Summary

The **Add User API** demonstrates an agent-led workflow. The agent receives a broad goal, understands the repository, plans the work, writes code, creates tests, runs verification, and reports the final result.

The **Update User API** demonstrates skill-based execution. The reusable `spring-update-user` skill defines the required update workflow, validation rules, transaction rules, protected fields, tests, and verification commands.

The most important relationship is:

```text
User requirement
      â†“
Agent
      â†“
Loads project instructions
      â†“
Selects or explicitly invokes a skill
      â†“
Uses tools such as Maven, Git, and the IDE
      â†“
Completes and verifies the code change
```
