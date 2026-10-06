const USERS = [
  { email: 'intern@example.com', password: 'Intern@123', role: 'QA User' },
  { email: 'viewer@example.com', password: 'Viewer@123', role: 'Viewer' }
];

const SEED_TASKS = [
  { id: 1, title: 'Review login requirements', description: 'Check positive and negative authentication flows.', status: 'Todo', priority: 'High', dueDate: futureDate(2), owner: 'QA Team' },
  { id: 2, title: 'Prepare Smoke Checklist', description: 'Create the minimum release verification checks.', status: 'In Progress', priority: 'Medium', dueDate: futureDate(4), owner: 'QA Team' },
  { id: 3, title: 'Archive completed report', description: 'Store final release evidence.', status: 'Done', priority: 'Low', dueDate: futureDate(7), owner: 'QA Team' }
];

const $ = (id) => document.getElementById(id);
const loginView = $('loginView');
const dashboardView = $('dashboardView');
const taskDialog = $('taskDialog');
let currentUser = null;

function futureDate(days) {
  const d = new Date(); d.setDate(d.getDate() + days);
  return d.toISOString().slice(0,10);
}
function seedIfNeeded(force=false) {
  if (force || !localStorage.getItem('taskflow_tasks')) localStorage.setItem('taskflow_tasks', JSON.stringify(SEED_TASKS));
}
function tasks() { return JSON.parse(localStorage.getItem('taskflow_tasks') || '[]'); }
function saveTasks(list) { localStorage.setItem('taskflow_tasks', JSON.stringify(list)); }
function session() { return JSON.parse(localStorage.getItem('taskflow_session') || 'null'); }
function showToast(message){ $('toast').textContent=message; $('toast').classList.remove('hidden'); setTimeout(()=>$('toast').classList.add('hidden'),1600); }

function showLogin(){ currentUser=null; dashboardView.classList.add('hidden'); loginView.classList.remove('hidden'); $('loginForm').reset(); $('loginError').textContent=''; }
function showDashboard(user){ currentUser=user; loginView.classList.add('hidden'); dashboardView.classList.remove('hidden'); $('userEmail').textContent=user.email; $('roleBadge').textContent=user.role; $('addTaskBtn').classList.toggle('hidden', user.role==='Viewer'); renderTasks(); }

$('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = $('email').value; // Intentional defect: requirement says email should be trimmed and case-insensitive.
  const password = $('password').value;
  const user = USERS.find(u => u.email === email && u.password === password);
  if (!user) { $('loginError').textContent='Invalid email or password.'; return; }
  localStorage.setItem('taskflow_session', JSON.stringify(user));
  showDashboard(user);
});

$('logoutBtn').addEventListener('click', () => { localStorage.removeItem('taskflow_session'); showLogin(); });
$('resetDemo').addEventListener('click', () => { localStorage.removeItem('taskflow_session'); seedIfNeeded(true); $('loginError').textContent='Demo data reset.'; });

function renderTasks(){
  const query = $('searchInput').value;
  const filter = $('statusFilter').value;
  let list = tasks();
  // Intentional defect: search is case-sensitive although requirement says case-insensitive.
  if (query) list = list.filter(t => t.title.includes(query) || t.description.includes(query));
  if (filter !== 'All') {
    // Intentional defect: Done filter also returns In Progress tasks.
    list = filter === 'Done' ? list.filter(t => t.status !== 'Todo') : list.filter(t => t.status === filter);
  }
  $('stats').innerHTML = `<span class="stat">Total: ${tasks().length}</span><span class="stat">Showing: ${list.length}</span>`;
  const body=$('taskBody'); body.innerHTML='';
  $('emptyState').classList.toggle('hidden', list.length !== 0);
  $('taskTable').classList.toggle('hidden', list.length === 0);
  list.forEach(t => {
    const tr=document.createElement('tr'); tr.dataset.testid=`task-row-${t.id}`;
    tr.innerHTML=`<td><div class="task-title">${escapeHtml(t.title)}</div><div class="task-desc">${escapeHtml(t.description)}</div></td><td><span class="badge">${t.status}</span></td><td>${t.priority}</td><td>${t.dueDate}</td><td>${t.owner}</td><td><div class="actions">${currentUser.role==='Viewer'?'':`<button class="secondary edit-btn" data-id="${t.id}">Edit</button>`}<button class="danger delete-btn" data-id="${t.id}">Delete</button></div></td>`;
    body.appendChild(tr);
  });
  document.querySelectorAll('.edit-btn').forEach(b=>b.addEventListener('click',()=>openEdit(Number(b.dataset.id))));
  // Intentional defect: Viewer is expected to be read-only but delete is available and works.
  document.querySelectorAll('.delete-btn').forEach(b=>b.addEventListener('click',()=>deleteTask(Number(b.dataset.id))));
}

$('searchInput').addEventListener('input', renderTasks);
$('statusFilter').addEventListener('change', renderTasks);
$('addTaskBtn').addEventListener('click', openAdd);
$('closeDialog').addEventListener('click', ()=>taskDialog.close());
$('cancelTask').addEventListener('click', ()=>taskDialog.close());

function openAdd(){
  $('dialogTitle').textContent='Add Task'; $('taskForm').reset(); $('taskId').value=''; $('taskStatus').value='Todo'; $('taskPriority').value='Medium'; $('taskDueDate').value=futureDate(1); clearErrors(); taskDialog.showModal();
}
function openEdit(id){
  const t=tasks().find(x=>x.id===id); if(!t) return;
  $('dialogTitle').textContent='Edit Task'; $('taskId').value=t.id; $('taskTitle').value=t.title; $('taskDescription').value=t.description; $('taskStatus').value=t.status; $('taskPriority').value=t.priority; $('taskDueDate').value=t.dueDate; clearErrors(); taskDialog.showModal();
}
function clearErrors(){ $('titleError').textContent=''; $('dateError').textContent=''; }

$('taskForm').addEventListener('submit', (e)=>{
  e.preventDefault(); clearErrors();
  const title=$('taskTitle').value.trim();
  const dueDate=$('taskDueDate').value;
  if(title.length < 3){ $('titleError').textContent='Title must be at least 3 characters.'; return; }
  if(!dueDate){ $('dateError').textContent='Due date is required.'; return; }
  // Intentional defects: title max 50, description max 200, and past-date rules are not enforced.
  const item={
    id: $('taskId').value ? Number($('taskId').value) : Date.now(),
    title,
    description:$('taskDescription').value.trim(),
    status:$('taskStatus').value,
    priority:$('taskPriority').value,
    dueDate,
    owner:'QA Team'
  };
  let list=tasks(); const idx=list.findIndex(x=>x.id===item.id);
  if(idx>=0) list[idx]=item; else list.unshift(item);
  saveTasks(list); taskDialog.close(); renderTasks(); showToast(idx>=0?'Task updated':'Task created');
});

function deleteTask(id){
  if(!confirm('Delete this task?')) return;
  saveTasks(tasks().filter(t=>t.id!==id)); renderTasks(); showToast('Task deleted');
}
function escapeHtml(v=''){ return v.replace(/[&<>'"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }

seedIfNeeded();
const existing=session(); existing ? showDashboard(existing) : showLogin();
