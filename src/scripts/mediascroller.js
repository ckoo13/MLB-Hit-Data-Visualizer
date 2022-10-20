export const generateItems = () => {
    const players = ['mookie', 'tatis', 'trout', 'seager', 'machado', 'harper', 'acuna', 'altuve', 'freeman', 'jram', 'judge', 'ohtani', 'soto'];

    for (let i = 0; i < players.length; i++) {
        // create a div for each of the players that represents an item
        let scrollerImage = document.createElement('div');
        // adding className to the div
        scrollerImage.classList.add('media-element');

        // create link to jump to player section
        let link = document.createElement('a');
        link.href = `#section-${players[i]}`;

        let image = document.createElement('img');
        image.classList.add('scroller-img');
        image.src = `./assets/headshots/${players[i]}.png`

        scrollerImage.appendChild(link);
        link.appendChild(image);

        let scrollerContainer = document.getElementById('media-scroller-container');
        scrollerContainer.appendChild(scrollerImage);
    }
}

// window.addEventListener('DOMContentLoaded', e => {
//     generateItems();
// })