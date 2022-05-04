<p align="center">
    <h1 align="center">Fooxly 🔍 Spotlight</h1>
</p>

<br/>

```json
"@fooxly/spotlight": "https://github.com/Fooxly/Spotlight"
```

<br/>

# 🔍 About Spotlight

`Spotlight` provides a powerful tool to greatly improve your development experience with a fully customizable search engine. With this tool you can access development resources right from your browser.

A package by [Fooxly](https://www.fooxly.com).

## 📕 Features

* Fully expandable
* Search for pages on your website
* Build custom commands for a better dev experience
* Run local scripts and commands right from your browser
* Usable modal for simple questions

## 🔧&nbsp; How to setup

Settings up Spotlight is quite easy and straightforward. After setting up the tool, you have the power to customize it to your needs.

1. Install the package by adding the following line to your package.json dependencies and running npm or yarn install afterwards.

```json
"@fooxly/spotlight": "https://github.com/Fooxly/Spotlight"
```

2. Add the Spotlight component to your project.

```js
<Spotlight />
```
> Note: We recommend that you only render this component on a dev environment.

3. Customize the Spotlight to your liking. We support the following properties.

- `isDarkMode`: Set to `true` to enable dark mode.
- `showRecentlyUsed`: Amount of items which should be remembered and showed in the recently used section.
- `showTips`: Set to `false` to disable tips.

4. Create custom commands for your project.

```js
import Spotlight from '@fooxly/spotlight';

Spotlight.RegisterJumpTo('My Page', '/my-page');
Spotlight.RegisterCommand('Say Hello', () => console.log('hello world'));
```

5. Enjoy.

## 🤔&nbsp; Asking questions

Whilst having a powerful spotlight at the tips of your hands. We also provide an easy way to ask questions. With the following command you can open the Spotlight UI with a specific question to be answered.

```js
import Spotlight from '@fooxly/spotlight';

Spotlight.question('What is your name?');
Spotlight.question('What is your favorite animal?', ['Dog', 'Cat', 'Fish']);
```

When adding custom answers to the question you can use the same syntax as in the `RegisterCommand` method. So there is support for single strings or an object with an `title`, `keywords` and `icon`.

## 🪄&nbsp; Customization

While customizing the spotlight itself is only limited to the `isDarkMode`, `showRecentlyUsed` and `showTips` property, our results can also be customized. Every result can have it's own icon. We have a library of icons which you can choose from.

## Future plans

* Custom icon packs
* Create sections to organize your results better
* Support styling the Spotlight itself
