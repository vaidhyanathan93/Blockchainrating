Follow the steps below to download, install, and run this project.

PS: This project is created in reference with DAPP tutorial and added, so sample data will be from the DAPP only.


Contributions: 
Vaidhyanathan A(2020mt93261)
Vijay Bhargav(2020MT93239)

## Dependencies
Install these prerequisites to follow along with the tutorial. See free video tutorial or a full explanation of each prerequisite.
- NPM: https://nodejs.org
- Truffle: https://github.com/trufflesuite/truffle
- Ganache: http://truffleframework.com/ganache/
- Metamask: https://metamask.io/


## Step 1. Clone the project
`git clone `

## Step 2. Install dependencies
```
$ cd product
$ npm install
```
## Step 3. Start Ganache
Open the Ganache GUI client that you downloaded and installed. This will start your local blockchain instance. See free video tutorial for full explanation.


## Step 4. Compile & Deploy Rating Smart Contract
`$ truffle migrate --reset`
You must migrate the product smart contract each time your restart ganache.

## Step 5. Configure Metamask
See free video tutorial for full explanation of these steps:
- Unlock Metamask
- Connect metamask to your local Etherum blockchain provided by Ganache.
- Import an account provided by ganache.

## Step 6. Run the Front End Application
`$ npm run dev`
Visit this URL in your browser: http://localhost:3000

