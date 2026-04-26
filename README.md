# Grievance Frontend

Angular 21 frontend for the Grievance Management System. The app uses Tailwind CSS and connects to the local NestJS backend in `../grievance-backend`.

## Run Locally

1. Start the backend from `grievance-backend`:

```bash
npm install
npm start
```

The API runs on `http://localhost:3000` and exposes complaints at `/complaints`.

2. Start the frontend from this directory:

```bash
npm install
npm start
```

The frontend runs on `http://localhost:4200`.

## Current Frontend Scope

- Admin grievance dashboard with live complaint summary cards.
- Complaint queue loaded from `GET http://localhost:3000/complaints`.
- Filters for status, department, date, complaint ID, and mobile number.
- Helpdesk complaint registration through `POST /complaints`.
- Status updates through `PATCH /complaints/:id`.

## API Contract Used

Complaint fields match the backend DTOs:

- `citizen`
- `mobile`
- `department`
- `subject`
- `ward`
- `source`: `IVR`, `Web`, or `Helpdesk`
- `priority`: `Low`, `Medium`, or `High`
- `status`: `Pending`, `In Progress`, or `Resolved`
- `assignedTo`

The backend returns `complaintId`; the Angular UI maps it to the table-facing `id`.

## Useful Commands

```bash
npm start
npm run build
npm run watch
```
