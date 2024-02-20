// --------------------
// Utility Functions
// --------------------

function createElement(type, className, textContent) {
    const element = document.createElement(type);
    if (className) element.className = className;
    if (textContent !== undefined) element.textContent = textContent;
    return element;
}

// --------------------
// Local Storage Management
// --------------------

function updateLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

// --------------------
// Group Management Functions
// --------------------

function addGroup() {
    const groupInput = document.getElementById('new-group');
    const groupName = groupInput.value.trim();
    if (!groupName) {
        alert("Group name cannot be empty.");
        return;
    }

    const taskGroupSelect = document.getElementById('task-group');
    if (Array.from(taskGroupSelect.options).some(option => option.value === groupName)) {
        alert("Group already exists.");
        return;
    }

    addGroupToSelect(groupName);
    addGroupButton(groupName);
    updateGroupsLocalStorage();
    groupInput.value = '';
}

function addGroupToSelect(groupName) {
    const taskGroupSelect = document.getElementById('task-group');
    taskGroupSelect.appendChild(createElement('option', '', groupName)).value = groupName;
}

function addGroupButton(groupName) {
    const groupSelector = document.querySelector('.group-selector');
    const groupContainer = createElement('div', 'group-container');
    const groupButton = createElement('button', 'group-btn', groupName, groupName);
    groupButton.onclick = () => filterTasks(groupName);
    const deleteButton = createElement('button', 'delete-group-btn', 'X');
    deleteButton.onclick = () => deleteGroup(groupName);
    groupContainer.append(groupButton, deleteButton);
    groupSelector.appendChild(groupContainer);
}

function deleteGroup(groupName) {
    if (!confirm(`Are you sure you want to delete the group "${groupName}" and all its tasks?`)) return;

    document.querySelectorAll(`#task-list li[data-group="${groupName}"]`).forEach(task => task.remove());
    document.querySelectorAll('#task-group option').forEach(option => { if (option.value === groupName) option.remove(); });
    document.querySelectorAll('.group-selector .group-container').forEach(container => { if (container.querySelector('.group-btn').textContent === groupName) container.remove(); });
    updateTasksLocalStorage();
    updateGroupsLocalStorage();
}

// --------------------
// Task Management Functions
// --------------------

function addTask() {
    const taskText = document.getElementById('new-task').value.trim();
    const taskGroup = document.getElementById('task-group').value === "All" ? "" : document.getElementById('task-group').value;
    if (!taskText) {
        alert("Task cannot be empty.");
        return;
    }

    document.getElementById('task-list').appendChild(createTaskItem(taskText, taskGroup));
    document.getElementById('new-task').value = '';
    updateTasksLocalStorage();
}

function createTaskItem(taskText, taskGroup) {
    const listItem = createElement('li');
    listItem.setAttribute('data-group', taskGroup);
    const taskContent = createElement('span', 'task-content', taskText);
    const groupLabel = createElement('span', 'group-label', taskGroup);
    const deleteButton = createElement('button', 'delete-btn', '×');
    deleteButton.onclick = event => { event.stopPropagation(); listItem.remove(); updateTasksLocalStorage(); };
    listItem.append(taskContent, groupLabel, deleteButton);
    listItem.onclick = () => listItem.classList.toggle('pinned');
    return listItem;
}

function filterTasks(group) {
    document.querySelectorAll('#task-list li').forEach(task => {
        task.style.display = (group === 'All' || task.getAttribute('data-group') === group) ? '' : 'none';
    });
}

// --------------------
// Local Storage Update and Load Functions
// --------------------

function updateTasksLocalStorage() {
    const tasks = Array.from(document.querySelectorAll('#task-list li')).map(task => ({
        text: task.querySelector('.task-content').textContent,
        group: task.getAttribute('data-group'),
        pinned: task.classList.contains('pinned')
    }));
    updateLocalStorage('tasks', tasks);
}

function loadTasksFromLocalStorage() {
    const tasksData = getFromLocalStorage('tasks');
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Clear existing tasks
    tasksData?.forEach(({ text, group, pinned }) => taskList.appendChild(createTaskItem(text, group, pinned)));
}

function updateGroupsLocalStorage() {
    const groups = Array.from(document.querySelectorAll('#task-group option')).map(option => option.value);
    updateLocalStorage('groups', groups);
}

function loadGroupsFromLocalStorage() {
    const groupsData = getFromLocalStorage('groups');
    if (groupsData) {
        groupsData.forEach(groupName => {
            if (groupName !== "All") {
                addGroupToSelect(groupName);
                addGroupButton(groupName);
            }
        });
    }
}

// --------------------
// Event Listeners Setup
// --------------------

document.addEventListener('DOMContentLoaded', () => {
    loadGroupsFromLocalStorage();
    loadTasksFromLocalStorage();
});

document.getElementById('add-group-btn').onclick = addGroup;
document.getElementById('add-task-btn').onclick = addTask;
document.getElementById('new-task').addEventListener('keydown', event => {
    if (event.key === 'Enter') addTask();
});
