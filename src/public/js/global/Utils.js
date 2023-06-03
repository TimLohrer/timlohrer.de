function getCookie (key = String) {
    const cookies = document.cookie.split('; ');
    let cookie;
    cookies.forEach(_cookie => {
        if (_cookie.split('=')[0] == key) {
            cookie = _cookie.split('=')[1];
        }
    })
    if (cookie) { return cookie }
    else { return false }
}