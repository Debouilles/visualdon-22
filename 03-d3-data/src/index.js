import { json } from 'd3-fetch'

var arrayUserPost = []
console.log(arrayUserPost);
Promise.all([
  json('https://jsonplaceholder.typicode.com/users'),
  json('https://jsonplaceholder.typicode.com/posts')
])
.then(([postsTab, usersTab]) => {
  console.log(usersTab);
  console.log(postsTab);
  usersTab.forEach(user => {
      let compteurParUser = 0;
      // console.log(user.name);

      postsTab.forEach(post => {
          // console.log(post.userId);
          if (post.userId == user.id) {
              compteurParUser++;
          }
      })
      // console.log(compteurParUser);

      d3.select("body")
          .append("div")
          .attr('id', `div-user${user.id}`)
      d3.select(`#div-user${user.id}`)
          .append('p')
          .text(`${user.name} a écrit ${compteurParUser} article(s).`)
  });
});
var arrayUserPost2 = []
console.log(arrayUserPost);
Promise.all([
  json('https://jsonplaceholder.typicode.com/users'),
  json('https://jsonplaceholder.typicode.com/posts')
])
.then(([users, posts]) =>  {
  console.log(users);
  console.log(posts);

  for (let i = 0; i < users.length; i++) {
      var arrayCurrentUser = {};
      arrayCurrentUser["nom_utilisateur"] = users[i].username;
      arrayCurrentUser["ville"] = users[i].address.city;
      arrayCurrentUser["nom_companie"] = users[i].company.name;
      
      var userPosts = [];
      posts.forEach(post => {
          if (post.userId == users[i].id) {
              userPosts.push(post.title)
          }
      });
      arrayCurrentUser["posts"] = userPosts;

      arrayUserPost.push(arrayCurrentUser);
  }
});
 