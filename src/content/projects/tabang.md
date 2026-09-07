---
title: Tabang
description: A flood reporting and response application connecting residents, responders, and reviewers in Aklan.
category: Flood reporting & response
date: '2026'
stack: [Incident reporting, Response workflows, Role-based responsibilities]
repository: https://github.com/kyledelfin2006/tabang-hackathon-project
order: 2
highlights:
  - Connected resident flood reports and requests for help with responder claim-and-resolve workflows and reviewer approval.
  - Placed 7th among 25+ teams at UPV KomsaiHack 2026.
---

## The community problem

During flooding, a report and a response are different steps. Residents need a way to describe an incident and request help; responders need to identify the incidents they are handling. Tabang was built around that coordination problem for Aklan.

## Three responsibilities

The application separates the workflow into three roles:

- **Residents** report flooding and request help.
- **Responders** claim incidents and resolve them.
- **Reviewers** approve who becomes a responder.

This division makes the intended responsibility of each participant clear. Reporting an incident does not itself assign a response, and becoming a responder includes a review step.

## From report to resolution

The core flow begins with a resident’s report or request for help. A responder claims an incident, then resolves it. Reviewer approval provides a separate workflow for admitting responders.

The distinction between claiming and resolving is important to the product: taking responsibility for an incident and completing the response are separate actions.

## Hackathon context

Tabang was originally built for UPV KomsaiHack 2026 and placed 7th among more than 25 teams. The project centers on a local problem with a focused, understandable workflow.

## Engineering perspective

The design illustrates why a small set of explicit responsibilities can be more useful than a long list of features. Residents, responders, and reviewers each have a concrete task, and the incident workflow connects those tasks.

Explore the repository for the application’s implementation and project setup.
