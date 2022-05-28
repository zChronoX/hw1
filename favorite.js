const showInfoWindow = document.querySelector('#infoView');
const infoButton = document.querySelector('#infoButton');
infoButton.addEventListener('click', showInfo);
const closeInfo = document.querySelector('#closeInfo');
closeInfo.addEventListener('click', closeInfoPage);

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

function fetchPosts() {
    fetch("fetch_liked.php").then(fetchResponse, onError).then(fetchPostsJson);
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



function onResponse(response) {
    console.log('Successo!');
    return response.json();
}


function LikePost(event) {
    event.preventDefault();
    const like_selected = event.currentTarget.dataset.postsid;
    console.log(like_selected);

    fetch("like.php?id_post=" + like_selected).then(onResponse, onError).then(onJSONResponseLike)

}

function onJSONResponseLike(json) {
    console.log(json);
    const like = document.querySelector("[data-postsid='" + json.postid + "']");
    console.log(like);
    if (json.like == true) {
        like.classList.remove('unliked');
        like.classList.add('liked');
    }
    else {
        like.classList.add('unliked');
        like.classList.remove('liked');
    }
}

function eliminaPost(event) {
    const id_post = event.currentTarget.dataset.postsidbin;
    fetch("delete_posts.php?id_post=" + id_post).then(onResponse, onError).then(fetchPostsJson);
    location.reload();
    return false;


}