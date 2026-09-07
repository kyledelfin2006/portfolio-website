---
title: FaceLog
description: A local, offline Python desktop application for face-based attendance, with SQLite storage and per-session CSV exports.
category: Offline attendance
stack: [Python, SQLite, Webcam, CSV]
repository: https://github.com/DevGuild-ASU/FaceLog
order: 3
highlights:
  - Registered people from a webcam feed and recorded each recognized person once per attendance session.
  - Stored attendance in SQLite and exported session CSV files within a small Python modular monolith.
---

## The workflow

FaceLog is an offline desktop application for face-based attendance. A person is registered through a webcam feed. When an attendance session starts, the application recognizes registered people and marks each person present once in that session.

The workflow stays local: one desktop application handles registration, the active session, and attendance records.

## Preventing repeated check-ins

A webcam can observe the same person across many frames. Attendance needs a session record, not a new check-in on every observation. FaceLog’s behavior is to mark each recognized person present once per session, preventing duplicate check-ins within that session.

## Persistence and export

Attendance records are saved to SQLite. A CSV file is also written for each session, so the attendance output can be used outside the application without requiring another service.

SQLite fits the local, offline scope. CSV provides a straightforward way to move session records into a spreadsheet or another workflow.

## A deliberately small architecture

FaceLog runs as one Python desktop process. It is a modular monolith: internal modules exist where they make the code easier to understand and maintain, while the application remains a single process.

This keeps the architecture aligned with the problem. An offline attendance tool does not inherently need separately deployed services, a network connection, or a distributed data store.

## Engineering perspective

FaceLog is an example of applying YAGNI to system structure. The important boundaries are the ones that clarify the desktop workflow and its records. Additional infrastructure should follow a demonstrated requirement.

See the repository for installation instructions and details of the recognition workflow.
