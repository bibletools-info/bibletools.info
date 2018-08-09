var text_ref = u( ".text-ref" );
if( text_ref.length > 0 ) {
	u( "#search" ).first().value = text_ref.text();
	u( "#clear" ).removeClass( "hidden" );
}

u( ".open-menu" ).on( "click", function() {
	openMenu();
});

function initializeMaps() {
	document.querySelectorAll( ".map .panel-body a" ).forEach( function(elem) {
		elem.onclick = function (e) {
			e.preventDefault();
			var src = elem.getAttribute( "href" );
			var html = '<img src="' + src + '">';
			basicLightbox.create(html).show();
		};
	});
}
initializeMaps();

u( document ).on( "click", ".overlay.menu", function() {
	closeMenu();
});

u( document ).on( "click", ".resource.expand .panel-heading", function(e) {
	u(this).closest( ".resource" ).removeClass( "expand" );
});

u( document ).on( "click", ".resource:not(.expand)", function(e) {
	u(this).addClass( "expand" );
});

function loadVerse( ref, raw = false ){
	u( ".verse .panel-body" ).html( '<span class="loading-animation"><b>•</b><b>•</b><b>•</b></span>' );
	u( "#search" ).first().blur();
	closeMenu();
	if( raw ) {
		url = "/resources/json/query/" + ref;
	} else {
		window.history.pushState( ref, null, ref );
		url = "/resources/json/" + ref;
	}
	
	var request = new XMLHttpRequest();
	request.open( "GET", url, true );
	request.onload = function() {
		if ( this.status >= 200 && this.status < 400 ) {
			var data = JSON.parse(this.response);
			if( u( ".verse" ).length < 1 ) {
				window.location = "/" + data.short_ref;
			}
			if( raw ) {
				window.history.pushState( data.short_ref, null, data.short_ref );
			}
			u( "#search" ).first().value = data.text_ref;
			u( ".verse .panel-body" ).html( data.verse );
			u( ".next-verse" ).attr( "href", "/" + data.nav.next );
			u( ".prev-verse" ).attr( "href", "/" + data.nav.prev );
			u( ".prev-verse" ).toggleClass( "hidden", data.nav.prev == false );
			u( ".next-verse" ).toggleClass( "hidden", data.nav.next == false );
			u( "h2 .text-ref" ).text( data.text_ref );
			u( "#resource_list .resource" ).remove();
			data.main_resources.forEach(function( resource, index ) {
				u( "#resource_list .left-column" ).append( '<div class="panel panel-modern resource" data-index-id="' + resource.id + '"><div class="panel-heading"><div class="author-icon ' + resource.logo + '"></div><div class="resource-info"><strong>' + resource.author + '</strong><br><small>' + resource.source + '</small></div></div><div class="panel-body">' + resource.content + '</div><div class="panel-footer"><small>Was this helpful?</small><a class="mark-unhelpful"></a><a class="mark-helpful"></a></div></div>' );
			});
			data.sidebar_resources.forEach(function( resource, index ) {
				u( "#resource_list .right-column" ).append( '<div class="panel panel-modern resource ' + resource.class + '"><div class="panel-heading"><strong>' + resource.source + '</strong></div><div class="panel-body">' + resource.content + '</div></div>' );
			});
			initializeMaps();
			u( ".history-list" ).prepend( '<li><a href="/' + ref + '" class="dropdown-item ref-link">' + data.text_ref + '</a></li>' );
			u( ".history-list" ).each(function( index ) {
				if( u(this).find( "li" ).length > 10 ) {
					u(this).find( "li" ).last().remove();
				}
			});
		} else {
			//ToDo: Handle errors
	
		}
	};
	
	request.onerror = function() {
		//ToDo: Handle errors
	};
	
	request.send();
}

function showSuggestions() {
	value = u( "#search" ).first().value;
	var books = [ "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", "Esther", "Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi", "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians", "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy", "Titus", "Philemon", "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude", "Revelation" ];
	var results = books.filter( function( item ){
		return item.toLowerCase().indexOf( value.toLowerCase() ) > -1;						
	});
	if( value.length > 1 && results.length > 0 && books.join( "." ).toLowerCase().split( "." ).indexOf( value.toLowerCase() ) == -1 ) {
		u( ".search-results, #clear" ).removeClass( "hidden" );
		
		u( ".book-suggestion" ).remove();
		results.forEach(function(item, index){
			u( ".search-results .heading" ).after( "<li class='book-suggestion'>" + item + "</li>" );
		});
		
		if( u( ".search-results .selected" ).length < 1 ) {
			u( ".search-results li:not(.heading)" ).first().classList.add( "selected" );
		}
	} else {
		u( ".search-results li.selected" ).removeClass( "selected" );
		hideSuggestions()
	}
	u( "#clear" ).toggleClass( "hidden", value.length < 1 );
}

function hideSuggestions( delay = false ) {
	if( delay ) {
		setTimeout(function(){
			u( ".search-results" ).addClass( "hidden" );
			u( ".book-suggestion" ).remove();
		}, 100);
	} else {
		u( ".search-results" ).addClass( "hidden" );
		u( ".book-suggestion" ).remove();
	}
	
}

u( "#search" ).on( "input", function(e) {
	showSuggestions();
});

u( "#search" ).on( "focus", function() {
	if( u(this).first().value != "" ) {
		showSuggestions();
	}
});

u( "#search" ).on( "blur", function() {
	hideSuggestions( true );
});

