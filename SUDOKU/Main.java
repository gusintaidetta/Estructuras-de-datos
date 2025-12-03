import java.util.*;
import java.io.*;

public class Main {
    private static final String USERS_FILE = "users.dat";
    private static final String SAVE_FILE = "game_save.dat";
    
    private User currentUser;
    private Scanner scanner;
    private GameState gameState;
    
    // Códigos de colores para los números (ahora públicos)
    public static final String RESET = "\u001B[0m";
    public static final String RED = "\u001B[31m";
    public static final String GREEN = "\u001B[32m";
    public static final String YELLOW = "\u001B[33m";
    public static final String BLUE = "\u001B[34m";
    public static final String PURPLE = "\u001B[35m";
    public static final String CYAN = "\u001B[36m";
    public static final String ORANGE = "\u001B[38;5;208m";
    public static final String PINK = "\u001B[38;5;205m";
    public static final String BROWN = "\u001B[38;5;130m";
    
    // Mapa de colores para cada número
    private static final String[] NUMBER_COLORS = {
        RED,      // 1 - Rojo
        BLUE,     // 2 - Azul
        GREEN,    // 3 - Verde
        YELLOW,   // 4 - Amarillo
        PURPLE,   // 5 - Morado
        CYAN,     // 6 - Cyan
        ORANGE,   // 7 - Naranja
        PINK,     // 8 - Rosa
        BROWN     // 9 - Marrón
    };
    
    public Main() {
        scanner = new Scanner(System.in);
        gameState = new GameState();
    }
    
    public static void main(String[] args) {
        Main game = new Main();
        game.start();
    }
    
    // Método para limpiar la pantalla
    private void clearScreen() {
        try {
            if (System.getProperty("os.name").contains("Windows")) {
                new ProcessBuilder("cmd", "/c", "cls").inheritIO().start().waitFor();
            } else {
                System.out.print("\033[H\033[2J");
                System.out.flush();
            }
        } catch (Exception e) {
            // Si falla el clear, imprimir líneas en blanco
            for (int i = 0; i < 50; i++) {
                System.out.println();
            }
        }
    }
    
    public void start() {
        clearScreen();
        System.out.println("=== SUDOKU ===");
        System.out.println("==============");
        
        while (true) {
            System.out.println("\n1. Iniciar juego");
            System.out.println("2. Estadisticas");
            System.out.println("3. Salir");
            System.out.print("Seleccione una opcion: ");
            
            int option = getIntInput();
            
            switch (option) {
                case 1:
                    login();
                    break;
                case 2:
                    showStatisticsMenu();
                    break;
                case 3:
                    System.out.println("¡Hasta pronto!");
                    return;
                default:
                    System.out.println("Opcion invalida");
            }
            
            if (currentUser != null) {
                showMainMenu();
            }
        }
    }
    
    private void login() {
        clearScreen();
        System.out.println("=== SUDOKU ===");
        System.out.println("==============");
        System.out.print("\nIngresa tu nombre de usuario: ");
        String username = scanner.nextLine().trim();
        
        if (username.isEmpty()) {
            System.out.println("El nombre de usuario no puede estar vacio");
            return;
        }
        
        User user = UserManager.login(username);
        if (user != null) {
            currentUser = user;
            System.out.println("¡Bienvenido " + username + "!");
            
            if (loadGame()) {
                System.out.println("Partida cargada automaticamente");
            }
        } else {
            System.out.println("Nuevo usuario registrado: " + username);
            UserManager.register(username);
            currentUser = UserManager.login(username);
        }
    }
    
    private void showStatisticsMenu() {
        clearScreen();
        System.out.println("=== SUDOKU ===");
        System.out.println("==============");
        System.out.print("\nIngresa el nombre de usuario para ver estadisticas: ");
        String username = scanner.nextLine().trim();
        
        User user = UserManager.getUser(username);
        if (user != null) {
            showUserStatistics(user);
        } else {
            System.out.println("Usuario no encontrado");
        }
        
        System.out.println("\nPresiona Enter para continuar...");
        scanner.nextLine();
    }
    
