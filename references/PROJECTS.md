# Project Catalog

This document is the canonical source of truth for Kyle’s projects. Portfolio summaries and case studies should be derived from these entries. Add a project here before publishing it elsewhere, and record only capabilities, outcomes, and technologies that can be supported by the project or its repository.

## Libro

| Field | Value |
| --- | --- |
| Category | Book management API |
| Repository | <https://github.com/kyledelfin2006/libro-library-system> |
| Technologies | Java, Spring Boot, PostgreSQL 18, Docker, Flyway |

### Summary

Libro is a Spring Boot REST API for managing books. It combines catalog maintenance and collection analysis in a Docker-first development workflow backed by PostgreSQL 18.

### Capabilities

- Create, read, update, and delete books
- Search, pagination, and sorting
- Range filtering
- Genre analytics and collection statistics
- DTO-driven request validation
- Centralized exception handling
- Versioned database migrations with Flyway

### Architecture and data

Libro uses explicit DTOs at the API boundary, centralized handling for application failures, PostgreSQL for persistence, and Flyway for schema migrations. Docker provides a reproducible environment for the application and its required services.

## Tabang

| Field | Value |
| --- | --- |
| Category | Flood reporting and response |
| Repository | <https://github.com/kyledelfin2006/tabang-hackathon-project> |
| Event | UPV KomsaiHack 2026 |
| Result | 7th place among more than 25 teams |
| Certificate | `certificates/TABANG.RISKREADY.CERTIFICATE.png` (states Top 10 placement) |

### Summary

Tabang is a flood reporting and response application for Aklan. It coordinates incident reporting, requests for help, responder actions, and responder approval.

### Users and workflow

- Residents report flooding and request help.
- Responders claim incidents and mark them resolved.
- Reviewers approve applicants before they become responders.
- Claiming an incident and resolving it are separate steps.

### Context

Tabang was originally built for UPV KomsaiHack 2026 and placed seventh among more than 25 teams.

## FaceLog

| Field | Value |
| --- | --- |
| Category | Offline attendance desktop application |
| Repository | <https://github.com/DevGuild-ASU/FaceLog> |
| Technologies | Python, SQLite, webcam input, CSV |

### Summary

FaceLog is a local, offline desktop application for face-based attendance. It registers people from a webcam feed, recognizes them during an attendance session, and records each recognized person once per session.

### Capabilities

- Register a person from a webcam feed
- Start and manage an attendance session locally
- Prevent duplicate attendance records within a session
- Persist attendance records in SQLite
- Write one CSV export for each session

### Architecture and data

FaceLog is intentionally a small modular monolith. It runs as one Python desktop process and introduces internal modules only where they improve clarity and maintenance. It does not require a separately deployed service or network connection for its core workflow.

## Adding a project

Copy this structure and replace every placeholder. Omit fields that are not known rather than guessing.

```md
## Project name

| Field | Value |
| --- | --- |
| Category | Short project category |
| Repository | <https://example.com/repository> |
| Technologies | Technology list |
| Date or event | Include only when established |
| Result | Include only when established |

### Summary

What the project is, who it serves, and the problem it addresses.

### Capabilities

- Verified capability

### Architecture and data

Verified implementation decisions, storage, integrations, and deployment model.
```
