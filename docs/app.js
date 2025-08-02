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
    btn.onclick = () => loadTechnologies(stage.id);
    container.appendChild(btn);
  });
}

async function loadTechnologies(stageId) {
  const response = await fetch('data/technologies/sample.yaml');
  const text = await response.text();
  const tech = jsyaml.load(text);
  const grid = document.getElementById('tech-grid');
  grid.innerHTML = '';
  if (tech.stages.includes(stageId)) {
    const div = document.createElement('div');
    div.className = 'tech-card';
    div.innerHTML = `<h3>${tech.name}</h3><p>${tech.description}</p>`;
    grid.appendChild(div);
  }
}

loadStages();
