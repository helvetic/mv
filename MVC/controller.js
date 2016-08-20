var Controller = {
    musicRoute: function() {
        return Model.getMusic().then(function(music) {
            results.innerHTML = View.render('music', {list: music});
        });
    },
    friendsRoute: function() {
        return Model.getFriends().then(function(friends) {
            results.innerHTML = View.render('friends', {list: friends});
        });
    },
    newsRoute: function() {
        return Model.getNews().then(function(news) {
          console.log(news);
            results.innerHTML = View.render('news', {list: news.items});
        });
    },
    groupsRoute: function() {
        return Model.getGroups().then(function(groups) {
            results.innerHTML = View.render('groups', {list: groups.items});
        });
    },
    photosRoute: function() {
        return Model.getAlbums().then(function(albums) {
          results.innerHTML = View.render('albums', {list: albums.items});

          var albumsList = {};
          albums.items.forEach(function(album){
            Model.getPhotos(album.id).then(function(photos) {
              var container = document.getElementById('aid_' + album.id);
              albumsList[album.id] = photos.items;
              container.innerHTML = View.render('photos', {list: photos.items});
            });
          });

          albums_container.addEventListener('click', function(e){
            if(e.target.dataset.role == 'show-comments'){
              var container = e.target.nextElementSibling;
              if(container.dataset.loaded){
                if(container.classList.contains('active')){
                  container.classList.remove('active');
                }else{
                  container.classList.add('active');
                }
              }else{
                Model.getPhotoComments(e.target.dataset.pid).then(function(comments) {
                  comments.profilesData = {};
                  comments.profiles.forEach(function(item){
                    comments.profilesData[item.id] = item;
                  });
                  comments.list = comments.items.map(function(item){
                    var profile = comments.profilesData[item.from_id];
                    item.photo = profile.photo_50;
                    item.full_name = profile.first_name + profile.last_name;
                    return item;
                  });
                  console.log(comments);
                  container.innerHTML = View.render('comments', {list: comments.list});
                  container.dataset.loaded = true;
                  container.classList.add ('active');
                });
              }
            }

            if(e.target.dataset.role == 'sort'){
              var albumEl = e.target.closest('.album-container').querySelector('.album');
              var album = albumsList[albumEl.dataset.id].slice(0);
              if(e.target.dataset.direction == 'inc'){
                e.target.dataset.direction = 'dec';
              }else{
                e.target.dataset.direction = 'inc';
              }

              Model.sortPhotos(album, e.target.dataset.type,e.target.dataset.direction);
              albumEl.innerHTML = View.render('photos', {list: album});
            }
          });

        });

    }
};
