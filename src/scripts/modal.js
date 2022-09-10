export default class Modal {
    constructor() {
        this.currentPage = 0;

        this.description = "Velo Launch is an application that visualizes the popular launch angle debate in the MLB. Velo Launch does this by using an interactive D3 scatterplot graph where each individual data point corresponds to a hit within the last three seasons of each respective player.";

        this.instructions = [
            'Use the buttons on the right of each graph to view data points grouped by hit type',
            'Use two fingers on the scroll pad or a mouse scroller to zoom in and out of the graph. You can also drag and pan the view by holding down a click to explore the graph.',
            'Hover over each data point to display a tooltip with further information about each hit.'
        ];

        // insert gifs here
        this.gifs = [
            'assets/gifs/buttons.gif',
            'assets/gifs/zoom.gif',
            'assets/gifs/tooltip.gif'
        ];

        // creating modal container
        this.modal = document.createElement('div');
        this.modal.classList.add('modal-container');

        const header = document.createElement('div');
        header.classList.add('modal-header');
        this.headerTitle = document.createElement('h1');
        this.headerTitle.textContent = 'Velo Launch';
        this.headerExit = document.createElement('img');
        this.headerExit.classList.add('modal-exit')
        this.headerExit.src = 'assets/modal/x-icon.webp';
        this.headerLogo = document.createElement('img');
        this.headerLogo.src = 'assets/header/Major_League_Baseball_logo.png';
        header.appendChild(this.headerExit);
        header.appendChild(this.headerTitle);
        header.appendChild(this.headerLogo);
        this.modal.appendChild(header);

        const description = document.createElement('div');
        description.classList.add('modal-description')
        this.descriptionContent = document.createElement('h3');
        this.descriptionContent.textContent = this.description;
        description.appendChild(this.descriptionContent);
        this.modal.appendChild(description);

        const gifContainer = document.createElement('div');
        gifContainer.classList.add('modal-gif');
        this.gifImage = document.createElement('img');
        this.gifImage.src = this.gifs[this.currentPage];
        gifContainer.appendChild(this.gifImage);
        this.modal.appendChild(gifContainer);

        const instructions = document.createElement('div');
        instructions.classList.add('modal-instructions');
        this.modalInstruction = document.createElement('p');
        this.modalInstruction.textContent = this.instructions[this.currentPage];
        instructions.appendChild(this.modalInstruction);
        this.modal.appendChild(instructions);

        // create footer with buttons here
        const footer = document.createElement('div');
        footer.classList.add('modal-footer');
        this.footerLeft = document.createElement('img');
        this.footerLeft.src = 'assets/modal/left-arrow.svg';
        footer.appendChild(this.footerLeft);
        this.modal.appendChild(footer);

        this.pageNumber = document.createElement('p');
        this.pageNumber.textContent = `${this.currentPage + 1}/3`;
        footer.appendChild(this.pageNumber);

        this.footerRight = document.createElement('img');
        this.footerRight.src = 'assets/modal/right-arrow.png';
        footer.appendChild(this.footerRight);

        this.pageClick();
        this.exit();
        this.show();
        this.reset();
    }

    displayModal() {
        const background = document.getElementById('page-content');
        background.style.opacity = 0.2;
        return this.modal;
    }

    // function to switch pages
    pageClick() {
        this.footerRight.addEventListener('click', () => {
            if (this.currentPage < 2) {
                this.currentPage += 1;
                this.pageNumber.textContent = `${this.currentPage + 1}/3`;
                this.modalInstruction.textContent = this.instructions[this.currentPage];
                this.gifImage.src = this.gifs[this.currentPage];
            }
        })

        this.footerLeft.addEventListener('click', () => {
            if (this.currentPage > 0) {
                this.currentPage -= 1;
                this.pageNumber.textContent = `${this.currentPage + 1}/3`;
                this.modalInstruction.textContent = this.instructions[this.currentPage];
                this.gifImage.src = this.gifs[this.currentPage];
            }
        })
    }

    exit() {
        const pageContent = document.getElementById('page-content');
        this.headerExit.addEventListener('click', () => {
            this.modal.style.display = 'none';
            pageContent.style.opacity = 1;
            this.reset();
        })
    }

    show() {
        const stickButton = document.getElementById('sticky-info-button');
        const pageContent = document.getElementById('page-content');
        stickButton.addEventListener('click', () => {
            this.modal.style.display = 'flex';
            pageContent.style.opacity = 0.4;
        })
    }

    reset() {
        this.currentPage = 0;
        this.pageNumber.textContent = `${this.currentPage + 1}/3`;
        this.modalInstruction.textContent = this.instructions[this.currentPage];
        this.gifImage.src = this.gifs[this.currentPage];
    }
}