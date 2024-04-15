function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let period = hours >= 12 ? 'PM' : 'AM'; 

    // Convert to 12-hour format 
    hours = hours % 12;  
    hours = hours ? hours : 12; // 0 should be 12

    // Add leading zeros 
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    // Update the display 
    document.getElementById('hour').textContent = hours;
    document.getElementById('minute').textContent = minutes;
    document.getElementById('second').textContent = seconds;
    document.getElementById('period').textContent = period;
}

// Update time every second
setInterval(updateTime, 1000); 

