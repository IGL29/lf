# Lover Flower (Интернет-магазин цветов).

## Развертывание проекта

### Либо запустить контейнер с помощью Docker

Выполнить в корне проекта команду:
`docker-compose up`

### Либо с помощью node, npm
([Версии npm, node](./package.json) - секция `engines`).

Run `npm i`.

## Запуск dev сборки с SSR на локальном сервере

Run `npm run dev` for a dev server. Navigate to `http://localhost:4200/`.

## Сборка проекта в production

Run `npm run build:ssr` to build the project. The build artifacts will be stored in the `dist/` directory.

## Запуск локально сервера SSR с production сборкой из папки dist/

Run `npm run serve`. По дефолту будет запущен на <http://localhost:4000>.

## Запуск unit тестов и вывод информации о покрытии

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Запуск storybook на сервере для разработки

Run `npm run storybook`

## CLI

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
