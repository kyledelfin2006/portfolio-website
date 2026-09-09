---
category: project
title: Libro
description: A Spring Boot REST API for managing books, with a Docker-first workflow and a PostgreSQL database.
projectCategory: Book management API
stack: [Java, Spring Boot, PostgreSQL 18, Docker, Flyway]
repository: https://github.com/kyledelfin2006/libro-library-system
logo:
  path: images/libro-logo.png
  alt: Libro library system logo
  width: 2816
  height: 1536
order: 1
highlights:
  - Developed a containerized Library REST API with 15+ endpoints for search, pagination, and data aggregation using Java 25, Spring Boot 4.1, and PostgreSQL.
  - Automated database schema migrations with Flyway and standardized API error handling through a centralized global exception handler, improving deployment consistency and preventing unhandled application errors across all REST endpoints..
---

## The problem

Book management needs more than a way to save a title. A useful API must let a client find specific books, navigate a growing catalog, and inspect the collection without retrieving every record at once. Libro brings those operations together in a Spring Boot REST API.

## API workflow

The API supports creating, reading, updating, and deleting books. Search narrows the catalog, while pagination and sorting give clients control over how results are retrieved. Range filtering adds another way to select records. Genre analytics and statistics provide a view of the collection beyond individual books.

These capabilities serve two related needs: maintaining the catalog and understanding what it contains.

## Validation and error handling

Libro uses DTO-driven validation at the API boundary. Keeping request validation explicit makes the accepted input easier to understand and separates it from persistence concerns.

Centralized exception handling provides a common place to handle failures. This keeps error-handling responsibilities from being scattered across individual operations and gives the API a clearer structure to maintain.

## Database and development environment

PostgreSQL 18 is the database, with Flyway managing schema migrations. Versioned migrations make database changes part of the project’s development history.

The Docker-first workflow supports a reproducible environment. Together, containerization and migrations address two practical sources of friction: starting the required services and keeping the database structure aligned with the application.

## Engineering perspective

Libro reflects my focus on maintainable backend systems: explicit inputs, predictable error handling, and a database workflow that travels with the code. These are the foundations I want in place before introducing more architectural complexity.

See the repository for endpoint contracts and setup instructions.
