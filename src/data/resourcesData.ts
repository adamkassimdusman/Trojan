import { CaseStudy, BlogPost, ResourceItem, FaqItem, Testimonial } from '../types';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs1',
    title: 'Arbitrum Bridge Hijack Recovery',
    category: 'DeFi Bridge Forensic Tracing',
    assetLost: '480,000 USDT',
    assetRecovered: '412,000 USDT',
    challenge: 'Hackers exploited a smart contract validator parameter, bridging assets to local mixers and splitters to cover their tracks.',
    forensics: [
      'Decompiled Arbitrum rollup state validators.',
      'Identified unique change-wallet parameters linked to a single VPN provider.',
      'Constructed detailed multi-layer heuristic clusters of UTXOs.'
    ],
    outcome: 'Coordinated with emergency compliance desks at a primary offshore fiat exchange, securing a cold freeze on the hacker\'s cashout account and returning 85% of capital to the client under judicial order.',
    timeline: '14 Days',
    badge: '90% Rev. Success'
  },
  {
    id: 'cs2',
    title: 'Corporate Treasury Seed Leak Dissection',
    category: 'Corporate Forensics & Cyber Threat',
    assetLost: '1,120,000 USDC',
    assetRecovered: '980,000 USDC',
    challenge: 'A venture capital firm had its physical hardware ledger seed phrase compromised via an advanced spear-phishing Trojan inject.',
    forensics: [
      'Executed full NIST digital imaging on internal development and partner systems.',
      'Dismantled a malicious hidden Chrome extension containing background keylogging scripts.',
      'Tracked flow patterns through three decentralized cross-chain gas routers.'
    ],
    outcome: 'Located the final exit exchange, worked with emergency litigation counsel to freeze target accounts, and repatriated $980k under Federal Court orders.',
    timeline: '22 Days',
    badge: 'Federal Court Lock'
  },
  {
    id: 'cs3',
    title: 'South Asian Liquidity Rug Pull Tracking',
    category: 'Smart Contract Audit & Recovery',
    assetLost: '650,000 BUSD / BNB',
    assetRecovered: '320,000 BUSD',
    challenge: 'Deployers of a fake gamified yield pool drained victim funds and split them across 40 anonymous burner wallets.',
    forensics: [
      'Analyzed smart contract assembly bytecode and gas expenditure ratios.',
      'Unmasked automated script transactions that triggered withdrawal hooks in the pool.',
      'Traced funds to a non-KYC decentralized exchange pool.'
    ],
    outcome: 'Gathered core transaction histories, cataloged structural evidence, and mapped actual cashpoint routes, facilitating an active local police arrest and restitution of partial funds.',
    timeline: '45 Days',
    badge: 'Police Action Support'
  },
  {
    id: 'cs4',
    title: 'High-Value Wallet Physical Hostage Support',
    category: 'Expert Witness & Tracing',
    assetLost: '2,400,000 USDT / ETH',
    assetRecovered: '2,400,000 USDT',
    challenge: 'An institutional investor was coerced into sign-approving transaction transactions under physical duresse.',
    forensics: [
      'Immediate real-time mempool tracking and address interception within minutes of the alert.',
      'Mapped transfer transactions to dynamic high-risk exchange endpoints.',
      'Issued emergency notarized Trojan Affidavit packages to compliance directors globally within 3 hours.'
    ],
    outcome: 'All target exchange gateways locked the transactions instantly on arrival, completely preventing escape to cold storage and restoring the entire value to the corporate treasury.',
    timeline: '4 Hours',
    badge: 'Full Recovery - Emergency'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'Recover Stolen Cryptocurrency in USA: Dynamic Forensic Tracing & Recovery Blueprint',
    summary: 'A step-by-step masterclass by Trojan Cyber Intelligence on how to recover stolen cryptocurrency in the USA, trace malicious smart contracts, and coordinate federal asset freezes on centralized exchanges.',
    content: `When individuals or institutions suffer a catastrophic cryptocurrency loss, they are often met with standard defeatist boilerplate claiming "blockchain is permanent and anonymous." This is a severe misconception. While ledger transactions are mathematically finalized and immutable, they are also completely public. Immutable records mean cybercriminals have to leave permanent, auditable on-chain trails that can never be modified or scrubbed.

At Trojan Cyber Intelligence, our certified forensic examiners deconstruct complex scam frameworks. The recovery journey begins with a meticulous technical mapping protocol that transforms chaotic hex parameters into admissible visual evidence.

Sovereign Tracing Protocols: Step-by-Step Recovery Blueprint

1. TRANSACTION AUDITING & RAW METADATA ISOLATION
We decompile raw transaction histories from the block network. Our investigators isolate exact inputs, outputs, gas fees, and timestamp indices. Key parameters compiled include:
• Withdrawal TXIDs (Transaction Hashes) of compromised funds.
• Exact block heights and gas spending characteristics.
• Associated smart contract addresses holding execution authority.

2. CLUSTER HEURISTIC DE-ANONYMIZATION
Using multi-hop structural mapping, we trace funds down through downstream splits. We group seemingly unrelated burner wallets into unified suspect clusters by identifying:
• Common co-spending inputs (which prove multi-wallet structural controls).
• Systematic script withdrawal patterns (automated asset dispersing structures).
• Matching gas source parameters that trace back to single-exchange burner profiles.

3. COLD FREEZE EXCLUSION & LIAISON COORDINATION
Once funds hit a known exit point—typically a centralized cryptocurrency exchange implementing KYC (Know Your Customer) rules—a formal technical alert is dispatched. Together with Florida litigation counsels, we deploy a legally sealed Trojan forensic package to exchange compliance departments:
• Demonstrating the direct tracing link from the victim to the suspect account.
• Facilitating immediate account freezes prior to funds blending into the off-ramp banking grid.
• Supplying evidence suitable for municipal, state, or federal law enforcement subpoenas.

What to Do Immediately Following an Asset Compromise:
• REVOKE ACTIVE SMART CONTRACT APPROVALS: Use tools such as Revoke.cash or Etherscan Token Approvals to check and terminate infinite spending allowance permissions instantly.
• PRESERVE SYSTEM COMMUNICATION: Secure complete screenshots, profile URLs, and chat logs from communication platforms (WhatsApp, Telegram). Do NOT alert the scammers that you have engaged forensic experts.
• LOG NETWORK HEADERS: Compile browser metadata, platform URL interfaces, and deposit ledger files for deep-dive forensics.`,
    category: 'Scam Prevention',
    author: {
      name: 'Marcus Vance',
      role: 'Head of Blockchain Analysis',
      avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150&h=150'
    },
    date: 'May 30, 2026',
    readTime: '6 min read',
    tags: ['recover stolen cryptocurrency USA', 'blockchain tracing services Miami Florida', 'pig butchering scam recovery experts']
  },
  {
    id: 'b2',
    title: 'Blockchain Tracing Services in Miami Florida: The Litigation Guide to Exchange Subpoenas',
    summary: 'A comprehensive forensic guide for US law firms handling cryptocurrency litigation, demonstrating how to preserves legal chain-of-custody logs and apply for foreign subpoenas.',
    content: `Litigation involving cryptocurrency demands rigid standards. Under typical US Federal evidence guidelines, arbitrary screenshots, unverified block explorer links, or casual wallet balance captures are easily dismissed in a court of law. Legal advisors must construct evidence portfolios that bridge advanced raw ledger data with standard judicial practices.

At the Miami Cyber Intelligence Desk, Trojan Forensic Analysts work in lockstep with leading litigators to compile NIST-compliant technical dossiers. Our reports demonstrate proof lines that stand up to rigorous cross-examination under federal evidence rules.

Constructing Court-Admissible UTXO Trace Reports

Unspent Transaction Output (UTXO) structures define ledger states. To trace capital flows with judicial precision, investigators construct unified on-chain tracing records:
1. CHAIN OF CUSTODY PRESERVATION: Documenting all forensic tools, software compilers, and API interfaces utilized during analysis to prevent claims of data manipulation.
2. DISCRETE HEURISTIC CLUSTERING: Formulating clear visual transaction graphs showing how parent capital split down into child wallets of varying sizes.
3. KYC OFF-RAMP ATTRIBUTION: Identifying the specific centralized exchange account that received the tainted assets, and compiling its physical entity ID parameters.

Evaluating Subpoena Timing and Jurisdictional Parameters
Once an investigative ledger maps directly into an exchange's custody wallet, litigation partners apply for emergency preservation letters followed by formal third-party subpoenas. Key parameters to monitor include:
• US-regulated Exchange Domains: Subpoenas must be filed in matching state or federal jurisdictions of exchange headquarters (e.g., Delaware, California, or Florida courts).
• Offshore Exchange Enclaves: Foreign legal offices are served with letters of request under international mutual legal assistance treaties (MLAT) or municipal letters rogatory.
• Direct Sovereign Liaison: Our Miami desk provides direct technical consulting for municipal authorities to minimize the processing latency of asset seizure directives.`,
    category: 'Digital Forensics',
    author: {
      name: 'Dr. Evelyn Croft',
      role: 'Director of Cyber Forensics',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150'
    },
    date: 'May 28, 2026',
    readTime: '8 min read',
    tags: ['blockchain tracing services Miami Florida', 'crypto asset recovery forensic firm', 'exchange asset freeze subpoenas']
  },
  {
    id: 'b3',
    title: 'Pig Butchering Scam Recovery Experts: Unmasking Cloned Signature Trojan Malware',
    summary: 'Why your ledger hardware wallet is only as secure as your browser environment, and how cybercriminals bypass seed protection via Web3 signature triggers.',
    content: `Hardware wallets (such as Ledger, Trezor, or Keystone) keep your private keys isolated offline in hardware sandboxes. Many users falsely assume this makes them invulnerable to on-chain theft. Cybercriminals, however, have developed clever techniques that don't steal private credentials at all. Instead, they exploit standard human behaviors via "Cloned Signature" Trojan malware.

In this deep forensic paper, our pig butchering scam recovery experts dismantle the mechanics of signature hijacking and outline physical sandbox testing steps.

How Cloned Signature Trojan Malware Operates:

1. THE SHADOW EXTENSION INJECTION
Users are lured to download corrupted browser plugins, matching fake PDF reader updates or compromised Telegram desktop clients. Once installed, the extension sits silently in the browser.

2. DOM MANIPULATION & INTERCEPTION
When a user launches a decentralized app (dApp) interaction, the extension intercepts JavaScript event loops. It modifies withdrawal destination addresses inside the Web3 connection provider (such as MetaMask or WalletConnect).

3. EXPORTING THE WRONG SIGNATURE
The user's screen displays a normal wallet interaction (e.g., "Stake 100 USDT"). However, the underlying raw transaction payload is modified to point to a high-volume thief cluster with a command allowing "Infinite Approval." After the user presses physically on their Ledger to approve the signature, the contract is finalized on-chain. Suspended assets are vanished instantly, bypassing all hardware security features.

Actionable Mitigation and Analysis Guide:
• INDEPENDENT DEVICE DISSECTION: Always double-check destination addresses, contract interactions, and exact dollar figures shown on the physical ledger screen itself rather than relying on browser interfaces.
• ISOLATED CHROME PROFILES: Dedicate a clean, extension-free Chrome profile or separate operating system partitions for digital finance operations.
• REVERSE SANDBOX TRACKING: Our technical teams run malware decompilation to locate developer server endpoints, trace malicious domains, and identify owner identities.`,
    category: 'Cryptocurrency Recovery',
    author: {
      name: 'Evelyn Croft',
      role: 'Director of Cyber Forensics',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150'
    },
    date: 'May 22, 2026',
    readTime: '5 min read',
    tags: ['pig butchering scam recovery experts', 'wallet access restoration steps', 'recover stolen cryptocurrency USA']
  },
  {
    id: 'b4',
    title: 'DeFi Cross-Chain Bridge Laundering: Unified Tracking Over Multi-hop Smart Networks',
    summary: 'How cybercriminals leverage automated cross-chain swapping protocols, and how Trojan digital intelligence maps multi-hop splits dynamically.',
    content: `State-sponsored actors and cyber-thief cartels have largely abandoned traditional, simple wallet-to-wallet transfers. They now execute complex "hop-routing" through automated non-custodial cross-chain bridges. By converting stolen Ethereum into Solana, Avalanche, or Binance Smart Chain assets within seconds, scammers trigger complex transactions that evade classical single-network blockchain analysis.

Our engineering department at Trojan excels in unified cross-chain tracking. By implementing state-of-the-art machine learning models, we match lock and mint transaction signatures globally.

The Mechanics of Cross-Chain Bridge Laundering:

1. COMPROMISE & POOL CONVERSION
 stayer funds are consolidated into a prime address. This address queries decentralized swapping pools to convert volatile tokens into stablecoins (e.g., USDT/USDC).

2. COMPILING LOCK & RE-LOCK LOOPS
Assets are deposited into structural smart contracts (bridges). The bridge locks capital on Chain A and mints a proxy token on Chain B. Standard trackers often lose track of capital once it enters a contract.

3. RECONSTRUCTING TIMELINES & SIGNATURES
Trojan's trackers analyze matching transaction variables. We cross-verify:
• Input/Output amounts minus bridge fees.
• The exact milliseconds elapsed between the Lock event on Chain A and the Mint event on Chain B.
• Specific contract signatures and gas-spending source wallets.

We combine this data to create a clear, continuous audit path across multiple chains, allowing us to pinpoint the final exchange cash-out destination and coordinate freeze directives.`,
    category: 'Asset Tracing',
    author: {
      name: 'Marcus Vance',
      role: 'Senior Investigator',
      avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150&h=150'
    },
    date: 'May 15, 2026',
    readTime: '7 min read',
    tags: ['Solana', 'Bridge', 'Cross-Chain', 'UTXO', 'crypto asset recovery forensic firm']
  },
  {
    id: 'b5',
    title: 'Corporate Seed Phrase Security: Enterprise-Grade Secrets Storage Strategies',
    summary: 'How massive VCs and cryptocurrency hedge funds construct multi-signature institutional schemas to prevent insider or exploit leaks.',
    content: `For corporate treasuries and family offices, managing large-scale cryptocurrency reserves introduces severe operational challenges. Storing private keys on a single paper seed, a local hard drive, or inside a standard commercial safe creates single-point-of-failure risks. An internal bad-actor or a spear-phishing vulnerability can jeopardize millions.

To prevent such issues, Trojan Recovery provides institutional-grade corporate security consulting. We transition client companies from single-signature keys to robust, trustless multi-schema arrays.

Dismantling Single-Seed Vulnerabilities via Multi-Sig & MPC

Enterprise-grade custody avoids relying on single physical seed phrases, instead utilizing decentralization at the local administration level:
1. MULTI-SIGNATURE SMART WALLETS (e.g., Gnosis Safe)
Instead of a single private key, transactions require physical validation from multiple distinct keys held by separate corporate officers:
• Setup of an 'M-of-N' multisig structure (e.g., 3-of-5 threshold approvals).
• Decentralized storage of individual keys across diverse geological locations.
• No single administrative user can compromise corporate funds independently.

2. MULTI-PARTY COMPUTATION (MPC)
MPC divides a mathematical private key into multiple distinct "shares" or "secrets" without ever compiling the complete key on any single machine:
• Cryptographic calculations happen locally inside secure elements (HSMs/Enclaves).
• Nodes interact to sign transactions using zero-knowledge computations.
• Phishing a single employee does not expose any private key material.

Protecting your Corporate Treasury:
Our on-site advisors evaluate internal asset storage workflows, perform penetration testing, and help establish compliant corporate storage blueprints.`,
    category: 'Digital Forensics',
    author: {
      name: 'Dr. Evelyn Croft',
      role: 'Director of Cyber Forensics',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150'
    },
    date: 'May 20, 2026',
    readTime: '9 min read',
    tags: ['Enterprise Security', 'Multisig', 'MPC Technology', 'Custody']
  },
  {
    id: 'b6',
    title: 'Stablecoin Freeze Mechanisms: How Centralized Issuers Halt Stolen Capital',
    summary: 'Detailed overview of USDT and USDC smart-contract "blacklist" and "freeze" functions, and how forensic intelligence reports are submitted directly to Tether and Circle.',
    content: `When victims of crypto theft search for recovery options, they often overlook stablecoin freeze mechanisms. Decentralized assets like Ethereum or Bitcoin operate strictly through algorithmic pool networks, meaning no central authority can reverse transactions. However, highly popular standard stablecoins like USD Tether (USDT) and USD Coin (USDC) are different. They contain hardcoded compliance controls designed to freeze accounts upon request.

At the Miami Cyber Desk of Trojan, we help clients build and submit technical tracing affidavits directly to Circle and Tether to freeze stolen capital.

Smart Contract Compliance Controls: Under the Hood of USDT & USDC

USDT (Tether) and USDC (Circle) operate as ERC-20 smart contracts. These contracts contain powerful security and regulatory features:
1. THE BLACKLIST HOOK: Deep inside the smart contract code exists a mapping called 'isBlacklisted' or 'blacklisted'. This allows administrators to tag a wallet address and prevent it from executing transfers.
2. DISCRETE SMART CONTRACT COPTING: When a freeze is triggered, any token balances held in that blacklisted wallet are immediately locked. The suspect cannot route them through mixers, trade pools, or bridges.
3. IMMUTABLE LEGAL FILING TIMEFRAME: Tether and Circle require highly structured, credible technical evidence. Arbitrary complaints are ignored. Submissions must meet strict evidentiary requirements:
• A certified, complete transaction tracing chart proving ownership.
• An active report or case file with a federal block agency (such as the FBI/IC3 or Miami Police Cyber Division).
• A court preservation order or an admissible forensic intelligence audit report from a certified firm like Trojan.

Leveraging Stablecoin Blacklists for Speedy Asset Recovery:
If compromised funds are swiftly traced to a USDT or USDC wallet before they are cashed out, issuing an emergency freeze dossier can lock the scammers' stolen balances. Once frozen, the capital remains suspended until formal legal forfeiture is completed, paving the way for recovery.`,
    category: 'Asset Tracing',
    author: {
      name: 'Marcus Vance',
      role: 'Senior Investigator',
      avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150&h=150'
    },
    date: 'May 10, 2026',
    readTime: '8 min read',
    tags: ['Stablecoin Freeze', 'USDT', 'USDC Blacklist', 'Emergency Tracing']
  },
  {
    id: 'b7',
    title: 'How to Recover Stolen Crypto in California: A Step-by-Step Security & Tracing Guide',
    summary: 'A step-by-step masterclass on how to recover stolen crypto in California, coordinate with high-tech task forces, and isolate local digital assets.',
    content: `### How to Recover Stolen Crypto in California: The Ultimate Regional Manual

If you are a resident or entity in California suffering from a sudden digital asset theft, taking immediate, legally sound action is critical. California serves as a primary hub for decentralized finance, digital custody, and consequently, highly targeted cryptocurrency spear-phishing campaigns.

#### Understanding the California Blockchain Jurisdiction landscape
Unlike simple web scams, cryptocurrency tracing requires deep coordination across local state divisions and national federal hubs:
1. **The Role of Regional High-Tech Task Forces**: California is home to specialized cybercrime enforcement groups (such as REACT in Northern California and regional cyber offices in Los Angeles). These agencies possess dedicated hardware tracing tools.
2. **On-Chain Evidence Preparation**: Before filing a report, victims must preserve raw tx hashes, wallet deposit lines, and block height parameters.
3. **Emergency Asset Preservation Rules**: Legal counsels can file emergency injunctions in California courts to issue preservation letters to centralized exchanges operating within US borders.

#### Actionable Tracing Framework for California Victims
* **Step 1: Terminate All Active Session Tokens**: Open your browser and immediately revoke any suspect Web3 dApp authorizations using trusted review tools.
* **Step 2: Collect Raw Network and Communication Logs**: Export complete header logs from your email client and capture timestamped conversation profiles.
* **Step 3: Draft an Admissible Forensic Dossier**: Working with certified examiners like Trojan Cyber Intelligence ensures your case file contains the clear math proofs required by judges to authorize subpoenas under California evidence legislation.`,
    category: 'Cryptocurrency Recovery',
    author: {
      name: 'Dr. Evelyn Croft',
      role: 'Director of Cyber Forensics',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150'
    },
    date: 'June 4, 2026',
    readTime: '7 min read',
    tags: ['how to recover stolen crypto California', 'California cryptocurrency recovery service', 'Silicon Valley crypto tracing']
  },
  {
    id: 'b8',
    title: 'Crypto Scam Recovery Lawyers in Texas: What Victims Need to Know Before Hiring Counsel',
    summary: 'Essential guidelines for Texas residents seeking legal assistance for cryptocurrency fraud, highlighting E-E-A-T trust signals and realistic timelines.',
    content: `### Crypto Scam Recovery Lawyers in Texas: Separating Myth from Reality

Cryptocurrency scams targeting Texas victims have climbed significantly. When individuals seek recovery solutions, they are frequently inundated with non-credible, fraudulent recovery agencies promising guaranteed overnight retrievals. In reality, the recovery of blocked digital assets is a methodical process aligning specialized tracing reports with traditional litigation.

#### Analyzing Legal Avenues for Texas Cryptocurrency Victims
Texas civil courts and asset protection statutes provide strong leverage, but they require impeccable technical evidence:
1. **Establishing Court-Admissible Proof**: Under Texas rules of evidence, simple blockchain explorer links or screenshots are considered hearsay. Jurists demand certified, math-validated multi-hop tracing maps showing the exact flows from the victim\'s device to the defendant\'s wallet.
2. **Filing Third-Party Explorer Petitions**: Texas litigators utilize Chapter 20 of the Civil Practice Rules to compel third-party entities and centralized exchanges to disclose account registration details linked to suspect deposits.
3. **Managing Timeline Expectations Safely**: True legal proceedings and exchange freezes rarely conclude instantly; they operate on standard state-court timelines spanning weeks to months.

#### Spotting Fraudulent Recoveries in the Niche
• Avoid lawyers or companies promising "guaranteed recoveries" or alleging secret direct connections with government servers.
• Legit litigation always starts with an air-gapped forensic audit that bridges raw transaction records to real-world cashpoints.`,
    category: 'Digital Forensics',
    author: {
      name: 'Dr. Evelyn Croft',
      role: 'Director of Cyber Forensics',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150'
    },
    date: 'June 3, 2026',
    readTime: '6 min read',
    tags: ['crypto scam recovery lawyers Texas', 'Texas blockchain litigators', 'Dallas crypto forensic audit']
  },
  {
    id: 'b9',
    title: 'Miami Blockchain Forensics Firm: Tracking High-Value Ethereum and Solana Exploits',
    summary: 'A look inside the technical methodologies Miami-based forensics firms use to track complex Ethereum and Solana smart contract exploits.',
    content: `### Inside Miami\'s Blockchain Forensics Desk: Tracking High-Value Exploits

Miami, Florida, has solidified its position as a global cryptocurrency financial capital. While this has attracted massive enterprise capital, it has also turned South Florida into a prime target for high-value smart contract exploits, Solana token drainers, and malicious decentralized pool interactions.

#### Technical Dissection: Tracing DeFi & Solana Exploits
Unlike traditional Bitcoin transactions which use UTXO parameters, modern networks like Ethereum and Solana rely on intricate account and smart state parameters:
1. **Decompiling Malicious Contract bytecodes**: When an exploit occurs, our forensic experts immediately analyze the smart contract bytecode to identify hidden withdraw parameters or malicious owner transfer privileges.
2. **Solana Token Drainer Mechanics**: Solana drainers often masquerade as normal NFT mints or utility pools, leveraging unique signature approvals that transfer authority over multiple dynamic tokens simultaneously.
3. **Tracking Multi-Hop Cross-Chain Outflows**: Malicious actors deploy automated scripts to swap stolen tokens for stablecoins and bridge them across multiple Layer-2 protocols in seconds.

#### How Trojan\'s Miami Headquarters Secures Evidence
Using specialized state-clustering tools, our Miami team traces these complex cross-chain bridges. We isolate and tag the specific exchange deposit accounts, providing litigation partners with the certified evidence required to secure fast freezing orders.`,
    category: 'Asset Tracing',
    author: {
      name: 'Marcus Vance',
      role: 'Senior Investigator',
      avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150&h=150'
    },
    date: 'June 2, 2026',
    readTime: '8 min read',
    tags: ['Miami blockchain forensics firm', 'Solana transaction tracing Florida', 'Miami crypto asset recovery']
  },
  {
    id: 'b10',
    title: 'FBI IC3 Crypto Fraud Reports: Complete US Witness Asset Preservation Checklist',
    summary: 'A comprehensive checklist on how to structure a professional FBI IC3 crypto fraud report using verified on-chain evidence files for maximum success.',
    content: `### FBI IC3 Crypto Fraud Reports: Maximize Investigation Velocity

When victims of a digital asset exploit report their case to the Internet Crime Complaint Center (IC3), many files languish due to poorly structured, incomplete, or confusing documentation. Federal intelligence desks process hundreds of cases daily, meaning well-documented evidence files are prioritized.

#### How to Structure an Admissible Asset Preservation Portfolio
To minimize processing delays and help federal agencies act on your case, structure your IC3 report using this forensic block layout:
1. **Absolute On-Chain Chronology**: Document the exact date, time (in UTC), block number, and transaction hash of each outgoing transaction. Never copy text from unofficial block explorers without raw data captures.
2. **Suspect Entity Attribution**: List all suspect-controlled wallet addresses, associated smart contract execution addresses, and known exchange deposition IDs.
3. **Identity & Communications Log**: Save complete unedited chat files containing Scam-profiles, deposit instructions, and browser network signatures.

#### Facilitating Fast Interventions via Trojan Forensic Dossiers
Our team compiles these parameters into a highly professional, NIST-compliant Blockchain Intelligence Audit Report. This report stands on its own and gives federal and state investigators the precise mathematical facts they need to trace, freeze, and secure the compromised assets.`,
    category: 'Scam Prevention',
    author: {
      name: 'Marcus Vance',
      role: 'Senior Investigator',
      avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150&h=150'
    },
    date: 'June 1, 2026',
    readTime: '5 min read',
    tags: ['FBI IC3 crypto fraud reports', 'US cryptocurrency fraud filing guide', 'blockchain crime report checklist']
  },
  {
    id: 'b11',
    title: 'New York Cryptocurrency Litigation: Serving Court Subpoenas on Centralized Exchanges',
    summary: 'A tactical litigation manual on serving New York subpoenas on crypto exchanges, proving owner attribution, and managing the litigation timeline.',
    content: `### New York Cryptocurrency Litigation: Tactical Subpoena Management

New York is home to specialized corporate courts, strict cryptocurrency regulations, and key centralized exchanges. For victims of high-value cryptocurrency fraud, the New York supreme court serves as a powerful venue to secure asset disclosures and recover stolen funds.

#### Navigating the New York Subpoena Landscape
Litigation involving blockchain-based assets demands highly specific legal parameters:
1. **Filing a Section 3102(c) Petition**: Before a full lawsuit is filed, plaintiffs can file emergency disclosure petitions to identify the real-world owners of suspect accounts.
2. **On-Chain Identity Linkage**: We track transactions to the final deposit wallet, proving the connection between the stolen funds and the specific KYC-registered account held by the Exchange.
3. **Liaison with Legal and Compliance Desks**: Once a subpoena is authorized, our litigation analysts deliver the certified dossier directly to the exchange\'s legal department, ensuring the target values are frozen instantly.

#### Evading Recovery Fraud Myths in Litigation
* **Fact**: Private entities cannot directly log onto exchange database servers or reverse transactions.
* **Fact**: Legit recoveries are always governed by state/federal court orders and authorized jurisdictional subpoenas.`,
    category: 'Digital Forensics',
    author: {
      name: 'Dr. Evelyn Croft',
      role: 'Director of Cyber Forensics',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150'
    },
    date: 'May 29, 2026',
    readTime: '9 min read',
    tags: ['cryptocurrency litigation New York', 'NY Supreme court blockchain disclosure', 'exchange freeze subpoena New York']
  },
  {
    id: 'b12',
    title: 'Unmasking Pig Butchering Scam Recovery Secrets: Hard Truths on Blockchain Forensics',
    summary: 'A straight-to-the-point analysis exposing the operations of pig butchering scams and debunking the fraudulent claims of instantaneous recovery.',
    content: `### Pig Butchering Scam Recovery Secrets: Exposing the Reality of Blockchain Forensics

"Pig butchering" (shajiupian) scams are sophisticated, global operations targeting US investors through emotional manipulation and fraudulent investment opportunities. In their search for options, victims often encounter secondary scammers promising "guaranteed recoveries." This guide separates myth from reality.

#### Exposing Common Recovery Scams and Fake Claims
Many online advertisements make unrealistic promises to exploit victims:
1. **The Tool Injection Myth**: No company possesses software that can hack into scammers\' wallets, reverse the blockchain, or access cold state custody without the private seed.
2. **The Fake Government Liaison Claim**: Claims of being a "certified government partner" with direct access to sovereign funds are highly deceptive.
3. **The Multi-Sig Blacklist Truth**: True asset recovery is achieved through methodical on-chain tracing, formal IC3 submissions, exchange account freezes, and structured civil litigation.

#### How Certified Forensics Maximizes Real Recovery Success
Instead of relying on empty promises, Trojan Cyber Intelligence uses verifiable, peer-reviewed tracing tools. We build complete, admissible proof charts that trace capital from the original deposit wallet down to centralized KYC exit-ramps, facilitating formal asset recovery.`,
    category: 'Cryptocurrency Recovery',
    author: {
      name: 'Dr. Evelyn Croft',
      role: 'Director of Cyber Forensics',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150'
    },
    date: 'May 27, 2026',
    readTime: '7 min read',
    tags: ['pig butchering scam recovery secrets', 'malicious investment pool tracing', 'recover stolen US crypto assets']
  },
  {
    id: 'b13',
    title: 'US Department of Justice Crypto Seizures: How On-Chain Assets are Repatriated',
    summary: 'An educational breakdown of how the US Department of Justice (DOJ) coordinates cryptocurrency seizures and the steps victims can take to apply for restitution.',
    content: `### DOJ Cryptocurrency Seizures: Navigating the Recovery and Restitution Process

The United States Department of Justice (DOJ) has executed massive cryptocurrency seizures targeting international ransomware groups, money launderers, and complex investment scam networks. For victims, understanding how these federally seized assets are returned is highly valuable.

#### The Restitution and Forfeiture Pipeline
The process of returning seized digital assets to victims follows a structured federal protocol:
1. **Civil Asset Forfeiture Action**: The DOJ files a formal civil complaint detailing how the seized tokens are linked to criminal activity.
2. **Evidentiary Claims Submission**: Victims must file formal petitions proving their stolen funds match the seized pools.
3. **Certified UTXO Trace Admissibility**: Petitions must include complete math-based on-chain traces that prove the transaction path from the victim\'s wallet to the seized address.

#### How to Position Your Case for Restitution
Our forensics team helps clients prepare these professional trace reports. By compiling NIST-compliant evidence portfolios, we give victims the precise documentation needed to present their claims to federal agencies and apply for asset restitution.`,
    category: 'Asset Tracing',
    author: {
      name: 'Marcus Vance',
      role: 'Senior Investigator',
      avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150&h=150'
    },
    date: 'May 25, 2026',
    readTime: '8 min read',
    tags: ['DOJ crypto seizures tracing', 'US federal asset forfeiture recovery', 'repatriate stolen cryptocurrency USA']
  },
  {
    id: 'b14',
    title: 'Florida Cryptocurrency Recovery Companies: Evading Outflow Scams and Recovery Fake Experts',
    summary: 'A security-first audit handbook on how to identify credible blockchain forensics firms in Florida and avoid fraudulent recovery networks.',
    content: `### Florida Cryptocurrency Recovery Companies: A Guide to Locating Credible Experts

Florida has become a hub for blockchain technology, bringing a rise in both legitimate crypto tracing firms and fraudulent recovery coordinators. Spotting deceptive actors is essential to protecting your remaining assets and securing a real possibility of recovery.

#### Recognizing Red Flags in Recovery Firm Claims
Before engaging any company, evaluate their credentials using this strict audit framework:
1. **Guaranteed Success Promises**: The blockchain is immutable. Any firm promising "100% guaranteed recoveries" is misleading you.
2. **Upfront Software Cost Demands**: Fraudulent firms often claim they need upfront fees for "reversal software" or "private servers."
3. **Vague Licensing and Credentials**: Always check for physical office details, certified examiners (like CFE, CCI, or CHFI), and verifiable litigation support histories.

#### Building Trust with Absolute Evidentiary Standards
Our Miami headquarters operates with total transparency. We never make false promises of overnight results. Instead, we deliver certified blockchain intelligence reports that stand up to rigorous cross-examination in court.`,
    category: 'Scam Prevention',
    author: {
      name: 'Dr. Evelyn Croft',
      role: 'Director of Cyber Forensics',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150'
    },
    date: 'May 21, 2026',
    readTime: '6 min read',
    tags: ['Florida cryptocurrency recovery companies', 'Miami crypto asset forensics', 'identify fraudulent recovery firms']
  },
  {
    id: 'b15',
    title: 'US Token Approval Exploits: Revoking Suspect Smart Contract Permissions Safely',
    summary: 'A technical guide on how smart contract approval exploits operate, and step-by-step instructions for US investors to revoke malicious infinity permissions.',
    content: `### Token Approval Exploits in the US: Securing Your Web3 Wallet

Many active Web3 investors believe their hardware wallets are secure as long as their seed phrase remains private. However, a highly sophisticated exploit vector known as the "infinite token approval" can completely drain your wallet without ever accessing your hardware keys.

#### Technical Dissection: How Token Approvals Operate
When you interact with a decentralized exchange (DEX) or yield pool, you authorize a smart contract to move your tokens:
1. **The Approval Event Loop**: To improve user experience, contracts often request approval for the maximum transaction value ("infinite approval").
2. **Malicious Ownership Manipulation**: If a hacker exploits the smart contract or redirects the approval call, they obtain permission to withdraw your tokens at any time.
3. **The Silent Drain Exploit**: This permission persists indefinitely, allowing hackers to drain your wallet weeks or months after your initial transaction.

#### Step-by-Step Security Protocol for US Investors
* **Step 1: Check Active Approvals regularly**: Use trusted tools like Etherscan Token Approvals or Revoke.cash to review active permissions.
* **Step 2: Revoke Suspect Approvals Immediately**: Tap the "Revoke" button next to any unfamiliar smart contracts.
* **Step 3: Conduct a Wallet Security Audit**: If your wallet was compromised, our forensics team can analyze the malicious transaction to identify the developer's server and provide a complete trace report.`,
    category: 'Cryptocurrency Recovery',
    author: {
      name: 'Dr. Evelyn Croft',
      role: 'Director of Cyber Forensics',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150'
    },
    date: 'May 18, 2026',
    readTime: '6 min read',
    tags: ['revoke crypto token approvals USA', 'prevent infinite approval wallet drain', 'hardware ledger exploit mitigation']
  },
  {
    id: 'b16',
    title: 'Atlanta Blockchain Intelligence Desk: Tracing Ransomware and Corporate Crypto Theft',
    summary: 'A technical guide on how Atlanta forensic desks trace complex ransomware outflows and protect corporate Web3 treasuries.',
    content: `### Atlanta Blockchain Intelligence Desk: Mitigating Ransomware and Corporate Theft

Corporate treasuries and logistics organizations are increasingly targeted by advanced ransomware campaigns and corporate wallet exploits. These threats disrupt operations and put millions of dollars in digital reserves at risk.

#### Tracing Ransomware and Corporate Theft: Technical Steps
1. **Analyzing Multi-Hop Outflows**: Attackers route stolen tokens through multiple dynamic burner wallets, attempting to split and obfuscate the funds.
2. **Targeting Non-KYC Exchange Points**: Scammers leverage privacy pools and decentralized bridges to convert assets into harder-to-trace tokens.
3. **Compiling Actionable Evidence**: By analyzing transaction variables and timezone indices, we match lock and mint transaction signatures globally.

#### Securing Enterprise Valuations with Trojan Intelligence
Our Atlanta forensic team works in lockstep with leading enterprise counsel to locate, freeze, and secure these assets, delivering maximum security and recovery success.`,
    category: 'Digital Forensics',
    author: {
      name: 'Marcus Vance',
      role: 'Senior Investigator',
      avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150&h=150'
    },
    date: 'May 12, 2026',
    readTime: '7 min read',
    tags: ['Atlanta blockchain intelligence', 'trace ransomware crypto payments GA', 'enterprise cryptocurrency vault security']
  }
];

