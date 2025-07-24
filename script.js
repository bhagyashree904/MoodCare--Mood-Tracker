// const token = localStorage.getItem("token");
// if (!token) {
//   window.location.href = "login.html";
// }
// function logout() {
//   localStorage.removeItem("token");
//   window.location.href = "login.html";
// }

if (!localStorage.getItem("isLoggedIn")) {
  window.location.href = "login.html";
}
const moodButtons = document.querySelectorAll(".moods button");
const selectedMood = document.getElementById("selectedMood");
const journalEntry = document.getElementById("journalEntry");
const saveBtn = document.getElementById("saveBtn");
const saveMessage = document.getElementById("saveMessage");
const entriesList = document.getElementById("entriesList");

let currentMood = null;

moodButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    currentMood = btn.getAttribute("data-mood");
    selectedMood.textContent = `You selected mood: ${btn.textContent}`;
  });
});

function loadEntries() {
  const entries = JSON.parse(localStorage.getItem("moodEntries")) || [];
  entriesList.innerHTML = entries
    .map(e => `<li>${e.date} — Mood: ${e.emoji}<br>${e.text}</li>`)
    .join("");
}
function renderChart() {
  const entries = JSON.parse(localStorage.getItem("moodEntries")) || [];

  const labels = entries.map((e) => e.date);
  const moodValues = entries.map((e) => parseInt(e.emoji.codePointAt(0) - 0x1f622 + 1)); // Convert emoji to mood level (approximate)

  const ctx = document.getElementById("moodChart").getContext("2d");

  if (window.moodChart) window.moodChart.destroy(); // Prevent duplicate chart
  window.moodChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: "Mood Level",
        data: moodValues,
        backgroundColor: "#4f46e5",
        borderColor: "#4f46e5",
        fill: false,
        tension: 0.3,
      }],
    },
    options: {
      scales: {
        y: {
          min: 1,
          max: 5,
          ticks: {
            stepSize: 1,
            callback: function(value) {
              return ["😢","😐","🙂","😊","😄"][value - 1];
            }
          }
        }
      }
    }
  });
}


saveBtn.addEventListener("click", () => {
  const text = journalEntry.value.trim();
  if (!currentMood) {
    alert("Please select a mood!");
    return;
  }
  if (!text) {
    alert("Please write something in the journal.");
    return;
  }
  const emoji = moodButtons[currentMood - 1].textContent;
  const entry = {
    date: new Date().toLocaleDateString(),
    emoji,
    text
  };
  const entries = JSON.parse(localStorage.getItem("moodEntries")) || [];
  entries.push(entry);
  localStorage.setItem("moodEntries", JSON.stringify(entries));
  saveMessage.textContent = "Entry saved!";
  setTimeout(() => (saveMessage.textContent = ""), 2000);
  journalEntry.value = "";
  currentMood = null;
  selectedMood.textContent = "No mood selected yet.";
  loadEntries();
  renderChart();
});

function loadQuote() {
  fetch("https://api.quotable.io/random")
    .then(res => res.json())
    .then(data => {
      document.getElementById("quoteText").textContent = `"${data.content}" — ${data.author}`;
    })
    .catch(() => {
      document.getElementById("quoteText").textContent = "Could not load quote.";
    });
}

function sendMessage() {
  const msg = document.getElementById("therapistMsg").value.trim();
  if (!msg) return alert("Please write a message");

  // Save locally
  let messages = JSON.parse(localStorage.getItem("therapistMsgs")) || [];
  messages.push({ msg, date: new Date().toLocaleString() });
  localStorage.setItem("therapistMsgs", JSON.stringify(messages));

  document.getElementById("therapistResponse").textContent = "Message sent anonymously!";
  document.getElementById("therapistMsg").value = "";
}
function downloadJournal() {
  const entries = JSON.parse(localStorage.getItem("moodEntries")) || [];
  const content = entries.map(e => `${e.date} - ${e.emoji}\n${e.text}\n\n`).join("");
  const blob = new Blob([content], { type: "text/plain" });
  const link = document.createElement("a");

  link.download = "MoodCare_Journal.txt";
  link.href = URL.createObjectURL(blob);
  link.click();
}

//--------------

loadEntries();
renderChart(); 
loadQuote();

