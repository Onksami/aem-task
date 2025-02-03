function timeUntil(targetDate) {
  const now = new Date();
  const target = new Date(targetDate);

  let diff = Math.floor((target - now) / 1000); // Farkı saniye cinsinden al

  if (diff < 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    }; // Geçmiş tarih için sıfır döndür
  }

  const days = Math.floor(diff / (60 * 60 * 24));
  diff %= 60 * 60 * 24;

  const hours = Math.floor(diff / (60 * 60));
  diff %= 60 * 60;

  const minutes = Math.floor(diff / 60);
  const seconds = diff % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
  };
}

function createTimeBox(value, label) {
  const box = document.createElement('div');
  box.className = 'timeBox';

  const valueP = document.createElement('p');
  valueP.className = 'timeValue';
  valueP.textContent = value;

  const labelP = document.createElement('p');
  labelP.className = 'timeLabel';
  labelP.textContent = label;

  box.appendChild(valueP);
  box.appendChild(labelP);

  return box;
}

export default function decorate(block) {
  const bannerContainer = document.createElement('div');
  bannerContainer.className = 'bannerContainer';

  const pictureDiv = block.children[0].children[0];
  const img = pictureDiv.querySelector('img');
  const imgUrl = img.src;

  bannerContainer.setAttribute('data-bg-image', imgUrl);

  const bannerTitle = block.children[0].children[1].children[0];
  bannerTitle.className = 'bannerTitle';
  const bannerDesc = block.children[0].children[1].children[1];
  bannerDesc.className = 'bannerDesc';
  const bannerExplanation = block.children[0].children[1].children[2];
  bannerExplanation.className = 'bannerExplanation';
  const bannerDate = block.children[0].children[1].children[3];
  bannerDate.className = 'bannerDate';

  const date = new Date(bannerDate.innerText);
  const options = {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  };
  const formattedDate = date.toLocaleDateString('en-GB', options);
  bannerDate.innerText = formattedDate;

  const remainingTimeContainer = document.createElement('div');
  remainingTimeContainer.className = 'remainingTimeContainer';

  function updateCountdown() {
    const remainingTime = timeUntil(bannerDate.innerText);
    remainingTimeContainer.innerHTML = ''; // Eski değerleri temizle

    Object.entries(remainingTime).forEach(([key, value]) => {
      const timeBox = createTimeBox(value, key);
      remainingTimeContainer.appendChild(timeBox);
    });

    if (
      remainingTime.days === 0
      && remainingTime.hours === 0
      && remainingTime.minutes === 0
      && remainingTime.seconds === 0
    ) {
      // eslint-disable-next-line no-use-before-define
      clearInterval(interval);
    }
  }

  updateCountdown(); // İlk başta çalıştır
  const interval = setInterval(updateCountdown, 1000); // Her saniye güncelle

  const bannerFirstSection = document.createElement('div');
  bannerFirstSection.appendChild(bannerTitle);
  bannerFirstSection.appendChild(bannerDesc);
  bannerFirstSection.appendChild(bannerExplanation);
  bannerFirstSection.appendChild(bannerDate);
  bannerFirstSection.appendChild(remainingTimeContainer);

  const bannerLoginButton = block.children[0].children[2].children[0];
  bannerLoginButton.className = 'bannerLoginButton';

  const loginButton = document.createElement('button');
  loginButton.innerHTML = bannerLoginButton.innerHTML;
  loginButton.className = 'banner-login-button';

  bannerLoginButton.replaceWith(loginButton);

  const bannerRegisterButton = block.children[0].children[2].children[1];

  const registerButton = document.createElement('button');
  registerButton.innerHTML = bannerRegisterButton.innerHTML;
  registerButton.className = 'banner-register-button';

  bannerRegisterButton.replaceWith(registerButton);

  const bannerSecondSection = document.createElement('div');
  bannerSecondSection.appendChild(loginButton);
  bannerSecondSection.appendChild(registerButton);

  bannerContainer.appendChild(bannerFirstSection);
  bannerContainer.appendChild(bannerSecondSection);

  block.innerHTML = '';
  bannerContainer.style.backgroundImage = `url(${bannerContainer.dataset.bgImage})`;
  block.appendChild(bannerContainer);
}
