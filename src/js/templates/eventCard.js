const eventList = document.querySelector('.gallery');

const eventCardMarkup = events =>
  events
    .map(
      ({
        images,
        name,
        dates: {
          start: { localDate },
        },
        _embedded: {
          venues: [{ name: place }],
        },
      }) => {
        const standardImage = images.filter(
          ({ url, width, ratio }) =>
            url.toLowerCase().includes('tablet_landscape') &&
            width >= 640 &&
            width < 2040 &&
            ratio === '3_2',
        )[0].url;

        const retinaImage = images.filter(
          ({ url, width, ratio }) =>
            url.toLowerCase().includes('retina') && width >= 640 && ratio === '3_2',
        )[0].url;

        return `
        <li class="gallery__item"> 
        <picture>
          <source
          srcset="
          ${standardImage ? standardImage : images[0].url} 1x,
          ${retinaImage ? retinaImage : images[0].url} 2x,
          " 
        />
        <img class="gallery__image" src=${
          standardImage ? standardImage : images[0].url
        } alt=${name} />
        </picture>
        <div class="gallery__wrapper">
            <div class="gallery__marquee ">
              <h3 class="gallery__subtitle ${checkDeviceForSubtitle(name, 'animated')}">${name}</h3>
            </div>
            <p class="gallery__text">${localDate}</p>   
            <div class="gallery__wrapper-inner ">
              <div class="gallery__svg"></div>
              <div class=" gallery__marquee">
                <p class="gallery__text gallery__text-location ${checkDeviceForLocation(
                  place,
                  'animated',
                )}">
                ${place}
                </p>
              </div>
            </div>
        </div>
    </li>
    `;
      },
    )
    .join('');

const renderMarkup = events => {
  eventList.innerHTML = '';
  const markup = eventCardMarkup(events);
  eventList.insertAdjacentHTML('beforeend', markup);
};

function checkDeviceForSubtitle(el, className) {
  if (window.innerWidth < 768) {
    return checkLength(el, 15, className);
  } else if (window.innerWidth > 767 && window.innerWidth < 1024) {
    return checkLength(el, 20, className);
  } else {
    return checkLength(el, 25, className);
  }
}

function checkDeviceForLocation(el, className) {
  if (window.innerWidth < 768) {
    return checkLength(el, 12, className);
  } else {
    return checkLength(el, 18, className);
  }
}

function checkLength(el, num, className) {
  return el.length > num ? className : '';
}

export { renderMarkup };
