const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// Built-in middleware to parse incoming JSON payloads
app.use(express.json());

// Health Check Endpoint
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'online',
        message: 'Container API is running successfully.',
        timestamp: new Date().toISOString()
    });
});

// Sample Data Endpoint
app.get('/api/v1/status', (req, res) => {
    res.status(200).json({
        environment: process.env.NODE_ENV || 'development',
        uptime: process.uptime(),
        features: ['json-parsing', 'health-check']
    });
});

// 404 Catch-All Middleware
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`==================================================`);
  console.log(`🚀 OC Compliant Node Server successfully started on port ${PORT}`);
  console.log(`🔗 Local URL: http://localhost:${PORT}`);
  console.log(`==================================================\n`);

  console.log(`💡 HOW TO USE THIS IMAGE:`);
  console.log(`--------------------------------------------------`);
  console.log(`   What you are seeing is a simple Express REST API that is a placeholder for your next Node application.`)
  console.log(`   Meaning, you need to use the 'https://github.com/joeckr/oc-node' repo as your template to build you own.`)
  console.log(`   I do plan to eventually have Application Skeletons that use this image, but for now use this as your basis.\n`)
});
