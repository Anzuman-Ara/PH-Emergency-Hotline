document.addEventListener('DOMContentLoaded', () => {
    const services = [
        {
            name: "National Emergency Number",
            englishName: "National Emergency",
            number: "999",
            category: "All",
            icon: "assets/emergency.png",
            color: "rgba(253, 229, 229, 1)" 
        },
        {
            name: "Police Helpline Number",
            englishName: "Police",
            number: "999",
            category: "Police",
            icon: "assets/police.png",
            color: "rgba(222, 230, 251, 1)" 
        },
        {
            name: "Fire Service Number",
            englishName: "Fire Service",
            number: "999",
            category: "Fire",
            icon: "assets/fire-service.png",
            color: "rgba(253, 229, 229, 1)" 
        },
        {
            name: "Ambulance Service",
            englishName: "Health",
            number: "1994-999999",
            category: "Health",
            icon: "assets/ambulance.png",
            color: "rgba(209, 245, 209, 1)" 
        },
        {
            name: "Women & Child Helpline",
            englishName: "Women & Child Helpline",
            number: "109",
            category: "Help",
            icon: "assets/emergency.png",
            color: "rgba(253, 229, 229, 1)" 
        },
        {
            name: "Anti-Corruption Helpline",
            englishName: "Anti-Corruption",
            number: "106",
            category: "Govt.",
            icon: "assets/emergency.png",
            color: "rgba(253, 229, 229, 1)" 
        },
        {
            name: "Electricity Helpline",
            englishName: "Electricity Outage",
            number: "16216",
            category: "Electricity",
            icon: "assets/emergency.png",
            color: "rgba(253, 229, 229, 1)" 
        },
        {
            name: "Brac Helpline",
            englishName: "Brac",
            number: "16445",
            category: "NGO",
            icon: "assets/emergency.png",
            color: "rgba(253, 229, 229, 1)" 
        },
        {
            name: "Bangladesh Railway Helpline",
            englishName: "Bangladesh Railway",
            number: "163",
            category: "Travel",
            icon: "assets/emergency.png",
            color: "rgba(253, 229, 229, 1)" 
        }
    ];

    // Selectors
    const cardSection = document.querySelector('.card-section');
    const historyList = document.querySelector('.history-list');
    const clearHistoryBtn = document.querySelector('.clear-history-btn');
    const heartCountEl = document.querySelector('.heart-count');
    const coinCountEl = document.querySelector('.coin-count');
    const copyCountEl = document.querySelector('.copy-count');

    // State variables
    let heartCount = 0;
    let coinCount = 100;
    let copyCount = 0;

    // Helper function to create a card element
    const createCard = (service) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.name = service.name;
        card.dataset.number = service.number;

        card.innerHTML = `
            <div class="card-header">
                <div class="card-icon" style="background-color: ${service.color};">
                    <img src="${service.icon}" alt="${service.name} icon">
                </div>
                <i class="fa-solid fa-heart card-heart-icon"></i>
            </div>
            <h3>${service.name}</h3>
            <span class="card-english-name">${service.englishName}</span>
            <span class="card-number">${service.number}</span>
            <span class="card-badge">${service.category}</span>
            <div class="card-buttons">
                <button class="card-btn copy-btn"><i class="fa-regular fa-copy"></i> Copy</button>
                <button class="card-btn call-btn"><i class="fa-solid fa-phone"></i> Call</button>
            </div>
        `;
        return card;
    };

    // Helper function to add to history
    const addToHistory = (serviceName, serviceNumber) => {
        const historyItem = document.createElement('div');
        historyItem.classList.add('history-item');
        
        const now = new Date();
        const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

        historyItem.innerHTML = `
            <div class="history-service">${serviceName}</div>
            <div class="history-number">${serviceNumber}</div>
            <div class="history-time">${timeString}</div>
        `;
        historyList.prepend(historyItem);
    };

    // Render cards
    services.forEach(service => {
        cardSection.appendChild(createCard(service));
    });

    // Event listener for the card section (using event delegation)
    cardSection.addEventListener('click', (e) => {
        const card = e.target.closest('.card');
        if (!card) return;

        const serviceName = card.dataset.name;
        const serviceNumber = card.dataset.number;

        // Handle Heart icon click
        if (e.target.classList.contains('card-heart-icon')) {
            e.target.classList.toggle('liked');
            if (e.target.classList.contains('liked')) {
                heartCount++;
            } else {
                heartCount--;
            }
            heartCountEl.textContent = heartCount;
        }

        // Handle Call button click
        if (e.target.closest('.call-btn')) {
            if (coinCount < 20) {
                alert("You don't have enough coins to make this call.");
                return;
            }

            // Reduce coins
            coinCount -= 20;
            coinCountEl.textContent = coinCount;

            // Add to history
            addToHistory(serviceName, serviceNumber);

            // Show alert
            alert(`Calling ${serviceName}: ${serviceNumber}`);
        }

        // Handle Copy button click
        if (e.target.closest('.copy-btn')) {
            navigator.clipboard.writeText(serviceNumber)
                .then(() => {
                    alert(`The number ${serviceNumber} has been copied to your clipboard.`);
                    copyCount++;
                    copyCountEl.textContent = copyCount;
                })
                .catch(err => {
                    console.error('Failed to copy text: ', err);
                });
        }
    });

    // Handle Clear History button click
    clearHistoryBtn.addEventListener('click', () => {
        historyList.innerHTML = '';
    });

});
