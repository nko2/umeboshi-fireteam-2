function create_quest() {
	$.ajax({
		url:'/quests/create'
		, data: $('#create_quest_form').serialize()
		, type: "POST"
		, dataType: 'json'
		, success: function(msg) {
				alert("Sucesso: "+msg["questURL"]);
			}
		, error: function(msg) {
				alert("Erro: "+msg['msg']);
			}
	});
}