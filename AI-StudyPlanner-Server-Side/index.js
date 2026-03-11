

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const admin = require("firebase-admin");
const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 3000;
require('dotenv').config();


//middleware
app.use(cors());
app.use(express.json());

//firebase

const serviceAccount = require("./firebasekey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});





const uri = process.env.MONGODB_URI;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    
    await client.connect();

const database = client.db('StudyPlan');
const usersCollection = database.collection('users');
const planCollection = database.collection('plans');
const taskCollection = database.collection('tasks');



//custom middlewares
const verifyFBToken = async(req,res,next) => {
  const authHeader = req.headers.authorization;
  if(!authHeader){
    return res.status(401).send({message:'unauthorized Access'})
  }
  const token = authHeader.split(' ')[1];
  if(!token){
    return  res.status(401).send({message:'unauthorized Access'})
  }
  //verify the token
  try{
    const decoded = await admin.auth().verifyIdToken(token);
    req.decoded = decoded;
      next();
  }
catch (error){
  return res.status(403).send({message:'forbidden access'})
}

}




//users collection

app.post('/users', async (req, res) => {
  const user = req.body;

  const query = { email: user.email };
  const existingUser = await usersCollection.findOne(query);

  // if (existingUser) {
  //   return res.send({ message: 'user already exists' });
  // }
  if (existingUser) {
  return res.send({ message: 'user already exists', user: existingUser });  // ← success
}

  const result = await usersCollection.insertOne(user);
  res.send(result);
});


app.get('/users/:email', async (req, res) => {
  const email = req.params.email;
  const query = { email: email };
  const user = await usersCollection.findOne(query);
  res.send(user);
});

app.get('/users',verifyFBToken , async (req, res) => {
  const result = await usersCollection.find().toArray();
  res.send(result);
});
   

//my plan pg

//  1. GET all plans 
app.get('/api/plans', verifyFBToken, async (req, res) => {
  try {
    const { email } = req.query; // frontend থেকে email পাঠাবে
    const query = { userEmail: email };
    const plans = await planCollection.find(query).sort({ createdAt: -1 }).toArray();
    res.send(plans);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//  2. GET single plan 
app.get('/api/plans/:id', verifyFBToken, async (req, res) => {
  try {
    const { id } = req.params;
    const query = { _id: new ObjectId(id) };
    const plan = await planCollection.findOne(query);
    res.send(plan);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//  3. POST new plan 
app.post('/api/plans', verifyFBToken, async (req, res) => {
  try {
    const planData = req.body;
    const result = await planCollection.insertOne({
      ...planData,
      createdAt: new Date()
    });
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//  4. PUT update plan 
app.put('/api/plans/:id', verifyFBToken, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const query = { _id: new ObjectId(id) };
    const result = await planCollection.updateOne(query, { $set: updateData });
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//  5. DELETE plan 
app.delete('/api/plans/:id', verifyFBToken, async (req, res) => {
  try {
    const { id } = req.params;
    const query = { _id: new ObjectId(id) };
    const result = await planCollection.deleteOne(query);
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//task pg


//  1. GET tasks by planId 
app.get('/api/tasks/:planId', verifyFBToken, async (req, res) => {
  try {
    const { planId } = req.params;
    const tasks = await taskCollection.find({ planId }).toArray();
    res.send(tasks);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.post('/api/tasks', verifyFBToken, async (req, res) => {
  try {
    const taskData = req.body;
    
    // dueDate কে YYYY-MM-DD format এ save করো
    let dueDate = taskData.dueDate;
    
    // যদি dueDate string এ থাকে, তাহলে ঠিক করে নাও
    if (dueDate) {
      const date = new Date(dueDate);
      dueDate = date.toISOString().split('T')[0]; // "2024-03-15" format
    }
    
    const result = await taskCollection.insertOne({
      planId: taskData.planId,
      title: taskData.title,
      estimatedTime: Number(taskData.estimatedTime),
      dueDate: dueDate,  // ঠিক format এ save হবে
      status: taskData.status || 'Pending',
      notes: taskData.notes || '',
      createdAt: new Date()
    });
    
    res.send(result);
  } catch (error) {
    console.error('Task creation error:', error);
    res.status(500).send({ message: error.message });
  }
});

// 3. PUT update task 
app.put('/api/tasks/:id', verifyFBToken, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const query = { _id: new ObjectId(id) };
    const result = await taskCollection.updateOne(query, { $set: updateData });
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//  4. DELETE task
app.delete('/api/tasks/:id', verifyFBToken, async (req, res) => {
  try {
    const { id } = req.params;
    const query = { _id: new ObjectId(id) };
    const result = await taskCollection.deleteOne(query);
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});



//dashboard

app.get('/api/dashboard/stats', verifyFBToken, async (req, res) => {
  try {
    const { email } = req.query;
    
    console.log('📊 Fetching dashboard stats for:', email);
    
    // 1. Total Plans count
    const totalPlans = await planCollection.countDocuments({ userEmail: email });
    
    // 2. Today's date
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayStr = `${year}-${month}-${day}`;
    
    // 3. Get all plans for this user
    const userPlans = await planCollection.find({ userEmail: email }).toArray();
    const planIds = userPlans.map(plan => plan._id.toString());
    
    // 4. Get all tasks
    const allTasks = await taskCollection.find().toArray();
    
    // 5. Filter tasks that belong to user's plans
    const userTasks = allTasks.filter(task => planIds.includes(task.planId));
    
    // 6. Calculate totals
    const totalTasks = userTasks.length;
    const completedTasks = userTasks.filter(t => t.status === 'Completed').length;
    const totalStudyHours = userTasks
      .filter(t => t.status === 'Completed')
      .reduce((sum, task) => sum + (task.estimatedTime || 0), 0);
    
    // 7. Today's tasks
    const todayTasks = userTasks.filter(task => {
      if (!task.dueDate) return false;
      
      let taskDateStr = '';
      if (typeof task.dueDate === 'string') {
        taskDateStr = task.dueDate.split('T')[0];
      } else if (task.dueDate instanceof Date) {
        const d = new Date(task.dueDate);
        taskDateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      }
      
      return taskDateStr === todayStr;
    });
    
    const todayTasksCount = todayTasks.length;
    const completedTodayCount = todayTasks.filter(t => t.status === 'Completed').length;
    
    // 8. Recent Plans (last 5)
    const recentPlans = await planCollection
      .find({ userEmail: email })
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray();
    
    // 9. Today's Tasks List
    const todayTasksList = todayTasks.map(task => ({
      ...task,
      _id: task._id.toString()
    }));
    
    // 10. Streak Calculation
    let streak = 0;
    for (let i = 0; i < 30; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - i);
      
      const year = checkDate.getFullYear();
      const month = String(checkDate.getMonth() + 1).padStart(2, '0');
      const day = String(checkDate.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;
      
      const tasksOnDate = userTasks.filter(task => {
        if (task.status !== 'Completed') return false;
        
        let taskDateStr = '';
        if (typeof task.dueDate === 'string') {
          taskDateStr = task.dueDate.split('T')[0];
        } else if (task.dueDate instanceof Date) {
          const d = new Date(task.dueDate);
          taskDateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        }
        
        return taskDateStr === dateStr;
      });
      
      if (tasksOnDate.length > 0) {
        streak++;
      } else {
        if (i === 0) streak = 0;
        break;
      }
    }
    
    const stats = {
      totalPlans,
      totalTasks,             
      completedTasks,          
      studyHours: totalStudyHours, 
      todayTasks: todayTasksCount,
      completedToday: completedTodayCount,
      streak,
      recentPlans,
      todayTasksList
    };
    
    console.log('📊 Sending stats:', stats);
    res.send(stats);
    
  } catch (error) {
    console.error('❌ Dashboard stats error:', error);
    res.status(500).send({ message: error.message });
  }
});



app.get('/api/plans/recent', verifyFBToken, async (req, res) => {
  try {
    const { email } = req.query;
    const recentPlans = await planCollection
      .find({ userEmail: email })
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray();
    res.send(recentPlans);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//  Today's Tasks API
app.get('/api/tasks/today', verifyFBToken, async (req, res) => {
  try {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    const tasks = await taskCollection
      .find({ 
        dueDate: { $regex: todayStr } 
      })
      .toArray();
    res.send(tasks);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});


//Analytics Page

// 📌 1. Weekly Activity Data
app.get('/api/analytics/weekly', verifyFBToken, async (req, res) => {
  try {
    const { email } = req.query;
    
    // Get user's plans
    const userPlans = await planCollection.find({ userEmail: email }).toArray();
    const planIds = userPlans.map(plan => plan._id.toString());
    
    // Get all tasks for user
    const allTasks = await taskCollection.find().toArray();
    const userTasks = allTasks.filter(task => planIds.includes(task.planId));
    
    // Get last 7 days data
    const weeklyData = [];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;
      
      // Find tasks completed on this date
      const tasksOnDate = userTasks.filter(task => {
        if (task.status !== 'Completed') return false;
        
        let taskDateStr = '';
        if (typeof task.dueDate === 'string') {
          taskDateStr = task.dueDate.split('T')[0];
        }
        return taskDateStr === dateStr;
      });
      
      const totalHours = tasksOnDate.reduce((sum, task) => sum + (task.estimatedTime || 0), 0);
      
      weeklyData.push({
        day: days[date.getDay()],
        date: dateStr,
        hours: totalHours,
        tasks: tasksOnDate.length
      });
    }
    
    res.send(weeklyData);
  } catch (error) {
    console.error('Weekly analytics error:', error);
    res.status(500).send({ message: error.message });
  }
});

// 📌 2. Subject Distribution
app.get('/api/analytics/subjects', verifyFBToken, async (req, res) => {
  try {
    const { email } = req.query;
    
    // Get user's plans
    const userPlans = await planCollection.find({ userEmail: email }).toArray();
    
    // Calculate subject distribution
    const subjectMap = new Map();
    
    userPlans.forEach(plan => {
      const subject = plan.subject || 'Uncategorized';
      const currentHours = subjectMap.get(subject) || 0;
      subjectMap.set(subject, currentHours + (plan.totalHours || 0));
    });
    
    const totalHours = Array.from(subjectMap.values()).reduce((sum, hours) => sum + hours, 0);
    
    const subjectData = Array.from(subjectMap.entries()).map(([name, hours]) => ({
      name,
      hours,
      percentage: totalHours > 0 ? Math.round((hours / totalHours) * 100) : 0
    }));
    
    res.send(subjectData);
  } catch (error) {
    console.error('Subject analytics error:', error);
    res.status(500).send({ message: error.message });
  }
});

// 📌 3. Completion Rate
app.get('/api/analytics/completion', verifyFBToken, async (req, res) => {
  try {
    const { email } = req.query;
    
    // Get user's plans
    const userPlans = await planCollection.find({ userEmail: email }).toArray();
    const planIds = userPlans.map(plan => plan._id.toString());
    
    // Get all tasks
    const allTasks = await taskCollection.find().toArray();
    const userTasks = allTasks.filter(task => planIds.includes(task.planId));
    
    const totalTasks = userTasks.length;
    const completedTasks = userTasks.filter(t => t.status === 'Completed').length;
    const inProgressTasks = userTasks.filter(t => t.status === 'In Progress').length;
    const pendingTasks = userTasks.filter(t => t.status === 'Pending').length;
    
    // On time vs delayed (simplified)
    const today = new Date();
    const onTimeTasks = userTasks.filter(task => {
      if (task.status !== 'Completed') return false;
      if (!task.dueDate) return true;
      
      const dueDate = new Date(task.dueDate);
      return dueDate >= today;
    }).length;
    
    res.send({
      total: totalTasks,
      completed: completedTasks,
      inProgress: inProgressTasks,
      pending: pendingTasks,
      completionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
      onTime: totalTasks > 0 ? Math.round((onTimeTasks / totalTasks) * 100) : 0,
      delayed: totalTasks > 0 ? 100 - Math.round((onTimeTasks / totalTasks) * 100) : 0
    });
  } catch (error) {
    console.error('Completion analytics error:', error);
    res.status(500).send({ message: error.message });
  }
});

// 📌 4. Total Stats
app.get('/api/analytics/stats', verifyFBToken, async (req, res) => {
  try {
    const { email } = req.query;
    
    // Get user's plans
    const userPlans = await planCollection.find({ userEmail: email }).toArray();
    const planIds = userPlans.map(plan => plan._id.toString());
    
    // Get all tasks
    const allTasks = await taskCollection.find().toArray();
    const userTasks = allTasks.filter(task => planIds.includes(task.planId));
    
    const totalPlans = userPlans.length;
    const totalTasks = userTasks.length;
    const completedTasks = userTasks.filter(t => t.status === 'Completed').length;
    const totalHours = userTasks.reduce((sum, task) => sum + (task.estimatedTime || 0), 0);
    
    // Find most productive day
    const dayMap = new Map();
    userTasks.forEach(task => {
      if (task.status === 'Completed' && task.dueDate) {
        const date = new Date(task.dueDate);
        const day = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
        dayMap.set(day, (dayMap.get(day) || 0) + 1);
      }
    });
    
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let mostProductiveDay = 'N/A';
    let maxTasks = 0;
    
    dayMap.forEach((count, day) => {
      if (count > maxTasks) {
        maxTasks = count;
        mostProductiveDay = days[day];
      }
    });
    
    res.send({
      totalPlans,
      totalTasks,
      completedTasks,
      totalHours,
      mostProductiveDay,
      averageTasksPerPlan: totalPlans > 0 ? (totalTasks / totalPlans).toFixed(1) : 0
    });
  } catch (error) {
    console.error('Stats analytics error:', error);
    res.status(500).send({ message: error.message });
  }
});

//calender
// 📌 1. Get tasks for calendar (by month)
app.get('/api/calendar/tasks', verifyFBToken, async (req, res) => {
  try {
    const { email, month, year } = req.query;
    
    console.log('📅 Fetching calendar tasks for:', { email, month, year });
    
    // Get user's plans
    const userPlans = await planCollection.find({ userEmail: email }).toArray();
    const planIds = userPlans.map(plan => plan._id.toString());
    
    // Get all tasks
    const allTasks = await taskCollection.find().toArray();
    
    // Filter tasks that belong to user's plans
    const userTasks = allTasks.filter(task => planIds.includes(task.planId));
    
    // Filter by month/year if provided
    let filteredTasks = userTasks;
    if (month && year) {
      const monthNum = parseInt(month);
      const yearNum = parseInt(year);
      
      filteredTasks = userTasks.filter(task => {
        if (!task.dueDate) return false;
        
        let taskDate = null;
        if (typeof task.dueDate === 'string') {
          taskDate = new Date(task.dueDate);
        } else if (task.dueDate instanceof Date) {
          taskDate = task.dueDate;
        }
        
        if (taskDate) {
          return taskDate.getMonth() === monthNum && 
                 taskDate.getFullYear() === yearNum;
        }
        return false;
      });
    }
    
    // Group tasks by date
    const tasksByDate = {};
    filteredTasks.forEach(task => {
      if (!task.dueDate) return;
      
      let dateStr = '';
      if (typeof task.dueDate === 'string') {
        dateStr = task.dueDate.split('T')[0];
      } else if (task.dueDate instanceof Date) {
        const d = new Date(task.dueDate);
        dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      }
      
      if (!tasksByDate[dateStr]) {
        tasksByDate[dateStr] = [];
      }
      tasksByDate[dateStr].push({
        ...task,
        _id: task._id.toString()
      });
    });
    
    res.send({
      tasksByDate,
      totalTasks: filteredTasks.length
    });
    
  } catch (error) {
    console.error('Calendar API error:', error);
    res.status(500).send({ message: error.message });
  }
});

// 📌 2. Get tasks for specific date
app.get('/api/calendar/tasks-by-date', verifyFBToken, async (req, res) => {
  try {
    const { email, date } = req.query;
    
    console.log('📅 Fetching tasks for date:', date);
    
    // Get user's plans
    const userPlans = await planCollection.find({ userEmail: email }).toArray();
    const planIds = userPlans.map(plan => plan._id.toString());
    
    // Get all tasks
    const allTasks = await taskCollection.find().toArray();
    
    // Filter tasks for specific date
    const tasksForDate = allTasks.filter(task => {
      if (!task.dueDate || !planIds.includes(task.planId)) return false;
      
      let taskDateStr = '';
      if (typeof task.dueDate === 'string') {
        taskDateStr = task.dueDate.split('T')[0];
      } else if (task.dueDate instanceof Date) {
        const d = new Date(task.dueDate);
        taskDateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      }
      
      return taskDateStr === date;
    });
    
    // Get plan details for each task
    const tasksWithPlanDetails = await Promise.all(tasksForDate.map(async (task) => {
      const plan = await planCollection.findOne({ _id: new ObjectId(task.planId) });
      return {
        ...task,
        _id: task._id.toString(),
        planTitle: plan?.title || 'Unknown Plan',
        planSubject: plan?.subject || ''
      };
    }));
    
    res.send(tasksWithPlanDetails);
    
  } catch (error) {
    console.error('Tasks by date error:', error);
    res.status(500).send({ message: error.message });
  }
});

//profile

app.put('/users/:email', verifyFBToken, async (req, res) => {
  try {
    const { email } = req.params;
    const { name } = req.body;
    
    const query = { email: email };
    const update = { $set: { name: name } };
    
    const result = await usersCollection.updateOne(query, update);
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});


// 📌 DELETE user account (with all data)
app.delete('/users/:email', verifyFBToken, async (req, res) => {
  try {
    const { email } = req.params;
    
    console.log('🗑️ Deleting user account:', email);
    
    // 1. প্রথমে user এর সব plans খুঁজে বের করো
    const userPlans = await planCollection.find({ userEmail: email }).toArray();
    const planIds = userPlans.map(plan => plan._id.toString());
    
    // 2. সব plans এর tasks ডিলিট করো
    if (planIds.length > 0) {
      for (const planId of planIds) {
        await taskCollection.deleteMany({ planId: planId });
      }
    }
    
    // 3. সব plans ডিলিট করো
    await planCollection.deleteMany({ userEmail: email });
    
    // 4. user ডিলিট করো
    const result = await usersCollection.deleteOne({ email: email });
    
    console.log('✅ User account deleted successfully');
    res.send({ 
      message: 'User account deleted successfully',
      deletedCount: result.deletedCount 
    });
    
  } catch (error) {
    console.error('❌ Delete user error:', error);
    res.status(500).send({ message: error.message });
  }
});



// gmail **********************

app.get('/users/:email/settings', verifyFBToken, async (req, res) => {
  try {
    const { email } = req.params;
    const user = await usersCollection.findOne({ email });
    
    res.send({
      emailNotifications: user?.emailNotifications || false,
      reminderTime: user?.reminderTime || '8',
      reminderEnabled: user?.reminderEnabled || false
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});


app.put('/users/:email/reminder', verifyFBToken, async (req, res) => {
  try {
    const { email } = req.params;
    const { emailNotifications, reminderTime, reminderEnabled } = req.body;
    
    const updateData = {};
    if (emailNotifications !== undefined) updateData.emailNotifications = emailNotifications;
    if (reminderTime !== undefined) updateData.reminderTime = reminderTime;
    if (reminderEnabled !== undefined) updateData.reminderEnabled = reminderEnabled;
    
    await usersCollection.updateOne(
      { email },
      { $set: updateData }
    );
    
    res.send({ success: true });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});






    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
   
  }
}
run().catch(console.dir);







// ******** EMAIL REMINDER SYSTEM


const nodemailer = require('nodemailer');
const cron = require('node-cron');

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Send email function
const sendReminderEmail = async (user, tasks) => {
  try {
    // Create task list HTML
    const taskList = tasks.map(task => `
      <tr style="border-bottom: 1px solid #e5e7eb;">
        <td style="padding: 12px; color: #1f2937;">${task.title}</td>
        <td style="padding: 12px; color: #4b5563;">${task.estimatedTime}h</td>
        <td style="padding: 12px;">
          <span style="background: ${task.status === 'Pending' ? '#ef4444' : '#f59e0b'}; 
                       color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px;">
            ${task.status}
          </span>
        </td>
      </tr>
    `).join('');

    // Email HTML template
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #4f46e5, #7c3aed); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">📚 Study Planner</h1>
          <p style="color: #e0e7ff; margin: 10px 0 0;">Daily Study Reminder</p>
        </div>
        
        <!-- Content -->
        <div style="background: white; padding: 30px; border: 1px solid #e5e7eb;">
          <h2 style="color: #1f2937; margin-top: 0;">Hello ${user.name || 'Student'}! 👋</h2>
          <p style="color: #4b5563;">You have <strong>${tasks.length}</strong> task${tasks.length > 1 ? 's' : ''} scheduled for today:</p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <thead>
              <tr style="background: #f3f4f6;">
                <th style="padding: 12px; text-align: left; color: #374151;">Task</th>
                <th style="padding: 12px; text-align: left; color: #374151;">Hours</th>
                <th style="padding: 12px; text-align: left; color: #374151;">Status</th>
              </tr>
            </thead>
            <tbody>
              ${taskList}
            </tbody>
          </table>
          
          <a href="${process.env.FRONTEND_URL}/dashboard" 
             style="display: inline-block; background: #4f46e5; color: white; padding: 12px 30px; 
                    text-decoration: none; border-radius: 5px; margin-top: 20px;">
            View Dashboard →
          </a>
        </div>
        
        <!-- Footer -->
        <div style="text-align: center; padding: 20px; color: #6b7280; font-size: 12px;">
          <p>Stay consistent and achieve your goals! 💪</p>
          <p style="margin-top: 10px;">© 2026 Study Planner</p>
        </div>
      </div>
    `;

    // Send email
    await transporter.sendMail({
      from: '"Study Planner" <noreply@studyplanner.com>',
      to: user.email,
      subject: `📚 ${tasks.length} Task${tasks.length > 1 ? 's' : ''} for Today`,
      html
    });

    console.log(`✅ Email sent to ${user.email}`);
  } catch (error) {
    console.error(`❌ Email error for ${user.email}:`, error.message);
  }
};

// ⏰ Check reminders every minute
cron.schedule('* * * * *', async () => {
  console.log('⏰ Checking for reminders...');
  
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  
  // Only run at minute 0 of each hour
  if (currentMinute !== 0) return;
  
  try {
    // Get all users with notifications enabled
    const users = await usersCollection.find({ 
      emailNotifications: true,
      reminderEnabled: true 
    }).toArray();
    
    console.log(`📊 Found ${users.length} users with reminders enabled`);
    
    for (const user of users) {
      // Check if current hour matches user's reminder time
      const reminderTime = parseInt(user.reminderTime || '8');
      
      if (reminderTime === currentHour) {
        console.log(`⏰ Time to send reminder to ${user.email} (${reminderTime}:00)`);
        
        // Get today's date
        const todayStr = now.toISOString().split('T')[0];
        
        // Get user's plans
        const userPlans = await planCollection.find({ userEmail: user.email }).toArray();
        const planIds = userPlans.map(p => p._id.toString());
        
        // Get all tasks
        const allTasks = await taskCollection.find().toArray();
        
        // Filter today's tasks
        const todayTasks = allTasks.filter(t => 
          planIds.includes(t.planId) && 
          t.dueDate?.split('T')[0] === todayStr
        );
        
        if (todayTasks.length > 0) {
          await sendReminderEmail(user, todayTasks);
        } else {
          console.log(`📭 No tasks today for ${user.email}`);
        }
      }
    }
  } catch (error) {
    console.error('❌ Reminder cron error:', error);
  }
});












app.get('/', (req, res) => {
  res.send('study server is getting')
})

app.listen(port, () => {
  console.log(`study server is running ${port}`)
})