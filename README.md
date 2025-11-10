# ⚡ Utility Bill Management System (UBM-System)

The **Utility Bill Management System (UBM-System)** is a full-stack **MERN** web application that allows users to view, pay, and manage monthly utility bills such as **Electricity, Gas, Water, and Internet**. It provides secure authentication, a responsive interface, PDF reporting, and modern UI/UX features for seamless user interaction.

🔗 **Live Client:** [https://ubm-system-client.netlify.app](#)  
🔗 **Live Server (API):** [https://ubm-system-server.vercel.app](#)

---

## 🚀 Project Features

- 🔐 **Secure Authentication:**  
  Firebase-based email/password & Google login system with private routes.

- 💳 **Bill Management:**  
  Users can view, filter, and pay bills. Only **current month bills** are payable.

- 🧾 **My Pay Bills Dashboard:**  
  View, update, or delete your own paid bills with total summary and report download.

- 🖨️ **PDF Report Generator:**  
  Users can download a **PDF report** of their paid bills using `jsPDF` + `jsPDF-AutoTable`.

- 🎨 **Modern Responsive UI:**  
  Built with **React + TailwindCSS**, includes **Dark/Light theme toggle**, **carousel**, and **toast notifications**.

- ⚡ **Dynamic Functionality:**  
  Includes **category-based filtering**, **modal-based CRUD operations**, and **loading spinners** for API calls.

---

## 🧰 Tech Stack

### 🌐 Frontend
- React + Vite  
- React Router DOM  
- Firebase Authentication  
- Tailwind CSS + DaisyUI  
- React Hot Toast / SweetAlert2  
- React Icons  
- jsPDF + jsPDF-AutoTable  
- React Awesome Reveal / Typewriter / Tooltip  

### 🖥️ Backend
- Node.js + Express.js  
- MongoDB (Atlas)  
- CORS, dotenv, body-parser  
- Deployed on **Vercel**

---

## ⚙️ Installation & Setup

### 🧩 Prerequisites
Ensure you have installed:
- Node.js (v18 or later)
- MongoDB (Atlas or Local)
- Git



🧾 Core Functionalities Overview
🔹 Home Page

# Dynamic banner carousel (3 slides)

- 4 Category cards (Electricity, Gas, Water, Internet)

- Recent 6 bills from MongoDB (.limit(6))

- Extra sections: e.g. Service Features & Testimonials

🔹 Bills Page

- Display all bills (3-column grid)

- Filter bills by category (frontend + backend query)

🔹 Bill Details Page (Private Route)

- Shows complete bill info

- Pay Bill Modal: only for current month

- Auto-filled fields for email, amount, date

🔹 My Pay Bills

- View all paid bills of logged-in user

- Total paid count & amount summary

- Update/Delete modal for CRUD

Download PDF report

# 🌗 Additional Features

# Theme toggle (Dark / Light)

# Dynamic page titles

# 404 Not Found Page

# Loading spinner on fetch

# Custom toast / alert messages

# Responsive for mobile, tablet, and desktop


# 👨‍💻 Author

Md Iftakar Ahmed
💼 MERN Stack Developer

# 🪄 License

This project is open-source and available under the MIT License.