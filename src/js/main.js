// Author: Lyle Denman
// Start: 21 November 2015

(function() {

    var doorsOpened;
    var goatDoors; // Holds losing doors
    var child = document.getElementById('threeDoors').children;
    var door1 = child[0];
    var door2 = child[1];
    var door3 = child[2];
    var gameText = document.getElementById('gameText');
    var button = document.getElementById('resetBtn');
    var winDoor;

    // Initial state
    function resetState() {
        doorsOpened = 0;
        goatDoors = [];
        door1.src = "img/door1.png";
        door1.className = "door door1";
        door2.src = "img/door2.png";
        door2.className = "door door2";
        door3.src = "img/door3.png";
        door3.className = "door door3";
        button.className = "hide";
        gameText.innerHTML = "Hello and welcome to Three Doors. Only one of these doors is the Winning Door. The rules are simple: Please select a door.";

        winDoor = Math.floor((Math.random() * 3) + 1);
        for (var i = 1; i <= 3; i++) {
            if (i != winDoor) {
                goatDoors.push(i);
            }
        }
    }

    function openDoor(doorEl) {

        if (doorsOpened == 0) {
            for (var door in goatDoors) {
                // If the selected door is found in the goatDoors list:
                if (goatDoors.hasOwnProperty(door)) {
                    if (doorEl.className.indexOf(goatDoors[door]) != -1) {
                        // Remove the selected door from the delete list
                        goatDoors.splice(door, 1);
                    }
                }
            }

            // Open one of the doors or the only door in the goatDoors list
            var showDoor = Math.floor(Math.random() * goatDoors.length);
            var doorOne = child[goatDoors[showDoor]-1];
            // Remove class names to avoid calling openDoor() on same door twice
            doorOne.className = "";
            doorOne.src = "img/goat.png";
            gameText.innerHTML = "I've opened one of the losing doors to reveal: a well-formed goat. <br> You can now " +
                "select either the same door again or you may choose the other door. <br> The choice is up to you.";
        }

        if (doorsOpened == 1) {
            var didWin = (-1 != doorEl.className.indexOf(winDoor.toString()));
            if (didWin) {
                gameText.innerHTML = "Congratulations! You win a brand new car!";
                doorEl.src = "img/car.png";
            } else {
                gameText.innerHTML = "Oh, no! You picked the wrong door. As a consolation prize, please keep these goats.";
                doorEl.src = "img/goat.png";
            }

            button.className += " show";
        }

        doorsOpened++;
    }

    document.getElementById('threeDoors').addEventListener('click', function(e) {
        if (e.target.className.indexOf("door") >= 0 && e.target.nodeName == "IMG") {
            openDoor(e.target);
        }
    });

    document.getElementById('reset-btn').addEventListener('click', function() {
        resetState();
    });

    resetState();
})();
