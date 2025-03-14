
       let inventory = 500;
const maxInventory = 500;
const rechargeTime = 3600000; // 1 hour

// Start vibration if supported by the device
function startVibration() {
    if ("vibrate" in navigator) {
        window.navigator.vibrate(20);
    } else {
        console.log("Vibration not supported on this device");
    }
}

// Handle click event on the image
function handleClick() {
    if (inventory > 2) {
        let coins = Number(localStorage.getItem('coins')) || 0; // Retrieve the saved coins
        coins += 2;
        localStorage.setItem('coins', coins); // Save updated coins to localStorage

        inventory -= 2;

        document.getElementById('score').textContent = `$ ${coins.toLocaleString()}`;
        updateInventory();
        startVibration();

        const image = document.querySelector('.clickable');
        image.classList.add('shake');
        setTimeout(() => {
            image.classList.remove('shake');
        }, 500);

        const scoreDisplay = document.createElement('div');
        scoreDisplay.textContent = "+2";
        scoreDisplay.classList.add('score-display');
        document.body.appendChild(scoreDisplay);

        const rect = image.getBoundingClientRect();
        scoreDisplay.style.left = `${rect.left + rect.width / 2}px`;
        scoreDisplay.style.top = `${rect.top}px`;

        setTimeout(() => {
            scoreDisplay.remove();
        }, 1000);

        if (inventory === 0) {
            setTimeout(() => {
                inventory = maxInventory;
                updateInventory();
            }, rechargeTime);
        }
    }
}

