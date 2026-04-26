# Shreeton Project - Context for AI Agents (Frontend)

## Project Overview

This directory contains the frontend for the Shreeton Grievance Management System.

- **Type**: Angular Application
- **Role**: Serves as the client-side user interface.
- **Tech Stack**: Angular 21, Tailwind CSS, TypeScript.
- **Key Commands**: 
  - Start Development Server: `npm start` (Runs on `http://0.0.0.0:4200`)
  - Build for Production: `npm run build`

## Project Status & Roadmap

### What Has Been Done
- Initialized Angular 21 project with Tailwind CSS.
- Setup core architecture with basic routing and feature modules (e.g., `dashboard`, `complaints`).
- Created Angular UI components and layouts based on the React reference in `Grievance Management System UI`.
- Integrated the complaint dashboard with the local NestJS backend via Angular `HttpClient`.
- Implemented complaint listing, filtering, helpdesk complaint creation, and status updates.

### What Needs To Be Done
- Add dedicated routed pages for departments, reports, users, settings, and IVR calls.
- Add authentication/authorization after the backend exposes identity APIs.
- Add tests around the complaint API service, filter behavior, and form validation.

## General Guidelines for AI Assistants

When suggesting or modifying code in this project, please follow these guidelines:

1. **Maintain Separation of Concerns**: Ensure frontend code remains strictly in `frontend/`.
2. **TypeScript Best Practices**: Use strict typing. Leverage interfaces and DTOs to define data contracts that match the backend.
3. **Angular Standards**: Follow modern Angular patterns (standalone components, proper reactive state management with RxJS). Use Tailwind CSS for styling components.
4. **Data Handling**: Avoid relying on static mock data. The complaint workflow currently uses `src/app/features/complaints/data/complaints.service.ts`.
5. **Backend Contract**: The complaint API base is currently `http://localhost:3000/complaints`. Keep frontend DTOs aligned with `grievance-backend/src/complaints/dto`.
