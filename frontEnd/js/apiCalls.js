function onSignIn(googleUser)
{
    var profile = googleUser.getBasicProfile();

    //replace image and names
    var name = document.getElementById('name-label')
    name.innerHTML = profile.getName();
    var image = document.getElementById('profile-image');
    image.src = profile.getImageUrl();

    //replace buttons
    document.getElementById("google-signin-button").style.display="none";
    document.getElementById("logout-button").style.display="block";
}