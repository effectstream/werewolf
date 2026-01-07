import { GameManager } from './GameManager';

/**
 * UIManager - Handles UI state transitions and user interactions
 */

export class UIManager {
  private currentScreen: string = 'loading-screen';
  private gameManager: GameManager;

  constructor(gameManager: GameManager) {
    this.gameManager = gameManager;
    this.setupEventListeners();
  }

  private setupEventListeners() {
    // Start game button
    const startGameBtn = document.getElementById('start-game-btn');
    if (startGameBtn) {
      startGameBtn.addEventListener('click', () => {
        this.showScreen('game-screen');
      });
    }

    // Connect wallet button
    const connectWalletBtn = document.getElementById('connect-wallet-btn');
    if (connectWalletBtn) {
      connectWalletBtn.addEventListener('click', () => {
        this.connectWallet();
      });
    }
  }

  showScreen(screenId: string) {
    // Hide current screen
    const currentElement = document.getElementById(this.currentScreen);
    if (currentElement) {
      currentElement.classList.remove('active');
    }

    // Show new screen
    const newElement = document.getElementById(screenId);
    if (newElement) {
      newElement.classList.add('active');
      this.currentScreen = screenId;
    }

    console.log(`Switched to screen: ${screenId}`);
  }

  private async connectWallet() {
    console.log('Connect wallet clicked - wallet integration not yet implemented');

    // Update wallet info display
    const walletInfo = document.getElementById('wallet-info');
    if (walletInfo) {
      walletInfo.textContent = 'Wallet: Not connected';
    }

    // TODO: Implement wallet connection using Paima/Effectstream wallet
  }
}
