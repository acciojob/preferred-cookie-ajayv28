//your JS code here. If required.
// Function to set a cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Function to get a cookie value
function getCookie(name) {
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    
    for (let i = 0; i < cookieArray.length; i++) {
        const cookie = cookieArray[i].trim();
        if (cookie.indexOf(name + "=") === 0) {
            return cookie.substring(name.length + 1);
        }
    }
    return "";
}

// Function to apply saved preferences
function applyPreferences() {
    const savedFontSize = getCookie("fontSize");
    const savedFontColor = getCookie("fontColor");

    if (savedFontSize) {
        document.documentElement.style.setProperty('--fontsize', `${savedFontSize}px`);
        document.getElementById("fontsize").value = savedFontSize;
    }
    if (savedFontColor) {
        document.documentElement.style.setProperty('--fontcolor', savedFontColor);
        document.getElementById("fontcolor").value = savedFontColor;
    }
}

// Event listener for form submission
document.getElementById("preferencesForm").addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent default form submission

    const fontSize = document.getElementById("fontsize").value;
    const fontColor = document.getElementById("fontcolor").value;

    // Save preferences in cookies
    setCookie("fontSize", fontSize, 30); // Expires in 30 days
    setCookie("fontColor", fontColor, 30); // Expires in 30 days

    // Apply preferences immediately
    applyPreferences();
});

// Apply saved preferences on page load
applyPreferences();
