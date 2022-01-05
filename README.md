🄶🄾🄾🄳 🅅🄸🄱🄴🅂 🄾🄷🄼🄻🅈

# [Good Vibes Ohmly](https://livethelifetvdao.notion.site/livethelifetvdao/Good-Vibes-Ohmly-Draft-Proposal-34b49279d917473a8054443d0c6d2ae1)
This is the front-end repo for Good Vibes Ohmly. 

**_ Note We're currently in the process of switching to TypeScript. Please read  this  guide on how to use TypeScript for this repository. https://github.com/OlympusDAO/olympus-frontend/wiki/TypeScript-Refactor-General-Guidelines _**

##  🔧 Setting up Local Development

Required: 
- [Node v14](https://nodejs.org/download/release/latest-v14.x/)  
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) or [Yarn](https://classic.yarnpkg.com/en/docs/install/)
- [Git](https://git-scm.com/downloads)


```bash
$ git clone git@github.com:GoodVibesOhmly/GVO.git
$ cd GVO

# set up your environment variables
# read the comments in the .env files for what is required/optional
$ cp .env.example .env
# fill in your own values in .env, then =>
```
### NPM
```bash
$ npm install
$ npm run start
```
### Yarn
```bash
$ yarn
$ yarn start
```

The site is now running at `http://localhost:3000`!
Open the source code and start editing!

## Rinkeby Testing

**Rinkeby faucet for sOHM:**
[Lives here](https://rinkeby.etherscan.io/address/0x800B3d87b77361F0D1d903246cA1F51b5acb43c9#writeContract), to retrieve test sOHM click `Connect to Web3` and use function #3: `dripSOHM`. After connecting to web3, click `Write` to execute and 10 sOHM will automatically be transferred to your connected wallet.

Note: The faucet is limited to one transfer per wallet every 6500 blocks (~1 day)

**Rinkeby faucet for WETH:**
[Wrap rinkeby eth on rinkeby uniswap](https://app.uniswap.org/#/swap)

**Rinkeby faucets for LUSD, FRAX & DAI can be taken from rinkeby etherscan:**

1. Go to `src/helpers/AllBonds.ts`
2. then copy the rinkeby `reserveAddress` for the applicable bond & navigate to that contract on rinkeby etherscan. 
3. On Rinkeby etherscan use the `mint` function. You can use the number helper for 10^18 & then add four more zeros for 10,000 units of whichever reserve you are minting.

### Architecture/Layout
The app is written in [React](https://reactjs.org/) using [Redux](https://redux.js.org/) as the state container. 

The files/folder structure are a  **WIP** and may contain some unused files. The project is rapidly evolving so please update this section if you see it is inaccurate!

```
./src/
├── App.jsx       // Main app page
├── abi/          // Contract ABIs from etherscan.io
├── actions/      // Redux actions 
├── assets/       // Static assets (SVGs)
├── components/   // Reusable individual components
├── constants.js/ // Mainnet Addresses & common ABI
├── contracts/    // TODO: The contracts be here as submodules
├── helpers/      // Helper methods to use in the app
├── hooks/        // Shared reactHooks
├── themes/       // Style sheets for dark vs light theme
└── views/        // Individual Views
```


## 🚀 Deployment
Auto deployed on [Fleek.co](http://fleek.co/) fronted by [Cloudflare](https://www.cloudflare.com/). Since it is hosted via IPFS there is no running "server" component and we don't have server sided business logic. Users are served an `index.html` and javascript to run our applications. 

_**TODO**: TheGraph implementation/how/why we use it._


### Continuous deployment
Commits to the follow branches are automatically deployed to their respective URLs.
| Branch | URL |
| --- | --- |
| master | https://app. |
| deploy | https://staging. |



## 👏🏽 Contributing Guidelines 

We keep an updated list of bugs/feature requests in [Github Issues](https://github.com/GoodVibesOhmly/GVO/issues). 


![GitHub issues](https://img.shields.io/github/issues/olympusdao/olympusdao?style=flat-square)

Filter by ["good first issue"](https://github.com/OlympusDAO/olympusdao/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22) to get your feet wet!
Once you submit a PR, our CI will generate a temporary testing URL where you can validate your changes. Tag any of the gatekeepers on the review to merge them into master. 

*__NOTE__*: For big changes associated with feature releases/milestones, they will be merged onto the `develop` branch for more thorough QA before a final merge to `master`


**Defenders of the code**: 

Only the following people have merge access for the master branch. 
* [@Girth Brooks](https://github.com/dwjanus)
* [@Unbanksy](https://github.com/unbanksy)
* [@ZayenX](https://github.com/lolchocotaco)
* [@royscheeren](https://github.com/royscheeren)


### 🗣 Community

* [Join our Discord](https://discord.gg/qQxDvkyueF) and ask how you can get involved with the DAO!

### NEW UX

<img width="870" alt="Screenshot 2021-12-18 at 16 36 27" src="https://user-images.githubusercontent.com/45092543/146646734-723dd5a5-1fb1-44b9-91ae-d4038a9175f9.png">



### GVO / Good Vibes Ohmly / Powered by LiveTheLifeTV

### Olympus DAO is the best-decentralized bank, and we’re the first brand to open an account. We look forward to being in the top 90 OHM holders and lease an Alva Yacht 90 EX 

<img width="911" alt="Screenshot 2021-12-18 at 16 37 02" src="https://user-images.githubusercontent.com/45092543/146646760-15ac13fd-3147-4a0d-a3b5-9466fd17b473.png">


### “A rising tide lifts all boats"

Ohm Forks and whitelists have been a huge pain point to keep the good vibes flowing. Burnout in crypto is no joke. Anyone else getting discord fatigue? That shit is getting overwhelming. Definitely a great tool. But wow it’s a lot. So much going on at all times! The whitelisting games  have been so fricking distracting tbh. We’re way too busy working at Odyssey to make sure we’re on the WL, and we think our time is better spend figuring out how to buy a yacht without selling. Staking OHM should be enough to play. 

Best adventure is shared adventure. Almost anything money can do, frens can do better. In so many ways, frens with a boat is better than owning a boat you don’t use 24/7. Imagine having a Swiss Association to buy a yacht without needing to sell! Imagine a 0% interest loan in LUSD to lease a yacht without needing to sell any OHM from our treasury. 

There’s no need to jump in our LiveTheLifeTV Discord server and play games or boost the server. You didn’t unstake the past 33 days?  Simply claim your FREE mint pass and you’re gucci. Upcoming NFT’s will give ohmies access to the club with IRL benefits like living the yacht club life. Obviously we will offset our footprint with a Klima collab. The Alva Yacht is 100% solar powered. ⚓️

ARCx unlocks our mission to create 3 GVO MINT PASSES with 3 different levels. You have a BAYC or MAYC? Welcohm! You are part of Bankless DAO? Welcohm. To get the highest score you need need to be staking OHM for at least 33 days… 

We're sailing towards our dream island; where we will try to balance DAO's, NFT's and Defi. We are supporting our planet earth and mother ocean with Klima & Diatom, help launching the Olympus Odyssey Genesis Collection & NFT Platform, featuring Dimitri Daniloff, and starting to shape a safe haven for the 9999 people that become frens along the way of exploring the Good Vibes Ohmly project. WAGMI, have fun, run a sustainable fund, and bootstrap our dreams through NFT sales to lease a solar-powered catamaran, and buy a couple of surf view co-working places to live the life with ohmies. We will now drop the anchor and create a place that will feel like HOHM! (⚓️,⚓️ )

We bring Zeus’s original vision to life by backing our entire treasury by gOHM. GVO is a membership community comprising of both digital and off-line benefits for members. It is important to note that we're not a currency or crypto project. We are a membership community that leverages a token as proof of membership. 

The GVO token enables us to properly coordinate. You mint an NFT on a very slight bonding curve purchases made in gOHM. The NFT gives you membership and yearly GVO emissions for access to services you can use in app. All money raised from NFT’s is held in the Treasury in gOHM - some of the gOHM is used to pair with GVO and the treasury management team use the other gOHM to mint safe loans at 0% in olympusUSD (releasing in January 2022) which have a mint fee of 1% - the olympusUSD is converted into fiat and used to purchase Good Vibes real world assets. In this way the Treasury is ever growing from NFT membership sales - trading fees from gOHM-GVO swaps and the compounding rewards in gOHM
 
The goal is as much financial as it is about living the life. We want to express a feeling of community where people that love food, wine, art and tech come together. Resident artist from Genesis Dimitri Daniloff has bestowed us with his  artwork to support the movement.  Dimitri and our GVO art directooors will curate NFT’s from upcoming artists to join the initiative. The GVO brand needs to be bold, powerful, full of style and expressing freedom. This is just the genesis, those with our Values will always find a HOHM at GVO.

A like-minded, yet exclusive community is what GVO aims to be. We will adapt as we go along as with everything in the Metaverse, but we are a place for both tech-savvy and those who care only about the “rebases” alike, to find a HOHM. We attract a diverse audience, who may associate with one of our many values or offerings. 

Since the token is not a security or financial instrument, additional benefits will feature in a friendly and communal dashboard provided by Olympus Pro. Similar to any NFT mint and display website with roadmap and cohmmunity, we add upon it the good OHMly vibes with their bonding and staking growth. To that effect, the user experience aims to be a beautiful blend of the artistic and the OHMly. 

### GVO / GITFLOW

* : git checkout develop
* : git pull: make sure you have all the latest changes
* : create new branch using git flow principles: 
    prefix with
    feat/ for new code or code changes
    fix/ for hotfixes
    example: feat/update_content_mint_page
* : make changes
* : commit with semantic commit message: 
     example: git commit -m "feat: updated content on mint page"
     more info on semantic commits
* : push
* : Open pull request into develop, use a good description, consider dividing it into # Scope (what is the goal of the PR), # Work done (What did you change to reach the goal), # Steps to test (how can a reviewer test your changes)
* : request review from ohmie
* : make any requested changes (go back to step 4)
* : if approved merge pull request

<img width="935" alt="Screenshot 2021-12-18 at 16 37 50" src="https://user-images.githubusercontent.com/45092543/146646775-428fb6df-2d6b-4ea3-aad9-4af0eb1511ca.png">


### TO DO LIST

* Create Landing Page to Claim GVO MINT PASS (based on new UX; see above)
* Add play button on hero image with the VO file from our artist Liquidiot


* [Join our Discord](https://discord.gg/qQxDvkyueF) and ask how you can get involved with the DAO!


__ Forked From [Ω Olympus Frontend](https://app.olympusdao.finance/)


<img width="874" alt="Screenshot 2021-12-18 at 16 41 34" src="https://user-images.githubusercontent.com/45092543/146646815-b7d3f3e0-6457-4d8d-b22e-e438f439db90.png">
