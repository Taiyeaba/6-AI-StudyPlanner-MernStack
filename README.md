# 📚 Study Planner - MERN Stack Project

![Study Planner Banner](https://github.com/user-attachments/assets/2544eb95-455e-44dc-9a49-389e6fdf0572)

---

## 🔗 Live Project Links

🌍 **Live Website:**  
👉 
🎥 **Project Demo Video:**  
👉 https://vimeo.com/1172676129?fl=ip&fe=ec

---

## 📌 **Project Overview**

Study Planner is a **full-stack MERN application** that helps students **create, track, and manage** their study plans efficiently. Users can create study plans, add tasks, track progress, and receive daily email reminders.

---

## ✨ **What You Can Do in Study Planner App**

### 📋 **Plan Management**
1. **Go to "My Plans" page and create new study plans**
   - Add title, subject, priority, total hours, and target date
   - Choose from High/Medium/Low priority

2. **Edit, view, or delete your plans**
   - Update plan details anytime
   - View all plans in card layout
   - Delete with confirmation

3. **Click the View button to add tasks for that subject**
   - Add multiple tasks to each plan
   - Break down your learning into smaller chunks

4. **Set estimated time for each task**
   - Track how many hours each task will take
   - Better time management

### 🔔 **Notifications**
5. **Turn on notifications in Profile page to get daily email reminders about today's tasks**
   - Enable email notifications
   - Select your preferred reminder time (e.g., 8:00 AM, 5:00 PM)
   - Get beautiful HTML emails with your tasks

### 📊 **Dashboard**
6. **On Dashboard, you can see:**
   - **Today's tasks** - What needs to be done today
   - **How many tasks you've completed** - Track your progress
   - **Total study hours** - Hours spent on completed tasks
   - **Your current streak** - Consecutive days of study

### 📅 **Calendar**
7. **Check Calendar to see what tasks are scheduled on which days**
   - Month-wise view
   - Color-coded task indicators
   - Click on any date to see detailed tasks

### 📈 **Analytics**
8. **In Analytics, you can track:**
   - **Weekly study hours** - How many hours you studied each day
   - **Subject-wise time distribution** - Time spent on different subjects
   - **How many tasks you completed on time** - Completion rate analysis

---

## 🛠️ **Technologies Used**

### **Frontend:**
- React.js
- React Router DOM
- Tailwind CSS
- Axios
- React Hook Form
- SweetAlert2
- Firebase Authentication
- Recharts (for analytics)

### **Backend:**
- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Tokens)
- Firebase Admin SDK
- Nodemailer (for emails)
- Node-cron (for reminders)

---

## 📁 **Project Structure**

```
study-planner/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Plans.jsx
│   │   │   ├── PlanDetails.jsx
│   │   │   ├── CreatePlan.jsx
│   │   │   ├── Analytics.jsx
│   │   │   ├── Calendar.jsx
│   │   │   └── Profile.jsx
│   │   ├── hooks/
│   │   ├── context/
│   │   └── firebase/
│   └── public/
│
├── backend/
│   ├── server.js
│   ├── .env
│   └── firebasekey.json
│
└── README.md
```
---

## 📸 **Screenshots**


### Dashboard
![Dashboard](https://github.com/user-attachments/assets/72eba689-4a47-409f-a375-736204d12c2d)

### Plans Page
![Plans](https://github.com/user-attachments/assets/69496dec-03d5-4a48-b0c5-af1175e7cc34)

### Plan Details
![Details](https://github.com/user-attachments/assets/855c0b54-c5b4-4018-b4e5-56cae8596d48)

### Analytics
![Analytics](https://github.com/user-attachments/assets/0e68743c-5ccf-4477-a2f4-0d5bb861377f)

### Analytics part 2
![Analytics](https://github.com/user-attachments/assets/e86b3b44-618d-4b7e-be75-ce5704cded6c)


### Calendar
![Calendar](https://github.com/user-attachments/assets/9653e6bd-3beb-4628-8952-1ea51a0f1da4)

### Profile
![Profile](https://github.com/user-attachments/assets/e4831e43-622c-473e-afe3-7af197d1cf16)

### Gmail Message
![Profile](https://github.com/user-attachments/assets/286c39ef-d0cf-48f1-bb8c-8e026605ca52)
---



## 🎯 **User Flow Summary**

```
1. User registers/logs in
2. Creates study plans in "My Plans" page
3. Adds tasks to each plan with estimated time
4. Views today's tasks on Dashboard
5. Starts/completes tasks
6. Tracks progress on Dashboard, Calendar, and Analytics
7. Gets daily email reminders (if enabled in Profile)
```

---

## 📧 **Email Reminder System**

- Users can enable notifications in Profile page
- Select preferred reminder time (8:00 AM, 5:00 PM, etc.)
- Daily email with today's tasks at selected time
- Beautiful HTML email template
- Only sends when tasks exist for that day
- Limit to one email per day, ensuring the reminder is sent only once at the selected time.


---

**Made with ❤️ by [Taiyeaba Shams]**

---

## 📌 **Quick Features Recap**

| Feature | Description |
|---------|-------------|
| 📋 Plans | Create, edit, view, delete study plans |
| ✅ Tasks | Add tasks with estimated time |
| 📊 Dashboard | See today's tasks, progress, streak |
| 📅 Calendar | View tasks by date |
| 📈 Analytics | Track weekly hours, subject distribution |
| 🔔 Notifications | Daily email reminders |
| 👤 Profile | Manage account, change password |
| 🔐 Auth | Secure login with email/Google |