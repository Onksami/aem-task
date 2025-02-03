export default function decorate(block) {
  const webinarPortal = document.querySelector('.webinar');

  const title = webinarPortal.querySelector('div > div > p');
  title.className = 'webinar-title';
  const description = webinarPortal.querySelector('div:nth-child(2) > div > p');
  description.className = 'webinar-description';

  const webinarDivider = document.createElement('span');
  webinarDivider.className = 'webinar-divider';

  const webinarContainer = document.createElement('div');
  webinarContainer.className = 'webinar-container';

  webinarContainer.append(title, description, webinarDivider);

  block.innerHTML = '';
  block.appendChild(webinarContainer);
}
