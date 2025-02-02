export default function decorate(block) {
  console.log('webinarPortal', block);

  const webinarPortal = document.querySelector('.webinarportal');

  const title = webinarPortal.querySelector('div > div > p');
  title.className = 'webinar-title';
  const description = webinarPortal.querySelector('div:nth-child(2) > div > p');
  description.className = 'webinar-description';

  const webinarDivider = document.createElement('span');
  webinarDivider.className = 'webinarDivider';

  const webinarContainer = document.createElement('div');
  webinarContainer.className = 'webinarContainer';

  webinarContainer.append(title, description, webinarDivider);

  block.innerHTML = '';
  block.appendChild(webinarContainer);
}
