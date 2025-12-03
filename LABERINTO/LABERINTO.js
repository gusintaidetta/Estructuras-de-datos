// escape-laberinto.js
const readline = require('readline');

// Constantes del juego
const MAZE_SIZE = 25;
const TOTAL_LEVELS = 4;

// Elementos del laberinto
const WALL = 0;
const PATH = 1;
const KEY = 2;
const TELEPORT_KEY = 3;
const POINT = 4;
const TRAP = 5;
const DOOR = 6;
const EXIT = 7;
const TELEPORT_DOOR = 8;
const HEALTH_ITEM = 9;
const PLAYER = 10;

// Símbolos para mostrar
const SYMBOLS = {
    [WALL]: '█',
    [PATH]: ' ',
    [PLAYER]: '☺',
    [KEY]: 'K',
    [TELEPORT_KEY]: 'T',
    [POINT]: 'P',
    [TRAP]: 'X',
    [DOOR]: 'D',
    [EXIT]: 'E',
    [TELEPORT_DOOR]: 'Q',
    [HEALTH_ITEM]: 'H'
};

// Colores ANSI
const COLORS = {
    RESET: '\x1b[0m',
    RED: '\x1b[31m',
    GREEN: '\x1b[32m',
    YELLOW: '\x1b[33m',
    BLUE: '\x1b[34m',
    MAGENTA: '\x1b[35m',
    CYAN: '\x1b[36m',
    WHITE: '\x1b[37m',
    BRIGHT_RED: '\x1b[91m',
    BRIGHT_GREEN: '\x1b[92m',
    BRIGHT_YELLOW: '\x1b[93m',
    BRIGHT_BLUE: '\x1b[94m',
    BRIGHT_MAGENTA: '\x1b[95m',
    BRIGHT_CYAN: '\x1b[96m'
};

class MazeGame {
    constructor() {
        this.gameState = {
            level: 1,
            lives: 3,
            score: 0,
            health: 100,
            keys: 0,
            teleportKeys: 0,
            healthItems: 0,
            playerPosition: { x: 1, y: 1 },
            maze: [],
            discovered: [],
            totalDoors: 2,
            totalKeys: 3
        };
        
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        
        this.isGameActive = true;
    }

    // Inicializar el juego
    async init() {
        console.clear();
        this.printTitle();
        await this.delay(1000);
        this.printInstructions();
        await this.delay(2000);
        
        this.generateMaze();
        await this.renderGame();
        this.setupInput();
    }

    printTitle() {
        console.log(COLORS.BRIGHT_CYAN + '╔════════════════════════════════════════════════╗');
        console.log('║' + COLORS.BRIGHT_YELLOW + '           ESCAPE DEL LABERINTO RPG             ' + COLORS.BRIGHT_CYAN + '║');
        console.log('║' + COLORS.BRIGHT_GREEN + '             ¡Encuentra la salida!               ' + COLORS.BRIGHT_CYAN + '║');
        console.log('╚════════════════════════════════════════════════╝' + COLORS.RESET);
        console.log();
    }

    printInstructions() {
        console.log(COLORS.BRIGHT_BLUE + '🎮 CONTROLES DEL JUEGO:' + COLORS.RESET);
        console.log(COLORS.WHITE + '  • W - Mover hacia ARRIBA');
        console.log('  • A - Mover hacia la IZQUIERDA');
        console.log('  • S - Mover hacia ABAJO');
        console.log('  • D - Mover hacia la DERECHA');
        console.log('  • U - Usar objeto de curación');
        console.log('  • Q - Salir del juego');
        console.log();
        
        console.log(COLORS.BRIGHT_BLUE + '🎯 OBJETIVO:' + COLORS.RESET);
        console.log(COLORS.WHITE + '  • Encuentra la salida (E) en cada nivel');
        console.log('  • Recolecta llaves (K) para abrir puertas (D)');
        console.log('  • Evita las trampas (X) que quitan salud');
        console.log('  • Usa objetos de curación (H) cuando sea necesario');
        console.log();
        
        console.log(COLORS.BRIGHT_GREEN + '⚡ CONSEJO: Las llaves están cerca del inicio!' + COLORS.RESET);
        console.log();
    }

