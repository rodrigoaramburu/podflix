<?php

$podcasts = [
        [
            'podcast' => 'Nerdcast',
            'episodes' => getEpisodes('https://jovemnerd.com.br/feed-nerdcast/', 'Nerdcast')
        ],
        [
            'podcast' => 'Escriba Café',
            'episodes' => getEpisodes('https://www.spreaker.com/show/1652479/episodes/feed','Escriba Café')
        ],
        [
            'podcast' => 'Devs Cansados',
            'episodes' => getEpisodes('https://anchor.fm/s/c946c20/podcast/rss','Devs Cansados'),
        ]
];

$json = json_encode($podcasts);

file_put_contents('data.json', $json);



function getEpisodes(string $url, string $podcast, int $num = 20){

    $xml = file_get_contents( $url );
    $doc = new DOMDocument();
    $doc->preserveWhiteSpace = false;
    $doc->loadXML( $xml); 
    
    $xpath = new DOMXpath( $doc);
    $xpath->registerNamespace( 'itunes', 'http://www.itunes.com/dtds/podcast-1.0.dtd');
    
    $items = $doc->getElementsByTagName('item'); 
    $episodes = [];   
    for($i =0 ; $i < $num; $i++ ) {
        $item = $items[$i];
        $title = $xpath->query( 'title', $item)->item(0)->nodeValue;
        $link = $xpath->query('link',$item)->item(0)->nodeValue;
        $summary = strip_tags($xpath->query( 'itunes:summary', $item)->item(0)->nodeValue);
        
        $image = $xpath->query( 'itunes:image', $item)->item(0)->attributes->getNamedItem('href')->value;
        
        $enclosure = $xpath->query( 'enclosure', $item)->item(0);
        $audio = $enclosure->attributes->getNamedItem('url')->value;
        
        $episodes[] = [
            'podcast' => $podcast,
            'title' => $title,
            'description' => $summary,
            'audio' => $audio,
            'image' => $image,
            'link' => $link
        ];
    }
    return $episodes;
}