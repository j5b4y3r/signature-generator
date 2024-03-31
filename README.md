# Signature Generator

This project is a React application for drawing eSignatures by drawing signature and typing signature.

## Features

- Draw eSignature using mouse or touchpad.
- Type name or any string to generate eSignature.

## Technologies Used

- React
- react-signature-canvas
- WebFont loader

## How It Works

The application allows users to draw signatures using the `react-signature-canvas` component. Upon drawing, the signature is captured as an image, which can be downloaded or saved for further use. Additionally, the application utilizes Google Fonts for custom typography, enhancing the visual appeal of the signature.

## Getting Started

To integrate the signature drawing feature into your own project, follow these steps:\
**1. Clone the repository**
   ```shell
git clone https://github.com/BrisbyHQ/signature-generator.git
```
**2.Install the necessary dependencies:**
   ```shell
npm install webfontloader
```
Do not need to install react-signature-canvas, because it is in the project directory src/lib/rsc/index.jsx.
Usually react-signature-canvas is not install as .jsx but .js file extension so that the compiler cannot compile the file.

## Run the project

```shell
npm run dev


