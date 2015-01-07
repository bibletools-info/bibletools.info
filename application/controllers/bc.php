<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Bc extends CI_Controller
{
	function __construct()
	{
		parent::__construct();

		$this->load->helper('url');
		$this->load->model('kjvapi');
	}
	
	function get()
	{
		$book = $this->uri->segment(3);
		$chapter = $this->uri->segment(4);
		$verse = $this->uri->segment(5);
		
		$results = array();
		$results['resources'] = array();
		if(isset($book) AND is_numeric($verse)){
			
			$results['nav'] = $this->kjvapi->nav($book, $chapter, $verse);
		
			$sdabc_query = $this->db->query('SELECT * FROM sdabc WHERE book = "'.$book.'" AND chapter = '.$chapter.' AND verse = '.$verse.' LIMIT 1');
		    $sdabc = $sdabc_query->result();
		    		    
		    if($sdabc) {
		    	$sdabc[0]->title = "SDA Bible Commentary";
		    	array_push($results['resources'], $sdabc[0]);
		    }
		    
		    $mhcc_query = $this->db->query('SELECT * FROM mhcc WHERE book = "'.$book.'" AND chapter = '.$chapter.' AND end_verse >= '.$verse.' AND start_verse <= '.$verse.' OR book = "'.$book.'" AND chapter = '.$chapter.' AND start_verse = '.$verse.' LIMIT 1');
		    $mhcc = $mhcc_query->result();
		     
		     if($mhcc) {
		    	$mhcc[0]->title = "Matthew Henry Concise Bible Commentary";
		    	array_push($results['resources'], $mhcc[0]);
		    }
		    
		    $acbc_query = $this->db->query('SELECT * FROM acbc WHERE book = "'.$book.'" AND chapter = '.$chapter.' AND verse = '.$verse.' LIMIT 1');
		    $acbc = $acbc_query->result();
		    		    
		    if($acbc) {
		    	$acbc[0]->title = "Adam Clarke Bible Commentary";
		    	array_push($results['resources'], $acbc[0]);
		    }
		    
		    $this->output->set_output( json_encode( $results ) );
		}
	}
}