const showInfoWindow = document.querySelector('#infoView');
const infoButton = document.querySelector('#infoButton');
infoButton.addEventListener('click', showInfo);
const closeInfo = document.querySelector('#closeInfo');
closeInfo.addEventListener('click', closeInfoPage);

const userinfo = document.querySelector('#userinfo');
userinfo.addEventListener('click', info);
const profile = document.querySelector('#profile');

function info() {
    if (profile.classList.contains('hidden')) {
        profile.classList.remove('hidden');
    }
    else
        profile.classList.add('hidden');
}

function showInfo() {
    if (showInfoWindow.classList.contains('hidden')) {
        showInfoWindow.classList.remove('hidden');
        document.body.classList.add('overflow');
    }
}

function closeInfoPage() {
    if (!showInfoWindow.classList.contains('hidden')) {
        showInfoWindow.classList.add('hidden');
        document.body.classList.remove('overflow');
    }
}

function SpotifySearch(event) {
    event.preventDefault();

}


function fetchPosts() {
    fetch("fetch_post.php").then(fetchResponse, onError).then(fetchPostsJson);
}

function fetchResponse(response) {
    console.log('Fetch dei post....');
    return response.json();
}

function onError(error) {
    console.log('Error' + error);
}


function fetchPostsJson(json) {
    console.log(json);
    const posts = document.querySelector("#posts");
    const results = json;
    let num_results = results.length;
    if (num_results > 10)
        num_results = 10;
    for (let i = 0; i < num_results; i++) {
        const post = results[i];
        const number = document.createElement("div");
        const title = document.createElement("p");
        title.textContent = post.titolo;
        title.classList.add("titolo");
        const text = document.createElement("p");
        text.textContent = post.testo;
        text.classList.add("testo");
        const user = document.createElement("p");
        user.textContent = post.nome + " " + post.cognome;
        user.classList.add("user");
        const time = document.createElement("time");
        time.textContent = post.tempo;
        time.classList.add("time");
        const username = document.createElement("p");
        username.textContent = "@" + post.username;
        username.classList.add("username2");
        username.classList.add("userinfo");
        user.classList.add("userinfo");
        time.classList.add("userinfo");
        const elimina = document.createElement("a");
        elimina.href = '#';
        elimina.dataset.postsidbin = post.posts_id;
        elimina.textContent = "🗑️";
        elimina.addEventListener("click", eliminaPost);
        const like = document.createElement("a");
        like.href = '#';
        like.dataset.postsid = post.posts_id;
        like.textContent = "Like";
        like.classList.add("like");
        if (post.liked == 1) {
            like.classList.add("liked");
        }
        else {
            like.classList.add("unliked");
        }
        like.addEventListener("click", LikePost);
        number.appendChild(user);
        number.appendChild(username);
        number.appendChild(time);
        number.appendChild(title);
        number.appendChild(text);
        number.appendChild(elimina);
        number.appendChild(like);
        posts.appendChild(number);

    }



}

fetchPosts();


function LikePost(event) {
    event.preventDefault();
    const like_selected = event.currentTarget.dataset.postsid;

    fetch("like.php?id_post=" + like_selected).then(onResponse, onError).then(onJSONResponseLikeAll);

}


function onJSONResponseLikeAll(json) {
    const like = document.querySelectorAll("[data-postsid='" + json.postid + "']");
    let i;
    if (json.like == true) {
        for (i = 0; i < like.length; i++) {
            like[i].classList.remove('unliked');
            like[i].classList.add('liked');
        }
    }
    else {
        for (i = 0; i < like.length; i++) {
            like[i].classList.add('unliked');
            like[i].classList.remove('liked');
        }
    }
}

function RicercaSpotify(event) {
    event.preventDefault();
    const input = document.querySelector('#track');
    const input_value = encodeURIComponent(input.value);
    console.log('Eseguo la ricerca di : ' + input_value);
    fetch("spotify.php?" + "&q=" + input_value).then(onResponse, onError).then(onJSONSpotify);
}


