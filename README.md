Portfolio Admin & Frontend

A full-featured personal portfolio project built with **Next.js 14 (App Router)**, **Tailwind CSS**, and **Supabase**.

This project includes both a **frontend portfolio site** and a robust **superadmin dashboard** for managing content dynamically, including services, blogs, projects, and incoming messages.

---

## 🚀 Features

### Frontend Portfolio
* **Dynamic Sections:** Hero, Education, Experience, Projects, Services, Skills & Tools, Testimonials, Achievements, Certifications, and Blogs.
* **Modern UI:** Animated, responsive user interface using **Tailwind CSS** and **Framer Motion**.
* **Interactive Services:** Fully interactive **Services** section with hover effects and detailed deliverables list.
* **Content Pages:** Dedicated blog post and portfolio project pages.

### Admin Dashboard (Superadmin)
* **CRUD Operations:** Full **Create, Read, Update, Delete (CRUD)** functionality for Services, Blogs, Projects, and managing Messages.
* **Message Management:** Real-time unread message count, ability to mark messages as read/unread, and deletion capability.
* **Filtering:** Filterable lists (e.g., read/unread messages, all).
* **Secure Operations:** Server-side data fetching with **Supabase** for secure and privileged operations.

### Backend & Database
* **Database:** Utilizes **Supabase Postgres** for data persistence.
* **Security:** **Row Level Security (RLS)** is enabled for production-grade security on all relevant tables.
* **Server Client:** Uses a server-only Supabase client with the `service_role` key for sensitive operations in API routes.
* **API:** Dedicated API routes for all CRUD functionality exposed only to the admin dashboard.

---

## 🛠️ Tech Stack

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | **Next.js 14** (App Router) | React framework for server-side rendering and routing. |
| **Styling** | **Tailwind CSS** | Utility-first CSS framework for rapid UI development. |
| **Database** | **Supabase** | Backend-as-a-Service (BaaS) for Postgres, Authentication, and Edge Functions. |
| **Animation** | **Framer Motion** | Library for production-ready, declarative animations. |
| **Icons** | **Lucide Icons** | A set of beautiful and consistent open-source icons. |
| **Deployment** | **Vercel** | Hosting and Continuous Integration/Continuous Deployment (CI/CD). |

---
