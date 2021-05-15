function errorHandler(err) {
    
}

const handleUncaughtErrors = () => {
    process.on('unhandledRejection', errorHandler);
    process.on('uncaughtException', errorHandler);
}