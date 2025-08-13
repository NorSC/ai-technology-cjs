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
  const response = await fetch('data/technologies/sample.yaml');
  const text = await response.text();
  const tech = jsyaml.load(text);
  const grid = document.getElementById('tech-grid');
  grid.innerHTML = '';

  // Show if no filter OR tech includes stage
  if (!stageId || tech.stages.includes(stageId)) {
    const div = document.createElement('div');
    div.className = 'tech-card';
    div.innerHTML = `<h3>${tech.name}</h3><p>${tech.description}</p>`;
    grid.appendChild(div);
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
