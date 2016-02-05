<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Kjvmodel extends CI_Model
{
	function __construct()
	{
		parent::__construct();
		$this->load->database();
		$this->load->helper( "reference" );
	}


	function chapter($book, $chapter)
	{

		if(is_numeric($book) AND is_numeric($chapter)){
			$sql = 'SELECT * FROM kjv_verses WHERE book = '.$book.' AND chapter = '.$chapter;
		    $query = $this->db->query($sql);
			return $query->result();
		}
	}
	function search($phrase, $offset = 0)
	{

		if(is_numeric($offset)){
			$sql = "SELECT book, chapter, verse, text FROM kjv_verses WHERE text LIKE '%".$this->db->escape_like_str($phrase)."%' LIMIT 15 OFFSET ".$offset;
			$query = $this->db->query($sql);
			return $query->result();
		}
	}
	function verse( $ref )
	{
		if( is_numeric( $ref ) ){
			$sql = "SELECT * FROM kjv_verses WHERE ref = $ref";
		    $query = $this->db->query($sql);
			foreach ($query->result() as $line)
			{
				$encoding = str_replace("¶ ", "", $line->coding);
				$encoding = explode(' ', $encoding);
				$text_array = explode(' ', $line->text);
				$html = array();
				foreach ($encoding as $code){ //Create array of 
					$wordNumberArray = explode("~", $code);
					$wordNumber = $wordNumberArray[0];
					$strongsCode = $this->get_string_between($code, "~", "~");
					
					if(strstr($code, "*")){ 
						$position = $wordNumber;
						array_splice($text_array, $position,0,"°");
						
					}
					
					$html[$wordNumber]['strongsNum'] = $strongsCode;
					$html[$wordNumber]['wordNum'] = $wordNumber;
					
				}
				$i = -1;
				foreach ($text_array as $word){ //Create array of 
				$i++;
					if(isset($html[$i])) { $strongs = $html[$i]['strongsNum']; } else { $strongs = NULL; }
					if(isset($html[$i]['ast'])){
					}
					$output[] = array(
					  'word' => $word,
					  'strongs' => $strongs,
					);
	
				}
				return $output;
				
			}
		}
	}
	
	function plain_verse( $ref )
	{
		if( $ref ){
			$query = "SELECT * FROM kjv_verses LEFT JOIN kjv_books ON kjv_verses.book = kjv_books.id WHERE ref = $ref";
			$results = $this->db->query( $query )->row_array();
			
			$return = array();
			$return['text'] = $results['text'];
			$return['title'] = "{$results['book']} {$results['chapter']}:{$results['verse']}";
			$link_book = str_replace( " ", "", $results['book'] );
			$return['link'] = "http://bibletools.info/{$link_book}_{$results['chapter']}:{$results['verse']}";
			$return += $this->nav( $ref, true );
			return $return;
		}
	}
	
	function html_verse( $ref )
	{
		if( $ref ){
			$query = "SELECT * FROM kjv_html WHERE ref = $ref";
			$results = $this->db->query( $query )->row_array();
			return $results['words'];
		}
	}
	
	function lexicon( $ref, $word )
	{
		if( is_numeric( $word ) ) {
			$lang = ( $ref < 40001001 ? "hebrew" : "greek" );
			$definition = $this->db->select( "kjv_original.word, kjv_original.id, lexicon_$lang.data, lexicon_$lang.base_word, kjv_original.pronun" )
				->from( "kjv_words" )
				->join( "kjv_original", "kjv_words.orig_id = kjv_original.id" )
				->join( "lexicon_$lang", "kjv_original.strongs = lexicon_$lang.strongs" )
				->where( "kjv_words.id", $word )
				->get()
				->row_array();
				
			$connected_words = $this->db->select( "id" )
				->from( "kjv_words" )
				->where( "orig_id", $definition['id'] )
				->get()
				->result_array();
			
			$definition['data'] = json_decode( $definition['data'], true );
			$definition['pronun'] = json_decode( $definition['pronun'], true );
			$definition['data']['def']['long']['content'] = $this->makeUl( $definition['data']['def']['long'] );
			$definition['data']['def']['long']['title'] = "More Strongs Definitions";
			$definition['connected_words'] = $connected_words;
			
			return $definition;
		}
	}
	
	function lexicon_occurances( $ref, $word_id, $base_word )
	{
		if( is_numeric( $word_id ) ) {
			$sign = ( $ref < 40001001 ? "<" : ">=" );
			
			$word = $this->db->select( "*" )
				->from( "kjv_words" )
				->join( "kjv_original", "kjv_words.orig_id = kjv_original.id" )
				->where( "kjv_words.id", $word_id )
				->get()
				->row_array();
							
			$related_verses = $this->db->select( "kjv_html.ref, kjv_html.words" )
				->from( "kjv_html" )
				->join( "kjv_original", "kjv_html.ref = kjv_original.ref" )
				->where( "kjv_original.strongs", $word['strongs'] )
				->where( "kjv_html.ref $sign 40001001" )
				->get()
				->result_array();
				
			/*$related_words = $this->db->select( "kjv_words.id" )
				->from( "kjv_words" )
				->join( "kjv_original", "kjv_words.orig_id = kjv_original.id" )
				->where( "kjv_original.strongs", $word['strongs'] )
				->where( "kjv_words.ref $sign 40001001" )
				->get()
				->result_array();*/
						
			$html = "<ul class='occurances'>";
			foreach( $related_verses as $verse ) {
				$ref_array = parseReference( $verse['ref'] );
				$words = strip_tags( $verse['words'] );
				$html .= "<li><strong>{$ref_array['book']} {$ref_array['chapter']}:{$ref_array['verse']}</strong><p>$words</p></li>";
			}
			
			return [
				"title" => count( $related_verses ) . " other occurances of the root word: $base_word" ,
				"content" => $html,
			];
		}
	}
	
	function makeUl( $array )
	{
		$html = "<ol>";
		foreach( $array as $item ) {
			if( is_array( $item ) ) {
				$html .= $this->makeUl( $item );
			} else {
				$html .= "<li>$item</li>";
			}
		}
		$html .= "</ol>";
		return $html;
	}
	
	function get_string_between($string, $start, $end){
		$string = " ".$string;
		$ini = strpos($string,$start);
		if ($ini == 0) return "";
		$ini += strlen($start);
		$len = strpos($string,$end,$ini) - $ini;
		return substr($string,$ini,$len);
	}
	function nav( $ref, $numeric = false )
	{

		if( is_numeric( $ref ) ) {
			$verse = $this->db->query( "SELECT id FROM kjv_verses WHERE ref = $ref" )->row_array();
			$prev_id = $verse['id']-1;
			$next_id = $verse['id']+1;
			
			$prev = $this->db->query("SELECT * FROM kjv_verses LEFT JOIN kjv_books ON kjv_verses.book = kjv_books.id WHERE kjv_verses.id = $prev_id")->row_array();
			$next = $this->db->query("SELECT * FROM kjv_verses LEFT JOIN kjv_books ON kjv_verses.book = kjv_books.id WHERE kjv_verses.id = $next_id")->row_array();
			
			if($prev) {
				$book = $numeric ? $prev['id'] : $prev['book'];
				$nav['prev'] = "$book {$prev['chapter']}:{$prev['verse']}";
			}
			if($next) {
				$book = $numeric ? $next['id'] : $next['book'];
				$nav['next'] = "$book {$next['chapter']}:{$next['verse']}";
			}
			
			return $nav;
		}
	}
}