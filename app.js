new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack: function() {

            var damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster for ' + damage
            });

            /*************
            * this.monsterHealth <= 0이이거나 this.playerHealth <= 0 이면 종료
            * If we return true here, I know I dont want to continue the code execution here
            * because the game is over. so I dont want to deal damage again.
            */ 
            if (this.checkWin()) {
                return;
            }

            this.mosterAttacks();

        },
        specialAttack: function() {
            var damage = this.calculateDamage(10, 20);
            this.monsterHealth -= damage;

            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster hard for ' + damage
            });

            if (this.checkWin()) {
                return;
            }
            this.mosterAttacks();
        },
        heal: function() {
            if (this.playerHealth <= 90) {
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }

            this.turns.unshift({
                isPlayer: true,
                text: 'Player heals for 10'
            });

            this.monsterAttacks();
        },
        giveUp: function() {
            this.gameIsRunning = false;
        },
        mosterAttacks: function() {
            var damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage;
            /*************
             * At the end of the function I again will have to check if we won.
             * but here I can only say this.checkWin.
             * Because there is no code getting executed after this function.
             */
            this.checkWin();
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits Player for ' + damage
            });

        },
        calculateDamage: function(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function() {
            if (this.monsterHealth <= 0) {
                if (confirm('You won! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.playerHealth <= 0){
                if (confirm('You lost! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            // 아무 조건에 맞지 않으면 false return
            return false;
        }
    }
})