export const RESOURCES: ResourceItem[] = [
  {
    id: 'r1',
    title: 'Crypto Scam Initial Incident Evidentiary Checklist',
    category: 'Investigation Checklists',
    description: 'A structural PDF guide detailing what to preserve instantly (hashes, logs, headers) within the first 24 hours of identifying a digital asset theft.',
    fileSize: '1.4 MB',
    downloadCount: 1420
  },
  {
    id: 'r2',
    title: 'International Blockchain Tracing Methodologies & Standards 2026',
    category: 'Whitepapers',
    description: 'An academic whitepaper from Trojan Labs detailing our address risk attribution parameters, heuristic clustering mathematical weights, and compliance frameworks.',
    fileSize: '4.8 MB',
    downloadCount: 890
  },
  {
    id: 'r3',
    title: 'Annual Web3 Security & Asset Recovery Statistics Report',
    category: 'Industry Reports',
    description: 'A comprehensive review of transaction exploit vectors, global laundering exit points, and actual recovery success percentages for Q1 2026.',
    fileSize: '12.2 MB',
    downloadCount: 2110
  },
  {
    id: 'r4',
    title: 'Victim Recovery Guide: Navigating Crypto Fraud Subpoenas',
    category: 'Guides',
    description: 'A plain-language walkthrough detailing how to approach police forces, compile file logs, and coordinate private-certified forensics with public prosecutors.',
    fileSize: '2.1 MB',
    downloadCount: 3410
  }
];

