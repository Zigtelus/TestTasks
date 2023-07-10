#О ПРОЕКТЕ <br>
Данный проект СОЗДАЕТСЯ, как готовый шаблон, для работы на Реакте с классовыми компонентами

#ТЕХНОЛОГИИ <br>
React 16 <br>
React-dom 16 <br>
React-redux 5<br>
react-router-dom 6<br>
TypeScript <br>
Less <br>

#ЗАПУСК ПРОЕКТА через Docker <br>
создание образа <br>
docker build -t test-for-mtg . <br>

запуск на 8080 порту. <br>
docker run -p 8080:{{тут указывается номер порта из wbpack.config}} {{id_container}} <br>
docker run -p 8080:8091 test-for-mtg - пример

открываете ссылку:
http://localhost:8080/