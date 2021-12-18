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


## 🗣 Community

* [Join our Discord](https://discord.gg/qQxDvkyueF) and ask how you can get involved with the DAO!

# GVO / Good Vibes Ohmly

Minting NFT automagically stakes 33 tokens
and each NFT comes with IRL membership benefits

Want sustainable incooome ser, try help safe planet, be near ocean
And above all cultivate Good Vibes Ohmly, so ohmies don't burn out

# GVO / Gitflow

1: git checkout develop
2: git pull: make sure you have all the latest changes
3: create new branch using git flow principles: 
    prefix with
    feat/ for new code or code changes
    fix/ for hotfixes
    example: feat/update_content_mint_page
4: make changes
5: commit with semantic commit message: 
     example: git commit -m "feat: updated content on mint page"
     more info on semantic commits
6: push
7: Open pull request into develop, use a good description, consider dividing it into # Scope (what is the goal of the PR), # Work done (What did you change to reach the goal), # Steps to test (how can a reviewer test your changes)
8: request review from ohmie
9a: make any requested changes (go back to step 4)
9b: if approved merge pull request



# New Discord Roles @ GVO

* Coordinatooor : sort of the navigator, stratego style
* Daooor : is making us run the show DAO style
* Moderatooor : runs the podcast & monthly community call
* Art Directooor : curator of fine art for the NFT Vaults
* Illustratooor : makes stuff look good
* Enginooor : shipping full-stack web3 code
* Threadooor : is fricking good at doing the CT thing
* Incubatooor : wants to see more D2D collabs ...
* Collectooor : wants to buy NFT's
* Calculatooor : makes sure the treasury is growing
* Documentooor : keeps notion, airtable and github clean
* Enjoyooor : L1 guestpass
* Explorooor : L2 guestpass
* Contributooor : is earning incooome by donating time
* Whitelistooor : get's all the good stuff as bonus
* Innovatooor : the OG's on the VIP list
* Robotooor : Discord bot doing all the heavy lifting
* Administratooor: Makes sure the Discord bots are gucci

* [Join our Discord](https://discord.gg/qQxDvkyueF) and ask how you can get involved with the DAO!


__ Forked From [Ω Olympus Frontend](https://app.olympusdao.finance/)