    private void showMainMenu() {
        while (currentUser != null) {
            clearScreen();
            System.out.println("=== SUDOKU ===");
            System.out.println("==============");
            System.out.println("\nUsuario: " + currentUser.getUsername());
            System.out.println("1. Nuevo juego");
            System.out.println("2. Continuar partida");
            System.out.println("3. Mis estadisticas");
            System.out.println("4. Cerrar sesion");
            System.out.print("Seleccione una opcion: ");
            
            int option = getIntInput();
            
            switch (option) {
                case 1:
                    startNewGame();
                    break;
                case 2:
                    if (gameState.isGameActive()) {
                        playGame();
                    } else {
                        System.out.println("No hay partida guardada");
                        System.out.println("Presiona Enter para continuar...");
                        scanner.nextLine();
                    }
                    break;
                case 3:
                    showUserStatistics(currentUser);
                    System.out.println("\nPresiona Enter para continuar...");
                    scanner.nextLine();
                    break;
                case 4:
                    saveGame();
                    currentUser = null;
                    System.out.println("Sesion cerrada");
                    break;
                default:
                    System.out.println("Opcion invalida");
            }
        }
    }
    
    private void startNewGame() {
        clearScreen();
        System.out.println("=== SUDOKU ===");
        System.out.println("==============");
        System.out.println("\nSELECCIONAR NIVEL");
        System.out.println("1. MF (Facil - 36-44 celdas vacias)");
        System.out.println("2. F  (Medio-Facil - 32-35 celdas vacias)");
        System.out.println("3. M  (Medio - 28-31 celdas vacias)");
        System.out.println("4. D  (Dificil - 24-27 celdas vacias)");
        System.out.println("5. MD (Muy Dificil - 17-23 celdas vacias)");
        System.out.print("Seleccione el nivel: ");
        
        int level = getIntInput();
        if (level >= 1 && level <= 5) {
            gameState.startNewGame(level);
            playGame();
        } else {
            System.out.println("Nivel invalido");
            System.out.println("Presiona Enter para continuar...");
            scanner.nextLine();
        }
    }
    
    private void playGame() {
        SudokuBoard board = gameState.getCurrentBoard();
        
        while (gameState.isGameActive() && gameState.getLives() > 0) {
            clearScreen();
            System.out.println("=== SUDOKU ===");
            System.out.println("==============");
            System.out.println("\nNivel: " + gameState.getCurrentLevelName());
            System.out.println("Vidas: " + gameState.getLives() + "/3");
            System.out.println("Tiempo: " + formatTime(gameState.getElapsedTime()));
            board.display();
            
            System.out.println("\n1. Ingresar numero");
            System.out.println("2. Eliminar numero");
            System.out.println("3. Verificar solucion");
            System.out.println("4. Guardar y salir");
            System.out.print("Seleccione una opcion: ");
            
            int option = getIntInput();
            
            switch (option) {
                case 1:
                    enterNumber(board);
                    break;
                case 2:
                    removeNumber(board);
                    break;
                case 3:
                    checkSolution();
                    break;
                case 4:
                    saveGame();
                    return;
                default:
                    System.out.println("Opcion invalida");
                    System.out.println("Presiona Enter para continuar...");
                    scanner.nextLine();
            }
            
            if (board.isComplete()) {
                levelCompleted();
                return;
            }
        }
        
        if (gameState.getLives() <= 0) {
            gameOver();
        }
    }
    
    private void enterNumber(SudokuBoard board) {
        // NO limpiar la pantalla aquí - mantener visible el tablero
        System.out.println("\nINGRESAR NUMERO");
        
        System.out.print("Fila (1-9): ");
        int row = getIntInput() - 1;
        System.out.print("Columna (1-9): ");
        int col = getIntInput() - 1;
        System.out.print("Numero (1-9): ");
        int number = getIntInput();
        
        if (row >= 0 && row < 9 && col >= 0 && col < 9 && number >= 1 && number <= 9) {
            if (board.isCellEditable(row, col)) {
                if (board.isValidMove(row, col, number)) {
                    board.setCell(row, col, number);
                    System.out.println("Numero colocado correctamente");
                } else {
                    System.out.println("Movimiento invalido! Pierdes una vida");
                    gameState.loseLife();
                }
            } else {
                System.out.println("Esta celda no es editable");
            }
        } else {
            System.out.println("Valores invalidos");
        }
        
        System.out.println("Presiona Enter para continuar...");
        scanner.nextLine();
        // Ahora sí limpiamos la pantalla después de completar el proceso
        clearScreen();
    }
    
