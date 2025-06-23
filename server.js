// Mock of incoming Telegram webhook payload
const mockTelegramWebhook = {
  channel_post: {
    chat: {
      id: -1002484169182
    },
    text: "This is a test message from Telegram!"
  }
};

// Simulate server logic in browser
let output = '';

if (mockTelegramWebhook.channel_post &&
    mockTelegramWebhook.channel_post.chat.id ===-1002484169182 &&
    mockTelegramWebhook.channel_post.text) {
    
    const text = mockTelegramWebhook.channel_post.text;

    // Simulate writing to a "file" by saving to localStorage
    localStorage.setItem('channel_text', text);
}

// Simulate reading from the "file"
output = localStorage.getItem('channel_text');

// Show the result on the page
document.getElementById('output').textContent = output;
