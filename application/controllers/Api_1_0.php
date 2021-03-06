<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Api_1_0 extends CI_Controller
{
	function __construct()
	{
		parent::__construct();

		$this->load->helper( "url" );
		$this->load->helper( "reference" );
		$this->load->model( "kjvmodel" );
		$this->load->model( "resourcemodel" );
		$this->load->model( "mapmodel" );
		$this->load->helper( "history" );
	}
	
	function verse( $query, $limit = 50 )
	{
		if( $ref = shortTextToNumber( $query ) ) {
			$short_ref = $query;
			$is_query = false;
		} elseif( $short_ref = parseTextToShort( urldecode( $query ) ) ) {
			$ref = shortTextToNumber( $short_ref );
			$is_query = true;
		} else {
			show_404();
		}
		
		$resources = [
			"main_resources" => $this->resourcemodel->getMain( $ref, $limit ),
			"sidebar_resources" => [],
			"verse" => $this->kjvmodel->html_verse( $ref ),
			"text_ref" => parseReferenceToText( $ref ),
			"short_ref" => $short_ref,
			"nav" => $this->kjvmodel->nav( $ref ),
			"resource_count" => $this->resourcemodel->countResources( $ref ),
		];
        
        if( ! $resources["verse"] ) show_404();
		
		$cross_references = $this->kjvmodel->getCrossReferences( $ref );
		if( $cross_references ) {
			$resources["sidebar_resources"][] =  $cross_references;
		}
		
		foreach( $this->mapmodel->get( $ref ) as $map ) {
			$resources["sidebar_resources"][] =  $map;
		}
		
		saveLastVerse( $short_ref );
		$log = [
			"verse" => $ref,
			"formatted_verse" => $resources["text_ref"],
			"ip" => $_SERVER["REMOTE_ADDR"],
			"user_agent" => $_SERVER['HTTP_USER_AGENT'] ?? null,
			"method" => $is_query ? "query" : "ajax",
			"api_version" => "1.0",
		];
		$this->db->insert( "log", $log );
		$this->output->set_content_type('application/json')->set_output( json_encode( $resources ) );
	}
	
	function resources( $ref, $limit = 20, $offset = 0 )
	{
		$ref = shortTextToNumber( $ref );
		$resources = $this->resourcemodel->getMain( $ref, $limit, $offset );
		$this->output->set_content_type('application/json')->set_output( json_encode( $resources ) );
	}
	
	function word( $word )
	{
		$this->output->set_content_type('application/json')->set_output( json_encode( $this->kjvmodel->lexicon( $word ) ) );
	}
	
	function word_occurences( $word, $page )
	{
		$this->output->set_content_type('application/json')->set_output( $this->kjvmodel->lexicon_occurances( $word, $page ) );
	}
	
	function helpful( $index_id )
	{
		$data = [
			"index_id" => $index_id,
			"ip" => $_SERVER["REMOTE_ADDR"] ?? null,
			"user_agent" => $_SERVER['HTTP_USER_AGENT'] ?? null,
			"helpful" => true,
		];
		$this->db->insert( "index_response", $data );
	}
	
	function unhelpful( $index_id )
	{
		$data = [
			"index_id" => $index_id,
			"ip" => $_SERVER["REMOTE_ADDR"] ?? null,
			"user_agent" => $_SERVER['HTTP_USER_AGENT'] ?? null,
			"helpful" => false,
		];
		$this->db->insert( "index_response", $data );
	}
	
	function bibletext( $ref )
	{
		$this->output->set_content_type('application/json')->set_output( json_encode( $this->kjvmodel->bibletext( shortTextToNumber( $ref ) ) ) );
	}
}