    private void removeNumber(SudokuBoard board) {
        // NO limpiar la pantalla aquí - mantener visible el tablero
        System.out.println("\nELIMINAR NUMERO");
        
        System.out.print("Fila (1-9): ");
        int row = getIntInput() - 1;
        System.out.print("Columna (1-9): ");
        int col = getIntInput() - 1;
        
        if (row >= 0 && row < 9 && col >= 0 && col < 9) {
            if (board.isCellEditable(row, col)) {
                if (board.getCell(row, col) != 0) {
                    board.setCell(row, col, 0);
                    System.out.println("Numero eliminado correctamente");
                } else {
                    System.out.println("Esta celda ya esta vacia");
                }
            } else {
                System.out.println("No puedes eliminar numeros iniciales del tablero");
            }
        } else {
            System.out.println("Valores invalidos");
        }
        
        System.out.println("Presiona Enter para continuar...");
        scanner.nextLine();
        // Ahora sí limpiamos la pantalla después de completar el proceso
        clearScreen();
    }
    
    private void checkSolution() {
        SudokuBoard board = gameState.getCurrentBoard();
        if (board.isSolved()) {
            System.out.println("Sudoku resuelto correctamente!");
            board.revealSolution();
            levelCompleted();
        } else {
            System.out.println("La solucion tiene errores. Pierdes una vida");
            gameState.loseLife();
            System.out.println("Presiona Enter para continuar...");
            scanner.nextLine();
        }
    }
    
    private void levelCompleted() {
        long completionTime = gameState.getElapsedTime();
        
        clearScreen();
        System.out.println("=== SUDOKU ===");
        System.out.println("==============");
        System.out.println("\n*** NIVEL COMPLETADO ***");
        System.out.println("Tiempo: " + formatTime(completionTime));
        
        boolean perfectCompletion = gameState.getLives() == gameState.getInitialLives();
        
        if (perfectCompletion) {
            gameState.addBonusLife();
            System.out.println("Completaste sin perder vidas! Obtienes 1 vida extra");
            System.out.println("Vidas para el siguiente nivel: " + gameState.getInitialLives());
        }
        
        currentUser.addCompletedGame(gameState.getCurrentLevel(), completionTime, perfectCompletion);
        UserManager.saveUsers();
        
        if (gameState.getCurrentLevel() < 5) {
            System.out.println("¿Continuar al siguiente nivel? (s/n)");
            String response = scanner.nextLine().toLowerCase();
            if (response.equals("s")) {
                gameState.nextLevel();
            } else {
                gameState.endGame();
            }
        } else {
            System.out.println("¡Felicidades! Completaste todos los niveles");
            gameState.endGame();
        }
        
        System.out.println("Presiona Enter para continuar...");
        scanner.nextLine();
    }
    
    private void gameOver() {
        clearScreen();
        System.out.println("=== SUDOKU ===");
        System.out.println("==============");
        System.out.println("\n*** GAME OVER ***");
        System.out.println("Se te acabaron las vidas");
        gameState.endGame();
        System.out.println("Presiona Enter para continuar...");
        scanner.nextLine();
    }
    
    private void showUserStatistics(User user) {
        clearScreen();
        System.out.println("=== SUDOKU ===");
        System.out.println("==============");
        System.out.println("\nESTADISTICAS");
        System.out.println("Usuario: " + user.getUsername());
        System.out.println("Juegos completados: " + user.getCompletedGames().size());
        System.out.println("Mejores tiempos por nivel:");
        
        for (int level = 1; level <= 5; level++) {
            long bestTime = user.getBestTime(level);
            if (bestTime != Long.MAX_VALUE) {
                System.out.println("Nivel " + level + ": " + formatTime(bestTime));
            }
        }
        
        System.out.println("Niveles completados perfectamente: " + user.getPerfectCompletions());
    }
    
