const form = document.getElementById('event-form');
const eventsList = document.getElementById('events');

// Get events from local storage
const events = JSON.parse(localStorage.getItem('events')) || [];

// Function to save events to local storage
function saveEventsToLocalStorage(events) {
  localStorage.setItem('events', JSON.stringify(events));
}

// Function to display events
function displayEvents() {
  eventsList.innerHTML = '';
  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    const eventElement = createEventElement(event, i);
    eventsList.appendChild(eventElement);
  }
}

// Function to create event element
function createEventElement(event, index) {
  const { title, date, time, description, image } = event;
  
  const eventElement = document.createElement('li');
  eventElement.classList.add('event');

  const eventImg = document.createElement('img');
  eventImg.src = image;
  eventImg.alt = title;

  const eventTitle = document.createElement('h3');
  eventTitle.textContent = title;

  const eventDate = document.createElement('p');
  eventDate.textContent = `Date: ${date}`;

  const eventTime = document.createElement('p');
  eventTime.textContent = `Time: ${time}`;

  const eventDescription = document.createElement('p');
  eventDescription.textContent = description;

  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  removeButton.addEventListener('click', () => {
    events.splice(index, 1);
    saveEventsToLocalStorage(events);
    displayEvents();
  });

  eventElement.appendChild(eventImg);
  eventElement.appendChild(eventTitle);
  eventElement.appendChild(eventDate);
  eventElement.appendChild(eventTime);
  eventElement.appendChild(eventDescription);
  eventElement.appendChild(removeButton);

  return eventElement;
}

// Event listener for form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = form['event-title'].value;
  const date = form['event-date'].value;
  const time = form['event-time'].value;
  const description = form['event-description'].value;
  const image = form['event-image'].files[0];

  const reader = new FileReader();
  reader.onload = function() {
    const event = {
      title,
      date,
      time,
      description,
      image: reader.result,
    };

    events.push(event);
    saveEventsToLocalStorage(events);
    const eventElement = createEventElement(event, events.length - 1);
    eventsList.appendChild(eventElement);
  }

  reader.readAsDataURL(image);
  form.reset();
});

// Display events on page load
displayEvents();
