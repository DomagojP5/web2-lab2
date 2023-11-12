document.addEventListener("DOMContentLoaded", function(event) {
    let checkAccess = document.getElementById("enableAccess")
    checkAccess.addEventListener("change", () => {
        if ( checkAccess.checked ) {
            document.cookie = "role=admin"
        } else {
            document.cookie = "role=user"
        }
    })
});