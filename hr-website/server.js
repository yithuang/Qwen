const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// In-memory database (for demo purposes)
let employees = [
    { id: 1, name: '张三', position: '软件工程师', department: '技术部', email: 'zhangsan@company.com' },
    { id: 2, name: '李四', position: '产品经理', department: '产品部', email: 'lisi@company.com' },
    { id: 3, name: '王五', position: '设计师', department: '设计部', email: 'wangwu@company.com' }
];

let jobs = [
    { id: 1, title: '高级软件工程师', department: '技术部', location: '北京', description: '负责后端开发工作' },
    { id: 2, title: 'UI/UX设计师', department: '设计部', location: '上海', description: '负责产品界面设计' },
    { id: 3, title: '产品经理', department: '产品部', location: '深圳', description: '负责产品规划和需求分析' }
];

// Routes
app.get('/', (req, res) => {
    res.render('index', { title: '人力资源管理系统' });
});

app.get('/employees', (req, res) => {
    res.render('employees', { title: '员工管理', employees: employees });
});

app.get('/jobs', (req, res) => {
    res.render('jobs', { title: '招聘职位', jobs: jobs });
});

app.post('/api/employees', (req, res) => {
    const { name, position, department, email } = req.body;
    const newEmployee = {
        id: employees.length + 1,
        name,
        position,
        department,
        email
    };
    employees.push(newEmployee);
    res.json({ success: true, employee: newEmployee });
});

app.delete('/api/employees/:id', (req, res) => {
    const id = parseInt(req.params.id);
    employees = employees.filter(emp => emp.id !== id);
    res.json({ success: true });
});

app.post('/api/jobs', (req, res) => {
    const { title, department, location, description } = req.body;
    const newJob = {
        id: jobs.length + 1,
        title,
        department,
        location,
        description
    };
    jobs.push(newJob);
    res.json({ success: true, job: newJob });
});

app.listen(PORT, () => {
    console.log(`HR Website running at http://localhost:${PORT}`);
});
