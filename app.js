let selectedStage = null;

async function loadYAML(url) {
  const response = await fetch(url);
  const text = await response.text();
  return jsyaml.load(text);
}

async function loadStages() {
  const stages = await loadYAML('core/stages.yaml');
  const container = document.getElementById('stages');

  stages.forEach(stage => {
    const btn = document.createElement('button');
    btn.textContent = stage.name;
    btn.dataset.stageId = stage.id;
    btn.classList.add('stage-button');
    btn.onclick = () => filterByStage(stage.id, btn);
    container.appendChild(btn);
  });

  // Show all technologies on page load
  loadTechnologies();
}

async function loadTechnologies(stageId = null) {
  const indexRes = await fetch('data/technologies/index.json');
  const fileList = await indexRes.json();
  const grid = document.getElementById('tech-grid');
  grid.innerHTML = '';

  for (const file of fileList) {
    const res = await fetch(`data/technologies/${file}`);
    const text = await res.text();
    const tech = jsyaml.load(text);

    // Filter by stage (if selected)
    if (!stageId || (tech.stages && tech.stages.includes(stageId))) {
      const div = document.createElement('div');
      div.className = 'tech-card';
      div.innerHTML = `<h3>${tech.name}</h3><p>${tech.description}</p>`;
      grid.appendChild(div);
    }
  }
}


function filterByStage(stageId, button) {
  // Reset previously active button
  const buttons = document.querySelectorAll('.stage-button');
  buttons.forEach(btn => btn.classList.remove('active'));

  // Toggle selection
  if (selectedStage === stageId) {
    // If clicked again, deselect and show all
    selectedStage = null;
    loadTechnologies();
  } else {
    selectedStage = stageId;
    button.classList.add('active');
    loadTechnologies(stageId);
  }
}

loadStages();
