document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form.load");
    const upload = document.querySelector(".upload img");
    const uploadInput = document.createElement("input");
    uploadInput.type = "file";
    uploadInput.accept = "image/*";

    upload.addEventListener("click", () => {
        uploadInput.click();
    });

    uploadInput.addEventListener("change", () => {
        const file = uploadInput.files[0];
        if (file && file.size <= 512000) {
            const reader = new FileReader();
            reader.onload = (e) => {
                upload.src = e.target.result;
            };
            reader.readAsDataURL(file);
        } else {
            alert("Please upload a file smaller than 500KB.");
        }
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const fullName = document.querySelector(".full-name input").value;
        const email = document.querySelector(".email input").value;
        const github = document.querySelector(".github input").value;
        const avatar = upload.src;

        if (!fullName || !email || !github || avatar.includes("icon-upload.svg")) {
            alert("Please fill in all fields and upload an avatar.");
            return;
        }

        // Generate ticket data
        const ticketData = {
            fullName,
            email,
            github,
            avatar,
        };

        console.log("Ticket Generated: ", ticketData);

        // Hide the form
        form.style.display = "none";

        // Show the ticket
        document.getElementById('ticket-name').innerText = fullName;
        document.getElementById('ticket-github').innerText = github;
        document.getElementById('ticket-avatar').src = avatar;
        document.getElementById('user-email').innerText = email;

        // Call the IP geolocation API to get the user's location
        fetch('https://api.ipgeolocation.io/ipgeo?apiKey=d366b3372e3f46978f656b4b7e5eb31c')
            .then(response => response.json())
            .then(data => {
                const options = { year: 'numeric', month: 'short', day: 'numeric' };
                const date = new Date().toLocaleDateString('en-US', options);
                const location = `${data.city}, ${data.country_name}`;
                document.getElementById('ticket-location').textContent = `${date} / ${location}`;
                document.getElementById('ticket-container').style.display = 'block';
            })
            .catch(error => {
                console.error('Error fetching location:', error);
                alert('Unable to retrieve location. Please try again.');
            });

        // Generate a random ticket number
        const ticketNumber = `#${Math.floor(10000 + Math.random() * 90000)}`;

        // Display the ticket number
        document.getElementById('ticket-numb').innerText = ticketNumber;

        // Update the header text
        const headerDiv = document.querySelector('.header');
        const headerH1 = headerDiv.querySelector('h1');
        const headerP = headerDiv.querySelector('p');

        headerH1.innerHTML = `Congrats, <span style="color:rgba(192, 88, 140, 0.77);">${fullName}</span>! </br> Your ticket is ready.`;
        headerP.style.display = 'none';
    });

    // Rotate the content within the div with ID 'number'
    const numberDiv = document.getElementById('number');
    numberDiv.style.display = 'inline-block'; // Ensure it behaves correctly
    numberDiv.style.transform = 'rotate(180deg)';
});
