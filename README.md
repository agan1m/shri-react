1) Добавить путь к репозиторию в package.json в start
2) npm start 

PS. Если Mac то удалить из package.json пакет git-bash-shell

npm rebuild
npm run start

## Модульные тесты

    npm test

## Запуск e2e тестов

Перед запуском тестов нужно установить и запустить selenium

Нужно инициализировать подмодули git с тестовыми репозиториями, 
они будут склонированы в директорию `./tests/testRepo`:

    git submodule init
    git submodule update  

или git clone https://github.com/agan1m/testRepo.git в tests

Еще нужно запустить само приложение, которое будем тестировать.
    npm run e2e
и в другом терминале
    hermione