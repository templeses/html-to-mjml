module.exports = {
    '*.{ts,tsx}': [() => 'npm run format', 'npm run test', 'git add .'],
};