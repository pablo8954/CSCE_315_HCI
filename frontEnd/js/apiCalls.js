function onSignIn(googleUser)
{
    var profile = googleUser.getBasicProfile();

    var name = document.getElementById('name-label')
    name.innerHTML = profile.getName();

    var image = document.getElementById('profile-image');
    image.src = profile.getImageUrl();

}

function signout(){
    var auth2 = gapi.auth2.getAuthInstance();
    
}