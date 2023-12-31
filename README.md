# Project: Contract with Frontend interactivity

This project shows the interaction between a simple contract and a frontend that uses Node js.

## Description

This project aims to deploy a simple contract that could execute atleast two functions and display the output of the said executed functions in the frontend of the application. The project has two functions, namely mint and burn tokens. These two functions enable the user to mint and burn tokens respectively, and at the same time would display the number of tokens in the user's frontend.

## Getting Started

### Setup
Requirements: VSCode, Node js, MetaMask, Hardhat 

1. Download and extract the project's ZIP file in any directory of your system.
2. Open the project in VSCode.
4. Install the dependencies in your project using the command "npm install" in the project folder's terminal.
5. While this process happens, setup a local Etheruem node in another terminal using the command "npx hardhat node".
6. Open another terminal and deploy your contract to the local network using the command: "npx hardhat run --network localhost scripts/deploy.js"
7. After these processes, go back to the first terminal and type "npm run dev" to run the frontend.
8. With this, you can now access the frontend by typing the following in the address bar: "localhost:{portnumber}". (Port number is usually 3000)
9. After running the frontend, open MetaMask and import any account given from the command "npx hardhat node" (use the private key).
10. Create another network that will connect your MetaMask wallet to the localhost, "http://127.0.0.1:8545".
11. You can not import your wallet to the front-end by clicking on the button presented.

### File
This it the Google Drive Link towards the project folder:
https://drive.google.com/file/d/1SuoQnTw6A4pqxlGt3krUt6YRey8K_RXk/view?usp=sharing

## Authors

- Jan Anonuevo
- Mapua University (jndanonuevo@mymail.mapua.edu.ph)
