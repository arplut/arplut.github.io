window.onload = () => {
    const leftButton = document.getElementById('leftButton');
    const rightButton = document.getElementById('rightButton');
    const title = document.getElementById('title');
    const totalStates = 3; // Total number of states
    let currentState = 0;

    const titles = [
        "Click next to see what they look like today...",
        "This is what they should look like today. Click next again to see to see what they actually look like...",
        "This is what they actually look like today..."
    ];

    const updateTitle = () => {
        title.innerHTML = titles[currentState]; // Use innerHTML to allow HTML tags
    };

    const updateButtons = () => {
        leftButton.disabled = currentState === 0;
        rightButton.disabled = currentState === totalStates - 1;
    };

    const changeImages = () => {
        const gridItems = document.querySelectorAll('.grid-item img');
        gridItems.forEach((img, index) => {
            setTimeout(() => {
                img.style.transform = 'translateX(-100%)';
                setTimeout(() => {
                    img.src = `image${(currentState * 4 + index + 1)}.jpg`; // Change image source
                    img.style.transform = 'translateX(100%)';
                    setTimeout(() => {
                        img.style.transform = 'translateX(0)';
                    }, 50);
                }, 500);
            }, index * 100);
        });
    };

    leftButton.addEventListener('click', () => {
        if (currentState > 0) {
            currentState--;
            updateTitle();
            updateButtons();
            changeImages();
        }
    });

    rightButton.addEventListener('click', () => {
        if (currentState < totalStates - 1) {
            currentState++;
            updateTitle();
            updateButtons();
            changeImages();
        }
    });

    // Initialize the title and buttons on load
    updateTitle();
    updateButtons();
};