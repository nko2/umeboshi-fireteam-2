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