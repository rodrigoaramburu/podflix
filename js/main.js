$(document).ready( function(){

    $.get('data.json', function(data){
        
        loadEpisode(data[0].episodes[0]);
        
        populatePodcasts(data);


        $('.owl-carousel').owlCarousel({
            nav:true,
            margin:10,
            items:6,
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:3
                },
                1000:{
                    items:6
                }
            }
        })
    });
});

function loadEpisode(episode){
    //$('.podcasts').empty();
        
    $('.destaque .info .title').html(episode.title);
    $('.destaque .info .podcast').html(episode.podcast);
    $('.destaque .info .description').html(episode.description.length < 255 ? episode.description: episode.description.substr(0,255) + '...' );
    $('.destaque .info .link').attr('href',episode.link);
    $('.destaque .capa').css('background-image', `url('${episode.image}')`);

    const audio = document.querySelector('.player audio');
    audio.src = episode.audio;
    audio.load();
}


function populatePodcasts(data){
    for(p = 0 ; p < data.length; p++){
        const podcastContainer = document.createElement('div');
        podcastContainer.classList.add('podcast');
        $(podcastContainer).html(`<h3>${data[p].podcast}</h3>`)
        
        const episodesContainer = document.createElement('div');
        episodesContainer.classList.add('owl-theme');
        episodesContainer.classList.add('owl-carousel');


        for(i = 0; i < data[p].episodes.length ;i++){

            const element = data[p].episodes[i];
            const item = document.createElement('div');
            item.classList.add('item');

            item.addEventListener('click', function(ev){
                ev.preventDefault();
                loadEpisode(element);
                window.scrollTo({top: 0, behavior: 'smooth'});
            });

            const image = document.createElement('img');
            image.src = element.image;
            image.alt = element.title; 
            const titleContainer = document.createElement('div');
            titleContainer.classList.add('title');
            titleContainer.innerHTML = `${element.title}`;
            item.appendChild(image);
            item.appendChild(titleContainer);

            $(episodesContainer).append(item);
        }
        podcastContainer.append(episodesContainer);
        
        $('.podcasts').append(podcastContainer);
    }

}