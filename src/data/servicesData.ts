import { Service } from '../types';

export const SERVICES: Service[] = [
  {
    id: 'crypto-asset-recovery',
    title: 'Crypto Asset Recovery',
    shortDesc: 'Strategic tracing and liaison consulting to freeze and recover lost digital funds.',
    longDesc: 'Operating under strict US forensic guidelines, we trace lost or stolen digital assets across standard smart contracts and high-risk exchange endpoints. We coordinate directly with compliance desks and state/federal regulatory networks to secure emergency assets and return what is Yours.',
    iconName: 'ShieldCheck',
    benefits: [
      'Fast-response asset freeze coordination',
      'Court-admissible blockchain tracing affidavits',
      'Direct liaison with compliance departments of major exchanges',
      'End-to-end audit trails standard for US federal courts'
    ],
    methodologies: ['Heuristic wallet classification', 'Emergency exchange notifications', 'Escrow recovery tracing']
  },
  {
    id: 'blockchain-analysis',
    title: 'Blockchain Analysis',
    shortDesc: 'State-of-the-art cryptographic ledger tracing to map multi-layer financial flows.',
    longDesc: 'We employ advanced graph heuristics, proprietary node-clustering models, and automated ledger scanning to trace funds through cross-chain bridges and decentralized routers. Our detailed transaction maps expose nested transfer structures to locate ultimate cashpoint destinations.',
    iconName: 'Network',
    benefits: [
      'Multi-hop UTXO split analysis',
      'Proprietary address-clustering datasets',
      'De-anonymization of hidden change addresses',
      'Integration with international and US agency forensic protocols'
    ],
    methodologies: ['Signature-matching attribute mapping', 'GAS spend profile analysis', 'Transaction-mixer de-layering']
  },
  {
    id: 'investment-fraud-recovery',
    title: 'Investment Fraud Recovery',
    shortDesc: 'Comprehensive tracking of pig butchering, yield farm scams, Ponzi schemes, and rug pulls.',
    longDesc: 'Phishing and pig butchering syndicates are highly sophisticated operations targeting US investors. Trojan forensic analysts disassemble suspect smart contracts, trace developer deployer addresses, group transaction clusters, and prepare formal documentation for federal enforcement divisions.',
    iconName: 'ShieldAlert',
    benefits: [
      'DeFi rug-pull smart contract audits',
      'Detailed entity cluster tracking and attribution mapping',
      'Aggregated multi-victim pooling affidavits for FBI/IC3 filings',
      'High-threat platform threat profiling'
    ],
    methodologies: ['Deployer routing and tracking', 'Liquidity pool withdrawal auditing', 'Regulatory AML risk profiling']
  },
  {
    id: 'wallet-access-restoration',
    title: 'Wallet Access Restoration',
    shortDesc: 'Restoring secure custody of lost, locked, or hardware-compromised multi-sig wallets.',
    longDesc: 'We help high-net-worth individuals and corporate Treasuries rebuild seed phrases, recover access to hardware devices, and isolate browser-based Trojan injects. All operations are conducted in our secure, airlinked forensic sandbox compliant with national privacy criteria.',
    iconName: 'Wallet',
    benefits: [
      'Airlocked seed reconstruction environments',
      'Malice browser extension and keylogger dissection',
      'Multi-sig authentication recovery assist',
      'Hardware custody failure recovery auditing'
    ],
    methodologies: ['Volatile memory capture analysis', 'Hardware module inspection', 'Private key decryption validation']
  }
];
