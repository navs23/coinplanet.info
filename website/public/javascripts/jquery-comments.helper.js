var commentsInit=function(param){
        var $comments=param.commentsContainer||'#comments-container' ;    
        
    	var saveComment = function(data) {
		// Convert pings to human readable format
		$(data.pings).each(function(index, id) {
			var user = param.usersArray.filter(function(user){return user.id == id})[0];
			data.content = data.content.replace('@' + id, '@' + user.fullname);
		});
		return data;
	}

	$($comments).comments({
		profilePictureURL: 'https://viima-app.s3.amazonaws.com/media/user_profiles/user-icon.png',
		currentUserId: 1,
		roundProfilePictures: true,
		textareaRows: 1,
		enableAttachments: true,
		enableHashtags: true,
		enablePinging: true,
		getUsers: function(success, error) {
			setTimeout(function() {
				success(param.usersArray);
			}, 500);
		},
		getComments: function(success, error) {
			setTimeout(function() {
				success(param.commentsArray);
			}, 500);
		},
		postComment: function(data, success, error) {
			setTimeout(function() {
				success(saveComment(data));
			}, 500);
		},
		putComment: function(data, success, error) {
			setTimeout(function() {
				success(saveComment(data));
			}, 500);
		},
		deleteComment: function(data, success, error) {
			setTimeout(function() {
				success();
			}, 500);
		},
		upvoteComment: function(data, success, error) {
			setTimeout(function() {
				success(data);
			}, 500);
		},
		uploadAttachments: function(dataArray, success, error) {
			setTimeout(function() {
				success(dataArray);
			}, 500);
		},
	});
}