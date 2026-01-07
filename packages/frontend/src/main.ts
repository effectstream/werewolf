import './style.css';
import { GameManager } from './GameManager';
import { UIManager } from './UIManager';

/**
 * Main entry point for the Werewolf game frontend
 */

class App {
  private gameManager: GameManager;
  private uiManager: UIManager;

  constructor() {
    console.log('Initializing Werewolf Game...');

    // Initialize managers
    this.gameManager = new GameManager();
    this.uiManager = new UIManager(this.gameManager);

    // Start the application
    this.init();
  }

  private async init() {
    try {
      // Initialize game canvas
      await this.gameManager.init();

      // Show main menu after loading
      setTimeout(() => {
        this.uiManager.showScreen('main-menu');
      }, 1000);

      console.log('Werewolf Game initialized successfully');
    } catch (error) {
      console.error('Failed to initialize game:', error);
    }
  }
}

// Start the application when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new App());
} else {
  new App();
}
