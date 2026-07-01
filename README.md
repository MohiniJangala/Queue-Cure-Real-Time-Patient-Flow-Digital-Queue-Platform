# 🏥 Queue Cure – Real-Time Patient Flow & Digital Queue Platform

> **Queue Cure** is a full-stack healthcare platform designed to digitize patient flow, reduce waiting times, and improve the hospital experience through real-time queue management, appointment scheduling, live notifications, and analytics.

---

## 🚀 Overview

Traditional hospital queues often involve long waiting times, manual token systems, and poor communication between patients, receptionists, and doctors. Queue Cure modernizes this process by providing a **real-time digital patient flow platform** with separate dashboards for receptionists, doctors, and patients.

Patients can book appointments, receive digital tokens, track their queue in real time, access their queue page using QR codes, and receive WhatsApp/SMS notifications. Receptionists can efficiently manage queues, while doctors can monitor consultations and patient flow.

---

## ✨ Key Features

### 👩‍💼 Receptionist Dashboard

* Patient Registration
* Digital Token Generation
* Search Patient by Name or Token
* Edit Patient Details
* QR Code Generation & Regeneration
* WhatsApp Queue Link Sharing
* SMS Queue Notifications
* Mark Patient as Missed or Cancelled
* Rejoin Missed Patient to Queue
* Live Queue Management
* Queue Reset

---

### 👨‍⚕️ Doctor Dashboard

* View Today's Patients
* Live Queue Monitoring
* Call Next Patient
* Complete Consultation
* View Upcoming Appointments
* Daily Consultation Summary

---

### 🧑‍🤝‍🧑 Patient Dashboard

* Live Queue Tracking
* Current Token Display
* Patients Ahead
* Estimated Waiting Time
* Consultation Status Updates
* QR-Based Queue Access
* WhatsApp & SMS Notifications
* Appointment Booking
* Patient Feedback Submission

---

### 📊 Analytics Dashboard

* Waiting Patients
* Completed Consultations
* Missed Patients
* Cancelled Patients
* Average Consultation Time
* Daily Queue Statistics
* Queue Performance Insights

---

## ⚡ Core Functionalities

* Real-Time Queue Synchronization using Socket.IO
* Appointment Booking System
* QR Code-Based Patient Access
* WhatsApp Queue Link Sharing
* SMS Notification Integration
* Dynamic Token Generation
* Estimated Wait Time Calculation
* Patient Search & Queue Management
* Live Dashboard Updates
* RESTful API Architecture

---

## 🛠 Tech Stack

### Frontend

* React.js
* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

### Real-Time Communication

* Socket.IO

### Integrations

* QR Code API
* WhatsApp Link Sharing
* SMS Notification Service

### Development Tools

* Git
* GitHub
* VS Code
* Postman

---

## 📂 Project Structure

```
Queue Cure
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── hooks
│   │   └── App.js
│   │
│   └── public
│
├── server
│   ├── config
│   ├── controllers
│   ├── models
│   ├── routes
│   └── server.js
│
├── package.json
└── README.md
```

---
.

## 🔄 Socket.IO Event Flow
                    Receptionist Dashboard
                           │
                           │
      Add Patient / Call Next / Complete Consultation
                           │
                           ▼
                    Express.js REST API
                           │
                           ▼
                      MongoDB Atlas
                           │
                           ▼
                 Socket.IO Server (Emit)
                           │
      queueUpdated / dashboardUpdated / patientAdded
        ┌─────────────────┼─────────────────┐
        │                 │                 │
        ▼                 ▼                 ▼
 Patient Dashboard   Doctor Dashboard  Receptionist Dashboard
        │                 │                 │
        ▼                 ▼                 ▼
 Live Queue         Current Patient     Dashboard Refresh
 Status             Consultation        Statistics Update
 Estimated Wait     Appointment View    Queue Refresh

## 📡 Real-Time Events

| Event | Description |
| `queueUpdated` | Broadcasts queue changes to all connected dashboards in real time. |
| `patientAdded` | Updates dashboards immediately after a new patient is registered. |
| `consultationCompleted` | Refreshes patient queue and doctor dashboard after consultation completion. |
| `appointmentBooked` | Notifies dashboards when a new appointment is successfully booked. |
| `dashboardUpdated` | Synchronizes analytics cards and queue statistics across all clients. |

## 🏥 Application Workflow

Patient Books Appointment
          │
          ▼
Receptionist Registers Patient
          │
          ▼
Automatic Token Generation
          │
          ▼
QR Code + WhatsApp/SMS Notification
          │
          ▼
Patient Tracks Live Queue
          │
          ▼
Doctor Calls Next Patient
          │
          ▼
Consultation
          │
          ├────────► Completed
          │
          ├────────► Missed ───► Rejoin Queue
          │
          └────────► Cancelled
          │
          ▼
Patient Feedback


## 🎯 Problem Statement

Hospitals and clinics often rely on manual queue management systems, leading to long waiting times, inefficient communication, missed appointments, and poor patient experience.

Queue Cure addresses these challenges by providing a centralized, real-time digital platform that improves operational efficiency, enhances patient satisfaction, and simplifies queue management.

---

## 💡 Solution

Queue Cure enables hospitals to automate patient flow through digital token generation, appointment scheduling, real-time queue tracking, QR-based access, WhatsApp/SMS notifications, analytics, and role-based dashboards for receptionists, doctors, and patients.

---

## 🔒 Security

* RESTful API Architecture
* MongoDB Data Storage
* Real-Time Socket Communication
* Secure QR-Based Patient Access
* Patient Data Isolation

---

## 📈 Future Scope

* AI-Based Waiting Time Prediction
* Multi-Doctor & Multi-Department Support
* Electronic Medical Records (EMR) Integration
* Voice-Based Queue Announcements
* Emergency Patient Priority Queue
* Digital Billing & Online Payments
* Laboratory & Pharmacy Integration
* Email Notifications & Appointment Reminders
* Multi-Language Support
* Cloud Deployment & Backup
* Advanced Analytics & Report Export

---

## 👩‍💻 Author

**Mohini Jangala**

B.Tech – Information Technology
Chaitanya Bharathi Institute of Technology (CBIT)

---

## ⭐ If you found this project interesting, consider giving it a Star!
