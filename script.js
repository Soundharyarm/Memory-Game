document.addEventListener('DOMContentLoaded', () => {
    const cardImages = [
        'card1.jpeg', 'card1.jpeg',
        'card2.jpeg', 'card2.jpeg',
        'card3.jpeg', 'card3.jpeg',
        'card4.jpeg', 'card4.jpeg',
        'card5.jpeg', 'card5.jpeg',
        'card6.jpeg', 'card6.jpeg',
        'card7.jpeg', 'card7.jpeg',
        'card8.jpeg', 'card8.jpeg'
    ];

    let board = document.querySelector('.game-board');
    let moveCount = document.getElementById('moveCount');
    let restartButton = document.getElementById('restartButton');
    let firstCard, secondCard;
    let lockBoard = false;
    let moves = 0;

    // Shuffle the cards
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Create and display cards
    function createBoard() {
        shuffle(cardImages);
        board.innerHTML = '';
        cardImages.forEach((image) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.image = image;

            const img = document.createElement('img');
            img.src = `images/${image}`;
            card.appendChild(img);

            card.addEventListener('click', flipCard);
            board.appendChild(card);
        });
    }

    // Flip card
    function flipCard() {
        if (lockBoard || this === firstCard) return;

        this.classList.add('flipped');
        if (!firstCard) {
            firstCard = this;
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    // Check for match
    function checkForMatch() {
        if (firstCard.dataset.image === secondCard.dataset.image) {
            disableCards();
        } else {
            unflipCards();
        }

        moves++;
        moveCount.textContent = moves;
    }

    // Disable matched cards
    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        resetBoard();
    }

    // Unflip cards
    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 1500);
    }

    // Reset board state
    function resetBoard() {
        [firstCard, secondCard, lockBoard] = [null, null, false];
    }

    // Restart game
    function restartGame() {
        moves = 0;
        moveCount.textContent = moves;
        createBoard();
    }

    // Event listener for restart button
    restartButton.addEventListener('click', restartGame);

    // Initialize the game
    createBoard();
});
