# Usability Test Website - Event Tracking Study

## Overview

This is a **Hotel Booking System** developed for a usability study thesis project. The application tracks user interactions and behavioral metrics to analyze the usability of multi-step form interfaces.

## Purpose

This website is used to conduct a **usability testing study** examining:
- User navigation patterns through multi-step forms
- Time spent on each step
- User interaction patterns (button clicks, form submissions)
- Task completion rates
- User behavior under different interface design conditions

## Features

### Event Tracking
The application automatically tracks the following events:
- **Step Navigation**: When users move between form steps
- **Button Interactions**: When users click Next, Back, or Complete Booking buttons
- **Keyboard Interactions**: When users press Enter keys in form fields
- **Data Export/Reset**: When users export or clear tracked data

### Data Storage
- **Local Storage**: Events are stored in the browser's local storage for immediate reference
- **Supabase**: Events are automatically synchronized to a Supabase database for long-term analysis

### Multi-Step Form
The booking system consists of 3 steps:
1. **Step 1**: User Details (Name, Email)
2. **Step 2**: Travel Dates (Destination, Check-in, Check-out)
3. **Step 3**: Guest Count

## Live Deployment

**Website URL**: https://usability-test-website.vercel.app

The application is deployed on Vercel and automatically updates with each code change.

## Technical Stack

- **Frontend**: React.js
- **Styling**: CSS
- **Event Tracking**: Custom React Hook (`useEventTracking`)
- **Backend/Database**: Supabase
- **Deployment**: Vercel

## How the Study Works

### Participant Flow
1. Participant accesses the live website
2. Participant completes the hotel booking form across 3 steps
3. All interactions are automatically tracked and timestamped
4. Data is stored in Supabase for analysis
5. Participant receives a Session ID for result tracking

### Data Collected
- Participant ID
- Session ID
- Event Type (step_viewed, button_clicked, key_pressed)
- Action Name (which button/field)
- Timestamp (ISO format)
- Response Time (time spent on each step)

## Repository

**GitHub**: https://github.com/GeorgeGkinoudis/usability-test-website

## Author

**Georgios Gkinoudis** - Thesis Project

## Status

🚧 **Currently in Testing Phase** - This is an active thesis project.

---

*For more information about this usability study, please contact the researcher.*
