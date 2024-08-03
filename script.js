const firebaseConfig = {
    apiKey: "AIzaSyDS7JhDYDTBgoPmyRNxA9OvWH_I6C39nr8",
            authDomain: "new2-d6085.firebaseapp.com",
            projectId: "new2-d6085",
            storageBucket: "new2-d6085.appspot.com",
            messagingSenderId: "878987225782",
            appId: "1:878987225782:web:5303c67a81d7f5c9621417"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

let isLoggedIn = false; // Change this to true to simulate a logged-in user

        function handleSearchSubmit(event) {
            event.preventDefault(); // Prevent the default form submission

            if (!isLoggedIn) {
                // If the user is not logged in, show the login modal
                toggleModal('loginModal');
            } else {
                // Proceed with form submission (or AJAX request)
                alert('Search submitted!');
            }
        }

        function toggleSidebar() {
            const sidebar = document.querySelector('.sidebar');
            sidebar.classList.toggle('active');
        }

        function toggleModal(modalId) {
            const modal = document.getElementById(modalId);
            modal.style.display = (modal.style.display === 'block') ? 'none' : 'block';
        }

        function showSignupForm() {
            const loginContent = document.getElementById('loginContent');
            loginContent.innerHTML = `
                <span class="close" onclick="toggleModal('loginModal')">&times;</span>
                <h2>Sign Up</h2>
                <form id="signupForm">
                    <div class="form-group">
                        <label for="signupEmail">Email</label>
                        <input type="text" id="signupEmail" name="signupEmail" required>
                    </div>
                    <div class="form-group password-container">
                        <label for="signupPassword">Password</label>
                        <input type="password" id="signupPassword" name="signupPassword" required>
                        <i class="fas fa-eye eye-icon" id="togglePasswordSignup" onclick="togglePasswordVisibility('signupPassword', 'togglePasswordSignup')"></i>
                    </div>
                    <div class="form-group">
                        <button type="submit">Sign Up</button>
                    </div>
                </form>
                <div class="forgot-password">
                    <p>Already have an account? <a href="javascript:void(0);" onclick="showLoginForm()">Login here</a></p>
                </div>
            `;
            document.getElementById('signupForm').addEventListener('submit', handleSignupSubmit);
        }

        function showLoginForm() {
            const loginContent = document.getElementById('loginContent');
            loginContent.innerHTML = `
                <span class="close" onclick="toggleModal('loginModal')">&times;</span>
                <h2>Login</h2>
                <form id="loginForm">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="text" id="email" name="email" required>
                    </div>
                    <div class="form-group password-container">
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" required>
                        <i class="fas fa-eye eye-icon" id="togglePasswordLogin" onclick="togglePasswordVisibility('password', 'togglePasswordLogin')"></i>
                    </div>
                    <div class="form-group">
                        <button type="submit">Login</button>
                    </div>
                    <div class="forgot-password">
                        <p><a href="#">Forgot Password?</a></p>
                    </div>
                    <div class="create-account">
                        <p>Don't have an account? <a href="javascript:void(0);" onclick="showSignupForm()">Create new account</a></p>
                    </div>
                </form>
            `;
            document.getElementById('loginForm').addEventListener('submit', handleLoginSubmit);
        }

        function togglePasswordVisibility(passwordId, iconId) {
            const passwordField = document.getElementById(passwordId);
            const eyeIcon = document.getElementById(iconId);
            passwordField.type = (passwordField.type === 'password') ? 'text' : 'password';
            eyeIcon.classList.toggle('fa-eye-slash');
        }

        function handleLoginSubmit(event) {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            auth.signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Signed in
                    isLoggedIn = true;
                    toggleModal('loginModal');
                    alert('Login successful!');
                })
                .catch((error) => {
                    // Error handling
                    alert(`Error: ${error.message}`);
                });
        }

        function handleSignupSubmit(event) {
            event.preventDefault();
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            
            auth.createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Signed up
                    alert('Sign Up successful!');
                    showLoginForm();
                })
                .catch((error) => {
                    // Error handling
                    alert(`Error: ${error.message}`);
                });
        }

        window.onclick = function(event) {
            const loginModal = document.getElementById('loginModal');
            if (event.target == loginModal) {
                loginModal.style.display = 'none';
            }
        }