function onResponse(response) {
    console.log('Successo!');
    return response.json();
}

function onJSONSpotify(json) {
    console.log(json);
    const library = document.querySelector('#a1');
    library.innerHTML = '';
    const results = json.tracks.items;
    let num_results = results.length;
    if (num_results > 3)
        num_results = 3;
    for (let i = 0; i < num_results; i++) {
        const album_data = results[i]
        const title = album_data.name;
        const url = album_data.uri;
        var site = document.createElement('a');
        site.setAttribute('href', url);
        site.textContent = 'Ascolta su Spotify';
        const selected_image = album_data.album.images[1].url;
        const album = document.createElement('div');
        album.classList.add('album');
        const img = document.createElement('img');
        img.src = selected_image;
        const caption = document.createElement('span');
        caption.textContent = 'Titolo: ' + title;
        const artist = album_data.artists[0].name;
        const artist_name = document.createElement('span');
        artist_name.textContent = 'Artista: ' + artist;
        album.appendChild(img);
        album.appendChild(caption);
        album.appendChild(artist_name);
        album.appendChild(site);
        library.appendChild(album);

    }
}


const f1 = document.forms['spotify'];
f1.addEventListener('submit', RicercaSpotify);

function eliminaPost(event) {
    const id_post = event.currentTarget.dataset.postsidbin;
    fetch("delete_posts.php?id_post=" + id_post).then(onResponse, onError).then(fetchPostsJson);
    location.reload();
    return false;


}


const f2 = document.forms['search_posts'];
f2.addEventListener('submit', SearchPosts);

function onJSONSearch(json) {
    console.log(json);
    const posts = document.querySelector("#a2");
    const results = json;
    posts.innerHTML = '';
    posts.classList.remove("hidden");
    let num_results = results.length;
    if (num_results > 10)
        num_results = 10;
    for (let i = 0; i < num_results; i++) {
        const post = results[i];
        const number = document.createElement("div");
        const title = document.createElement("p");
        title.textContent = post.titolo;
        title.classList.add("titolo");
        const text = document.createElement("p");
        text.textContent = post.testo;
        text.classList.add("testo");
        const user = document.createElement("p");
        user.textContent = post.nome + " " + post.cognome;
        user.classList.add("user");
        const time = document.createElement("time");
        time.textContent = post.tempo;
        time.classList.add("time");
        const username = document.createElement("p");
        username.textContent = "@" + post.username;
        username.classList.add("username2");
        username.classList.add("userinfo");
        user.classList.add("userinfo");
        time.classList.add("userinfo");
        const elimina = document.createElement("a");
        elimina.href = '#';
        elimina.dataset.postsidbin = post.posts_id;
        elimina.textContent = "🗑️";
        elimina.addEventListener("click", eliminaPost);
        const like = document.createElement("a");
        like.href = '#';
        like.dataset.postsid = post.posts_id;
        like.textContent = "Like";
        like.classList.add("like");
        if (post.liked == 1) {
            like.classList.add("liked");
        }
        else {
            like.classList.add("unliked");
        }
        like.addEventListener("click", LikePost);
        number.appendChild(user);
        number.appendChild(username);
        number.appendChild(time);
        number.appendChild(title);
        number.appendChild(text);
        number.appendChild(elimina);
        number.appendChild(like);
        posts.appendChild(number);

    }

}


function SearchPosts(event) {
    event.preventDefault();
    const input = document.querySelector('#search_ps');
    const input_value = encodeURIComponent(input.value);
    if (input_value == 0) {
        console.log('Non hai inserito niente');
        document.querySelector('#a2').innerHTML = '';
    }
    else {
        console.log('Eseguo la ricerca del post contente:' + input_value);
        fetch("search_posts.php?search_post=" + input_value).then(onResponse, onError).then(onJSONSearch);
    }
}






