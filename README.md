# File Activity Insights

Интерфейс для просмотра активности файлов с возможностью фильтрации и детального анализа.

## Особенности

- ✨ React проект на Vite
- 🎨 Кастомные CSS стили (без использования фреймворков)
- 🧩 Модульная архитектура с переиспользуемыми компонентами
- 🔄 Три состояния компонента: standard, hover, active
- 📋 Полноценное выпадающее меню с 9 пунктами
- 🎯 Кастомные SVG иконки для каждого пункта меню
- 🏷️ Бейдж "NEW" для новых функций
- 🔄 Анимированный поворот стрелки в активном состоянии
- 📦 Отдельный компонент MenuItem для переиспользования
- 📱 Адаптивный дизайн для мобильных устройств
- ♿ Поддержка доступности (ARIA атрибуты, навигация клавиатурой)
- 🖱️ Обработка кликов вне компонента для закрытия меню
- 🎯 Точное соответствие дизайну из Figma

## Структура проекта

```
src/
├── components/
│   ├── AdditionalMenu.jsx    # Основной компонент с выпадающим меню
│   ├── AdditionalMenu.css    # Стили основного компонента
│   ├── MenuItem.jsx          # Переиспользуемый компонент пункта меню
│   ├── MenuItem.css          # Стили пункта меню
│   └── MenuIcons.jsx         # SVG иконки для пунктов меню
├── App.jsx                   # Демонстрационная страница
└── index.css                 # Глобальные стили
```

## Установка и запуск

1. Установите зависимости:

   ```bash
   npm install
   ```

2. Запустите сервер разработки:

   ```bash
   npm run dev
   ```

3. Откройте браузер по адресу: http://localhost:5173

## Компоненты

### AdditionalMenu

Основной компонент пользовательского меню с выпадающим списком.

#### Пропсы

- `state` - состояние компонента ("standard" | "hover" | "active")
- `userName` - имя пользователя (по умолчанию: "Alexey Dubnyak")
- `userPlan` - план пользователя (по умолчанию: "Flex Cloud Annual")
- `onStateChange` - колбэк для отслеживания изменений состояния
- `onMenuItemClick` - колбэк для обработки кликов по пунктам меню

#### Пример использования

```jsx
import AdditionalMenu from "./components/AdditionalMenu";

function App() {
  const handleStateChange = (newState) => {
    console.log("Новое состояние:", newState);
  };

  const handleMenuItemClick = (item) => {
    console.log("Выбран пункт меню:", item.label);
  };

  return (
    <AdditionalMenu
      userName="Иван Иванов"
      userPlan="Премиум план"
      onStateChange={handleStateChange}
      onMenuItemClick={handleMenuItemClick}
    />
  );
}
```

### MenuItem

Переиспользуемый компонент для отдельного пункта меню. Создан на основе дизайна элемента меню из Figma.

#### Пропсы

- `icon` - компонент иконки (React компонент)
- `label` - текст пункта меню
- `badge` - опциональный бейдж (например, "NEW")
- `onClick` - обработчик клика
- `className` - дополнительные CSS классы
- `...props` - остальные HTML атрибуты

#### Пример использования

```jsx
import MenuItem from "./components/MenuItem";
import { StorageIcon } from "./components/MenuIcons";

function MyMenu() {
  return (
    <div>
      <MenuItem
        icon={StorageIcon}
        label="Storage"
        onClick={() => console.log("Storage clicked")}
      />
      <MenuItem
        icon={DrawingsIcon}
        label="Drawings Automation"
        badge="NEW"
        onClick={() => console.log("Drawings clicked")}
      />
    </div>
  );
}
```

## Состояния компонента

- **Standard** - базовое состояние с прозрачным фоном
- **Hover** - состояние при наведении с темно-серым фоном (#333538)
- **Active** - активное состояние с темно-серым фоном и открытым выпадающим меню, белый текст, повернутая стрелка

## Пункты меню

Выпадающее меню содержит следующие пункты:

1. **Storage** - управление хранилищем данных
2. **My Files** - личные файлы пользователя
3. **Drawings Automation** 🆕 - автоматизация чертежей (с бейджем NEW)
4. **Resources** - доступные ресурсы
5. **My Profile** - настройки профиля пользователя
6. **Users** - управление пользователями
7. **My company** - настройки компании
8. **WebGL Test** - тестирование WebGL функций
9. **Logout** - выход из системы

## Технологии

- React 18
- Vite
- CSS3 (кастомные стили)
- Google Fonts (Open Sans, Roboto)
- Кастомные SVG иконки
- CSS анимации и переходы

## Команды

- `npm run dev` - запуск сервера разработки
- `npm run build` - сборка для продакшена
- `npm run build:s3` - сборка для деплоя в S3
- `npm run preview` - предварительный просмотр собранного проекта
- `npm run deploy` - деплой на AWS S3
- `npm run deploy:aws` - простой деплой (билд + загрузка в S3)

## Деплой

Проект настроен для автоматического деплоя на AWS S3.

### Быстрый старт

```bash
# Настройка деплоя (один раз)
./setup-deploy.sh

# Деплой проекта
./deploy.sh
```

### Требования для деплоя

- AWS CLI установлен и настроен
- Доступ к S3 bucket `graebert-dev-projects`

### Автоматический деплой

Проект включает GitHub Actions для автоматического деплоя при push в main ветку.

Для настройки добавьте секреты в GitHub:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`

### Доступ к сайту

После деплоя сайт доступен по адресу:

```
https://projects.dev.graebert.com/file-activity-insights/
```

Подробные инструкции см. в [DEPLOYMENT.md](DEPLOYMENT.md)
