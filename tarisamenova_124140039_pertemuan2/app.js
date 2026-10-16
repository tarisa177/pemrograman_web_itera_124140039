// StudySpace — Student Dashboard
// Data tugas disimpan di localStorage agar tetap tersedia setelah halaman ditutup.

const STORAGE_KEY = "studyspace_tasks_v1";

class TaskItem {
  constructor({ id = crypto.randomUUID(), title, course, deadline, priority = "Sedang", completed = false }) {
    this.id = id;
    this.title = title;
    this.course = course;
    this.deadline = deadline;
    this.priority = priority;
    this.completed = completed;
  }
}

class DashboardApp {
  constructor() {
    this.tasks = this.loadTasks();
    this.filter = "all";
    this.form = document.querySelector("#task-form");
    this.taskList = document.querySelector("#task-list");
    this.toastElement = document.querySelector("#toast");
    this.bindEvents();
    this.render();
    this.updateDate();
    this.loadWeather();
    this.loadQuote();
  }

  loadTasks = () => {
    try {
      const savedTasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      return savedTasks.map((task) => new TaskItem(task));
    } catch (error) {
      console.error("Gagal membaca tugas tersimpan:", error);
      return [];
    }
  };

  saveTasks = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks));
  };

  bindEvents = () => {
    document.querySelector("#add-task-btn").addEventListener("click", () => this.openForm());
    document.querySelector("#empty-add-btn").addEventListener("click", () => this.openForm());
    document.querySelector("#cancel-form").addEventListener("click", () => this.closeForm());
    document.querySelector("#cancel-form-bottom").addEventListener("click", () => this.closeForm());
    this.form.addEventListener("submit", (event) => this.handleSubmit(event));
    document.querySelectorAll(".filter-tab").forEach((button) => {
      button.addEventListener("click", () => this.setFilter(button.dataset.filter));
    });
    document.querySelector("#refresh-quote").addEventListener("click", () => this.loadQuote());
    this.taskList.addEventListener("click", (event) => this.handleTaskAction(event));
    this.taskList.addEventListener("change", (event) => this.handleTaskChange(event));
  };

  updateDate = () => {
    const now = new Date();
    const dateText = new Intl.DateTimeFormat("id-ID", {
      weekday: "long", day: "numeric", month: "long", year: "numeric"
    }).format(now);
    document.querySelector("#date-display").textContent = dateText;
    document.querySelector("#year").textContent = now.getFullYear();
  };

  openForm = (task = null) => {
    this.form.classList.remove("hidden");
    document.querySelector("#form-title").textContent = task ? "Edit tugas" : "Tugas baru";
    document.querySelector("#task-id").value = task?.id || "";
    document.querySelector("#task-name").value = task?.title || "";
    document.querySelector("#task-course").value = task?.course || "";
    document.querySelector("#task-deadline").value = task?.deadline || "";
    document.querySelector("#task-priority").value = task?.priority || "Sedang";
    document.querySelector("#task-name").focus();
    this.form.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  closeForm = () => {
    this.form.reset();
    document.querySelector("#task-id").value = "";
    this.form.classList.add("hidden");
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const id = document.querySelector("#task-id").value;
    const taskData = {
      title: document.querySelector("#task-name").value.trim(),
      course: document.querySelector("#task-course").value.trim(),
      deadline: document.querySelector("#task-deadline").value,
      priority: document.querySelector("#task-priority").value
    };
    if (!taskData.title || !taskData.course || !taskData.deadline) {
      this.showToast("Lengkapi semua data tugas dulu ya.");
      return;
    }

    if (id) {
      this.tasks = this.tasks.map((task) =>
        task.id === id ? new TaskItem({ ...task, ...taskData }) : task
      );
      this.showToast("Tugas berhasil diperbarui.");
    } else {
      this.tasks = [...this.tasks, new TaskItem(taskData)];
      this.showToast("Tugas baru berhasil ditambahkan.");
    }
    this.saveTasks();
    this.closeForm();
    this.render();
  };

  handleTaskAction = (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    const { action, id } = button.dataset;
    const task = this.tasks.find((item) => item.id === id);
    if (!task) return;

    if (action === "edit") {
      this.openForm(task);
    } else if (action === "delete") {
      const shouldDelete = window.confirm(`Hapus tugas "${task.title}"?`);
      if (!shouldDelete) return;
      this.tasks = this.tasks.filter((item) => item.id !== id);
      this.saveTasks();
      this.render();
      this.showToast("Tugas berhasil dihapus.");
    }
  };

  handleTaskChange = (event) => {
    if (!event.target.matches("input[data-action='toggle']")) return;
    const { id } = event.target.dataset;
    this.tasks = this.tasks.map((task) =>
      task.id === id ? new TaskItem({ ...task, completed: event.target.checked }) : task
    );
    this.saveTasks();
    this.render();
    this.showToast("Status tugas diperbarui.");
  };

  setFilter = (filter) => {
    this.filter = filter;
    document.querySelectorAll(".filter-tab").forEach((button) => {
      button.classList.toggle("selected", button.dataset.filter === filter);
    });
    this.renderTasks();
  };

  formatDeadline = (dateString) => {
    if (!dateString) return "Belum ada deadline";
    return new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", year: "numeric" })
      .format(new Date(`${dateString}T00:00:00`));
  };

  renderTasks = () => {
    const filteredTasks = this.tasks.filter((task) => {
      if (this.filter === "pending") return !task.completed;
      if (this.filter === "done") return task.completed;
      return true;
    }).sort((a, b) => a.deadline.localeCompare(b.deadline));

    this.taskList.innerHTML = filteredTasks.map((task) => `
      <article class="task-item ${task.completed ? "is-done" : ""}">
        <input class="task-check" type="checkbox" data-action="toggle" data-id="${task.id}"
          aria-label="Tandai ${this.escapeHTML(task.title)} selesai" ${task.completed ? "checked" : ""}>
        <div class="task-info">
          <div class="task-name">${this.escapeHTML(task.title)}</div>
          <div class="task-meta">
            <span class="course-name">${this.escapeHTML(task.course)}</span><span class="meta-dot"></span>
            <span class="deadline-label">◷ ${this.formatDeadline(task.deadline)}</span>
            <span class="priority ${task.priority}">${task.priority}</span>
          </div>
        </div>
        <div class="task-actions">
          <button class="task-action" type="button" data-action="edit" data-id="${task.id}" aria-label="Edit tugas" title="Edit">✎</button>
          <button class="task-action delete" type="button" data-action="delete" data-id="${task.id}" aria-label="Hapus tugas" title="Hapus">×</button>
        </div>
      </article>
    `).join("");

    document.querySelector("#empty-state").classList.toggle("hidden", filteredTasks.length > 0);
    document.querySelector("#task-total-label").textContent = `${filteredTasks.length} tugas`;
  };

  escapeHTML = (value) => {
    const characters = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
    return String(value).replace(/[&<>"']/g, (character) => characters[character]);
  };

  renderStats = () => {
    const total = this.tasks.length;
    let completed = 0;
    this.tasks.forEach((task) => {
      if (task.completed) completed += 1;
    });
    const pending = total - completed;
    const progress = total ? Math.round((completed / total) * 100) : 0;
    document.querySelector("#total-count").textContent = total;
    document.querySelector("#pending-count").textContent = pending;
    document.querySelector("#done-count").textContent = completed;
    document.querySelector("#progress-label").textContent = `${progress}% progres`;
    document.querySelector("#progress-bar").style.width = `${progress}%`;
  };

  render = () => {
    this.renderTasks();
    this.renderStats();
  };

  showToast = (message) => {
    this.toastElement.textContent = message;
    this.toastElement.classList.add("show");
    window.clearTimeout(this.toastTimer);
    this.toastTimer = window.setTimeout(() => this.toastElement.classList.remove("show"), 2600);
  };

  loadWeather = async () => {
    const temperature = document.querySelector("#temperature");
    const condition = document.querySelector("#weather-condition");
    const detail = document.querySelector("#weather-detail");
    const icon = document.querySelector("#weather-icon");
    const updated = document.querySelector("#weather-updated");
    try {
      const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=-5.36&longitude=105.31&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code&timezone=Asia%2FJakarta");
      if (!response.ok) throw new Error("Respons cuaca tidak berhasil.");
      const data = await response.json();
      const current = data.current;
      const descriptions = {
        0: ["Cerah", "☀"], 1: ["Cerah berawan", "🌤"], 2: ["Berawan sebagian", "⛅"],
        3: ["Mendung", "☁"], 45: ["Berkabut", "🌫"], 48: ["Kabut tebal", "🌫"],
        51: ["Gerimis ringan", "🌦"], 53: ["Gerimis", "🌦"], 55: ["Gerimis lebat", "🌧"],
        61: ["Hujan ringan", "🌦"], 63: ["Hujan sedang", "🌧"], 65: ["Hujan lebat", "🌧"],
        71: ["Salju ringan", "❄"], 80: ["Hujan lokal", "🌦"], 81: ["Hujan", "🌧"],
        82: ["Hujan deras", "🌧"], 95: ["Badai petir", "⛈"]
      };
      const [description, weatherIcon] = descriptions[current.weather_code] || ["Kondisi cuaca", "🌤"];
      temperature.textContent = `${Math.round(current.temperature_2m)}°`;
      condition.textContent = description;
      detail.textContent = `Terasa ${Math.round(current.apparent_temperature)}° · Kelembapan ${current.relative_humidity_2m}%`;
      icon.textContent = weatherIcon;
      updated.textContent = "Baru saja";
    } catch (error) {
      console.error("Cuaca gagal dimuat:", error);
      temperature.textContent = "--°";
      condition.textContent = "Tidak tersedia";
      detail.textContent = "Periksa koneksi internet";
      updated.textContent = "Offline";
      document.querySelector("#weather-error").classList.remove("hidden");
    }
  };

  loadQuote = async () => {
    const quoteText = document.querySelector("#quote-text");
    const quoteAuthor = document.querySelector("#quote-author");
    const fallback = {
      quote: "Kamu tidak harus hebat untuk memulai, tetapi kamu harus memulai untuk menjadi hebat.",
      author: "Zig Ziglar"
    };
    quoteText.textContent = "Mengambil inspirasi...";
    try {
      const response = await fetch("https://dummyjson.com/quotes/random");
      if (!response.ok) throw new Error("Kutipan tidak tersedia.");
      const data = await response.json();
      quoteText.textContent = data.quote || fallback.quote;
      quoteAuthor.textContent = data.author || fallback.author;
    } catch (error) {
      quoteText.textContent = fallback.quote;
      quoteAuthor.textContent = fallback.author;
    }
  };
}

document.addEventListener("DOMContentLoaded", () => {
  new DashboardApp();
});
