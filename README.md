
# Don't Do List - Backend

## Overview

Don't Do List is a productivity-focused web application designed to help users replace bad habits with better ones, stay motivated, and manage their daily tasks in a more rewarding way.

Unlike traditional task managers, Don't Do List combines task management, progress tracking, statistics, and a game-inspired Trophy System to create a more engaging experience.

This repository contains the backend implementation of the project built with Django using the MVT (Model-View-Template) architecture.

## Screenshots

### Home Dashboard

The main dashboard where users can manage daily tasks, track progress, and monitor their productivity journey.

<img width="1440" height="1024" alt="Home-logined" src="https://github.com/user-attachments/assets/50b1c220-f28f-4e4d-8154-3cb8606b533e" />

---

### Trophy System

The achievement system that rewards users for reaching milestones, completing objectives, and maintaining consistency.

<img width="1440" height="1024" alt="Trophy" src="https://github.com/user-attachments/assets/757c6deb-c23c-4616-89ec-50c9768f3623" />

---

## Core Features


### Authentication System

- User Registration
- User Login
- Password Reset
- Forgot Password Flow
- Session-Based Authentication

### Task Management

- Create Tasks
- Complete Tasks
- Delete Tasks
- Daily Task Tracking
- Task Categorization

### Trophy System

The Trophy System is inspired by achievement systems commonly found in video games.

Users can unlock trophies by reaching milestones and completing specific goals inside the application.

Current functionality includes:

- Trophy Collection
- Trophy Progress Tracking
- Trophy Details
- Trophy Search
- Trophy Filtering
- Trophy Pagination

The Trophy System is fully functional and remains one of the primary areas planned for future expansion.

### Statistics

- Daily Statistics
- Progress Tracking
- Task Completion Statistics
- User Activity Monitoring

---

## Architecture

The project follows Django's MVT architecture:

```text
Models
Views
Templates
```

The backend was intentionally developed using Django's core architecture to provide a strong understanding of Django fundamentals before introducing API-driven approaches.

---

## Database

Database Engine:

```text
SQLite3
```

Main data structures include:

- Users
- Tasks
- Trophies
- Daily Statistics

Tasks are managed through a unified task model and categorized by task types within the application logic.

---

## Technologies

- Python
- Django
- Django Templates
- SQLite3
- HTML
- CSS
- JavaScript

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd dont-do-list-backend
```

### Create Virtual Environment

Windows:

```bash
python -m venv venv
venv\Scripts\activate
```

Linux / macOS:

```bash
python3 -m venv venv
source venv/bin/activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Apply Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### Start Development Server

```bash
python manage.py runserver
```

After the server starts, open the URL displayed in the terminal.

---

## Current Status

The backend is fully functional and currently supports:

- Authentication
- Task Management
- Trophy Management
- Statistics Tracking
- Search, Filtering and Pagination

The project is actively maintained and continues to evolve through feature improvements, code refinement, and future system expansions.

---

## Project Vision

Don't Do List is not intended to be just another task manager.

The long-term goal is to create a motivational productivity platform that helps users:

- Break bad habits
- Build better habits
- Stay consistent
- Track meaningful progress
- Feel rewarded for their achievements

Future development will focus on expanding the Trophy System, introducing additional motivational mechanics, and improving the overall user experience.

---

## Author

Developed by k.bug.
