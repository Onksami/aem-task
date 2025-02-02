export default function decorate(block) {
  // Create the main container
  const mainContainer = document.createElement('div');
  mainContainer.className = 'speakers-main-container';

  const speakerTitle = document.createElement('p');
  speakerTitle.className = 'SpeakerTitle';
  speakerTitle.textContent = 'Speakers';
  mainContainer.appendChild(speakerTitle);

  // Create navigation container
  const navContainer = document.createElement('div');
  navContainer.className = 'date-navigation';

  // Get all tables and their dates
  const tables = [...block.querySelectorAll('table')];
  const dates = tables.map((table) => table.querySelector('td[colspan="3"]').textContent.trim());

  // Create section for each date
  const sections = dates.map((date, index) => {
    const section = document.createElement('div');
    section.className = 'speakers-section';
    section.style.display = index === 0 ? 'block' : 'none';

    // Create content rows
    const rows = [...tables[index].querySelectorAll('tr')].slice(1); // Skip header row

    // Group speakers into rows of 4
    const speakerRows = [];
    for (let i = 0; i < rows.length; i += 8) {
      const rowDiv = document.createElement('div');
      rowDiv.className = 'speakers-row';

      rows.slice(i, i + 8).forEach((row) => {
        const speakerCard = document.createElement('div');
        speakerCard.className = 'speaker-card';

        const imgContent = row.querySelector('td:first-child').innerHTML;
        const infoContent = row.querySelector('td:nth-child(2)').innerHTML;
        const extraInfo = row.querySelector('td:last-child').textContent;

        speakerCard.innerHTML = `
          <div class="speaker-image">${imgContent}</div>
          <div class="speaker-info">${infoContent}</div>
          <button class="see-bio-btn" data-info="${extraInfo}">See Bio</button>
        `;

        rowDiv.appendChild(speakerCard);
      });

      speakerRows.push(rowDiv);
    }

    speakerRows.forEach((row) => section.appendChild(row));
    return section;
  });

  // Create date toggle buttons
  dates.forEach((date, index) => {
    const toggleBtn = document.createElement('button');
    toggleBtn.className = `date-toggle ${index === 0 ? 'active' : ''}`;
    toggleBtn.textContent = date;

    toggleBtn.addEventListener('click', () => {
      document
        .querySelectorAll('.date-toggle')
        .forEach((btn) => btn.classList.remove('active'));
      toggleBtn.classList.add('active');

      sections.forEach((section, i) => {
        section.style.display = i === index ? 'block' : 'none';
      });
    });

    navContainer.appendChild(toggleBtn);
  });

  // Append all elements
  mainContainer.appendChild(navContainer);
  sections.forEach((section) => mainContainer.appendChild(section));

  // Replace original content
  block.innerHTML = '';
  block.appendChild(mainContainer);

  // Create modal
  const modal = document.createElement('div');
  modal.className = 'bio-modal';
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-modal">&times;</span>
      <div class="modal-body"></div>
    </div>
  `;
  document.body.appendChild(modal);

  // Setup bio button clicks
  block.querySelectorAll('.see-bio-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.speaker-card');
      const name = card.querySelector('strong').textContent;
      const info = btn.getAttribute('data-info');

      const modalBody = modal.querySelector('.modal-body');
      modalBody.innerHTML = `
        <h3>${name}</h3>
        <p>${info}</p>
      `;
      modal.style.display = 'block';
    });
  });

  // Modal close functionality
  modal.querySelector('.close-modal').addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
}
