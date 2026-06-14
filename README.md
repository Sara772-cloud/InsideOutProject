# InsideOut 🧩

A web & mobile platform connecting **specialists**, **parents**, and **children with learning difficulties**. Specialists assign therapy tasks (predefined, manual, or AI-generated) and generate AI-powered progress reports. Parents track tasks via mobile, and children interact with a Rive-powered avatar in Child Mode.

---

## 📖 Overview

This system bridges three main users — **Specialists**, **Parents**, and **Children** — into one connected ecosystem:

- **Specialists (Web App)** — manage their assigned children, track task progress, generate AI-powered reports, and assign new therapy tasks.
- **Parents (Mobile App)** — receive reports and tasks for their child, mark real-world tasks as completed, and chat directly with the specialist.
- **Children (Mobile App – Child Mode)** — play assigned games/tasks and interact with an avatar that provides feedback and conversation.

---

## 🔄 How It Works

### 1. Specialist – Web Dashboard
- Each new child is auto-assigned to the specialist who currently has the fewest children, balancing the workload.
- The specialist dashboard displays all assigned children along with their tasks, separated into **Completed** and **Pending**.
- The specialist can generate an AI report for any child based on:
  - The results of completed tasks (`TaskResult`)
  - The **Mother Note** added for each task
- A task's status only changes to **Completed** once a Mother Note is provided (see Task Lifecycle below).
- Once the report is generated, the specialist can send it directly to the parent.

### 2. Task Assignment (3 Ways)
The specialist can assign tasks to a child in three different ways:

1. **From the Predefined List** — choose an existing task (RealWorld or Mobile type).
2. **Manual Creation** — create a custom task by hand (title, description, type).
3. **AI-Generated** — provide a prompt, and AI generates a task (title + description). The specialist can:
   - Regenerate the task if not satisfied
   - Edit the generated content (add/remove details) before assigning it

### 3. Task Lifecycle (Status Logic)
A task remains **Pending** until a Mother Note is recorded:

- **RealWorld Task** — the parent performs the task with the child in real life, writes a Mother Note, and submits it → status becomes **Completed**. (Mother Note is mandatory.)
- **Mobile Task** — the child plays the assigned in-app game. Once finished, the game results are automatically sent and stored as the Mother Note → status becomes **Completed**.

### 4. Parent – Mobile App
- Receives the AI-generated report from the specialist.
- Receives the list of tasks assigned to their child (RealWorld & Mobile).
- For **RealWorld tasks**: adds a Mother Note and marks the task as completed.
- For **Mobile tasks**: tapping the task launches the corresponding game for the child.

### 5. Child Mode (Mobile App)
A dedicated mode for the child containing games and an interactive **Avatar** (built with Rive). The avatar has two interaction modes:

- **Task Feedback Mode** — shows the tasks the child has completed and collects feedback from the child about them.
- **Free Conversation Mode** — the avatar chats with the child about any free topic.

### 6. Parent ↔ Specialist Chat
A real-time, WhatsApp-style chat (powered by **SendBird**) available on both the mobile app and the web dashboard, allowing direct communication between parents and specialists.

---

## ✨ Key Features

- 🔄 Automatic, load-balanced assignment of children to specialists
- 📊 AI-generated progress reports based on task results & mother notes
- 📝 Three task assignment methods: Predefined / Manual / AI-Generated
- ✅ Status-driven task lifecycle (Pending → Completed via Mother Note)
- 🎮 Mobile games linked to assigned tasks with automatic result tracking
- 🤖 Interactive avatar (Rive) with feedback & free-chat modes for children
- 💬 Real-time chat between parents and specialists


---

## 🛠️ Tech Stack

**Backend**
- ASP.NET Core Web API
- Onion Architecture
- Entity Framework Core
- Generic Repository & Unit of Work Pattern
- JWT Authentication
- AutoMapper
- OpenAI API (AI report & task generation)
- SendBird (real-time chat)

**Web (Specialist Dashboard)**
- Angular

**Mobile (Parent & Child)**
- Flutter

**Avatar**
- Rive.app (interactive avatar animations)

---

## 🏗️ Architecture

The backend follows **Onion Architecture**, separating concerns into layers:

- **Domain** – Entities & core business rules (`Child`, `Specialist`, `Parent`, `SpecialistTask`, `PreDefinedTask`, `TaskResult`, `Report`, etc.)
- **Services** – Business logic (report generation, task assignment, chat sync, etc.)
- **Infrastructure** – EF Core, Repository/Unit of Work implementation, external services (OpenAI, SendBird, Email)
- **API** – Controllers exposing endpoints to Web & Mobile clients