    private boolean loadGame() {
        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(SAVE_FILE))) {
            GameState savedState = (GameState) ois.readObject();
            if (savedState.getUsername().equals(currentUser.getUsername())) {
                this.gameState = savedState;
                return true;
            }
        } catch (Exception e) {
            // No hay partida guardada
        }
        return false;
    }
    
    private void saveGame() {
        if (gameState.isGameActive()) {
            try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(SAVE_FILE))) {
                gameState.setUsername(currentUser.getUsername());
                oos.writeObject(gameState);
                System.out.println("Partida guardada automaticamente");
            } catch (IOException e) {
                System.out.println("Error al guardar la partida");
            }
        }
    }
    
    private String formatTime(long milliseconds) {
        long seconds = milliseconds / 1000;
        long minutes = seconds / 60;
        seconds = seconds % 60;
        return String.format("%02d:%02d", minutes, seconds);
    }
    
    private int getIntInput() {
        while (true) {
            try {
                return Integer.parseInt(scanner.nextLine());
            } catch (NumberFormatException e) {
                System.out.print("Por favor ingrese un numero valido: ");
            }
        }
    }
    
    // Método para obtener el color de un número
    public static String getNumberColor(int number) {
        if (number >= 1 && number <= 9) {
            return NUMBER_COLORS[number - 1];
        }
        return RESET;
    }
}

// Clases auxiliares (se mantienen igual que antes)
class User implements Serializable {
    private String username;
    private List<GameStats> completedGames;
    
    public User(String username) {
        this.username = username;
        this.completedGames = new ArrayList<>();
    }
    
    public String getUsername() { return username; }
    public List<GameStats> getCompletedGames() { return completedGames; }
    
    public void addCompletedGame(int level, long time, boolean perfect) {
        completedGames.add(new GameStats(level, time, perfect));
    }
    
    public long getBestTime(int level) {
        long bestTime = Long.MAX_VALUE;
        for (GameStats stats : completedGames) {
            if (stats.getLevel() == level && stats.getTime() < bestTime) {
                bestTime = stats.getTime();
            }
        }
        return bestTime;
    }
    
    public int getPerfectCompletions() {
        int count = 0;
        for (GameStats stats : completedGames) {
            if (stats.isPerfect()) {
                count++;
            }
        }
        return count;
    }
}

class GameStats implements Serializable {
    private int level;
    private long time;
    private boolean perfect;
    
    public GameStats(int level, long time, boolean perfect) {
        this.level = level;
        this.time = time;
        this.perfect = perfect;
    }
    
    public int getLevel() { return level; }
    public long getTime() { return time; }
    public boolean isPerfect() { return perfect; }
}

class UserManager {
    private static final String USERS_FILE = "users.dat";
    private static Map<String, User> users = loadUsers();
    
    public static User login(String username) {
        return users.get(username);
    }
    
    public static User getUser(String username) {
        return users.get(username);
    }
    
    public static boolean register(String username) {
        if (users.containsKey(username)) {
            return false;
        }
        users.put(username, new User(username));
        saveUsers();
        return true;
    }
    
    @SuppressWarnings("unchecked")
    private static Map<String, User> loadUsers() {
        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(USERS_FILE))) {
            return (Map<String, User>) ois.readObject();
        } catch (Exception e) {
            return new HashMap<>();
        }
    }
    
    public static void saveUsers() {
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(USERS_FILE))) {
            oos.writeObject(users);
        } catch (IOException e) {
            System.out.println("Error al guardar usuarios");
        }
    }
}

class GameState implements Serializable {
    private String username;
    private SudokuBoard currentBoard;
    private int currentLevel;
    private int lives;
    private int initialLives;
    private long startTime;
    private boolean gameActive;
    
    public GameState() {
        this.gameActive = false;
    }
    
    public void startNewGame(int level) {
        this.currentLevel = level;
        this.initialLives = 3;
        this.lives = initialLives;
        this.currentBoard = new SudokuBoard(level);
        this.startTime = System.currentTimeMillis();
        this.gameActive = true;
    }
    
    public void nextLevel() {
        if (currentLevel < 5) {
            currentLevel++;
            lives = initialLives;
            currentBoard = new SudokuBoard(currentLevel);
            startTime = System.currentTimeMillis();
        }
    }
    
    public void loseLife() {
        lives--;
    }
    
    public void addBonusLife() {
        initialLives++;
    }
    
    public void endGame() {
        gameActive = false;
    }
    
    public SudokuBoard getCurrentBoard() { return currentBoard; }
    public int getCurrentLevel() { return currentLevel; }
    public int getLives() { return lives; }
    public int getInitialLives() { return initialLives; }
    public boolean isGameActive() { return gameActive; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    
    public long getElapsedTime() {
        return System.currentTimeMillis() - startTime;
    }
    
    public String getCurrentLevelName() {
        switch (currentLevel) {
            case 1: return "MF";
            case 2: return "F";
            case 3: return "M";
            case 4: return "D";
            case 5: return "MD";
            default: return "Unknown";
        }
    }
}

class SudokuBoard implements Serializable {
    private int[][] board;
    private int[][] solution;
    private boolean[][] editable;
    private int emptyCells;
    
