function create_quest() {
	$.ajax({
		url:'/quests/create'
		, data: $('#create_quest_form').serialize()
		, type: "POST"
		, dataType: 'json'
		, success: function(msg) {
				$('#notification').append("<div class='title'>Your quest is <b>ready</b> to begin:</div><div class='quest_url'><a href='"+msg['questURL']+"' target='_blank'>"+msg['questURL']+"</a></div>");
				$('#notification').fadeIn("slow");//.toggle();
			}
		, error: function(msg) {
				alert("Erro: "+msg['msg']);
			}
	});
}

function get_pictures() {
	$.ajax({
		url:'/pictures/girl'
		, type: "GET"
		, dataType: 'json'
		, success: function(msg) {
				var girls = msg;
				for(var i = 0; i < girls.length; i++) {
					alert(girls[i].url);
				}
			}
		, error: function(msg) {
				alert("Erro: "+msg['msg']);
				var girls = msg;
				for(var i = 0; i < girls.length; i++) {
					alert(girls[i].url);
				}
			}
	});	
}