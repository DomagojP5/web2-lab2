document.addEventListener("DOMContentLoaded", function(event) {
    let checkAccess = document.getElementById("enableAccess")
    checkAccess.addEventListener("change", () => {
        if ( checkAccess.checked ) {
            console.log("daAccess")
            document.cookie = "role=admin"
        } else {
            console.log("neAccess")
            document.cookie = "role=user"
        }
    })
});