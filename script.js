
/* =====================================================
   SHOW REGISTER PAGE
===================================================== */

function showRegister() {

    const cards = document.getElementById("cards");

    if (!cards) return;

    cards.classList.add("show-register");


    /* Clear messages */

    const loginMessage =
        document.getElementById("loginMessage");

    const registerMessage =
        document.getElementById("registerMessage");


    if (loginMessage) {
        loginMessage.innerText = "";
    }

    if (registerMessage) {
        registerMessage.innerText = "";
    }
}


/* =====================================================
   SHOW LOGIN PAGE
===================================================== */

function showLogin() {

    const cards = document.getElementById("cards");

    if (!cards) return;

    cards.classList.remove("show-register");


    /* Clear messages */

    const loginMessage =
        document.getElementById("loginMessage");

    const registerMessage =
        document.getElementById("registerMessage");


    if (loginMessage) {
        loginMessage.innerText = "";
    }

    if (registerMessage) {
        registerMessage.innerText = "";
    }
}


/* =====================================================
   SHOW / HIDE PASSWORD
===================================================== */

function showPassword(id, button) {

    const input =
        document.getElementById(id);


    if (!input || !button) {
        return;
    }


    /* Password -> Text */

    if (input.type === "password") {

        input.type = "text";

        button.innerText = "Hide";

    }


    /* Text -> Password */

    else {

        input.type = "password";

        button.innerText = "Show";

    }
}


/* =====================================================
   CLEAR FORM DATA
===================================================== */

function clearAllForms() {

    /* Reset all forms */

    document
        .querySelectorAll("form")
        .forEach(function(form) {

            form.reset();

        });


    /* Reset password fields */

    document
        .querySelectorAll("input[type='password']")
        .forEach(function(input) {

            input.type = "password";

        });


    /* Reset Show buttons */

    document
        .querySelectorAll(".password span")
        .forEach(function(button) {

            button.innerText = "Show";

        });


    /* Clear messages */

    const loginMessage =
        document.getElementById("loginMessage");

    const registerMessage =
        document.getElementById("registerMessage");


    if (loginMessage) {

        loginMessage.innerText = "";

    }


    if (registerMessage) {

        registerMessage.innerText = "";

    }
}


/* =====================================================
   SHOW SUCCESS PAGE
===================================================== */

function showSuccess(title, text) {

    /* Hide Login / Register cards */

    const cards =
        document.getElementById("cards");


    if (cards) {

        cards.style.display = "none";

    }


    /* Find success page */

    const successPage =
        document.getElementById("successPage");


    const successTitle =
        document.getElementById("successTitle");


    const successText =
        document.getElementById("successText");


    /* If success page exists */

    if (
        successPage &&
        successTitle &&
        successText
    ) {

        successTitle.innerText = title;

        successText.innerText = text;


        /* Show success page */

        successPage.classList.add("show");


        /*
           SUCCESS PAGE WILL REMAIN
           FOR EXACTLY 3 SECONDS
        */

        setTimeout(function() {

            /*
               Refresh complete webpage
            */

            window.location.reload();

        }, 3000);

    }

    else {

        /*
           Safety fallback:
           If success page is missing,
           refresh after 3 seconds.
        */

        setTimeout(function() {

            window.location.reload();

        }, 3000);

    }
}


/* =====================================================
   CREATE ACCOUNT
===================================================== */

function register(event) {

    event.preventDefault();


    /* Get values */

    const name =
        document
            .getElementById("name")
            .value
            .trim();


    const email =
        document
            .getElementById("email")
            .value
            .trim();


    const password =
        document
            .getElementById("password")
            .value;


    const confirmPassword =
        document
            .getElementById("confirmPassword")
            .value;


    const message =
        document.getElementById("registerMessage");


    /* =================================================
       CHECK EMPTY FIELDS
    ================================================= */

    if (
        name === "" ||
        email === "" ||
        password === "" ||
        confirmPassword === ""
    ) {

        message.innerText =
            "Please fill all fields.";

        message.style.color =
            "#ff5c5c";

        return;
    }


    /* =================================================
       CHECK PASSWORD LENGTH
    ================================================= */

    if (password.length < 6) {

        message.innerText =
            "Password must be at least 6 characters.";

        message.style.color =
            "#ff5c5c";

        return;
    }


    /* =================================================
       CHECK PASSWORD MATCH
    ================================================= */

    if (password !== confirmPassword) {

        message.innerText =
            "Passwords do not match.";

        message.style.color =
            "#ff5c5c";

        return;
    }


    /* =================================================
       SAVE ACCOUNT
    ================================================= */

    localStorage.setItem(
        "name",
        name
    );


    localStorage.setItem(
        "email",
        email
    );


    localStorage.setItem(
        "password",
        password
    );


    /* =================================================
       SHOW SUCCESS PAGE
    ================================================= */

    showSuccess(
        "Account Created Successfully!",
        "Your account has been created successfully."
    );
}


/* =====================================================
   LOGIN
===================================================== */

function login(event) {

    event.preventDefault();


    /* Get login values */

    const email =
        document
            .getElementById("loginEmail")
            .value
            .trim();


    const password =
        document
            .getElementById("loginPassword")
            .value;


    const message =
        document.getElementById("loginMessage");


    /* =================================================
       CHECK EMPTY FIELDS
    ================================================= */

    if (
        email === "" ||
        password === ""
    ) {

        message.innerText =
            "Please enter email and password.";

        message.style.color =
            "#f32626ea";

        return;
    }


    /* =================================================
       GET SAVED ACCOUNT
    ================================================= */

    const savedEmail =
        localStorage.getItem("email");


    const savedPassword =
        localStorage.getItem("password");


    /* =================================================
       CHECK LOGIN
    ================================================= */

    if (
        email === savedEmail &&
        password === savedPassword
    ) {

        /* =============================================
           LOGIN SUCCESS
        ============================================= */

        showSuccess(
            "Login Successful",
            "Welcome back. You have been logged in successfully."
        );

    }


    /* =================================================
       LOGIN FAILED
    ================================================= */

    else {

        message.innerText =
            "Invalid email or password.";

        message.style.color =
            "#ff5c5c";

    }
}


/* =====================================================
   PAGE LOAD
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        /*
           Make sure login page is visible
           when page loads.
        */

        const cards =
            document.getElementById("cards");


        if (cards) {

            cards.style.display = "";

            cards.classList.remove(
                "show-register"
            );

        }


        /*
           Hide success page on fresh load
        */

        const successPage =
            document.getElementById("successPage");


        if (successPage) {

            successPage.classList.remove("show");

        }

    }
);