u( "#search" ).on( "keydown", function(e) {
	if( e.which == 38 ) { //up
		var element = u( ".search-results li.selected" ).first().previousElementSibling;
		if( element && ! element.classList.contains( "heading" ) ) {
			u( ".search-results li.selected" ).removeClass( "selected" );
			element.classList.add( "selected" );
		}
	} else if( e.which == 40 ) { //down
		var element = u( ".search-results li.selected" ).first().nextElementSibling;
		if( element ) {
			u( ".search-results li.selected" ).removeClass( "selected" );
			element.classList.add( "selected" );
		}
	} else if( e.which == 13 ) { //enter
		e.preventDefault();
		$selected = u( ".search-results .selected" );
		if( $selected.length > 0 ) {
			u( "#search" ).first().value = $selected.text() + " ";
			hideSuggestions();
		} else {
			loadVerse( u(this).first().value, true );
		}
	}
});

u( document ).on( "click", ".book-suggestion", function() {
	u( "#search" ).first().value = u(this).text() + " ";
	u( "#search" ).first().focus();
	
});

u( ".toggle-history" ).on( "click", function() {
	u( ".history-list" ).show();
});

u( "#clear" ).on( "click", function() {
	u( "#search" ).first().value = "";
	u( "#search" ).first().focus();
	u(this).addClass( "hidden" );
});

u( document ).on( "mouse", function(e) {
	var container = u( "#search_form" );
	
	if ( ! container.is( e.target )
		&& container.has( e.target ).length === 0 )
	{
		u( ".search-results" ).hide();
	}
});

u( document ).on( "click", ".ref-link", function(e) {
	e.preventDefault();
	ref = u(this).attr( "href" ).substring(1);
	loadVerse( ref );
	u( ".dropdown-menu.history-list" ).first().style.display = "none";
});

u( document ).on( "click", ".verse .panel-body a", function(e) {
	
	clearLexicon();
	
	$lexicon = u( "#lexicon" );
	$verse = u( ".verse" );
	$word = u(this);
	
	$word.addClass( "selected" );
	u( "body" ).addClass( "no_scroll" );
	if( ! $lexicon.hasClass( "visible" ) ) {
		$lexicon.addClass( "visible" );
		u( "body" ).addClass( "lexicon");
	}
	verse = $verse.attr( "data-short-ref" );
	word_id = $word.attr( "id" );
	
	var request = new XMLHttpRequest();
	request.open( "GET", "/resources/json/" + verse + "/" + word_id, true );
	request.onload = function() {
		if ( this.status >= 200 && this.status < 400 ) {
			var data = JSON.parse(this.response);
			u( "#lexicon .definition" ).empty();
			u( "#lexicon .definition" ).append( '<h2>' + data.strongs.word + '<small>' + data.strongs.pronun.dic + '</small></h2><p class="short">' + data.strongs.data.def.short + '</p><div class="long">' + data.strongs.data.def.html + '</div><div class="resources"></div>' );
			data.resources.forEach( function( resource, index ) {
				u( "#lexicon .resources" ).append( '<div class="row"><div class="col-sm-12 resource"><div class="panel panel-modern"><div class="panel-heading"><strong>' + resource.title + '</strong></div><div class="panel-body">' + resource.content + '</div></div></div></div>' );
			});
			data.strongs.connected_words.forEach( function( word ) {
				u( ".verse [id='" + word.id + "']" ).addClass( "selected" );
			});
		} else {
			//ToDo: Handle errors
	
		}
	};
	
	request.onerror = function() {
		//ToDo: Handle errors
	};
	
	request.send();
	
});

u( "#lexicon .close" ).on( "click", function() {
	clearLexicon();
});

function clearLexicon() {
	u( "#lexicon" ).removeClass( "visible" ).find( ".definition" ).text( "Loading..." ).find( ".resources" ).empty();
	u( "body" ).removeClass( "lexicon no_scroll" );
	u( ".verse a.selected" ).removeClass( "selected" );
}

u( document ).on( "click", ".expand ul.occurances li", function(e) {
	var ref = u(this).find( "strong" ).text();
	getVerse( ref );
	clearLexicon();
});

u( document ).on( "click", ".mark-helpful", function() {
	var index_id = u(this).parents( ".resource" ).attr( "data-index-id" );
	$.get( "/resources/helpful/" + index_id );
	u(this).parents( ".resource" ).find( ".panel-footer" ).html( "<small>Thanks! We may rank this resource higher next time.</small>" );
});

u( document ).on( "click", ".mark-unhelpful", function() {
	var index_id = u(this).parents( ".resource" ).attr( "data-index-id" );
	$.get( "/resources/unhelpful/" + index_id );
	u(this).parents( ".resource" ).find( ".panel-footer" ).html( "<small>Good to know, we may put this resource further down the list.</small>" );
});

//Global functions

function closeMenu(){
	u( ".history-list" ).removeClass( "open" );
	u( ".overlay.menu" ).addClass( "hidden" );
	u( "#menu" ).removeClass( "show" );
}

function openMenu(){
	u( "body" ).append( "<div class='overlay menu'></div>" )
	u( ".overlay.menu" ).removeClass( "hidden" );
	u( "#menu" ).addClass( "show" );
}

u( "#menu .history" ).on( "click", function(){
	u( "#menu .history-list" ).toggleClass( "open" );
});	

//Dropdown menus
u( ".nav-item" ).on( "click", function(){
	u(this).parent().find( "ul" ).first().style.display = "block";
});
document.addEventListener("mouseup", function(event) {
	if ( event.target.closest( "#lexicon" ) ) return;
	if ( event.target.closest( ".history-list" ) ) return;
	clearLexicon();
	u( ".dropdown-menu.history-list" ).first().style.display = "none";
});