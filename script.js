const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

document.getElementById('add-task').addEventListener('click', () => {
    if (taskInput.value.trim() !== '') {
        const li = document.createElement('li');
        li.innerHTML = `
            ${taskInput.value}
            <button class="delete-task">
                <i class="fas fa-trash-alt"></i>
            </button>
        `;
        taskList.appendChild(li);
        li.querySelector('.delete-task').addEventListener('click', () => {
            taskList.removeChild(li);
        });

        taskInput.value = '';
    }
});

let timer;
let seconds = 1500;
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start-timer');
const pauseButton = document.getElementById('pause-timer');
const resetButton = document.getElementById('reset-timer');

function updateTimerDisplay() {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    timerDisplay.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
startButton.addEventListener('click', () => {
    if (!timer) {
        timer = setInterval(() => {
            if (seconds > 0) {
                seconds--;
                updateTimerDisplay();
            } else {
                clearInterval(timer);
                timer = null;
                alert('Time’s up!');
            }
        }, 1000);
    }
});

pauseButton.addEventListener('click', () => {
    clearInterval(timer);
    timer = null;
});

resetButton.addEventListener('click', () => {
    clearInterval(timer);
    timer = null;
    seconds = 1500;
    updateTimerDisplay();
});

const notesInput = document.getElementById('quick-notes');
document.getElementById('save-notes').addEventListener('click', () => {
    alert(`Notes Saved: ${notesInput.value}`);
});

const moodIcons = document.querySelectorAll('.mood-icons span');
const moodHistory = document.getElementById('mood-history');
let moodHistoryList = [];

moodIcons.forEach((icon) => {
    icon.addEventListener('click', () => {
        const currentTime = new Date().toLocaleTimeString();
        const selectedMood = icon.textContent;
        const moodEntry = {
            mood: selectedMood,
            time: currentTime
        };

        moodHistoryList.push(moodEntry);
        updateMoodHistory();
    });
});

function updateMoodHistory() {
    moodHistory.innerHTML = '';
    moodHistoryList.forEach((entry) => {
        const moodItem = document.createElement('div');
        moodItem.classList.add('mood-item');
        moodItem.textContent = `${entry.time}: ${entry.mood}`;
        moodHistory.appendChild(moodItem);
    });
}