    // Generar laberinto
    generateMaze() {
        // Inicializar matrices
        this.gameState.maze = Array(MAZE_SIZE).fill().map(() => Array(MAZE_SIZE).fill(WALL));
        this.gameState.discovered = Array(MAZE_SIZE).fill().map(() => Array(MAZE_SIZE).fill(false));
        
        // Generar laberinto usando algoritmo de profundidad primero
        this.generateMazeDFS(1, 1);
        
        // Colocar elementos estratégicamente
        this.placeElementsStrategically();
        
        // Colocar jugador
        this.gameState.playerPosition = { x: 1, y: 1 };
        this.gameState.maze[1][1] = PLAYER;
        this.discoverArea(1, 1);
    }

    // Algoritmo de generación de laberinto (DFS)
    generateMazeDFS(x, y) {
        const directions = [
            { dx: 0, dy: -2 }, // arriba
            { dx: 2, dy: 0 },  // derecha
            { dx: 0, dy: 2 },  // abajo
            { dx: -2, dy: 0 }  // izquierda
        ];
        
        this.shuffleArray(directions);
        
        this.gameState.maze[y][x] = PATH;
        
        for (const dir of directions) {
            const nx = x + dir.dx;
            const ny = y + dir.dy;
            
            if (nx > 0 && nx < MAZE_SIZE - 1 && ny > 0 && ny < MAZE_SIZE - 1 && 
                this.gameState.maze[ny][nx] === WALL) {
                this.gameState.maze[y + dir.dy / 2][x + dir.dx / 2] = PATH;
                this.generateMazeDFS(nx, ny);
            }
        }
    }

    // Colocar elementos estratégicamente
    placeElementsStrategically() {
        const trapCount = 5 + (this.gameState.level * 2);
        const pointCount = 10 + (this.gameState.level * 2);
        const healthItemCount = 2;

        // Encontrar todos los caminos disponibles
        const allPaths = [];
        for (let y = 1; y < MAZE_SIZE - 1; y++) {
            for (let x = 1; x < MAZE_SIZE - 1; x++) {
                if (this.gameState.maze[y][x] === PATH) {
                    allPaths.push({x, y, distance: Math.abs(x-1) + Math.abs(y-1)});
                }
            }
        }

        // Ordenar por distancia al jugador (más cerca primero)
        allPaths.sort((a, b) => a.distance - b.distance);

        // COLOCAR LLAVES PRIMERO - en posiciones cercanas al jugador
        for (let i = 0; i < this.gameState.totalKeys && i < allPaths.length; i++) {
            const keyPos = allPaths[i];
            this.gameState.maze[keyPos.y][keyPos.x] = KEY;
        }

        // Remover las posiciones ya usadas
        allPaths.splice(0, this.gameState.totalKeys);

        // COLOCAR PUERTAS DESPUÉS - en posiciones más lejanas
        for (let i = 0; i < this.gameState.totalDoors && allPaths.length > 0; i++) {
            const doorIndex = Math.floor(allPaths.length * 0.7) + i;
            if (doorIndex < allPaths.length) {
                const doorPos = allPaths[doorIndex];
                this.gameState.maze[doorPos.y][doorPos.x] = DOOR;
                allPaths.splice(doorIndex, 1);
            }
        }

        // COLOCAR SALIDA - en posición muy lejana
        if (allPaths.length > 0) {
            const exitPos = allPaths[allPaths.length - 1];
            this.gameState.maze[exitPos.y][exitPos.x] = EXIT;
            allPaths.pop();
        }

        // Colocar puerta teletransportadora (solo desde nivel 2)
        if (this.gameState.level > 1 && allPaths.length > 1) {
            const teleportDoorPos = allPaths[Math.floor(allPaths.length * 0.8)];
            const teleportKeyPos = allPaths[Math.floor(allPaths.length * 0.3)];
            if (teleportDoorPos) this.gameState.maze[teleportDoorPos.y][teleportDoorPos.x] = TELEPORT_DOOR;
            if (teleportKeyPos) this.gameState.maze[teleportKeyPos.y][teleportKeyPos.x] = TELEPORT_KEY;
        }

        // Mezclar caminos restantes para elementos aleatorios
        this.shuffleArray(allPaths);

        // Colocar puntos
        for (let i = 0; i < pointCount && allPaths.length > 0; i++) {
            const pointPos = allPaths.pop();
            if (pointPos) this.gameState.maze[pointPos.y][pointPos.x] = POINT;
        }

        // Colocar trampas (evitar cerca del inicio)
        let trapsPlaced = 0;
        while (trapsPlaced < trapCount && allPaths.length > 0) {
            const trapPos = allPaths.pop();
            if (trapPos && trapPos.distance > 8) {
                this.gameState.maze[trapPos.y][trapPos.x] = TRAP;
                trapsPlaced++;
            }
        }

        // Colocar objetos de curación
        for (let i = 0; i < healthItemCount && allPaths.length > 0; i++) {
            const healthPos = allPaths.pop();
            if (healthPos) this.gameState.maze[healthPos.y][healthPos.x] = HEALTH_ITEM;
        }
    }

