Game.registerMod("CustomGoldenCookie", {
    init: function () {
        // Create draggable button
        const btn = document.createElement('button');
        btn.textContent = 'Spawn Custom Golden Cookie';
        Object.assign(btn.style, {
            position: 'fixed',
            top: '20px',
            left: '20px',
            zIndex: '9999',
            padding: '10px',
            backgroundColor: '#FFD700',
            border: '2px solid #B8860B',
            color: '#000',
            fontWeight: 'bold',
            cursor: 'move',
            borderRadius: '8px'
        });
        document.body.appendChild(btn);

        // Dragging logic
        let isDragging = false, offsetX = 0, offsetY = 0;
        btn.addEventListener('mousedown', e => {
            isDragging = true;
            offsetX = e.clientX - btn.offsetLeft;
            offsetY = e.clientY - btn.offsetTop;
            btn.style.cursor = 'grabbing';
        });
        document.addEventListener('mousemove', e => {
            if (isDragging) {
                btn.style.left = `${e.clientX - offsetX}px`;
                btn.style.top = `${e.clientY - offsetY}px`;
            }
        });
        document.addEventListener('mouseup', () => {
            isDragging = false;
            btn.style.cursor = 'move';
        });

        // Golden cookie spawn logic with multiplier
        function spawnGoldenCookie(effect = 'frenzy', multiplier = 7) {
            const shimmer = new Game.shimmer('golden');
            shimmer.force = effect;
            shimmer.duration = 30;
            shimmer.life = 1000;
            shimmer.spawnLead = 0;
            shimmer.init();

            if (effect === 'frenzy') {
                Game.frenzy = multiplier;
                Game.frenzyPower = multiplier;
                Game.frenzyMax = multiplier;
            } else if (effect === 'clickFrenzy') {
                Game.clickFrenzy = multiplier;
            } else if (effect === 'multiply cookies') {
                Game.cookiesEarned += Game.cookiesPs * multiplier;
            }
        }

        // Button click → prompt for effect & multiplier
        btn.onclick = () => {
            const effect = prompt("Enter golden cookie effect (e.g., frenzy, clickFrenzy, multiply cookies):", "frenzy");
            if (!effect) return;
            const multiplierInput = prompt("Enter multiplier (e.g., 777, 1000):", "777");
            const multiplier = parseFloat(multiplierInput);
            if (!isNaN(multiplier)) {
                spawnGoldenCookie(effect.trim(), multiplier);
            } else {
                alert("Invalid multiplier.");
            }
        };

        Game.Notify("CustomGoldenCookie Mod Loaded", "Golden cookie spawner button added.", [19,7]);
    },
    save: function () {
        return ''; // No persistent save data
    },
    load: function (str) {
        // No load logic needed
    }
});