export const FAQS: FaqItem[] = [
  {
    id: 'fq1',
    question: 'Can digital tracking guarantee recovery?',
    answer: 'Blockchain tracing acts as the forensic foundation. It establishes where assets are held (often inside centralized exchanges or cold storage). Recovery is of a dual-track process matching structural technical proof with legal locks, freeze petitions, or law-enforcement subpoenas. While recovery can never be guaranteed due to variations in jurisdiction, our visual evidence packages significantly maximize recovery success, as demonstrated by our historic cases.',
    category: 'Crypto Recovery'
  },
  {
    id: 'fq2',
    question: 'How does Trojan Recovery identify anonymous wallet owners?',
    answer: 'We analyze transaction behaviors, wallet clusters, and on-chain relationships. We also examine exchange deposit logs, monitor exit-ramp integrations, and collect off-chain OSINT data. Cybercriminals ultimately transfer assets to centralized, KYC-restricted exchanges to cash out, enabling us to link operational wallets back to real-life owners.',
    category: 'Blockchain Tracing'
  },
  {
    id: 'fq3',
    question: 'What is the standard timeline for an international investigation?',
    answer: 'General tracing operations are concluded within 3 to 7 business days, providing a complete transaction tree. Complex cases involving multi-asset routing or mixer protocols may require 14 days of deep forensic auditing. Legal coordinates, subpoenas, and actual asset recoveries operate on timelines bound to federal courts and jurisdictional prosecutors.',
    category: 'Timeline & Scheduling'
  },
  {
    id: 'fq4',
    question: 'Do you work directly with global police forces and courtrooms?',
    answer: 'Yes, our reports align with federal evidence standards. We routinely write court-ready forensic affidavits, work with global prosecutors, and coordinate operations with the cyber divisions of major law enforcement agencies worldwide.',
    category: 'Legal'
  },
  {
    id: 'fq5',
    question: 'How do you preserve client confidentiality and evidence privacy?',
    answer: 'All case evidence and files are secured on air-gapped systems implementing rigorous AES-256 data protection. We follow GDPR guidelines, maintain ISO/IEC 27001 secure storage standards, and require mutual non-disclosure agreements before reviewing case files.',
    category: 'Security'
  },
  {
    id: 'fq6',
    question: 'What should I do if my MetaMask or Trust Wallet seed phrase is compromised?',
    answer: 'Immediately move any remaining tokens or NFTs to a newly created cold storage or hardware wallet address. Do not use the compromised wallet for any future transactions. Revoke any infinite token or smart contract approvals, export your transaction history, and contact the Trojan Recovery forensic desk to trace the exact movement of stolen assets.',
    category: 'Security'
  },
  {
    id: 'fq7',
    question: 'Can stolen cryptocurrency be recovered from smart contract liquidity pools?',
    answer: 'Yes. If funds are sent to a protocol with active admin control or an upgradable proxy contract design, we can collaborate with the core development foundation or deploy evidence demonstrating theft to coordinate a recovery path. If locked in standard decentralized pools, tracing provides the necessary forensic evidence to sub-serve target platforms or exit gateways.',
    category: 'Crypto Recovery'
  },
  {
    id: 'fq8',
    question: 'Is it possible to track stolen Bitcoin or USDT run through mixers?',
    answer: 'Yes. Modern blockchain analytics leverage advanced state-of-the-art flow taint algorithms and ring-signature tracing to de-obfuscate transaction patterns inside mixers. We isolate gas characteristics, timing similarities, and multi-hop outputs to establish high-confidence links between input and output wallets.',
    category: 'Blockchain Tracing'
  },
  {
    id: 'fq9',
    question: 'How does Trojan Recovery help victims of "Pig Butchering" investment scams?',
    answer: 'We trace the movement of funds from initial credit card or banking purchases through the fraudulent platform to centralized off-ramp exchanges. Our certified cyber analysts compile interactive visual graphs and structured reporting to assist state, federal, or international law enforcement in recovering assets.',
    category: 'Scam Prevention'
  },
  {
    id: 'fq10',
    question: 'Why do litigation attorneys request certified blockchain forensic reports?',
    answer: 'Courts require admissible evidence that maintains clear chain of custody under US Federal Evidence rules. Our forensic reports include cryptographically verified timestamps, transaction hashes, and formal analyst-signed affidavits suitable for legal preservation, civil subpoenas, and asset attachment orders.',
    category: 'Legal'
  },
  {
    id: 'fq11',
    question: 'Does Trojan Recovery operate internationally or only within the USA?',
    answer: 'We operate internationally with clients, attorneys, and exchanges in over 40 countries. Our specialists navigate different jurisdictional processes, executing international asset tracings and assisting clients in translating reports for domestic law enforcement agencies.',
    category: 'Crypto Recovery'
  },
  {
    id: 'fq12',
    question: 'How do I avoid recovery fee scammers who promise overnight results?',
    answer: 'Be cautious of anyone claiming to have access to backdoor database delete requests or offering a 100% guarantee of recovery. Legitimate recoveries require careful blockchain tracing and legal cooperation. Genuine firms like Trojan Recovery never require client private keys or charge arbitrary fees for "pre-funding" network transactions.',
    category: 'Scam Prevention'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    quote: 'Trojan Recovery provided the critical forensic mapping we needed to secure a fast freeze of our compromised liquidity pool. Their experts delivered a court-ready affidavit in less than 24 hours.',
    author: 'Sarah Jenkins',
    role: 'General Counsel',
    company: 'Sovereign DeFi Labs',
    rating: 5,
    isVerified: true
  },
  {
    id: 't2',
    quote: 'After losing my venture capital holdings to a highly sophisticated browser keylogger scam, Trojan\'s senior tracing analysts isolated the target deposit points across three countries, helping us recover our funds.',
    author: 'David Vance',
    role: 'Managing Partner',
    company: 'Capital Block Group',
    rating: 5,
    isVerified: true
  },
  {
    id: 't3',
    quote: 'Their expert witness deposition was pivotal in proving our case in court. They made complex block-clustering concepts accessible to both the jury and the federal judge.',
    author: 'Robert Sterling, Esq.',
    role: 'Senior Litigation Partner',
    company: 'Sterling & Croft LLC',
    rating: 5,
    isVerified: true
  },
  {
    id: 't4',
    quote: 'Our firm engaged Trojan Recovery to trace a cyber breach involving over $1.2M in stolen stablecoins. Their depth of analysis, responsive approach, and collaboration with federal agencies enabled us to recover 90% of the stolen assets.',
    author: 'Alexander Cole',
    role: 'Managing Director',
    company: 'Cole Ventures',
    rating: 5,
    isVerified: true
  },
  {
    id: 't5',
    quote: 'When our smart contracts were targeted by a flash loan arbitrage attack, Trojan acted within minutes. They tracked the outbound gas fee lines straight to an exchange account, leading to an immediate asset hold.',
    author: 'Maria De Souza',
    role: 'Head of Security',
    company: 'LatAm DeFi Protocol',
    rating: 5,
    isVerified: true
  },
  {
    id: 't6',
    quote: 'As a retired cyber divisions chief, I have vetted many blockchain forensics groups. Trojan Recovery maintains pristine technical standards, strict evidentiary custody, and a highly responsive field squad.',
    author: 'Robert Lawson',
    role: 'Ret. Cyber Division Chief',
    company: 'State Bureau of Investigation',
    rating: 5,
    isVerified: true
  },
  {
    id: 't7',
    quote: 'I fell victim to a highly realistic DeFi staking pool scam. The Trojan team mapped the outflow of my Bitcoin holdings into multi-signature folders, enabling the attorney to file a subpoena that secured my assets.',
    author: 'Kevin Patel',
    role: 'Retail Investor',
    company: 'Private Portfolio',
    rating: 5,
    isVerified: true
  },
  {
    id: 't8',
    quote: 'As a regulated custodian, checking asset origin is critical. Trojan Recovery is our primary vendor for deep-dive tracking audits, ensuring all processed assets comply with strict regulatory frameworks.',
    author: 'Diana Vance',
    role: 'Compliance Officer',
    company: 'Zenith Digital Asset Custody',
    rating: 5,
    isVerified: true
  },
  {
    id: 't9',
    quote: 'The visual transaction graphs produced by Trojan Recovery were instrumental in our civil recovery litigation. The diagrams traced the suspect funds clearly, leaving no room for speculation or alternative interpretations.',
    author: 'Thomas Ward, Esq.',
    role: 'Managing Counsel',
    company: 'Ward & Associates Legal',
    rating: 5,
    isVerified: true
  },
  {
    id: 't10',
    quote: 'Our engineering team was impressed by their bytecode level investigation. They did not just track on-chain tokens; they dissected call parameters to prove identical operator authorship.',
    author: 'Dr. Aris Thorne',
    role: 'Principal Architect',
    company: 'Nexus Labs',
    rating: 5,
    isVerified: true
  }
];
