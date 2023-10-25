// JavaScript source code
window.onload = function() {
    // Code to run after the entire page and its resources have finished loading
    init()
};

function login(event) {
    event.preventDefault(); // Prevents the default form submission behavior

    // Get the username and password from the form
    const bdsId = document.getElementById('bdsId').value.toLowerCase();

    // Perform simple validation (you should implement stronger validation)
    if (bdsId === '') {
        alert('Please enter BDS ID.');
        return;
    }

    const url_send = 'http://localhost:8000/api/send?bdsid='+bdsId;  // Replace with your URL

    fetch(url_send)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            //console.log('Response:', data);
            if (data.respCode == 0) {
                setTimeout(() => {
                    info.textContent = 'Place your finger';
                }, 10);

                setTimeout(() => {
                    receive();
                }, 20);
            }
            else {
                info.textContent = 'Send failed.';
            }
                        
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function init(){
    const info = document.getElementById('info');
    const url_init = 'http://localhost:8000/api/init';  // Replace with your URL

    fetch(url_init)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            //console.log('Response:', data);
            if (data.respCode == 0) {
                info.textContent = 'Init success.';
            }
            else {
                info.textContent = 'Init failed.';
            }
            
        })
        .catch((error) => {
            console.error('Error:', error);
        });

}

function receive(){
    const url_receive = 'http://localhost:8000/api/receive';  // Replace with your URL

    fetch(url_receive)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            if(data.respCode == 0)
            {
                window.location.href = 'dashboard.html';
            }
            else{
                info.textContent = data.respMessage;
            }
            
        })
        .catch((error) => {
            console.error('Error:', error);
        });

}