document.addEventListener("DOMContentLoaded", async () => {
  const leftKeys = ["contact", "education", "skills", "languages"];
  const rightKeys = ["profile", "workExperience", "references"];
  const allKeys = [...leftKeys, ...rightKeys];

  const defaultData = await fetch("data.json").then(res => res.json());
  let currentData = JSON.parse(localStorage.getItem("resume-data")) || structuredClone(defaultData);

  const renderSections = () => {
    document.getElementById("left-sections").innerHTML = "";
    document.getElementById("right-sections").innerHTML = "";

    allKeys.forEach(key => {
      const section = document.createElement("div");
      section.className = "section";
      section.dataset.section = key;

      const isLeft = leftKeys.includes(key);
      const container = isLeft ? document.getElementById("left-sections") : document.getElementById("right-sections");

      const title = key.replace(/([A-Z])/g, " $1").toUpperCase();
      const h2 = document.createElement("h2");
      const flag = document.createElement("span");
      flag.className = "flag";
      h2.append(flag, title);
      section.appendChild(h2);

      const content = document.createElement("div");
      content.className = "content";
      currentData[key].forEach(item => {
        const div = document.createElement("div");
        div.textContent = item;
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "edit-btn";
        div.appendChild(editBtn);
        content.appendChild(div);
      });
      section.appendChild(content);

      const addBtn = document.createElement("button");
      addBtn.className = "add-btn";
      addBtn.textContent = "Add";
      section.appendChild(addBtn);

      const saveBtn = document.createElement("button");
      saveBtn.className = "save-btn";
      saveBtn.textContent = "Save";
      section.appendChild(saveBtn);

      container.appendChild(section);
    });
  };

  // Animate RICHARD QARABALA
  const nameEl = document.getElementById("name");
  const nameText = nameEl.textContent.trim();
  nameEl.textContent = "";
  nameText.split("").forEach((ch, i) => {
    const span = document.createElement("span");
    span.textContent = ch === " " ? "\u00A0" : ch;
    span.style.animationDelay = `${i * 0.08}s`;
    nameEl.appendChild(span);
  });

  // Interaction
  document.body.addEventListener("click", e => {
    const section = e.target.closest(".section");
    if (!section) return;
    const key = section.dataset.section;
    const content = section.querySelector(".content");

    // Edit
    if (e.target.classList.contains("edit-btn")) {
      const div = e.target.parentElement;
      const text = div.firstChild.textContent.trim();
      const input = prompt("Edit item:", text);
      if (input !== null) {
        div.firstChild.textContent = input;
        currentData[key][Array.from(content.children).indexOf(div)] = input;
      }
    }

    // Add
    if (e.target.classList.contains("add-btn")) {
      const input = prompt("Add new item:");
      if (input) {
        const div = document.createElement("div");
        div.textContent = input;
        const editBtn = document.createElement("button");
        editBtn.className = "edit-btn";
        editBtn.textContent = "Edit";
        div.appendChild(editBtn);
        content.appendChild(div);
        currentData[key].push(input);
      }
    }

    // Save
    if (e.target.classList.contains("save-btn")) {
      localStorage.setItem("resume-data", JSON.stringify(currentData));
      alert("Saved!");
    }
  });

  // Reset
  document.getElementById("reset-btn").addEventListener("click", () => {
    currentData = structuredClone(defaultData);
    renderSections();
    alert("Reset to original!");
  });

  renderSections();
});
