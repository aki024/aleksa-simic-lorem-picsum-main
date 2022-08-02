# Lorem Picsum Web App

This project was made as a part of my Frontend Internship.

This app is made in ReactJS framework using TypeScript.

The API used is [Lorem Picsum API](https://picsum.photos/)

## Features

### `Browse Pictures`

There are 900 images in total and the application displays 12 images.

To go through the images, you can either click on the pagination numbers on the bottom of the page.
Or you can type in a page number in the URL search query.(i.e., ?page=70).

If you type in a wrong page number, you will be sent to the Redirect page.

### `Darkmode`

By the default, the app will detect your system's preferred color theme and will load that (light or dark).
By clicking on the dark mode toggle button, you can change your preferred color theme.
This color theme is saved in your local storage, so the next time you visit this website, your theme will be the same.

### `Like pictures`

To like an image, you can click the heart icon.
Maximum amount of images you can like is 5.
If you like more than 5 images, you will be shown a notification.

### `Favorites page`

To view your liked images, you can go to favorites page.
There you will be shown your liked images, and you have the option to unlike them.
The images you've liked are stored locally, so the next time you visit this app they will remain the same.

### `Fullscreen`

To view the image in full-screen, you can simply click on it.
To exit the full screen view, either press escape on your keyboard or click the 'x' button.

### `DropDown menu`

** Dropdown menu consists of 3 features `Save`, `Share` and `Customize` **

`Save`
Clicking on this icon saves the image on your computer.

`Share`
Clicking on this icon copies the link to your clipboard.

`Customize`
Clicking on this icon opens a customize menu that you can use to change the picture's blur and grayscale.
While in this mode you get another option in your dropdown - `Save customized image` which allows you to save your customized image.

### `Random page`

Once you click on this page you are shown a random picture from the API, all other features remain the same.
