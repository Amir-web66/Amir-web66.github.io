---
title: "PFA1 - AI Enhanced IDS Integration for firewalls" 
published: 2026-04-26
description: "Integrating OPNsense, Suricata, and a Random Forest ML model to detect network intrusions with 99.63% accuracy"
tage: [cybersecurity, machine-learning, opnsense, suricata, Virtual Machines, network-security, python]
category: Projects
draft: false
pinned: true
priority: 1
image: "src/assets/posts/pfa1/pfa1_cover.png"
---
## Overview
PFA1 (Projet de Fin d'Année 1) is a first-year engineering project at ENIT focused on strengthening network intrusion detection by combining a traditional firewall/IDS stack with a machine learning classification layer.

The goal: move beyond signature-based detection alone and add a statistical layer capable of flagging anomalous traffic patterns that static rules might miss.

## Context & Motivation

Why this matters — signature-based IDS (like default Suricata rulesets) is strong against known attack patterns but blind to novel or slightly-varied traffic. A Random Forest classifier trained on labeled network flow data adds a second line of defense that generalizes better to unseen patterns.

## Architecture
![Architecture ](src/assets/posts/pfa1/architecture.png)   


**Stack:**
- **OPNsense** — firewall and routing layer
- **Suricata** — signature-based IDS, network event logging (`eve.json`)
- **Python** (pandas, scikit-learn) — feature engineering + model training
- **Random Forest** — final classification model

## Data & Feature Engineering

- Dataset: 5,418 security events analyzed
- 12 features engineered from raw Suricata/network flow data
- [Describe your feature selection process — e.g. packet size distributions, protocol flags, connection duration, byte counts, etc.]

## Model Training & Evaluation

| Metric | Score |
|---|---|
| Accuracy | 99.63% |
| F1 Score | 99.78% |
| AUC | 1.00 |

[Add: train/test split ratio, cross-validation approach, hyperparameters tuned, confusion matrix if you have one]

## Challenges

- class imbalance between benign/malicious traffic
- feature selection — which raw fields actually mattered
- creating a network traffic and generate automated attacks.
## What I'd Improve Next

- real-time inference instead of batch classification
- testing against adversarial/evasive traffic
- comparing Random Forest against XGBoost or a neural net baseline

## Key Takeaways

Working on PFA1 gave me hands-on experience combining classical network security tooling with applied ML — going from raw packet logs to a trained, evaluated classifier, and understanding the practical gap between a high accuracy number and a genuinely production-ready detection system.
