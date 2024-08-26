# Edufy - Decentralized Learning Platform

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://edufyapp.vercel.app/)
[![GitHub](https://img.shields.io/github/license/dmrdvn/edufy)](https://github.com/dmrdvn/edufy/blob/main/LICENSE)


Edufy is a decentralized learning platform built on the EduChain network that leverages blockchain technology to provide a secure, transparent, and incentive-driven educational experience. The platform allows users to participate in various educational challenges, submit their solutions, and earn rewards in a trustless environment.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Smart Contract](#smart-contract)
- [Contribution Guidelines](#contribution-guidelines)
- [License](#license)

## Features

- **Decentralized Learning:** Edufy allows users to participate in educational tables, solving problems and earning rewards.
- **EduChain Integration:** All user interactions, including registrations, updates, and table participations, are securely stored on the EduChain blockchain.
- **Incentive-Driven:** Users earn rewards for their contributions, fostering an engaging learning environment.
- **Secure and Transparent:** Leveraging smart contracts, Edufy ensures that all operations are transparent and immutable.
- **IPFS Integration via Pinata:** User submissions are stored on IPFS using Pinata, ensuring decentralized and permanent storage.

## Tech Stack

- **Frontend:**
  - [Next.js](https://nextjs.org/) - React framework for server-side rendering and static site generation.
  - [TypeScript](https://www.typescriptlang.org/) - A superset of JavaScript that adds static typing.
  - [Bootstrap React](https://react-bootstrap.github.io/) - A popular frontend component library built on Bootstrap.

- **Blockchain:**
  - **EduChain** - The primary blockchain network for smart contracts and transactions.
  - **IPFS (via Pinata)** - InterPlanetary File System for decentralized storage.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/dmrdvn/edufy.git
   cd edufy
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```
3. **Set up environment variables:**
Create a .env.local file in the root directory and add the following:

   ```bash
   PINATA_JWT=PINATA JWT CODE HERE
   PINATA_GATEWAY=example-gateway.mypinata.cloud
   WALLET_CONNECT_ID=WALLET CONNECT ID HERE
   ```
2. **Run the development server:**

   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

Edufy is designed to be intuitive and user-friendly. Here's a brief overview of how to use the platform:

- **Register:** Connect your wallet and register as a user on the platform.
- **Update Profile:** Add or update your profile details such as username, photo, and verification status.
- **Create Tables:** Create educational tables where participants can submit solutions to predefined problems.
- **Participate:** Join existing tables, solve problems, and submit your answers.
- **Earn Rewards:** Earn rewards based on your participation and performance.

## Smart Contract

Edufy's smart contract is deployed on the EduChain network and handles all core functionalities of the platform, including user management, table management, and reward distribution.

### Contract Address

- **Main Contract:** `xxxxxxxxxxxxxxxx`

## Contribution Guidelines

We welcome contributions from the community! To contribute, please follow these steps:

1. **Fork the repository and create your branch:**

   ```bash
   git checkout -b feature/amazing-feature
   ```
2. **Commit your changes:**
   ```bash
   git commit -m "Add some amazing feature"
   ```

3. **Push to the branch:**
   ```bash
   git push origin feature/amazing-feature
   ```
4. **Open a pull request.** 
We will review your changes and merge them if they align with our project's goals.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
