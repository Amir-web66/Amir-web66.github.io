---
title: "EL STAGIER — A 7-Box DFIR CTF Series"
published: 2026-10-18
pinned: false
priority: 0
description: "A phishing email, a pivot into a robot-controller network, and a firmware server wiped three weeks later. Seven forensics boxes, one continuous incident."
tags: [CTF, DFIR, Forensics, Securinets]
category: CTF
author: "LBrinss"
draft: false
---

## The Scenario

**NeoMek Robotics**, a Tunis-based startup building industrial robotic arms and warehouse robots, hires a new intern: **Yassine Ben Salah**, assigned to the R&D department.
A phishing email lands in his inbox disguised as an HR document. He opens the attachment.
Over the following hours, an attacker pivots from his workstation into the robot-controller network and exfiltrates the blueprints for the company's next-generation gripper arm the **Gripper X9**.

Boxes 1–6 are the incident response investigation into that breach. Box 7 is a hard epilogue: three weeks after NeoMek fires Yassine, the firmware build server is wiped and you have to determine, with evidence rather than assumption, whether he actually did it.

**Category:** Digital Forensics & Incident Response
**Flag format:** `SecurinetsEnit{...}`
**Total points:** 1,700

---

## Boxes 1–6

| Box | Name | Difficulty | Points |
|---|---|---|---|
| 1 | The Lure | Easy-Medium | 150 |
| 2 | The Dropper | Medium-Hard | 250 |
| 3 | First Contact | Easy | 120 |
| 4 | Digging In | Medium | 220 |
| 5 | Pivot | Easy-Medium | 160 |
| 6 | The Leak | Hard | 300 |

One shared file set — email headers, a PowerShell dropper, Sysmon telemetry, auth logs, and a packet capture — carries you through the full kill chain from initial access to exfiltration.

## Box 7 — Severance

**Difficulty:** Hard · **Points:** 500 · **Prerequisite:** All flags from Boxes 1–6

The epilogue. A build server dump and a force-pushed git repository hold the proof of who really came back — and it isn't who HR assumes.

---

## Get the challenges

All challenge files and write-ups are in the repo:

**[github.com/Amir-web66/EL-Stagier](https://github.com/Amir-web66/EL-Stagier)**

- [`EL-Stagier-1-6/`](https://github.com/Amir-web66/EL-Stagier/tree/main/EL-Stagier-1-6) — Boxes 1 through 6, shared file set
- [`EL-Stagier-7/`](https://github.com/Amir-web66/EL-Stagier/tree/main/EL-Stagier-7) — Box 7, Severance
