# VR-Based Values & Career Simulator (Unity + OpenXR)

## Overview

This project is an interactive educational VR scenario simulator developed in the context of ETKIM and the Turkish Ministry of Education, built in ODTÜ Teknokent under the leadership of the TEDU Education Dean. It focuses on values education, social behaviour and career-awareness learning through immersive mini-scenarios where the user's choices produce visible consequences inside the virtual environment.

## Current Scenario Flow

The current Unity repository includes a dialogue-based bullying scenario. The user enters a trigger zone, sees staged dialogue popups, answers a quiz/choice interface, and receives immediate feedback. The README also describes narrative reactions such as police arrival and decision-based feedback, turning the scene into a values-oriented learning experience rather than a passive VR walkthrough.

## Technical Contribution

The simulation is built with Unity 6.1, OpenXR, XR Origin and C#. The project uses Unity's XR stack for navigation and interaction, while custom scripts handle event-driven trigger zones, popup sequencing, UI-based branching logic and scenario progression.

Key implementation pieces include:

- `ZoneTrigger.cs` for detecting the player entering an interaction zone, spawning character popups, sequencing dialogue and launching the quiz.
- `GroupDialogueTrigger.cs` for group dialogue flow, timed popup activation and transition into the quiz UI.
- `QuizUI.cs` for four-option questions, score tracking, answer locking and feedback.
- `SceneChangeTrigger.cs` for moving the player between scenes through trigger-based scene loading.
- `ChildPopupView.cs` for showing scenario-specific visual/dialogue cards.

## Learning System Direction

The README defines a backend/data layer for saving user decisions. The planned local setup uses PostgreSQL with a `user_choices` table containing `user_id`, `event_id`, selected option, selected text and timestamp. The API endpoint described in the README is `http://localhost:5136/api/Choices`.

This makes the project suitable for later educational analytics: decision history, scenario completion, guidance feedback and value/career awareness tracking can be connected to the VR experience.

## Product Direction

The project is presented as an early-stage educational VR game. Planned features include open-world navigation, multiple educational mini-games, modules on social rules, empathy and career exploration, voice narration and dynamic feedback.

## Repositories

- VR project: https://github.com/umutuygur0/vr-meb-project
- ETKIM AI companion repository: https://github.com/umutuygur0/etkim-ai