// Update the inventory display and send data to the server
function updateInventory() {
    document.getElementById('inventory').textContent = inventory;
    document.getElementById('inventory-fill').style.width = `${(inventory / maxInventory) * 100}%`;

    var formData = new FormData();
    formData.append('username', 'Alex');
    formData.append('charge', inventory);

    fetch('update.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (!data.success) {
            console.error('Error:', data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}

// Load user data and update inventory when the page loads
window.onload = () => {
    const profilePic = localStorage.getItem('profilePic');
    const userName = localStorage.getItem('userName');
    let coins = localStorage.getItem('coins') || 0; // Retrieve saved coins or set to 0 if not available

    if (profilePic) {
        document.querySelector("img[alt='User Avatar']").src = profilePic;
    }

    if (userName) {
        document.getElementById('userName').textContent = userName;
    }

    document.getElementById('score').textContent = `$ ${Number(coins).toLocaleString()}`; // Display saved coins
    updateInventory();
};

const body = document.body;
const image = body.querySelector('#coin');
const h1 = body.querySelector('h1');

let total = localStorage.getItem('total');
let power = localStorage.getItem('power');
let count = localStorage.getItem('count');

// Initialize stored values
if (total == null) {
    localStorage.setItem('total', '500');
    body.querySelector('#total').textContent = '/500';
} else {
    body.querySelector('#total').textContent = `/${total}`;
}

if (power == null) {
    localStorage.setItem('power', '500');
    body.querySelector('#power').textContent = '500';
} else {
    body.querySelector('#power').textContent = power;
}

if (count == null) {
    localStorage.setItem('count', '1');
}

// Click event for the coin image
image.addEventListener('click', (e) => {
    let x = e.offsetX;
    let y = e.offsetY;

    navigator.vibrate(5);

    let coins = Number(localStorage.getItem('coins')) || 0;
    power = localStorage.getItem('power');

    if (Number(power) > 0) {
        localStorage.setItem('coins', `${Number(coins) + 1}`);
        h1.textContent = `${(Number(coins) + 1).toLocaleString()}`;

        localStorage.setItem('power', `${Number(power) - 1}`);
        body.querySelector('#power').textContent = `${Number(power) - 1}`;
    }

    // Animation for the coin image
    if (x < 150 && y < 150) {
        image.style.transform = 'tranyellow(-0.25rem, -0.25rem) skewY(-10deg) skewX(5deg)';
    } else if (x < 150 && y > 150) {
        image.style.transform = 'tranyellow(-0.25rem, 0.25rem) skewY(-10deg) skewX(5deg)';
    } else if (x > 150 && y > 150) {
        image.style.transform = 'tranyellow(0.25rem, 0.25rem) skewY(10deg) skewX(-5deg)';
    } else if (x > 150 && y < 150) {
        image.style.transform = 'tranyellow(0.25rem, -0.25rem) skewY(10deg) skewX(-5deg)';
    }

    setTimeout(() => {
        image.style.transform = 'tranyellow(0px, 0px)';
    }, 100);

    body.querySelector('.progress').style.width = `${(100 * power) / total}%`;
});

// Power regeneration
setInterval(() => {
    count = localStorage.getItem('count');
    power = localStorage.getItem('power');

    if (Number(total) > power) {
        localStorage.setItem('power', `${Number(power) + Number(count)}`);
        body.querySelector('#power').textContent = `${Number(power) + Number(count)}`;
        body.querySelector('.progress').style.width = `${(100 * power) / total}%`;
    }
}, 1000);


function claimYouTubeReward(event) {
    event.stopPropagation();
    const claimButton = event.target;
    const alreadyClaimed = localStorage.getItem('ytRewardClaimed');

    if (!alreadyClaimed) {
        // Add coins
        let coins = Number(localStorage.getItem('coins')) || 0;
        coins += 50000;
        localStorage.setItem('coins', coins);
        
        // Update UI
        document.getElementById('score').textContent = `$ ${coins.toLocaleString()}`;
        claimButton.textContent = 'Claimed!';
        claimButton.setAttribute('claimed', 'true');
        
        // Mark as claimed
        localStorage.setItem('ytRewardClaimed', 'true');
        
        // Visual feedback
        claimButton.style.transform = 'scale(1.1)';
        setTimeout(() => {
            claimButton.style.transform = 'scale(1)';
        }, 200);
    } else {
        alert('You already claimed this reward!');
        claimButton.textContent = 'Already Claimed';
    }
}

function claimYouTubeReward(event) {
    event.stopPropagation();
    const claimButton = event.target;
    const alreadyClaimed = localStorage.getItem('ytRewardClaimed');

    if (!alreadyClaimed) {
        // Add coins
        let coins = Number(localStorage.getItem('coins')) || 0;
        coins += 50000;
        localStorage.setItem('coins', coins);
        
        // Update UI
        document.getElementById('score').textContent = `$ ${coins.toLocaleString()}`;
        claimButton.textContent = 'Claimed!';
        claimButton.setAttribute('claimed', 'true');
        
        // Mark as claimed
        localStorage.setItem('ytRewardClaimed', 'true');
        
        // Visual feedback
        claimButton.style.transform = 'scale(1.1)';
        setTimeout(() => {
            claimButton.style.transform = 'scale(1)';
        }, 200);
    } else {
        alert('You already claimed this reward!');
        claimButton.textContent = 'Already Claimed';
    }
}




function claim1Reward(event) {
    event.stopPropagation();
    const claimButton = event.target;
    const alreadyClaimed = localStorage.getItem('claim1Reward');

    if (!alreadyClaimed) {
        // Add coins
        let coins = Number(localStorage.getItem('coins')) || 0;
        coins += 50000;
        localStorage.setItem('coins', coins);
        
        // Update UI
        document.getElementById('score').textContent = `$ ${coins.toLocaleString()}`;
        claimButton.textContent = 'Claimed!';
        claimButton.setAttribute('claimed', 'true');
        
        // Mark as claimed
        localStorage.setItem('claim1Reward', 'true');
        
        // Visual feedback
        claimButton.style.transform = 'scale(1.1)';
        setTimeout(() => {
            claimButton.style.transform = 'scale(1)';
        }, 200);
    } else {
        alert('You already claimed this reward!');
        claimButton.textContent = 'Already Claimed';
    }
}

function claim2Reward(event) {
    event.stopPropagation();
    const claimButton = event.target;
    const alreadyClaimed = localStorage.getItem('claim2Reward');

    if (!alreadyClaimed) {
        // Add coins
        let coins = Number(localStorage.getItem('coins')) || 0;
        coins += 50000;
        localStorage.setItem('coins', coins);
        
        // Update UI
        document.getElementById('score').textContent = `$ ${coins.toLocaleString()}`;
        claimButton.textContent = 'Claimed!';
        claimButton.setAttribute('claimed', 'true');
        
        // Mark as claimed
        localStorage.setItem('claim2Reward', 'true');
        
        // Visual feedback
        claimButton.style.transform = 'scale(1.1)';
        setTimeout(() => {
            claimButton.style.transform = 'scale(1)';
        }, 200);
    } else {
        alert('You already claimed this reward!');
        claimButton.textContent = 'Already Claimed';
    }
}

function claim3Reward(event) {
    event.stopPropagation();
    const claimButton = event.target;
    const alreadyClaimed = localStorage.getItem('claim3Reward');

    if (!alreadyClaimed) {
        // Add coins
        let coins = Number(localStorage.getItem('coins')) || 0;
        coins += 50000;
        localStorage.setItem('coins', coins);
        
        // Update UI
        document.getElementById('score').textContent = `$ ${coins.toLocaleString()}`;
        claimButton.textContent = 'Claimed!';
        claimButton.setAttribute('claimed', 'true');
        
        // Mark as claimed
        localStorage.setItem('claim3Reward', 'true');
        
        // Visual feedback
        claimButton.style.transform = 'scale(1.1)';
        setTimeout(() => {
            claimButton.style.transform = 'scale(1)';
        }, 200);
    } else {
        alert('You already claimed this reward!');
        claimButton.textContent = 'Already Claimed';
    }
}


// Referral Reward System
const REWARD_AMOUNT = 5000;
const WAIT_TIME = 20 * 60 * 1000; // 20 Minutes

setInterval(() => {
  // localStorage se data nikalo
  let referrals = JSON.parse(localStorage.getItem('pending_referrals') || '[]');
  let newReferrals = [];
  let totalReward = 0;

  // Har referral ko check karo
  referrals.forEach(time => {
    if (Date.now() - time >= WAIT_TIME) {
      totalReward += REWARD_AMOUNT;
    } else {
      newReferrals.push(time);
    }
  });

  // Reward add karo
  if (totalReward > 0) {
    let coins = Number(localStorage.getItem('coins')) || 0;
    coins += totalReward;
    localStorage.setItem('coins', coins);
    document.getElementById('score').textContent = `$ ${coins.toLocaleString()}`;
  }

  // Update localStorage
  localStorage.setItem('pending_referrals', JSON.stringify(newReferrals));
}, 60000); // 1 Minute