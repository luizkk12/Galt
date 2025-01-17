const { readdirSync } = require('node:fs');
const { join } = require('node:path');

module.exports = async (client) => {
  const eventsPath = join(__dirname, 'events');
  const eventsFile = readdirSync(eventsPath).filter(e => e.endsWith('.js'));
  
  for (const file of eventsFile) {
    const files = join(eventsPath, file);
    const event = require(files);
    
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  }
}