function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min))
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            demonHealth: 100,
            currentRound: 0,
            winner: null,

        }
    },
    computed: {
        demonBarStyles() {
            // set bar with to exactly 0 if the game is over
            if (this.demonHealth < 0) {
                return { width: '0%'}
            }
            return { width: this.demonHealth + '%'}
        },
        playerBarStyles() {
            // set bar with to exactly 0 if the game is over
            if (this.playerHealth < 0) {
                return { width: '0%'}
            }
            return { width: this.playerHealth + '%'}
        },
        canUseSpecialAttack() {
            return this.currentRound % 3 !== 0
        }
    },
    watch: {
        playerHealth(value) {
            if (value <= 0 && this.demonHealth <= 0) {
                this.winner = 'draw'
            } else if (value <= 0) {
                this.winner = 'demon'
            }
        },
        demonHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) {
                this.winner = 'draw'
            } else if (value <= 0) {
                this.winner = 'player'
            }
        }
    },
    methods: {
        playerAttackDemon() {
            this.currentRound++
            const attackValue = getRandomValue(5, 12)
            this.demonHealth -= attackValue                  
            this.demonAttackPlayer()
        },
        demonAttackPlayer() {
            const attackValue = getRandomValue(8, 15)
            this.playerHealth -= attackValue
        },
        specialAttackDemon() {
            this.currentRound++
            const attackValue = getRandomValue(10, 25)
            this.demonHealth -= attackValue
            this.demonAttackPlayer()
        },
        healPlayer() {
            this.currentRound++
            const healValue = getRandomValue(8, 20)
            this.playerHealth + healValue > 100 ? this.playerHealth = 100 : this.playerHealth += healValue
            this.demonAttackPlayer()
        },
        surrender() {
            this.winner = 'demon'
        },
        startNewGame() {
            this.playerHealth = 100
            this.demonHealth = 100
            this.winner = null
            this.currentRound = 0
        }
    }
})

app.mount('#game')