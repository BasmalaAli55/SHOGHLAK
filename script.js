const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500";

// مصفوفة الـ 6 شركات الكبرى مع أيقونات براندات حقيقية وصور متوافقة
const companies = [
    { name: "Google Cloud", icon: "fa-cloud", color: "#34a853", banner: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400", industry: "Technology & Software" },
    { name: "Tesla Motors", icon: "fa-car", color: "#e82127", banner: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400", industry: "Electric Vehicles & AI" },
    { name: "Spotify Music", icon: "fa-music", color: "#1ed760", banner: "https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=400", industry: "Entertainment & Streaming" },
    { name: "Amazon Logistics", icon: "fa-amazon", color: "#ff9900", banner: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400", industry: "E-Commerce & Supply Chain" },
    { name: "Microsoft AI", icon: "fa-laptop", color: "#00a4ef", banner: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400", industry: "Artificial Intelligence" },
    { name: "Netflix Studios", icon: "fa-film", color: "#e50914", banner: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400", industry: "Media & Production" }
];

// مصفوفة الـ 6 وظائف مع حلقة ربط ذكية بكود الكورس المطلوب لمنع التقديم العشوائي
const jobs = [
    { id: 1, title: "Web Developer (JavaScript)", company: "Google Cloud", img: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=500", requiredCourseId: 801, desc: "We need a person who knows JavaScript. If you do not know it, please take the course below first to unlock this job application." },
    { id: 2, title: "Digital Marketing Specialist", company: "Spotify Music", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500", requiredCourseId: 802, desc: "Help us get more users for our app. You need to finish the marketing course and pass the quiz to apply for this job." },
    { id: 3, title: "Data Analyst Trainee", company: "Amazon Logistics", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500", requiredCourseId: 803, desc: "Analyze business metrics and delivery schedules. Pass our standard corporate excel analytics course to unlock the entry form." },
    { id: 4, title: "AI Prompt Engineer", company: "Microsoft AI", img: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=500", requiredCourseId: 804, desc: "Work closely with large language systems. If you have no official certification in Artificial Intelligence, clear the micro-module below." },
    { id: 5, title: "Graphic & UI Designer", company: "Netflix Studios", img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=500", requiredCourseId: 805, desc: "Create amazing visual templates for our landing page networks. Complete the basic design tools workshop to verify your application." },
    { id: 6, title: "Junior Robotics Tester", company: "Tesla Motors", img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500", requiredCourseId: 806, desc: "Help check automated robotic components inside our hardware lab. Requires initial safety and systems testing certification." }
];

// مصفوفة الـ 6 كورسات مع روابط ميديا ويوتيوب وكتب حقيقية واختبارات تفاعلية
const courses = [
    { id: 801, title: "Learn JavaScript Coding from Scratch", img: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=500", videoUrl: "https://www.youtube.com/embed/W6NZfCO5SIk", pdfUrl: "https://www.gstatic.com/covid19/mobility/2020-03-29_EG_Mobility_Report_en.pdf", questions: [
        { q: "Which one is used to make a fixed variable?", a: ["var", "let", "const"], correct: 2 },
        { q: "What keyword is used to declare a variable that cannot be reassigned?", a: ["var", "let", "const"], correct: 2 },
        { q: "What does the 'let' keyword do?", a: ["Creates a global variable", "Creates a block-scoped variable", "Creates a function-scoped variable"], correct: 1 },
        { q: "What will console.log(typeof 42) output?", a: ["'number'", "'int'", "'numeric'"], correct: 0 },
        { q: "Which method adds an element to the end of an array?", a: ["push()", "pop()", "shift()"], correct: 0 },
        { q: "What does JSON.stringify() do?", a: ["Converts object to string", "Parses a JSON string", "Creates a new array"], correct: 0 },
        { q: "What is the correct syntax for a function declaration?", a: ["function myFunc = () {}", "function myFunc() {}", "def myFunc() {}"], correct: 1 },
        { q: "What does 'this' refer to in an object method?", a: ["The window object", "The object itself", "The parent function"], correct: 1 },
        { q: "What is the output of 5 + '5' in JavaScript?", a: ["10", "'55'", "Error"], correct: 1 },
        { q: "Which method removes the first element from an array?", a: ["push()", "pop()", "shift()"], correct: 2 }
    ] },
    { id: 802, title: "Digital Marketing and SEO Secrets", img: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=500", videoUrl: "https://www.youtube.com/embed/ScmEsh-7n48", pdfUrl: "https://www.adobe.com/support/products/enterprise/knowledgecenter/media/cct_enterprise_deployment_guide.pdf", questions: [
        { q: "What does SEO help you with?", a: ["Get free traffic from Google", "Make the website faster", "Change website colors"], correct: 0 },
        { q: "What does SEM stand for?", a: ["Search Engine Marketing", "Social Email Marketing", "Site Electronic Method"], correct: 0 },
        { q: "Which factor is most important for SEO ranking?", a: ["Backlinks", "Keyword density", "Page load speed"], correct: 0 },
        { q: "What is a meta description used for?", a: ["To describe a file", "To summarize page content in search results", "To optimize images"], correct: 1 },
        { q: "What is the ideal keyword density percentage?", a: ["1-2%", "5-10%", "15-20%"], correct: 0 },
        { q: "Which is a white-hat SEO technique?", a: ["Keyword stuffing", "Creating quality content", "Cloaking"], correct: 1 },
        { q: "What does CTR stand for?", a: ["Click-Through Rate", "Content Traffic Ranking", "Conversion Table Rate"], correct: 0 },
        { q: "Which tool is used to analyze website traffic?", a: ["Google Analytics", "Photoshop", "Slack"], correct: 0 },
        { q: "What is anchor text used for?", a: ["To anchor images", "To describe link text", "To center content"], correct: 1 },
        { q: "How often should you publish new content for SEO?", a: ["Once a year", "Consistently and regularly", "Only when needed"], correct: 1 }
    ] },
    { id: 803, title: "Data Analysis & Business Excel Foundations", img: "https://images.unsplash.com/photo-1504868584819-f8e8b446d2e4?w=500", videoUrl: "https://www.youtube.com/embed/rwbho0CgEAE", pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", questions: [
        { q: "Which formula is used to add multiple numbers together?", a: ["AVERAGE", "SUM", "COUNT"], correct: 1 },
        { q: "What does the AVERAGE function calculate?", a: ["The sum of values", "The mean value", "The maximum value"], correct: 1 },
        { q: "How do you count non-empty cells in Excel?", a: ["COUNT", "COUNTA", "COUNTBLANK"], correct: 1 },
        { q: "What function finds the highest value in a range?", a: ["MAX", "MIN", "LARGEST"], correct: 0 },
        { q: "What is a pivot table used for?", a: ["Organizing data analysis", "Creating charts", "Formatting cells"], correct: 0 },
        { q: "Which symbol is used for absolute reference in Excel?", a: ["@", "$", "#"], correct: 1 },
        { q: "What function returns the number of characters in a text?", a: ["LENGTH", "LEN", "CHARS"], correct: 1 },
        { q: "How do you combine text from multiple cells?", a: ["MERGE", "CONCATENATE", "JOIN"], correct: 1 },
        { q: "What does VLOOKUP function do?", a: ["Looks up vertical data", "Looks for values in a column", "Creates a new column"], correct: 1 },
        { q: "What is conditional formatting used for?", a: ["Formatting cells based on conditions", "Creating borders", "Changing font size"], correct: 0 }
    ] },
    { id: 804, title: "Introduction to Artificial Intelligence & Prompts", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500", videoUrl: "https://www.youtube.com/embed/2ePf9rue1Ao", pdfUrl: "https://www.cisco.com/c/dam/en_us/about/ac123/ac147/archived_issues/ipj_9-2/ipj_9-2.pdf", questions: [
        { q: "What does AI stand for?", a: ["Artificial Intelligence", "Advanced Internet", "Automated Interface"], correct: 0 },
        { q: "What is machine learning?", a: ["Teaching computers to learn from data", "Writing machine code", "Repairing robots"], correct: 0 },
        { q: "What is a neural network?", a: ["A computer network", "A system modeled after neurons", "A type of router"], correct: 1 },
        { q: "What does NLP stand for?", a: ["Natural Language Processing", "Network Layer Protocol", "Neural Line Programming"], correct: 0 },
        { q: "What is deep learning?", a: ["Learning deep concepts", "Machine learning using multiple layers", "Understanding AI fundamentals"], correct: 1 },
        { q: "What is the purpose of a prompt in AI?", a: ["To turn off the AI", "To give instructions to AI", "To display text"], correct: 1 },
        { q: "What is supervised learning?", a: ["Learning with labeled data", "Learning without guidance", "Self-directed learning"], correct: 0 },
        { q: "What is the output of a classification model?", a: ["A continuous number", "A category or label", "An image"], correct: 1 },
        { q: "What is overfitting in machine learning?", a: ["The model learns patterns too well", "The model fails to learn", "Adding too many features"], correct: 0 },
        { q: "What is the role of training data in AI?", a: ["To test the model", "To teach the model", "To display results"], correct: 1 }
    ] },
    { id: 805, title: "UI/UX Layout Rules & Graphic Principles", img: "https://images.unsplash.com/photo-1561070791-26c113006238?w=500", videoUrl: "https://www.youtube.com/embed/c9Wg6A_eWIU", pdfUrl: "https://www.oracle.com/technetwork/java/javase/downloads/faq-jsp-141381.html", questions: [
        { q: "Which software is famous for UI design layouts?", a: ["Excel", "Figma", "Word"], correct: 1 },
        { q: "What is the purpose of whitespace in UI design?", a: ["To fill empty areas", "To improve readability and focus", "To reduce file size"], correct: 1 },
        { q: "What does UX stand for?", a: ["User Experience", "User Extension", "Unified Expressions"], correct: 0 },
        { q: "What is the rule of thirds used for?", a: ["Dividing time", "Creating balanced compositions", "Organizing files"], correct: 1 },
        { q: "What is a wireframe?", a: ["A type of fence", "A basic layout sketch", "A design template"], correct: 1 },
        { q: "What is color harmony in design?", a: ["Matching random colors", "Pleasing color combinations", "Color saturation"], correct: 1 },
        { q: "What does accessibility mean in UI design?", a: ["Making design affordable", "Ensuring usability for all users", "Creating mobile apps"], correct: 1 },
        { q: "What is the purpose of typography in UI?", a: ["To make text pretty", "To communicate hierarchy and meaning", "To increase file size"], correct: 1 },
        { q: "What is a call-to-action (CTA)?", a: ["A dialogue box", "A button prompting user action", "A navigation menu"], correct: 1 },
        { q: "What principle emphasizes consistency in design?", a: ["Unity", "Contrast", "Emphasis"], correct: 0 }
    ] },
    { id: 806, title: "Hardware Safety Protocols & Systems Testing", img: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=500", videoUrl: "https://www.youtube.com/embed/bXv2Z40G8lQ", pdfUrl: "https://www.intel.com/content/dam/www/public/us/en/documents/product-briefs/ethernet-x520-brief.pdf", questions: [
        { q: "What should you do first before testing any raw electrical hardware?", a: ["Turn off power supply", "Increase voltage", "Ignore alerts"], correct: 0 },
        { q: "What is ESD (Electrostatic Discharge)?", a: ["A type of wire", "Sudden electrical current flow from static", "Electronic System Design"], correct: 1 },
        { q: "What should you wear when handling sensitive hardware?", a: ["Cotton clothing", "ESD wrist strap", "Leather gloves"], correct: 1 },
        { q: "What is grounding used for in hardware testing?", a: ["To connect wires", "To prevent static discharge", "To power devices"], correct: 1 },
        { q: "What is a multimeter used for?", a: ["Testing multiple devices", "Measuring voltage and current", "Fixing broken parts"], correct: 1 },
        { q: "What temperature range is safe for most electronics?", a: ["0-40°C", "-20 to 80°C", "50-100°C"], correct: 0 },
        { q: "What is the purpose of thermal testing?", a: ["To heat the device", "To verify performance under temperature stress", "To cool systems down"], correct: 1 },
        { q: "What does POST stand for in hardware testing?", a: ["Power On Self Test", "Primary Operating System Test", "Power Output Status Test"], correct: 0 },
        { q: "What is a stress test in hardware evaluation?", a: ["Testing human stress", "Running hardware at maximum load", "Checking for scratches"], correct: 1 },
        { q: "What safety equipment is required in a hardware lab?", a: ["Fire extinguisher", "Safety goggles", "Both of the above"], correct: 2 }
    ] }
];

document.addEventListener("DOMContentLoaded", () => { renderCompanies(); renderJobs(); renderCourses(); checkUser(); });

function renderCompanies() {
    document.getElementById('companies-container').innerHTML = companies.map(c => `
        <div class="company-card">
            <div class="company-banner" style="background-image: url('${c.banner}'), url('${FALLBACK_IMAGE}')">
                <div class="company-logo-box" style="color: ${c.color}"><i class="fa-solid ${c.icon}"></i></div>
            </div>
            <div class="company-details"><h4>${c.name}</h4><p style="color: var(--text-muted); font-size: 13px;">${c.industry}</p></div>
        </div>
    `).join('');
}

function renderJobs() {
    document.getElementById('jobs-container').innerHTML = jobs.map(j => `
        <div class="card">
            <img src="${j.img}" class="card-img" alt="${j.title}" onerror="this.onerror=null; this.src='${FALLBACK_IMAGE}';">
            <div class="card-body">
                <h3>${j.title}</h3><p style="color: var(--primary); font-size: 13px; font-weight: 700;">${j.company}</p>
                <p style="font-size: 14px; color: #475569; margin-top:8px;">${j.desc}</p>
                <button class="btn btn-primary mt-3 w-100" onclick="applyToJob(${j.id}, ${j.requiredCourseId})">Apply Now</button>
            </div>
        </div>
    `).join('');
}

function renderCourses() {
    document.getElementById('courses-container').innerHTML = courses.map(c => `
        <div class="card">
            <img src="${c.img}" class="card-img" alt="${c.title}" onerror="this.onerror=null; this.src='${FALLBACK_IMAGE}';">
            <div class="card-body"><h3>${c.title}</h3><button class="btn btn-outline w-100 mt-3" onclick="launchStudio(${c.id})">Open Course</button></div>
        </div>
    `).join('');
}

let authMode = 'register';
let currentCourseId = null;
let currentQuizIndex = 0;

function showToast(message, type = 'info', duration = 4000) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.animation = 'toast-out 0.3s ease forwards';
        toast.addEventListener('animationend', () => toast.remove(), { once: true });
    }, duration);
}

function getStoredData() {
    const raw = localStorage.getItem('shoghlak_user_data');
    if (!raw) return { users: [], activeEmail: null };

    try {
        const data = JSON.parse(raw);
        if (data && Array.isArray(data.users)) {
            return { users: data.users, activeEmail: data.activeEmail || null };
        }
        if (data && typeof data.email === 'string') {
            return { users: [data], activeEmail: data.email.toLowerCase() };
        }
    } catch (error) {
        console.warn('Invalid auth storage format:', error);
    }

    return { users: [], activeEmail: null };
}

function saveUserData(data) {
    const normalized = {
        users: Array.isArray(data.users) ? data.users : [],
        activeEmail: data.activeEmail ? data.activeEmail.toLowerCase() : null
    };
    localStorage.setItem('shoghlak_user_data', JSON.stringify(normalized));
}

function getUserByEmail(email) {
    if (!email) return null;
    const data = getStoredData();
    return data.users.find(u => u.email === email.toLowerCase()) || null;
}

function getActiveUser() {
    const data = getStoredData();
    if (!data.activeEmail) return null;
    return data.users.find(u => u.email === data.activeEmail) || null;
}

function setActiveUser(email) {
    const data = getStoredData();
    data.activeEmail = email ? email.toLowerCase() : null;
    saveUserData(data);
}

function openModal(id) {
    document.getElementById(id).style.display = 'flex';
}

function openAuthModal(mode) {
    switchAuthMode(mode);
    openModal('login-modal');
}

function closeModal(id) { document.getElementById(id).style.display = 'none'; }

let confirmCallback = null;

function showConfirmModal(title, message, confirmText = 'Confirm', callback) {
    confirmCallback = callback;
    document.getElementById('confirm-title').innerText = title;
    document.getElementById('confirm-message').innerText = message;
    document.getElementById('confirm-btn').innerText = confirmText;
    openModal('confirmation-modal');
}

function closeConfirmModal() {
    closeModal('confirmation-modal');
    confirmCallback = null;
}

function handleConfirmAction() {
    if (confirmCallback) {
        confirmCallback();
    }
    closeConfirmModal();
}

function switchAuthMode(mode) {
    authMode = mode;
    const title = document.getElementById('auth-modal-title');
    const subtitle = document.getElementById('auth-modal-subtitle');
    const nameField = document.getElementById('name-field');
    const passwordField = document.getElementById('password-field');
    const confirmPasswordField = document.getElementById('confirm-password-field');
    const submitBtn = document.getElementById('auth-submit-btn');
    const switchBtn = document.getElementById('auth-switch-btn');

    if (mode === 'login') {
        title.innerText = 'Login to Your Account';
        subtitle.innerText = 'Use your email and password to sign in.';
        nameField.style.display = 'none';
        passwordField.style.display = 'block';
        confirmPasswordField.style.display = 'none';
        submitBtn.innerText = 'Login';
        switchBtn.innerText = 'Need an account? Register';
        switchBtn.onclick = () => switchAuthMode('register');
    } else {
        title.innerText = 'Create an Account';
        subtitle.innerText = 'Register now to save progress and apply for jobs.';
        nameField.style.display = 'block';
        passwordField.style.display = 'block';
        confirmPasswordField.style.display = 'block';
        submitBtn.innerText = 'Create Account';
        switchBtn.innerText = 'Already have an account? Login';
        switchBtn.onclick = () => switchAuthMode('login');
    }
}

function handleAuth(e) {
    e.preventDefault();
    const nameInput = document.getElementById('reg-name').value.trim();
    const emailInput = document.getElementById('reg-email').value.trim().toLowerCase();
    const passwordInput = document.getElementById('reg-password').value;
    const passwordConfirmInput = document.getElementById('reg-password-confirm').value;

    if (!emailInput) {
        showToast('Please enter your email.', 'error');
        return;
    }

    const storedData = getStoredData();
    const existingUser = getUserByEmail(emailInput);

    if (authMode === 'login') {
        if (!existingUser) {
            showToast('No account found with this email. Please register first.', 'error');
            return;
        }
        if (existingUser.password !== passwordInput) {
            showToast('Invalid password. Please try again.', 'error');
            return;
        }

        setActiveUser(existingUser.email);
        showToast(`Welcome back, ${existingUser.name}!`, 'success');
        closeModal('login-modal');
        checkUser();
        return;
    }

    if (!nameInput) {
        showToast('Please enter your name to create an account.', 'error');
        return;
    }
    if (!passwordInput || passwordInput.length < 8) {
        showToast('Password must be at least 8 characters long.', 'error');
        return;
    }
    if (passwordInput !== passwordConfirmInput) {
        showToast('Passwords do not match. Please confirm your password.', 'error');
        return;
    }
    if (existingUser && existingUser.password) {
        showToast('An account already exists with this email. Please login instead.', 'error');
        switchAuthMode('login');
        return;
    }

    const newUser = existingUser
        ? { ...existingUser, name: nameInput, password: passwordInput }
        : { name: nameInput, email: emailInput, password: passwordInput, doneCourses: [] };

    if (existingUser) {
        storedData.users = storedData.users.map(u => u.email === emailInput ? newUser : u);
    } else {
        storedData.users.push(newUser);
    }

    saveUserData(storedData);
    showToast('Account created successfully! Please login now.', 'success');
    
    // Clear form
    document.getElementById('auth-form').reset();
    
    // Switch to login mode
    setTimeout(() => switchAuthMode('login'), 500);
}

// دالة فحص حالة المستخدم المعدلة بالكامل لإظهار الترحيب مع الاسم وزر الـ Logout
function checkUser() {
    const activeUser = getActiveUser();
    const authZone = document.getElementById('auth-zone');

    if (activeUser) {
        authZone.innerHTML = `
            <span style="font-weight:700; color:var(--primary); margin-right: 15px; display: inline-flex; align-items: center; gap: 5px;">
                <i class="fa-solid fa-user"></i> Welcome, ${activeUser.name}
            </span>
            <button class="btn btn-outline" onclick="handleLogout()" style="padding: 6px 15px; font-size: 12px; height: auto; line-height: 1;">Logout</button>
        `;
    } else {
        authZone.innerHTML = `
            <button class="btn btn-outline" onclick="openAuthModal('login')">Login</button>
            <button class="btn btn-primary" onclick="openAuthModal('register')">Register</button>
        `;
    }
}

// دالة تسجيل الخروج لتصفير البيانات وإعادة الواجهة إلى طبيعتها
function handleLogout() {
    setActiveUser(null);
    checkUser();
    showToast('Logged out successfully!', 'success');
}

function applyToJob(jobId, courseId) {
    const user = getActiveUser();
    if (!user) { showToast('Please login first to apply for jobs!', 'error'); openAuthModal('login'); return; }
    const course = courses.find(c => c.id === courseId);
    if (!user.doneCourses || !user.doneCourses.includes(courseId)) {
        showConfirmModal(
            'Complete Required Course',
            `You need a certificate in "${course.title}" first.\n\nDo you want to open the course now to learn and take the quiz?`,
            'Open Course',
            () => launchStudio(courseId)
        );
    } else {
        showToast('Success! Your job application and your quiz certificate were sent to the company.', 'success');
    }
}

function launchStudio(courseId) {
    const user = getActiveUser();
    if (!user) { showToast('Please login first to open courses!', 'error'); openAuthModal('login'); return; }
    const course = courses.find(c => c.id === courseId);
    
    currentCourseId = courseId;
    currentQuizIndex = 0;
    
    document.getElementById('modal-course-title').innerText = course.title;
    document.getElementById('video-player').src = course.videoUrl;
    document.getElementById('pdf-link').href = course.pdfUrl;
    
    // Hide quiz section, show course content
    document.getElementById('course-content').style.display = 'block';
    document.getElementById('quiz-section').style.display = 'none';
    document.getElementById('quiz-container').innerHTML = '';
    
    openModal('course-viewer-modal');
}

function startQuiz() {
    const course = courses.find(c => c.id === currentCourseId);
    
    // Hide course content, show quiz section
    document.getElementById('course-content').style.display = 'none';
    document.getElementById('quiz-section').style.display = 'block';
    
    // Display first question
    displayQuizQuestion(0);
}

function displayQuizQuestion(qIdx) {
    const course = courses.find(c => c.id === currentCourseId);
    const question = course.questions[qIdx];
    
    const quizBox = document.getElementById('quiz-container');
    quizBox.innerHTML = `
        <div>
            <p style="font-weight: 700; margin-bottom: 8px;">${question.q}</p>
            ${question.a.map((opt, optIdx) => `<label style="display:block; margin: 5px 0;"><input type="radio" name="quiz-ans-current" value="${optIdx}"> ${opt}</label>`).join('')}
            <button class="btn btn-primary w-100 mt-3" onclick="checkQuiz()">Submit Answer</button>
        </div>
    `;
    
    document.getElementById('current-question').innerText = qIdx + 1;
}

function checkQuiz() {
    const course = courses.find(c => c.id === currentCourseId);
    const selected = document.querySelector('input[name="quiz-ans-current"]:checked');
    
    if (!selected) { 
        showToast('Please select one answer!', 'error'); 
        return; 
    }
    
    const question = course.questions[currentQuizIndex];
    
    if (parseInt(selected.value) === question.correct) {
        // Move to next question or complete course
        if (currentQuizIndex < course.questions.length - 1) {
            currentQuizIndex++;
            showToast('Correct! Moving to next question...', 'success');
            setTimeout(() => displayQuizQuestion(currentQuizIndex), 500);
        } else {
            // All questions completed successfully
            markCourseComplete();
        }
    } else {
        showToast('Wrong answer. Try again!', 'error');
    }
}

function markCourseComplete() {
    const data = getStoredData();
    const user = getActiveUser();
    
    if (!user) { 
        showToast('Please login first to continue.', 'error'); 
        openAuthModal('login'); 
        return; 
    }
    
    if (!user.doneCourses) user.doneCourses = [];
    if (!user.doneCourses.includes(currentCourseId)) {
        user.doneCourses.push(currentCourseId);
    }
    
    data.users = data.users.map(u => u.email === user.email ? user : u);
    saveUserData(data);
    
    showToast('🎉 Congratulations! You passed all 10 questions and earned your certificate!', 'success');
    setTimeout(() => {
        closeModal('course-viewer-modal');
        renderJobs();
    }, 2000);
}


// محرك تغيير المظهر التلقائي وحفظه داخل المتصفح (Theme Manager)
(function() {
    const savedTheme = localStorage.getItem('shoghlak_theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.addEventListener("DOMContentLoaded", () => {
        const themeIcon = document.querySelector('#theme-toggle i');
        if(themeIcon) themeIcon.className = savedTheme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    });
})();

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    let newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('shoghlak_theme', newTheme);
    const themeIcon = document.querySelector('#theme-toggle i');
    if(themeIcon) themeIcon.className = newTheme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
}