    // Descubrir área alrededor del jugador
    discoverArea(x, y) {
        for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
                const newX = x + dx;
                const newY = y + dy;
                
                if (newX >= 0 && newX < MAZE_SIZE && newY >= 0 && newY < MAZE_SIZE) {
                    this.gameState.discovered[newY][newX] = true;
                }
            }
        }
    }

    // Renderizar el juego
    async renderGame() {
        console.clear();
        this.printHeader();
        this.printMaze();
        this.printStats();
        this.printInventory();
        this.printLegend();
        
        console.log(COLORS.BRIGHT_CYAN + '\n🎮 ¿Qué quieres hacer? (WASD para mover, U para curar, Q para salir):' + COLORS.RESET);
    }

    printHeader() {
        const levelText = `NIVEL ${this.gameState.level}`;
        const padding = Math.floor((44 - levelText.length) / 2);
        
        console.log(COLORS.BRIGHT_YELLOW + '╔' + '═'.repeat(44) + '╗');
        console.log('║' + ' '.repeat(padding) + levelText + ' '.repeat(44 - levelText.length - padding) + '║');
        console.log('╚' + '═'.repeat(44) + '╝' + COLORS.RESET);
        console.log();
    }

    printMaze() {
        console.log(COLORS.BRIGHT_BLUE + '🗺️  LABERINTO:' + COLORS.RESET);
        console.log();
        
        for (let y = 0; y < MAZE_SIZE; y++) {
            let row = '';
            for (let x = 0; x < MAZE_SIZE; x++) {
                if (this.gameState.discovered[y][x]) {
                    const cell = this.gameState.maze[y][x];
                    switch (cell) {
                        case WALL:
                            row += COLORS.BLUE + SYMBOLS[WALL] + COLORS.RESET;
                            break;
                        case PATH:
                            row += COLORS.WHITE + SYMBOLS[PATH] + COLORS.RESET;
                            break;
                        case PLAYER:
                            row += COLORS.BRIGHT_CYAN + SYMBOLS[PLAYER] + COLORS.RESET;
                            break;
                        case KEY:
                            row += COLORS.BRIGHT_YELLOW + SYMBOLS[KEY] + COLORS.RESET;
                            break;
                        case TELEPORT_KEY:
                            row += COLORS.BRIGHT_MAGENTA + SYMBOLS[TELEPORT_KEY] + COLORS.RESET;
                            break;
                        case POINT:
                            row += COLORS.BRIGHT_GREEN + SYMBOLS[POINT] + COLORS.RESET;
                            break;
                        case TRAP:
                            row += COLORS.BRIGHT_RED + SYMBOLS[TRAP] + COLORS.RESET;
                            break;
                        case DOOR:
                            row += COLORS.WHITE + SYMBOLS[DOOR] + COLORS.RESET;
                            break;
                        case EXIT:
                            row += COLORS.BRIGHT_GREEN + SYMBOLS[EXIT] + COLORS.RESET;
                            break;
                        case TELEPORT_DOOR:
                            row += COLORS.BRIGHT_MAGENTA + SYMBOLS[TELEPORT_DOOR] + COLORS.RESET;
                            break;
                        case HEALTH_ITEM:
                            row += COLORS.BRIGHT_YELLOW + SYMBOLS[HEALTH_ITEM] + COLORS.RESET;
                            break;
                        default:
                            row += SYMBOLS[PATH];
                    }
                } else {
                    row += COLORS.WHITE + '?' + COLORS.RESET;
                }
                row += ' ';
            }
            console.log(row);
        }
        console.log();
    }

    printStats() {
        console.log(COLORS.BRIGHT_BLUE + '📊 ESTADÍSTICAS:' + COLORS.RESET);
        console.log(COLORS.WHITE + `  • Nivel: ${COLORS.BRIGHT_CYAN}${this.gameState.level}${COLORS.WHITE}`);
        console.log(`  • Vidas: ${COLORS.BRIGHT_RED}${this.gameState.lives}${COLORS.WHITE}`);
        console.log(`  • Puntuación: ${COLORS.BRIGHT_GREEN}${this.gameState.score}${COLORS.WHITE}`);
        
        // Barra de salud visual
        const healthBar = this.createHealthBar(this.gameState.health);
        console.log(`  • Salud: ${this.gameState.health}/100 ${healthBar}`);
        console.log(`  • Posición: (${this.gameState.playerPosition.x}, ${this.gameState.playerPosition.y})`);
        console.log();
    }

    createHealthBar(health) {
        const bars = 20;
        const filled = Math.round((health / 100) * bars);
        const empty = bars - filled;
        
        let color;
        if (health > 70) color = COLORS.BRIGHT_GREEN;
        else if (health > 30) color = COLORS.BRIGHT_YELLOW;
        else color = COLORS.BRIGHT_RED;
        
        let bar = color + '[';
        bar += '█'.repeat(filled);
        bar += COLORS.WHITE + '░'.repeat(empty);
        bar += color + ']' + COLORS.RESET;
        
        return bar;
    }

    printInventory() {
        console.log(COLORS.BRIGHT_BLUE + '🎒 INVENTARIO:' + COLORS.RESET);
        
        const keysColor = this.gameState.keys >= this.gameState.totalDoors ? COLORS.BRIGHT_GREEN : COLORS.BRIGHT_YELLOW;
        console.log(COLORS.WHITE + `  • Llaves: ${keysColor}${this.gameState.keys}${COLORS.WHITE}/${this.gameState.totalDoors}`);
        
        console.log(`  • Llaves TP: ${COLORS.BRIGHT_MAGENTA}${this.gameState.teleportKeys}${COLORS.WHITE}`);
        
        const healthColor = this.gameState.healthItems > 0 ? COLORS.BRIGHT_GREEN : COLORS.WHITE;
        console.log(`  • Curaciones: ${healthColor}${this.gameState.healthItems}${COLORS.WHITE}`);
        console.log();
    }

    printLegend() {
        console.log(COLORS.BRIGHT_BLUE + '🔍 LEYENDA:' + COLORS.RESET);
        console.log(COLORS.WHITE + 
            `  ${SYMBOLS[WALL]} Pared    ${SYMBOLS[PLAYER]} Jugador  ${SYMBOLS[KEY]} Llave\n` +
            `  ${SYMBOLS[DOOR]} Puerta   ${SYMBOLS[EXIT]} Salida    ${SYMBOLS[TRAP]} Trampa\n` +
            `  ${SYMBOLS[POINT]} Punto    ${SYMBOLS[HEALTH_ITEM]} Curación  ? No descubierto\n` +
            `  ${SYMBOLS[TELEPORT_KEY]} Llave TP ${SYMBOLS[TELEPORT_DOOR]} Puerta TP`
        );
        console.log();
    }

    // Configurar entrada de usuario
    setupInput() {
        this.rl.question(COLORS.BRIGHT_CYAN + '→ ' + COLORS.RESET, (input) => {
            if (!this.isGameActive) return;

            const command = input.trim().toLowerCase();
            
            if (command === 'q') {
                this.exitGame();
                return;
            }
            
            if (command === 'u') {
                this.useHealthItem();
                this.renderGame();
                this.setupInput();
                return;
            }

            this.handleMovement(command);
        });
    }

    // Manejar movimiento
    async handleMovement(direction) {
        let newX = this.gameState.playerPosition.x;
        let newY = this.gameState.playerPosition.y;

        switch (direction) {
            case 'w': newY--; break;
            case 's': newY++; break;
            case 'a': newX--; break;
            case 'd': newX++; break;
            default:
                await this.showMessage(COLORS.BRIGHT_RED + '❌ ¡Comando no válido! Usa W, A, S, D, U o Q.' + COLORS.RESET);
                this.renderGame();
                this.setupInput();
                return;
        }

        // Verificar límites
        if (newX < 0 || newX >= MAZE_SIZE || newY < 0 || newY >= MAZE_SIZE) {
            await this.showMessage(COLORS.BRIGHT_RED + '🚫 ¡No puedes salir del laberinto!' + COLORS.RESET);
            return;
        }

        // Verificar paredes
        if (this.gameState.maze[newY][newX] === WALL) {
            await this.showMessage(COLORS.BRIGHT_RED + '🧱 ¡Hay una pared en el camino!' + COLORS.RESET);
            return;
        }

        // Verificar puertas
        if (this.gameState.maze[newY][newX] === DOOR) {
            if (this.gameState.keys > 0) {
                this.gameState.keys--;
                await this.showMessage(COLORS.BRIGHT_GREEN + '🔑 ¡Has usado una llave para abrir la puerta!' + COLORS.RESET);
            } else {
                await this.showMessage(COLORS.BRIGHT_RED + '🚪 ¡Necesitas una llave para abrir esta puerta! Busca más llaves.' + COLORS.RESET);
                return;
            }
        }

        // Verificar puerta teletransportadora
        if (this.gameState.maze[newY][newX] === TELEPORT_DOOR) {
            if (this.gameState.teleportKeys > 0) {
                this.gameState.teleportKeys--;
                this.nextLevel();
                return;
            } else {
                await this.showMessage(COLORS.BRIGHT_RED + '🌀 ¡Necesitas una llave teletransportadora para usar esta puerta!' + COLORS.RESET);
                return;
            }
        }

        // Mover jugador
        this.gameState.maze[this.gameState.playerPosition.y][this.gameState.playerPosition.x] = PATH;
        this.gameState.playerPosition.x = newX;
        this.gameState.playerPosition.y = newY;

        // Descubrir área
        this.discoverArea(newX, newY);

        // Verificar elementos
        await this.checkCellContent(newX, newY);

        // Actualizar posición del jugador
        this.gameState.maze[newY][newX] = PLAYER;

        this.renderGame();
        this.setupInput();
    }

    // Verificar contenido de la celda
    async checkCellContent(x, y) {
        const cellContent = this.gameState.maze[y][x];

        switch (cellContent) {
            case KEY:
                this.gameState.keys++;
                await this.showMessage(COLORS.BRIGHT_YELLOW + `🔑 ¡Has encontrado una llave! (${this.gameState.keys}/${this.gameState.totalDoors})` + COLORS.RESET);
                break;
                
            case TELEPORT_KEY:
                this.gameState.teleportKeys++;
                await this.showMessage(COLORS.BRIGHT_MAGENTA + '🌀 ¡Has encontrado una llave teletransportadora!' + COLORS.RESET);
                break;
                
            case POINT:
                this.gameState.score += 10;
                await this.showMessage(COLORS.BRIGHT_GREEN + '⭐ +10 puntos!' + COLORS.RESET);
                break;
                
            case TRAP:
                this.gameState.health -= 33;
                await this.showMessage(COLORS.BRIGHT_RED + '💥 ¡Trampa! -33 de vida' + COLORS.RESET);
                
                if (this.gameState.health <= 0) {
                    await this.playerDeath();
                    return;
                }
                break;
                
            case HEALTH_ITEM:
                this.gameState.healthItems++;
                await this.showMessage(COLORS.BRIGHT_YELLOW + '❤️ ¡Has encontrado un objeto de curación!' + COLORS.RESET);
                break;
                
            case EXIT:
                if (this.gameState.level === TOTAL_LEVELS) {
                    await this.gameWin();
                    return;
                } else {
                    await this.nextLevel();
                    return;
                }
        }

        // Si no es el jugador, convertir en camino después de interactuar
        if (cellContent !== PLAYER) {
            this.gameState.maze[y][x] = PATH;
        }
    }

    // Usar objeto de curación
    async useHealthItem() {
        if (this.gameState.healthItems > 0) {
            this.gameState.healthItems--;
            this.gameState.health = Math.min(100, this.gameState.health + 50);
            await this.showMessage(COLORS.BRIGHT_GREEN + '❤️ Has usado un objeto de curación. +50 de vida.' + COLORS.RESET);
        } else {
            await this.showMessage(COLORS.BRIGHT_RED + '💊 No tienes objetos de curación.' + COLORS.RESET);
        }
    }

    // Cambiar al siguiente nivel
    async nextLevel() {
        this.gameState.level++;
        
        if (this.gameState.level > TOTAL_LEVELS) {
            await this.gameWin();
        } else {
            await this.showMessage(COLORS.BRIGHT_GREEN + `🎉 ¡Pasaste al nivel ${this.gameState.level}! La dificultad aumenta.` + COLORS.RESET);
            this.gameState.keys = 0;
            this.gameState.teleportKeys = 0;
            this.generateMaze();
            await this.renderGame();
            this.setupInput();
        }
    }

    // Muerte del jugador
    async playerDeath() {
        this.gameState.lives--;
        
        if (this.gameState.lives <= 0) {
            await this.gameOver();
        } else {
            await this.showMessage(COLORS.BRIGHT_RED + '💀 ¡Has muerto! Pierdes una vida y reinicias el nivel.' + COLORS.RESET);
            this.gameState.health = 100;
            this.gameState.keys = 0;
            this.gameState.teleportKeys = 0;
            this.generateMaze();
            await this.renderGame();
            this.setupInput();
        }
    }

    // Victoria del juego
    async gameWin() {
        console.clear();
        console.log(COLORS.BRIGHT_GREEN + '╔════════════════════════════════════════════════╗');
        console.log('║' + COLORS.BRIGHT_YELLOW + '              ¡FELICIDADES!                 ' + COLORS.BRIGHT_GREEN + '║');
        console.log('║' + COLORS.BRIGHT_CYAN + '           HAS COMPLETADO EL JUEGO           ' + COLORS.BRIGHT_GREEN + '║');
        console.log('║                                              ║');
        console.log(`║     Puntuación final: ${COLORS.BRIGHT_YELLOW}${this.gameState.score.toString().padEnd(8)}${COLORS.BRIGHT_GREEN}           ║`);
        console.log(`║     Nivel alcanzado: ${COLORS.BRIGHT_CYAN}${this.gameState.level.toString().padEnd(9)}${COLORS.BRIGHT_GREEN}           ║`);
        console.log(`║     Vidas restantes: ${COLORS.BRIGHT_GREEN}${this.gameState.lives.toString().padEnd(9)}${COLORS.BRIGHT_GREEN}           ║`);
        console.log('║                                              ║');
        console.log('║' + COLORS.BRIGHT_YELLOW + '          ¡ERES UN VERDADERO HÉROE!          ' + COLORS.BRIGHT_GREEN + '║');
        console.log('╚════════════════════════════════════════════════╝' + COLORS.RESET);
        await this.delay(3000);
        this.exitGame();
    }

    // Game Over
    async gameOver() {
        console.clear();
        console.log(COLORS.BRIGHT_RED + '╔════════════════════════════════════════════════╗');
        console.log('║' + COLORS.BRIGHT_YELLOW + '               GAME OVER                   ' + COLORS.BRIGHT_RED + '║');
        console.log('║                                              ║');
        console.log(`║     Puntuación: ${COLORS.BRIGHT_CYAN}${this.gameState.score.toString().padEnd(10)}${COLORS.BRIGHT_RED}               ║`);
        console.log(`║     Nivel alcanzado: ${COLORS.BRIGHT_YELLOW}${this.gameState.level.toString().padEnd(3)}${COLORS.BRIGHT_RED}                   ║`);
        console.log('║                                              ║');
        console.log('║' + COLORS.BRIGHT_GREEN + '       ¡No te rindas! Inténtalo de nuevo       ' + COLORS.BRIGHT_RED + '║');
        console.log('╚════════════════════════════════════════════════╝' + COLORS.RESET);
        await this.delay(3000);
        this.exitGame();
    }

    // Mostrar mensaje
    async showMessage(message) {
        console.log(COLORS.BRIGHT_CYAN + '\n💬 ' + message + COLORS.RESET);
        await this.delay(1500);
    }

    // Salir del juego
    exitGame() {
        this.isGameActive = false;
        this.rl.close();
        console.log(COLORS.BRIGHT_CYAN + '\n👋 ¡Gracias por jugar! Hasta la próxima.' + COLORS.RESET);
        process.exit(0);
    }

    // Utilidad: mezclar array
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Utilidad: delay
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Manejo de errores y inicio del juego
process.on('SIGINT', () => {
    console.log(COLORS.BRIGHT_CYAN + '\n\n👋 ¡Hasta la próxima!' + COLORS.RESET);
    process.exit(0);
});

// Iniciar el juego
try {
    const game = new MazeGame();
    game.init();
} catch (error) {
    console.error(COLORS.BRIGHT_RED + '❌ Error al iniciar el juego:', error.message + COLORS.RESET);
    process.exit(1);
}