    public SudokuBoard(int level) {
        board = new int[9][9];
        solution = new int[9][9];
        editable = new boolean[9][9];
        
        generateSudoku(level);
    }
    
    private void generateSudoku(int level) {
        generateSolution();
        
        for (int i = 0; i < 9; i++) {
            System.arraycopy(solution[i], 0, board[i], 0, 9);
        }
        
        int minEmpty, maxEmpty;
        switch (level) {
            case 1: minEmpty = 36; maxEmpty = 44; break;
            case 2: minEmpty = 32; maxEmpty = 35; break;
            case 3: minEmpty = 28; maxEmpty = 31; break;
            case 4: minEmpty = 24; maxEmpty = 27; break;
            case 5: minEmpty = 17; maxEmpty = 23; break;
            default: minEmpty = 36; maxEmpty = 44; break;
        }
        
        Random random = new Random();
        emptyCells = random.nextInt(maxEmpty - minEmpty + 1) + minEmpty;
        
        removeNumbers(emptyCells);
        
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                editable[i][j] = board[i][j] == 0;
            }
        }
    }
    
    private void generateSolution() {
        solve(0, 0);
        for (int i = 0; i < 9; i++) {
            System.arraycopy(board[i], 0, solution[i], 0, 9);
        }
    }
    
    private boolean solve(int row, int col) {
        if (row == 9) return true;
        if (col == 9) return solve(row + 1, 0);
        if (board[row][col] != 0) return solve(row, col + 1);
        
        List<Integer> numbers = new ArrayList<>(Arrays.asList(1,2,3,4,5,6,7,8,9));
        Collections.shuffle(numbers);
        
        for (int num : numbers) {
            if (isValidMove(row, col, num)) {
                board[row][col] = num;
                if (solve(row, col + 1)) return true;
                board[row][col] = 0;
            }
        }
        return false;
    }
    
    private void removeNumbers(int count) {
        Random random = new Random();
        while (count > 0) {
            int row = random.nextInt(9);
            int col = random.nextInt(9);
            if (board[row][col] != 0) {
                board[row][col] = 0;
                count--;
            }
        }
    }
    
    public boolean isValidMove(int row, int col, int number) {
        for (int i = 0; i < 9; i++) {
            if (board[row][i] == number && i != col) return false;
        }
        
        for (int i = 0; i < 9; i++) {
            if (board[i][col] == number && i != row) return false;
        }
        
        int boxRow = row - row % 3;
        int boxCol = col - col % 3;
        for (int i = boxRow; i < boxRow + 3; i++) {
            for (int j = boxCol; j < boxCol + 3; j++) {
                if (board[i][j] == number && i != row && j != col) return false;
            }
        }
        
        return true;
    }
    
    public boolean isSolved() {
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                if (board[i][j] != solution[i][j]) {
                    return false;
                }
            }
        }
        return true;
    }
    
    public boolean isComplete() {
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                if (board[i][j] == 0) {
                    return false;
                }
            }
        }
        return true;
    }
    
    public void setCell(int row, int col, int number) {
        if (editable[row][col]) {
            board[row][col] = number;
        }
    }
    
    public int getCell(int row, int col) {
        return board[row][col];
    }
    
    public boolean isCellEditable(int row, int col) {
        return editable[row][col];
    }
    
    public void display() {
        System.out.println("\n  1 2 3   4 5 6   7 8 9");
        System.out.println("  ---------------------");
        
        for (int i = 0; i < 9; i++) {
            System.out.print((i + 1) + "|");
            for (int j = 0; j < 9; j++) {
                if (board[i][j] == 0) {
                    System.out.print(". ");
                } else {
                    String color = Main.getNumberColor(board[i][j]);
                    System.out.print(color + board[i][j] + Main.RESET + " ");
                }
                
                if (j == 2 || j == 5) {
                    System.out.print("| ");
                }
            }
            System.out.println();
            
            if (i == 2 || i == 5) {
                System.out.println(" |------+-------+------|");
            }
        }
    }
    
    public void revealSolution() {
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                board[i][j] = solution[i][j];
            }
        }
        display();
    }
}