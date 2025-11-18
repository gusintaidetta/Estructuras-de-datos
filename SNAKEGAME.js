<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SNAKE GAME :)</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Courier New', monospace;
            background-color: #1a1a2e;
            color: #e6e6e6;
            line-height: 1.6;
            min-height: 100vh;
            padding: 20px;
        }
        
        .contenedor {
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .encabezado {
            text-align: center;
            margin-bottom: 30px;
            padding: 20px;
            background: linear-gradient(135deg, #16213e 0%, #0f3460 100%);
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }
        
        h1 {
            color: #4CAF50;
            margin-bottom: 10px;
            text-shadow: 0 0 10px rgba(76, 175, 80, 0.5);
            font-size: 2.5em;
        }
        
        .subtitulo {
            color: #cccccc;
            font-size: 1.2em;
        }
        
        .contenido-principal {
            display: grid;
            grid-template-columns: 1fr 400px;
            gap: 30px;
            margin-bottom: 30px;
        }
        
        @media (max-width: 768px) {
            .contenido-principal {
                grid-template-columns: 1fr;
            }
        }
        
        .seccion-juego {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .contenedor-juego {
            background-color: #16213e;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            margin-bottom: 20px;
            width: 100%;
        }
        
        #lienzoJuego {
            border: 2px solid #4CAF50;
            border-radius: 5px;
            background-color: #0f3460;
            box-shadow: 0 0 20px rgba(76, 175, 80, 0.3);
            display: block;
            margin: 0 auto;
        }
        
        .controles {
            display: flex;
            gap: 15px;
            justify-content: center;
            flex-wrap: wrap;
            margin-top: 20px;
        }
        
        .boton {
            background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
            color: white;
            border: none;
            padding: 12px 25px;
            border-radius: 5px;
            cursor: pointer;
            font-family: 'Courier New', monospace;
            font-weight: bold;
            transition: all 0.3s ease;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        }
        
        .boton:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }
        
        .seccion-info {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        
        .info-juego, .controles-info, .ranking {
            background-color: #16213e;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }
        
        .titulo-seccion {
            color: #4CAF50;
            margin-bottom: 15px;
            font-size: 1.3em;
            border-bottom: 2px solid #4CAF50;
            padding-bottom: 5px;
        }
        
        .cuadricula-info {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
        }
        
        .item-info {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #0f3460;
        }
        
        .etiqueta-info {
            font-weight: bold;
            color: #4CAF50;
        }
        
        .valor-info {
            color: #e6e6e6;
        }
        
        .leyenda {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            margin-top: 15px;
        }
        
        .item-leyenda {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .color-leyenda {
            width: 20px;
            height: 20px;
            border-radius: 3px;
        }
        
        .color-comida {
            background-color: #FF5722;
        }
        
        .color-trampa {
            background-color: #F44336;
        }
        
        .color-serpiente {
            background-color: #4CAF50;
        }
        
        .juego-terminado, .nivel-completado {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: rgba(22, 33, 62, 0.98);
            padding: 40px;
            border-radius: 15px;
            text-align: center;
            display: none;
            box-shadow: 0 0 30px rgba(0, 0, 0, 0.7);
            z-index: 1000;
            max-width: 90%;
            width: 400px;
        }
        
        .juego-terminado h2 {
            color: #ff4d4d;
            margin-bottom: 20px;
            font-size: 2em;
        }
        
        .nivel-completado h2 {
            color: #4CAF50;
            margin-bottom: 20px;
            font-size: 2em;
        }
        
        .estadisticas {
            margin: 20px 0;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        
        .item-estadistica {
            display: flex;
            justify-content: space-between;
            font-size: 1.1em;
        }
        
        #listaRanking {
            list-style-type: none;
            max-height: 300px;
            overflow-y: auto;
        }
        
        #listaRanking li {
            padding: 10px;
            border-bottom: 1px solid #0f3460;
            display: flex;
            justify-content: space-between;
        }
        
        .encabezado-ranking {
            font-weight: bold;
            color: #4CAF50;
            border-bottom: 2px solid #4CAF50;
        }
        
        .puntuacion-ranking {
            color: #4CAF50;
            font-weight: bold;
        }
        
        .pie-pagina {
            text-align: center;
            margin-top: 30px;
            padding: 20px;
            background: linear-gradient(135deg, #16213e 0%, #0f3460 100%);
            border-radius: 10px;
            color: #cccccc;
        }
        
        /* Scrollbar personalizado */
        ::-webkit-scrollbar {
            width: 8px;
        }
        
        ::-webkit-scrollbar-track {
            background: #0f3460;
            border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
            background: #4CAF50;
            border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
            background: #45a049;
        }
    </style>
</head>
<body>
    <div class="contenedor">
        <header class="encabezado">
            <h1>SNAKE GAME</h1>
            <p class="subtitulo">Estructuras de Datos - Araujo Pérez 202</p>
        </header>
        
        <div class="contenido-principal">
            <div class="seccion-juego">
                <div class="contenedor-juego">
                    <canvas id="lienzoJuego" width="400" height="400"></canvas>
                </div>
                
                <div class="controles">
                    <button id="botonIniciar" class="boton">Iniciar Juego</button>
                    <button id="botonPausa" class="boton">Pausar</button>
                    <button id="botonReiniciar" class="boton">Reiniciar</button>
                    <button id="botonRanking" class="boton">Ver Ranking</button>
                </div>
            </div>
            
            <div class="seccion-info">
                <div class="info-juego">
                    <h3 class="titulo-seccion">Información del Juego</h3>
                    <div class="cuadricula-info">
                        <div class="item-info">
                            <span class="etiqueta-info">Puntuación:</span>
                            <span id="puntuacion" class="valor-info">0</span>
                        </div>
                        <div class="item-info">
                            <span class="etiqueta-info">Nivel:</span>
                            <span id="nivel" class="valor-info">1</span>
                        </div>
                        <div class="item-info">
                            <span class="etiqueta-info">Tamaño:</span>
                            <span id="tamaño" class="valor-info">5</span>
                        </div>
                        <div class="item-info">
                            <span class="etiqueta-info">Velocidad:</span>
                            <span id="velocidad" class="valor-info">1x</span>
                        </div>
                        <div class="item-info">
                            <span class="etiqueta-info">Comidas:</span>
                            <span id="contadorComidas" class="valor-info">0</span>
                        </div>
                        <div class="item-info">
                            <span class="etiqueta-info">Trampas:</span>
                            <span id="contadorTrampas" class="valor-info">0</span>
                        </div>
                        <div class="item-info">
                            <span class="etiqueta-info">Próximo Nivel:</span>
                            <span id="proximoNivel" class="valor-info">15</span>
                        </div>
                        <div class="item-info">
                            <span class="etiqueta-info">Trampas Activas:</span>
                            <span id="trampasActivas" class="valor-info">0</span>
                        </div>
                    </div>
                </div>
                
                <div class="controles-info">
                    <h3 class="titulo-seccion">Controles</h3>
                    <div class="cuadricula-info">
                        <div class="item-info">
                            <span class="etiqueta-info">W / ↑</span>
                            <span class="valor-info">Arriba</span>
                        </div>
                        <div class="item-info">
                            <span class="etiqueta-info">A / ←</span>
                            <span class="valor-info">Izquierda</span>
                        </div>
                        <div class="item-info">
                            <span class="etiqueta-info">S / ↓</span>
                            <span class="valor-info">Abajo</span>
                        </div>
                        <div class="item-info">
                            <span class="etiqueta-info">D / →</span>
                            <span class="valor-info">Derecha</span>
                        </div>
                    </div>
                    
                    <div class="leyenda">
                        <div class="item-leyenda">
                            <div class="color-leyenda color-serpiente"></div>
                            <span>Serpiente</span>
                        </div>
                        <div class="item-leyenda">
                            <div class="color-leyenda color-comida"></div>
                            <span>Comida</span>
                        </div>
                        <div class="item-leyenda">
                            <div class="color-leyenda color-trampa"></div>
                            <span>Trampa</span>
                        </div>
                    </div>
                </div>
                
                <div class="ranking" id="contenedorRanking">
                    <h3 class="titulo-seccion">Mejores Puntuaciones</h3>
                    <ul id="listaRanking">
                        <li class="encabezado-ranking">
                            <span>Posición</span>
                            <span>Puntuación</span>
                            <span>Nivel</span>
                        </li>
                        <!-- Las puntuaciones se cargarán aquí -->
                    </ul>
                    <div class="controles" style="margin-top: 15px;">
                        <button id="botonCerrarRanking" class="boton">Cerrar Ranking</button>
                    </div>
                </div>
            </div>
        </div>
        
        <footer class="pie-pagina">
            <p>Snake Game - Estructuras de Datos | Desarrollado con Listas Enlazadas</p>
        </footer>
    </div>
    
    <div class="juego-terminado" id="juegoTerminado">
        <h2>¡Juego Terminado!</h2>
        <div class="estadisticas">
            <div class="item-estadistica">
                <span>Puntuación Final:</span>
                <span id="puntuacionFinal">0</span>
            </div>
            <div class="item-estadistica">
                <span>Nivel Alcanzado:</span>
                <span id="nivelFinal">1</span>
            </div>
            <div class="item-estadistica">
                <span>Tamaño Máximo:</span>
                <span id="tamañoFinal">5</span>
            </div>
        </div>
        <button id="botonReiniciarJuego" class="boton">Jugar de Nuevo</button>
    </div>
    
    <div class="nivel-completado" id="nivelCompletado">
        <h2>¡Nivel Completado!</h2>
        <div class="estadisticas">
            <div class="item-estadistica">
                <span>Nuevo Nivel:</span>
                <span id="nuevoNivel">2</span>
            </div>
            <div class="item-estadistica">
                <span>Velocidad:</span>
                <span id="nuevaVelocidad">1.5x</span>
            </div>
            <div class="item-estadistica">
                <span>Trampas Máximas:</span>
                <span id="nuevasTrampasMax">3</span>
            </div>
        </div>
        <button id="botonContinuar" class="boton">Continuar</button>
    </div>

    <script>
        // Implementación de Lista Enlazada
        class Nodo {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.siguiente = null;
            }
        }

        class ListaEnlazada {
            constructor() {
                this.cabeza = null;
                this.cola = null;
                this.longitud = 0;
            }

            agregarAlFinal(x, y) {
                const nuevoNodo = new Nodo(x, y);
                if (!this.cabeza) {
                    this.cabeza = nuevoNodo;
                    this.cola = nuevoNodo;
                } else {
                    this.cola.siguiente = nuevoNodo;
                    this.cola = nuevoNodo;
                }
                this.longitud++;
            }

            agregarAlInicio(x, y) {
                const nuevoNodo = new Nodo(x, y);
                if (!this.cabeza) {
                    this.cabeza = nuevoNodo;
                    this.cola = nuevoNodo;
                } else {
                    nuevoNodo.siguiente = this.cabeza;
                    this.cabeza = nuevoNodo;
                }
                this.longitud++;
            }

            eliminarUltimo() {
                if (!this.cabeza) return null;
                
                let actual = this.cabeza;
                let nuevaCola = actual;
                
                while (actual.siguiente) {
                    nuevaCola = actual;
                    actual = actual.siguiente;
                }
                
                this.cola = nuevaCola;
                this.cola.siguiente = null;
                this.longitud--;
                
                if (this.longitud === 0) {
                    this.cabeza = null;
                    this.cola = null;
                }
                
                return actual;
            }

            contiene(x, y) {
                let actual = this.cabeza;
                while (actual) {
                    if (actual.x === x && actual.y === y) {
                        return true;
                    }
                    actual = actual.siguiente;
                }
                return false;
            }

            aArray() {
                const resultado = [];
                let actual = this.cabeza;
                while (actual) {
                    resultado.push({x: actual.x, y: actual.y});
                    actual = actual.siguiente;
                }
                return resultado;
            }
        }

        // Clase principal del juego
        class JuegoSnake {
            constructor() {
                this.lienzo = document.getElementById('lienzoJuego');
                this.ctx = this.lienzo.getContext('2d');
                this.tamañoCuadricula = 20;
                this.serpiente = new ListaEnlazada();
                this.direccion = { x: 1, y: 0 };
                this.siguienteDireccion = { x: 1, y: 0 };
                this.comida = { x: 0, y: 0 };
                this.trampas = [];
                this.puntuacion = 0;
                this.nivel = 1;
                this.velocidadJuego = 150;
                this.velocidadBase = 150;
                this.bucleJuego = null;
                this.estaPausado = false;
                this.juegoTerminado = false;
                this.contadorComidas = 0;
                this.contadorTrampas = 0;
                this.trampasMaximas = 3;
                
                this.inicializarSerpiente();
                this.generarComida();
                this.configurarEventos();
                this.actualizarInterfaz();
            }

            inicializarSerpiente() {
                this.serpiente = new ListaEnlazada();
                const inicioX = Math.floor(this.lienzo.width / this.tamañoCuadricula / 2);
                const inicioY = Math.floor(this.lienzo.height / this.tamañoCuadricula / 2);
                
                for (let i = 0; i < 5; i++) {
                    this.serpiente.agregarAlFinal(inicioX - i, inicioY);
                }
            }

            configurarEventos() {
                document.addEventListener('keydown', (e) => {
                    if (this.estaPausado || this.juegoTerminado) return;
                    
                    switch(e.key.toLowerCase()) {
                        case 'w':
                        case 'arrowup':
                            if (this.direccion.y === 0) this.siguienteDireccion = { x: 0, y: -1 };
                            break;
                        case 's':
                        case 'arrowdown':
                            if (this.direccion.y === 0) this.siguienteDireccion = { x: 0, y: 1 };
                            break;
                        case 'a':
                        case 'arrowleft':
                            if (this.direccion.x === 0) this.siguienteDireccion = { x: -1, y: 0 };
                            break;
                        case 'd':
                        case 'arrowright':
                            if (this.direccion.x === 0) this.siguienteDireccion = { x: 1, y: 0 };
                            break;
                    }
                });

                document.getElementById('botonIniciar').addEventListener('click', () => {
                    this.iniciarJuego();
                });

                document.getElementById('botonPausa').addEventListener('click', () => {
                    this.alternarPausa();
                });

                document.getElementById('botonReiniciar').addEventListener('click', () => {
                    this.reiniciarJuego();
                });

                document.getElementById('botonRanking').addEventListener('click', () => {
                    this.mostrarRanking();
                });

                document.getElementById('botonCerrarRanking').addEventListener('click', () => {
                    document.getElementById('contenedorRanking').style.display = 'none';
                });

                document.getElementById('botonContinuar').addEventListener('click', () => {
                    document.getElementById('nivelCompletado').style.display = 'none';
                    this.iniciarJuego();
                });

                document.getElementById('botonReiniciarJuego').addEventListener('click', () => {
                    this.reiniciarJuego();
                });
            }

            iniciarJuego() {
                if (this.bucleJuego) {
                    clearInterval(this.bucleJuego);
                }
                
                this.juegoTerminado = false;
                document.getElementById('juegoTerminado').style.display = 'none';
                document.getElementById('nivelCompletado').style.display = 'none';
                this.bucleJuego = setInterval(() => this.actualizar(), this.velocidadJuego);
            }

            alternarPausa() {
                this.estaPausado = !this.estaPausado;
                document.getElementById('botonPausa').textContent = this.estaPausado ? 'Reanudar' : 'Pausar';
            }

            actualizar() {
                if (this.estaPausado || this.juegoTerminado) return;
                
                this.direccion = { ...this.siguienteDireccion };
                
                const cabeza = this.serpiente.cabeza;
                const nuevoX = cabeza.x + this.direccion.x;
                const nuevoY = cabeza.y + this.direccion.y;
                
                if (nuevoX < 0 || nuevoX >= this.lienzo.width / this.tamañoCuadricula || 
                    nuevoY < 0 || nuevoY >= this.lienzo.height / this.tamañoCuadricula) {
                    this.terminarJuego();
                    return;
                }
                
                if (this.serpiente.contiene(nuevoX, nuevoY)) {
                    this.terminarJuego();
                    return;
                }
                
                this.serpiente.agregarAlInicio(nuevoX, nuevoY);
                
                if (nuevoX === this.comida.x && nuevoY === this.comida.y) {
                    this.puntuacion += 10 * this.nivel;
                    this.contadorComidas++;
                    this.generarTrampa();
                    
                    if (this.serpiente.longitud >= 15) {
                        this.subirNivel();
                    } else {
                        this.generarComida();
                    }
                } 
                else if (this.estaEnTrampa(nuevoX, nuevoY)) {
                    this.serpiente.eliminarUltimo();
                    this.eliminarTrampa(nuevoX, nuevoY);
                    this.contadorTrampas++;
                    
                    if (this.serpiente.longitud === 0) {
                        this.terminarJuego();
                        return;
                    }
                    
                    this.generarComida();
                } 
                else {
                    this.serpiente.eliminarUltimo();
                }
                
                this.dibujar();
                this.actualizarInterfaz();
            }

            estaEnTrampa(x, y) {
                return this.trampas.some(trampa => trampa.x === x && trampa.y === y);
            }

            eliminarTrampa(x, y) {
                this.trampas = this.trampas.filter(trampa => !(trampa.x === x && trampa.y === y));
            }

            dibujar() {
                this.ctx.fillStyle = '#0f3460';
                this.ctx.fillRect(0, 0, this.lienzo.width, this.lienzo.height);
                
                let actual = this.serpiente.cabeza;
                let esCabeza = true;
                
                while (actual) {
                    this.ctx.fillStyle = esCabeza ? '#4CAF50' : '#45a049';
                    this.ctx.fillRect(
                        actual.x * this.tamañoCuadricula, 
                        actual.y * this.tamañoCuadricula, 
                        this.tamañoCuadricula - 1, 
                        this.tamañoCuadricula - 1
                    );
                    
                    if (esCabeza) {
                        this.ctx.fillStyle = '#000';
                        const tamañoOjo = 3;
                        
                        if (this.direccion.x === 1) {
                            this.ctx.fillRect(
                                actual.x * this.tamañoCuadricula + this.tamañoCuadricula - 5, 
                                actual.y * this.tamañoCuadricula + 5, 
                                tamañoOjo, tamañoOjo
                            );
                            this.ctx.fillRect(
                                actual.x * this.tamañoCuadricula + this.tamañoCuadricula - 5, 
                                actual.y * this.tamañoCuadricula + this.tamañoCuadricula - 8, 
                                tamañoOjo, tamañoOjo
                            );
                        } else if (this.direccion.x === -1) {
                            this.ctx.fillRect(
                                actual.x * this.tamañoCuadricula + 2, 
                                actual.y * this.tamañoCuadricula + 5, 
                                tamañoOjo, tamañoOjo
                            );
                            this.ctx.fillRect(
                                actual.x * this.tamañoCuadricula + 2, 
                                actual.y * this.tamañoCuadricula + this.tamañoCuadricula - 8, 
                                tamañoOjo, tamañoOjo
                            );
                        } else if (this.direccion.y === 1) {
                            this.ctx.fillRect(
                                actual.x * this.tamañoCuadricula + 5, 
                                actual.y * this.tamañoCuadricula + this.tamañoCuadricula - 5, 
                                tamañoOjo, tamañoOjo
                            );
                            this.ctx.fillRect(
                                actual.x * this.tamañoCuadricula + this.tamañoCuadricula - 8, 
                                actual.y * this.tamañoCuadricula + this.tamañoCuadricula - 5, 
                                tamañoOjo, tamañoOjo
                            );
                        } else if (this.direccion.y === -1) {
                            this.ctx.fillRect(
                                actual.x * this.tamañoCuadricula + 5, 
                                actual.y * this.tamañoCuadricula + 2, 
                                tamañoOjo, tamañoOjo
                            );
                            this.ctx.fillRect(
                                actual.x * this.tamañoCuadricula + this.tamañoCuadricula - 8, 
                                actual.y * this.tamañoCuadricula + 2, 
                                tamañoOjo, tamañoOjo
                            );
                        }
                    }
                    
                    actual = actual.siguiente;
                    esCabeza = false;
                }
                
                this.ctx.fillStyle = '#FF5722';
                this.ctx.fillRect(
                    this.comida.x * this.tamañoCuadricula, 
                    this.comida.y * this.tamañoCuadricula, 
                    this.tamañoCuadricula - 1, 
                    this.tamañoCuadricula - 1
                );
                
                this.trampas.forEach(trampa => {
                    this.ctx.fillStyle = '#F44336';
                    this.ctx.fillRect(
                        trampa.x * this.tamañoCuadricula, 
                        trampa.y * this.tamañoCuadricula, 
                        this.tamañoCuadricula - 1, 
                        this.tamañoCuadricula - 1
                    );
                    
                    this.ctx.strokeStyle = '#FFF';
                    this.ctx.lineWidth = 2;
                    this.ctx.beginPath();
                    this.ctx.moveTo(
                        trampa.x * this.tamañoCuadricula + 3, 
                        trampa.y * this.tamañoCuadricula + 3
                    );
                    this.ctx.lineTo(
                        trampa.x * this.tamañoCuadricula + this.tamañoCuadricula - 3, 
                        trampa.y * this.tamañoCuadricula + this.tamañoCuadricula - 3
                    );
                    this.ctx.stroke();
                    
                    this.ctx.beginPath();
                    this.ctx.moveTo(
                        trampa.x * this.tamañoCuadricula + this.tamañoCuadricula - 3, 
                        trampa.y * this.tamañoCuadricula + 3
                    );
                    this.ctx.lineTo(
                        trampa.x * this.tamañoCuadricula + 3, 
                        trampa.y * this.tamañoCuadricula + this.tamañoCuadricula - 3
                    );
                    this.ctx.stroke();
                });
            }

            generarComida() {
                let nuevaComida;
                do {
                    nuevaComida = {
                        x: Math.floor(Math.random() * (this.lienzo.width / this.tamañoCuadricula)),
                        y: Math.floor(Math.random() * (this.lienzo.height / this.tamañoCuadricula))
                    };
                } while (this.serpiente.contiene(nuevaComida.x, nuevaComida.y) || 
                        this.estaEnTrampa(nuevaComida.x, nuevaComida.y));
                
                this.comida = nuevaComida;
            }

            generarTrampa() {
                if (this.trampas.length >= this.trampasMaximas) {
                    return;
                }
                
                let nuevaTrampa;
                let intentos = 0;
                const intentosMaximos = 50;
                
                do {
                    nuevaTrampa = {
                        x: Math.floor(Math.random() * (this.lienzo.width / this.tamañoCuadricula)),
                        y: Math.floor(Math.random() * (this.lienzo.height / this.tamañoCuadricula))
                    };
                    intentos++;
                } while ((this.serpiente.contiene(nuevaTrampa.x, nuevaTrampa.y) || 
                         this.estaEnTrampa(nuevaTrampa.x, nuevaTrampa.y) ||
                         (nuevaTrampa.x === this.comida.x && nuevaTrampa.y === this.comida.y)) && 
                         intentos < intentosMaximos);
                
                if (intentos < intentosMaximos) {
                    this.trampas.push(nuevaTrampa);
                }
            }

            subirNivel() {
                clearInterval(this.bucleJuego);
                
                document.getElementById('nuevoNivel').textContent = this.nivel + 1;
                document.getElementById('nuevaVelocidad').textContent = `${(this.velocidadBase / (this.velocidadJuego - 30)).toFixed(1)}x`;
                document.getElementById('nuevasTrampasMax').textContent = 3 + Math.floor((this.nivel + 1) / 2);
                document.getElementById('nivelCompletado').style.display = 'block';
                
                this.nivel++;
                this.velocidadJuego = Math.max(50, this.velocidadBase - (this.nivel - 1) * 30);
                this.trampasMaximas = 3 + Math.floor(this.nivel / 2);
                
                this.inicializarSerpiente();
                this.trampas = [];
                this.generarComida();
                
                this.direccion = { x: 1, y: 0 };
                this.siguienteDireccion = { x: 1, y: 0 };
            }

            terminarJuego() {
                this.juegoTerminado = true;
                clearInterval(this.bucleJuego);
                
                document.getElementById('puntuacionFinal').textContent = this.puntuacion;
                document.getElementById('nivelFinal').textContent = this.nivel;
                document.getElementById('tamañoFinal').textContent = this.serpiente.longitud;
                document.getElementById('juegoTerminado').style.display = 'block';
                
                this.guardarEnRanking();
            }

            reiniciarJuego() {
                this.puntuacion = 0;
                this.nivel = 1;
                this.velocidadJuego = 150;
                this.velocidadBase = 150;
                this.trampasMaximas = 3;
                this.contadorComidas = 0;
                this.contadorTrampas = 0;
                this.estaPausado = false;
                this.trampas = [];
                
                this.inicializarSerpiente();
                this.generarComida();
                
                this.direccion = { x: 1, y: 0 };
                this.siguienteDireccion = { x: 1, y: 0 };
                
                document.getElementById('botonPausa').textContent = 'Pausar';
                document.getElementById('juegoTerminado').style.display = 'none';
                document.getElementById('nivelCompletado').style.display = 'none';
                
                this.actualizarInterfaz();
                this.dibujar();
            }

            actualizarInterfaz() {
                document.getElementById('puntuacion').textContent = this.puntuacion;
                document.getElementById('nivel').textContent = this.nivel;
                document.getElementById('tamaño').textContent = this.serpiente.longitud;
                document.getElementById('velocidad').textContent = `${(this.velocidadBase / this.velocidadJuego).toFixed(1)}x`;
                document.getElementById('contadorComidas').textContent = this.contadorComidas;
                document.getElementById('contadorTrampas').textContent = this.contadorTrampas;
                document.getElementById('proximoNivel').textContent = 15 - this.serpiente.longitud;
                document.getElementById('trampasActivas').textContent = this.trampas.length;
            }

            guardarEnRanking() {
                const ranking = JSON.parse(localStorage.getItem('snakeRanking') || '[]');
                ranking.push({
                    score: this.puntuacion,
                    level: this.nivel,
                    date: new Date().toLocaleDateString()
                });
                
                ranking.sort((a, b) => b.score - a.score);
                
                if (ranking.length > 10) {
                    ranking.splice(10);
                }
                
                localStorage.setItem('snakeRanking', JSON.stringify(ranking));
            }

            mostrarRanking() {
                const ranking = JSON.parse(localStorage.getItem('snakeRanking') || '[]');
                const listaRanking = document.getElementById('listaRanking');
                
                while (listaRanking.children.length > 1) {
                    listaRanking.removeChild(listaRanking.lastChild);
                }
                
                if (ranking.length === 0) {
                    const li = document.createElement('li');
                    li.textContent = 'No hay puntuaciones guardadas';
                    li.style.textAlign = 'center';
                    li.style.padding = '20px';
                    listaRanking.appendChild(li);
                } else {
                    ranking.forEach((item, index) => {
                        const li = document.createElement('li');
                        li.innerHTML = `
                            <span>${index + 1}</span>
                            <span class="puntuacion-ranking">${item.score}</span>
                            <span>${item.level}</span>
                        `;
                        listaRanking.appendChild(li);
                    });
                }
                
                document.getElementById('contenedorRanking').style.display = 'block';
            }
        }

        // Inicializar el juego cuando se carga la página
        window.onload = function() {
            const juego = new JuegoSnake();
            juego.dibujar();
        };
    </script>
</body>
</html>
