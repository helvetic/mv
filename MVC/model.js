var Model = {
    login: function(appId, perms) {
        return new Promise(function(resolve, reject) {
            VK.init({
                apiId: appId
            });

            VK.Auth.login(function(response) {
                if (response.session) {
                    resolve(response);
                } else {
                    reject(new Error('Не удалось авторизоваться'));
                }
            }, perms);
        });
    },
    callApi: function(method, params) {
        return new Promise(function(resolve, reject) {
            VK.api(method, params, function(response) {
                if (response.error) {
                    reject(new Error(response.error.error_msg));
                } else {
                    resolve(response.response);
                }
            });
        });
    },
    getUser: function() {
        return this.callApi('users.get', {});
    },
    getMusic: function() {
        return this.callApi('audio.get', {});
    },
    getFriends: function() {
        return this.callApi('friends.get', {fields: 'photo_100', https:1});
    },
    getNews: function() {
          return this.callApi('newsfeed.get', {filters: 'post', count: 20, https:1});
    },
    getGroups: function() {
        return this.callApi('groups.get', {fields: 'name,photo_50',extended:'1', v:5.53, https:1});
    },
    getAlbums: function() {
        return this.callApi('photos.getAlbums', {v:5.53, https:1});
    },
    getPhotos: function(album_id) {
        return this.callApi('photos.get', {album_id:album_id, extended:'1', v:5.53, https:1});
    },
    getPhotoComments: function(id) {
        return this.callApi('photos.getComments', {
          photo_id:id,
          fields:"photo_50",
          extended:'1',
          v:5.53,
          count:100,
          https:1
        });
    },
    sortPhotos: function(album,type,direction){
      return album.sort(function(a,b){
        var first,second;
        if(direction == 'inc'){
          first = a;
          second = b;
        }else{
          first = b;
          second = a;
        }
        if(type != 'date'){
          return second[type]['count'] - first[type]['count'];
        }else{
          return second.id-first.id;
        }
      });
    }
};
