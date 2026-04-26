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
- Read the local NestJS backend and aligned the frontend to the actual backend contract:
  - Base URL: `http://localhost:3000`
  - Complaint API base: `http://localhost:3000/complaints`
  - Routes used by frontend: `GET /complaints`, `GET /complaints/:id`, `POST /complaints`, `PATCH /complaints/:id`
  - Strict create/update DTO fields: `citizen`, `mobile`, `department`, `subject`, `ward`, `source`, `priority`, optional `status`, optional `assignedTo`
  - Backend complaint records include `complaintId`, `citizen`, `mobile`, `department`, `subject`, `ward`, `source`, `priority`, `status`, `assignedTo`, optional `recordingUrl`, `createdAt`
- Added read-side compatibility for older Mongo complaint records that may contain `citizenName`, `phone`, or `description`, while still sending only strict DTO fields on create/update.
- Added role-based frontend entry and workspaces:
  - `/login`: role selection screen for Citizen, Caller, Management, and Super Admin.
  - `/citizen`: citizen ticket status lookup by ticket number using `GET /complaints/:id`.
  - `/caller`: caller desk view showing today's IVR calls and tickets created from existing complaint data.
  - `/management`: overall ticket metrics and caller performance derived from complaints.
  - `/super-admin`: access-control UI for role/user management. This is currently frontend-local until backend auth/access APIs exist.
  - `/admin/dashboard`: existing full complaint operations dashboard remains available.
- Added a local role session service at `src/app/core/auth/role-session.service.ts`.
- Updated app shell, sidebar, and header to be role-aware and added logout/switch-role behavior.
- Restarted the dev server cleanly after multiple old Angular server processes were found on ports `4200` and `4201`.

### What Needs To Be Done
- Add real authentication/authorization after the backend exposes identity and access APIs.
- Replace the frontend-local Super Admin user list with backend-backed users/roles/permissions.
- Add a dedicated backend API for caller performance and call logs if metrics should differ from complaint-derived IVR records.
- Add dedicated routed pages for departments, reports, settings, and richer IVR call logs if needed.
- Add tests around the complaint API service, filter behavior, and form validation.

## General Guidelines for AI Assistants

When suggesting or modifying code in this project, please follow these guidelines:

1. **Maintain Separation of Concerns**: Ensure frontend code remains strictly in `frontend/`.
2. **TypeScript Best Practices**: Use strict typing. Leverage interfaces and DTOs to define data contracts that match the backend.
3. **Angular Standards**: Follow modern Angular patterns (standalone components, proper reactive state management with RxJS). Use Tailwind CSS for styling components.
4. **Data Handling**: Avoid relying on static mock data. The complaint workflow currently uses `src/app/features/complaints/data/complaints.service.ts`.
5. **Backend Contract**: The complaint API base is currently `http://localhost:3000/complaints`. Keep frontend DTOs aligned with `grievance-backend/src/complaints/dto`.
6. **Role UX**: Keep the four role workspaces clear and separate:
   - Citizen: status lookup only.
   - Caller: calls received today and tickets created.
   - Management: overall tickets and caller performance.
   - Super Admin: access and role management.
7. **Dev Server Note**: If UI changes appear stale, check for multiple `ng serve`/`npm start` processes on ports `4200` and `4201`, stop stale processes, and restart one clean server.
