
import React, { useState, useMemo, useEffect, memo } from 'react';
import { 
    Search, 
    ShieldCheck, 
    ShieldAlert, 
    Gem, 
    ExternalLink, 
    Globe, 
    Zap, 
    Activity, 
    X,
    CheckCircle2,
    Timer,
    Landmark,
    ArrowLeft,
    Filter,
    SlidersHorizontal,
    ArrowUpDown,
    ThumbsUp,
    ThumbsDown,
    AlertTriangle,
    Smartphone,
    CreditCard,
    Network
} from 'lucide-react';

// --- TYPES ---
interface Casino {
    id: string;
    name: string;
    website: string;
    logo: string;
    rating: number;
    status: 'VERIFIED' | 'UNVERIFIED';
    bonus: string;
    established: string;
    withdrawalSpeed: string;
    license: string;
    founder: string;
    companySize: string;
    specialRanking?: 'ETERNAL CROWN' | 'ELITE TIER' | 'VETERAN';
    tags: string[];
    restricted: string[];
    chains: string[];
    languages: string[];
    kycLevel: 'NONE' | 'LOW' | 'HIGH';
    description: string;
    advisory: string;
    zeroEdge: boolean;
    pros: string[];
    cons: string[];
    features: {
        vpnFriendly: boolean;
        fiatOnramp: boolean;
        liveChat: boolean;
        mobileApp: boolean;
        p2pTransfer: boolean;
    };
}

type SortOption = 'RATING_DESC' | 'RATING_ASC' | 'NEWEST' | 'SPEED';

// --- MOCK DATA ---
const CASINOS: Casino[] = [
    { 
        id: 'duel', 
        name: 'Duel', 
        website: 'https://duel.com', 
        logo: 'https://files.catbox.moe/p4z3v7.jpg', 
        rating: 5.0, 
        status: 'VERIFIED', 
        bonus: '50% Rakeback', 
        established: '2023', 
        withdrawalSpeed: 'Instant (L2)', 
        license: 'Curaçao', 
        founder: 'Unknown (DAO)',
        companySize: '50-100',
        specialRanking: 'ETERNAL CROWN', 
        tags: ['Zero Edge', 'No KYC', 'PVP'], 
        restricted: ['USA', 'France'], 
        chains: ['BTC', 'ETH', 'LTC', 'SOL'],
        languages: ['English', 'Spanish', 'Portuguese', 'Japanese'],
        kycLevel: 'NONE',
        description: 'The new standard for PVP gaming. Built on high-frequency L2 rails for instant settlement. Zero-edge original games and massive rakeback rewards.',
        advisory: 'AUDIT PASSED 10/2025. Zero-Edge protocols verified on-chain.',
        zeroEdge: true,
        pros: ['Zero house edge on originals', 'No KYC required for crypto', 'Instant L2 settlements'],
        cons: ['Limited slot selection', 'No sports betting'],
        features: { vpnFriendly: true, fiatOnramp: true, liveChat: true, mobileApp: false, p2pTransfer: true }
    },
    { 
        id: 'stake', 
        name: 'Stake', 
        website: 'https://stake.com', 
        logo: 'https://files.catbox.moe/klt24q.jpg', 
        rating: 4.9, 
        status: 'VERIFIED', 
        bonus: '$1000 Monthly', 
        established: '2017', 
        withdrawalSpeed: '< 10 Mins', 
        license: 'Curaçao', 
        founder: 'Eddie Miroslav',
        companySize: '500+',
        specialRanking: 'ELITE TIER', 
        tags: ['Sportsbook', 'Originals', 'High Limit'], 
        restricted: ['USA', 'UK', 'Australia'], 
        chains: ['BTC', 'ETH', 'LTC', 'DOGE', 'EOS'],
        languages: ['English', 'German', 'Spanish', 'French', 'Russian', 'Portuguese'],
        kycLevel: 'LOW',
        description: 'The industry titan. Unmatched liquidity, massive sports betting markets, and the original provably fair games that started the revolution.',
        advisory: 'STABLE OPERATION. High liquidity reserves confirmed.',
        zeroEdge: false,
        pros: ['Massive liquidity for high rollers', 'Industry leading sports odds', 'Top-tier VIP program'],
        cons: ['Strict KYC for large withdrawals', 'Restricted in many regions'],
        features: { vpnFriendly: false, fiatOnramp: true, liveChat: true, mobileApp: false, p2pTransfer: true }
    },
    { 
        id: 'whale', 
        name: 'Whale.io', 
        website: 'https://whale.io', 
        logo: 'https://files.catbox.moe/7zy00k.jpg', 
        rating: 4.8, 
        status: 'VERIFIED', 
        bonus: '20% Cashback', 
        established: '2022', 
        withdrawalSpeed: 'Instant', 
        license: 'Anjouan', 
        founder: 'Undisclosed',
        companySize: '10-50',
        tags: ['Telegram Auth', 'No KYC', 'Web3'], 
        restricted: ['USA', 'Netherlands'], 
        chains: ['TON', 'USDT', 'BTC'],
        languages: ['English', 'Russian'],
        kycLevel: 'NONE',
        description: 'Frictionless entry via Telegram. Whale.io specializes in high-roller action with absolute privacy and instant TON network settlements.',
        advisory: 'PRIVACY FOCUSED. No PII storage detected.',
        zeroEdge: false,
        pros: ['Telegram integration', 'Complete privacy (No KYC)', 'Instant TON withdrawals'],
        cons: ['Smaller game library', 'Limited fiat support'],
        features: { vpnFriendly: true, fiatOnramp: true, liveChat: true, mobileApp: true, p2pTransfer: false }
    },
    { 
        id: 'bcgame', 
        name: 'BC.GAME', 
        website: 'https://bc.game', 
        logo: 'https://files.catbox.moe/810c57.jpg', 
        rating: 4.7, 
        status: 'VERIFIED', 
        bonus: '180% Deposit', 
        established: '2017', 
        withdrawalSpeed: '~1 Hour', 
        license: 'Curaçao', 
        founder: 'BlockDance B.V.',
        companySize: '200-500',
        tags: ['Huge Community', 'Rain', 'DeFi'], 
        restricted: ['USA', 'China'], 
        chains: ['BTC', 'ETH', 'BNB', 'SOL', 'TRX'],
        languages: ['English', 'Chinese', 'Spanish', 'French', 'German', 'Japanese'],
        kycLevel: 'LOW',
        description: 'A massive ecosystem of proprietary games and community features. BC.Game offers one of the most generous deposit match structures in the sector.',
        advisory: 'BONUS TERMS: Wager requirements apply to unlocked BCD.',
        zeroEdge: false,
        pros: ['Supports 50+ cryptocurrencies', 'Huge community & chat rain', 'Daily free spins'],
        cons: ['Complex bonus unlocking', 'Cluttered interface'],
        features: { vpnFriendly: true, fiatOnramp: true, liveChat: true, mobileApp: true, p2pTransfer: true }
    },
    { 
        id: 'duelbits', 
        name: 'Duelbits', 
        website: 'https://duelbits.com', 
        logo: 'https://files.catbox.moe/e8i1og.jpg', 
        rating: 4.7, 
        status: 'VERIFIED', 
        bonus: '50% Rakeback', 
        established: '2020', 
        withdrawalSpeed: 'Instant', 
        license: 'Curaçao', 
        founder: 'Liquid Gaming N.V.',
        companySize: '50-200',
        tags: ['CS:GO Skins', 'PVP', 'Rewards'], 
        restricted: ['USA', 'Singapore'], 
        chains: ['BTC', 'ETH', 'LTC', 'CSGO'],
        languages: ['English', 'Spanish', 'German'],
        kycLevel: 'LOW',
        description: 'Bridging the gap between crypto and skin gambling. Known for its "Ace\'s Lounge" VIP program and instant crypto/skin withdrawals.',
        advisory: 'SKIN DEPOSITS: Valve trade hold times apply.',
        zeroEdge: false,
        pros: ['Accepts CS:GO/Dota skins', 'High rakeback rates', 'Polished UI'],
        cons: ['No welcome deposit bonus', 'Skin deposits have spread'],
        features: { vpnFriendly: false, fiatOnramp: true, liveChat: true, mobileApp: false, p2pTransfer: true }
    },
    { 
        id: 'gamdom', 
        name: 'Gamdom', 
        website: 'https://gamdom.com', 
        logo: 'https://files.catbox.moe/jav4a4.jpg', 
        rating: 4.6, 
        status: 'VERIFIED', 
        bonus: '60% Rakeback', 
        established: '2016', 
        withdrawalSpeed: 'Instant', 
        license: 'Curaçao', 
        founder: 'Felix Römer',
        companySize: '50-200',
        tags: ['Social', 'Rain', 'Skins'], 
        restricted: ['USA', 'UK'], 
        chains: ['BTC', 'ETH', 'LTC'],
        languages: ['English', 'Russian', 'Turkish'],
        kycLevel: 'LOW',
        description: 'A veteran platform with a unique social focus. Its "Rain" bot and chat features create a lively community atmosphere backed by solid tech.',
        advisory: 'SOCIAL FEATURES: Chat moderation is strict.',
        zeroEdge: false,
        pros: ['Active chat rain/snow', 'Instant skin withdrawals', 'Strong community'],
        cons: ['Limited crypto options', 'Strict chat rules'],
        features: { vpnFriendly: false, fiatOnramp: true, liveChat: true, mobileApp: false, p2pTransfer: true }
    },
    { 
        id: 'chips', 
        name: 'Chips', 
        website: 'https://chips.com', 
        logo: 'https://files.catbox.moe/x0zu6m.jpg', 
        rating: 4.6, 
        status: 'VERIFIED', 
        bonus: '$50 Free Chip', 
        established: '2020', 
        withdrawalSpeed: '24 Hours', 
        license: 'Curaçao', 
        founder: 'Original Games Group',
        companySize: '10-50',
        tags: ['Proprietary Games', 'Dividends'], 
        restricted: ['USA'], 
        chains: ['BTC', 'ETH', 'TRX'],
        languages: ['English'],
        kycLevel: 'HIGH',
        description: 'Focuses on proprietary slot mechanics and a dividend-sharing token model. Slower withdrawals but high trust and unique content.',
        advisory: 'DIVIDENDS: Payouts depend on casino profit volume.',
        zeroEdge: false,
        pros: ['Unique proprietary slots', 'Profit sharing token', 'Community focused'],
        cons: ['Slower withdrawals', 'Smaller game library'],
        features: { vpnFriendly: false, fiatOnramp: false, liveChat: true, mobileApp: false, p2pTransfer: false }
    },
    { 
        id: 'sportsbet', 
        name: 'Sportsbet.io', 
        website: 'https://sportsbet.io', 
        logo: 'https://files.catbox.moe/v2jp51.jpg', 
        rating: 4.5, 
        status: 'VERIFIED', 
        bonus: 'Weekly Free Bet', 
        established: '2016', 
        withdrawalSpeed: '< 30 Mins', 
        license: 'Curaçao', 
        founder: 'Yolo Group',
        companySize: '500+',
        tags: ['Sports Focus', 'VIP'], 
        restricted: ['USA', 'Australia'], 
        chains: ['BTC', 'ETH', 'USDT'],
        languages: ['English', 'Portuguese', 'Spanish', 'Japanese'],
        kycLevel: 'HIGH',
        description: 'The premier destination for crypto sports betting. Official partner of major football clubs. Corporate-level reliability.',
        advisory: 'VERIFICATION: Mandatory for large sports wagers.',
        zeroEdge: false,
        pros: ['Best-in-class sports odds', 'Official club partnerships', 'Reliable mobile app'],
        cons: ['Strict KYC', 'Lower casino focus'],
        features: { vpnFriendly: false, fiatOnramp: true, liveChat: true, mobileApp: true, p2pTransfer: false }
    },
    { 
        id: 'betfury', 
        name: 'BetFury', 
        website: 'https://betfury.com', 
        logo: 'https://files.catbox.moe/tw3eoe.jpg', 
        rating: 4.5, 
        status: 'VERIFIED', 
        bonus: 'Staking APY', 
        established: '2019', 
        withdrawalSpeed: 'Instant', 
        license: 'Curaçao', 
        founder: 'Universe B Games',
        companySize: '100-200',
        tags: ['Dividend Token', 'Staking'], 
        restricted: ['USA'], 
        chains: ['BTC', 'BNB', 'TRX', 'USDT'],
        languages: ['English', 'Russian', 'Spanish'],
        kycLevel: 'LOW',
        description: 'Pioneered the "wager-to-mine" model. Holders of BFG tokens earn daily dividends from the casino\'s profit pool.',
        advisory: 'TOKENOMICS: Dividend rates fluctuate with pool volume.',
        zeroEdge: false,
        pros: ['Daily dividend payouts', 'Free BTC faucet', 'Multi-chain support'],
        cons: ['High wagering for mining', 'Complex tokenomics'],
        features: { vpnFriendly: true, fiatOnramp: true, liveChat: true, mobileApp: false, p2pTransfer: true }
    },
    { 
        id: 'rollbit', 
        name: 'Rollbit', 
        website: 'https://rollbit.com', 
        logo: 'https://files.catbox.moe/wpp3nk.jpg', 
        rating: 4.4, 
        status: 'VERIFIED', 
        bonus: 'RLB Airdrop', 
        established: '2020', 
        withdrawalSpeed: 'Instant', 
        license: 'Curaçao', 
        founder: 'Bull Gaming',
        companySize: '50-200',
        tags: ['NFT', 'Crypto Futures', '1000x'], 
        restricted: ['USA', 'UK'], 
        chains: ['BTC', 'ETH', 'SOL', 'LTC'],
        languages: ['English'],
        kycLevel: 'LOW',
        description: 'A crypto-native powerhouse blending high-leverage trading, NFT loans, and casino games. High volatility, high reward.',
        advisory: 'FUTURES RISK: 1000x leverage involves extreme liquidation risk.',
        zeroEdge: false,
        pros: ['Crypto futures trading', 'NFT marketplace', 'Innovative features'],
        cons: ['Volatile native token', 'Complex UI for beginners'],
        features: { vpnFriendly: false, fiatOnramp: true, liveChat: true, mobileApp: false, p2pTransfer: true }
    },
    { 
        id: 'rainbet', 
        name: 'Rainbet', 
        website: 'https://rainbet.com', 
        logo: 'https://files.catbox.moe/0jft4x.jpg', 
        rating: 4.4, 
        status: 'VERIFIED', 
        bonus: 'Wager Wars', 
        established: '2023', 
        withdrawalSpeed: 'Instant', 
        license: 'Curaçao', 
        founder: 'Rainbet Team',
        companySize: '10-50',
        tags: ['Streamer Fav', 'No KYC'], 
        restricted: ['USA'], 
        chains: ['BTC', 'ETH', 'LTC'],
        languages: ['English'],
        kycLevel: 'NONE',
        description: 'Fast, focused, and streamer-friendly. Known for "Wager Wars" leaderboards and a clean, no-nonsense interface.',
        advisory: 'NO KYC: Limits apply to unverified high-volume accounts.',
        zeroEdge: false,
        pros: ['No KYC required', 'Streamer integration', 'Simple, fast UI'],
        cons: ['Limited game selection', 'Newer platform'],
        features: { vpnFriendly: true, fiatOnramp: false, liveChat: true, mobileApp: false, p2pTransfer: false }
    },
    { 
        id: 'goated', 
        name: 'Goated', 
        website: 'https://goated.com', 
        logo: 'https://files.catbox.moe/qp4oyy.jpg', 
        rating: 4.4, 
        status: 'UNVERIFIED', 
        bonus: 'Beta Access', 
        established: '2024', 
        withdrawalSpeed: 'Unknown', 
        license: 'Pending', 
        founder: 'Goated DAO',
        companySize: '< 10',
        tags: ['New', 'Beta'], 
        restricted: ['Global'], 
        chains: ['SOL'],
        languages: ['English'],
        kycLevel: 'NONE',
        description: 'An upcoming Solana-based platform currently in closed beta. Promising roadmap but currently unproven at scale.',
        advisory: 'BETA STATUS: Expect bugs. Use burner wallets.',
        zeroEdge: false,
        pros: ['Solana speed', 'Community governance', 'Early adopter rewards'],
        cons: ['Unproven track record', 'Beta bugs'],
        features: { vpnFriendly: true, fiatOnramp: false, liveChat: false, mobileApp: false, p2pTransfer: false }
    },
    { 
        id: 'shuffle', 
        name: 'Shuffle', 
        website: 'https://shuffle.com', 
        logo: 'https://files.catbox.moe/pkbfod.png', 
        rating: 4.3, 
        status: 'VERIFIED', 
        bonus: 'SHFL Airdrop', 
        established: '2023', 
        withdrawalSpeed: 'Instant', 
        license: 'Curaçao', 
        founder: 'Noah',
        companySize: '50-100',
        tags: ['Tokenized', 'Airdrop'], 
        restricted: ['USA'], 
        chains: ['BTC', 'ETH', 'USDC', 'TRX'],
        languages: ['English', 'Japanese'],
        kycLevel: 'LOW',
        description: 'Heavily integrated with its native SHFL token. Offers a sleek UI and aggressive rewards for active token holders.',
        advisory: 'TOKEN VOLATILITY: SHFL price impacts effective rakeback value.',
        zeroEdge: false,
        pros: ['Sleek modern design', 'SHFL token utility', 'Transparent team'],
        cons: ['Token price volatility', 'Limited payment options'],
        features: { vpnFriendly: false, fiatOnramp: true, liveChat: true, mobileApp: false, p2pTransfer: true }
    },
    { 
        id: 'blockbet', 
        name: 'BlockBet', 
        website: 'https://blockbet.com', 
        logo: 'https://files.catbox.moe/e6i3yr.jpg', 
        rating: 4.3, 
        status: 'UNVERIFIED', 
        bonus: 'Deposit Match', 
        established: '2022', 
        withdrawalSpeed: '24-48h', 
        license: 'Curaçao', 
        founder: 'Unknown',
        companySize: '10-50',
        tags: ['Sports'], 
        restricted: ['USA'], 
        chains: ['BTC', 'ETH'],
        languages: ['English'],
        kycLevel: 'HIGH',
        description: 'A solid mid-tier option focusing on sports. Verification processes are stricter than average, leading to slower onboarding.',
        advisory: 'SLOW PAYOUTS: Manual review on withdrawals > $1k.',
        zeroEdge: false,
        pros: ['Good sports coverage', 'Deposit match bonus'],
        cons: ['Slow withdrawals', 'Strict KYC'],
        features: { vpnFriendly: false, fiatOnramp: true, liveChat: true, mobileApp: false, p2pTransfer: false }
    },
    { 
        id: 'razed', 
        name: 'Razed', 
        website: 'https://razed.com', 
        logo: 'https://files.catbox.moe/xvg0gy.jpg', 
        rating: 4.2, 
        status: 'UNVERIFIED', 
        bonus: 'Mystery Box', 
        established: '2023', 
        withdrawalSpeed: '< 1 Hour', 
        license: 'Curaçao', 
        founder: 'Razed Team',
        companySize: '10-50',
        tags: ['Mystery', 'New'], 
        restricted: ['USA'], 
        chains: ['BTC', 'ETH', 'LTC'],
        languages: ['English', 'German'],
        kycLevel: 'LOW',
        description: 'Gamifies the reward experience with Mystery Boxes. Good UI, but relatively new with less history to audit.',
        advisory: 'NEW OPERATOR: Limited long-term solvency data.',
        zeroEdge: false,
        pros: ['Gamified rewards', 'Clean interface'],
        cons: ['Unproven history', 'Limited crypto support'],
        features: { vpnFriendly: true, fiatOnramp: true, liveChat: true, mobileApp: false, p2pTransfer: false }
    },
    { 
        id: 'roobet', 
        name: 'Roobet', 
        website: 'https://roobet.com', 
        logo: 'https://files.catbox.moe/of4dut.jpg', 
        rating: 4.2, 
        status: 'VERIFIED', 
        bonus: 'Snoop Dogg', 
        established: '2019', 
        withdrawalSpeed: 'Instant', 
        license: 'Curaçao', 
        founder: 'Raw Entertainment',
        companySize: '200-500',
        tags: ['Brand', 'Slots'], 
        restricted: ['USA', 'UK'], 
        chains: ['BTC', 'ETH', 'LTC'],
        languages: ['English', 'Spanish', 'Portuguese'],
        kycLevel: 'HIGH',
        description: 'Famous for high-profile partnerships (Snoop Dogg, UFC). Extremely polished but has strict KYC and region blocking.',
        advisory: 'GEO-RESTRICTION: Aggressive VPN detection active.',
        zeroEdge: false,
        pros: ['High-profile partnerships', 'Massive slot library', 'Reliable payouts'],
        cons: ['Strict VPN detection', 'Mandatory KYC'],
        features: { vpnFriendly: false, fiatOnramp: true, liveChat: true, mobileApp: false, p2pTransfer: false }
    },
    { 
        id: 'yeet', 
        name: 'Yeet', 
        website: 'https://yeet.com', 
        logo: 'https://files.catbox.moe/6kol09.jpg', 
        rating: 4.1, 
        status: 'UNVERIFIED', 
        bonus: 'Unknown', 
        established: '2024', 
        withdrawalSpeed: 'Unknown', 
        license: 'None', 
        founder: 'Anon',
        companySize: '< 5',
        tags: ['Degen', 'High Risk'], 
        restricted: ['None'], 
        chains: ['SOL'],
        languages: ['English'],
        kycLevel: 'NONE',
        description: 'Experimental high-risk platform on Solana. Very few protections, use extreme caution.',
        advisory: 'HIGH RISK: Unlicensed platform. Do not store funds.',
        zeroEdge: false,
        pros: ['No restrictions', 'Solana native'],
        cons: ['High risk of rugpull', 'No support'],
        features: { vpnFriendly: true, fiatOnramp: false, liveChat: false, mobileApp: false, p2pTransfer: false }
    },
    { 
        id: 'moonroll', 
        name: 'Moonroll', 
        website: 'https://moonroll.com', 
        logo: 'https://files.catbox.moe/n7pja5.jpg', 
        rating: 4.1, 
        status: 'UNVERIFIED', 
        bonus: 'Faucet', 
        established: '2023', 
        withdrawalSpeed: 'Instant', 
        license: 'None', 
        founder: 'Moon Team',
        companySize: '10-50',
        tags: ['PVP', 'Simple'], 
        restricted: ['USA'], 
        chains: ['ETH'],
        languages: ['English'],
        kycLevel: 'NONE',
        description: 'Simplified PVP games. No license, purely crypto-native. Good for quick games but lacks institutional trust.',
        advisory: 'UNREGULATED: No recourse for disputes.',
        zeroEdge: false,
        pros: ['Instant PVP action', 'Simple UI'],
        cons: ['Unlicensed', 'Limited games'],
        features: { vpnFriendly: true, fiatOnramp: false, liveChat: true, mobileApp: false, p2pTransfer: false }
    },
    { 
        id: '500casino', 
        name: '500 Casino', 
        website: 'https://500casino.com', 
        logo: 'https://files.catbox.moe/da6qov.jpg', 
        rating: 4.0, 
        status: 'VERIFIED', 
        bonus: 'XP Rewards', 
        established: '2016', 
        withdrawalSpeed: 'Instant', 
        license: 'Curaçao', 
        founder: 'Perfect Storm B.V.',
        companySize: '50-100',
        tags: ['Skins', 'Classics'], 
        restricted: ['USA'], 
        chains: ['BTC', 'ETH'],
        languages: ['English', 'Turkish', 'German', 'Russian', 'Spanish', 'Portuguese', 'Polish', 'Romanian', 'Danish'],
        kycLevel: 'HIGH',
        description: 'Formerly CSGO500. A classic skin gambling site that pivoted to crypto. Reliable but feels dated compared to new entrants.',
        advisory: 'LEGACY SYSTEM: Solid reliability, outdated UI.',
        zeroEdge: false,
        pros: ['Long operating history', 'Skin support'],
        cons: ['Dated interface', 'Slower innovation'],
        features: { vpnFriendly: false, fiatOnramp: true, liveChat: true, mobileApp: false, p2pTransfer: true }
    },
    { 
        id: 'metawin', 
        name: 'MetaWin', 
        website: 'https://metawin.com', 
        logo: 'https://files.catbox.moe/yr8ksr.jpg', 
        rating: 3.9, 
        status: 'UNVERIFIED', 
        bonus: 'NFT Prizes', 
        established: '2022', 
        withdrawalSpeed: 'Instant', 
        license: 'Unregulated', 
        founder: 'Skel',
        companySize: '10-50',
        tags: ['Web3', 'NFT'], 
        restricted: ['USA'], 
        chains: ['ETH'],
        languages: ['English'],
        kycLevel: 'NONE',
        description: 'Web3-first platform. Connect wallet to play. Prizes are often NFTs. Smart contract based, but unregulated.',
        advisory: 'SMART CONTRACT RISK: Direct wallet interaction required.',
        zeroEdge: false,
        pros: ['Web3 login', 'NFT integration'],
        cons: ['Smart contract risk', 'High ETH gas fees'],
        features: { vpnFriendly: true, fiatOnramp: false, liveChat: false, mobileApp: false, p2pTransfer: false }
    },
];

// --- HELPERS ---
const sortCasinos = (casinos: Casino[], sort: SortOption) => {
    const c = [...casinos];
    switch (sort) {
        case 'RATING_DESC': return c.sort((a, b) => b.rating - a.rating);
        case 'RATING_ASC': return c.sort((a, b) => a.rating - b.rating);
        case 'NEWEST': return c.sort((a, b) => parseInt(b.established) - parseInt(a.established));
        case 'SPEED': return c; // Approximate for now
        default: return c;
    }
};

// --- COMPONENTS ---

const FilterChip = ({ label, active, onClick, icon: Icon }: { label: string, active: boolean, onClick: () => void, icon?: React.ElementType }) => (
    <button 
        onClick={onClick}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${active ? 'bg-[#00FFC0] text-black border-[#00FFC0] shadow-[0_0_15px_rgba(0,255,192,0.3)]' : 'bg-[#0e0e10] text-zinc-400 border-[#333] hover:border-zinc-500 hover:text-white'}`}
    >
        {Icon && <Icon className={`w-3 h-3 ${active ? 'text-black' : 'text-zinc-500'}`} />}
        {label}
    </button>
);

const CasinoCard = memo(({ casino, onSelect, index }: { casino: Casino; onSelect: (c: Casino) => void; index: number }) => {
    const isCrown = casino.specialRanking === 'ETERNAL CROWN';
    const isElite = casino.specialRanking === 'ELITE TIER';

    return (
        <div 
            onClick={() => onSelect(casino)}
            className="group relative rounded-xl overflow-hidden cursor-pointer flex flex-col bg-[#09090b] border border-white/5 hover:border-[#00FFC0]/50 transition-all duration-300 active:scale-[0.99] hover:shadow-[0_0_30px_rgba(0,255,192,0.05)] h-full animate-fade-up"
            style={{ animationDelay: `${Math.min(index * 0.05, 0.5)}s`, animationFillMode: 'backwards' }}
        >
            {/* Rank/Status Badge */}
            <div className="absolute top-3 right-3 z-20 flex flex-col gap-2 items-end">
                {isCrown && (
                    <div className="bg-[#00FFC0] text-black text-[9px] font-black px-2 py-1 rounded-md uppercase tracking-wider shadow-lg flex items-center gap-1">
                        <Gem className="w-3 h-3" /> Crown
                    </div>
                )}
                {isElite && (
                    <div className="bg-purple-500 text-white text-[9px] font-black px-2 py-1 rounded-md uppercase tracking-wider shadow-lg flex items-center gap-1">
                        <Activity className="w-3 h-3" /> Elite
                    </div>
                )}
                 <div className={`px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider border ${casino.status === 'VERIFIED' ? 'bg-[#00FFC0]/10 text-[#00FFC0] border-[#00FFC0]/20' : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'}`}>
                    {casino.status === 'VERIFIED' ? 'Verified' : 'Unverified'}
                </div>
            </div>

            {/* Card Content */}
            <div className="p-5 flex flex-col h-full relative z-10">
                
                {/* Header: Logo & Name */}
                <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-[#18181b] p-1 border border-white/10 shrink-0 overflow-hidden">
                         <img 
                            src={casino.logo} 
                            alt={casino.name} 
                            className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-transform duration-500" 
                            loading="lazy"
                        />
                    </div>
                    <div>
                        <h3 className="text-lg font-black text-white uppercase tracking-tight font-orbitron group-hover:text-[#00FFC0] transition-colors truncate max-w-[150px]">
                            {casino.name}
                        </h3>
                        <div className="flex items-center gap-1 mt-1">
                            <span className="text-[#00FFC0] font-bold text-sm font-mono">{casino.rating.toFixed(1)}</span>
                            <div className="flex gap-0.5">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <div key={i} className={`w-1 h-1 rounded-full ${i < Math.floor(casino.rating) ? 'bg-[#00FFC0]' : 'bg-[#333]'}`}></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Key Stats (Grid) */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                     <div className="bg-[#121214] rounded-lg p-2 border border-white/5">
                        <span className="text-[9px] text-zinc-500 uppercase block mb-0.5">Payout</span>
                        <span className="text-xs text-white font-bold truncate block">{casino.withdrawalSpeed}</span>
                     </div>
                     <div className="bg-[#121214] rounded-lg p-2 border border-white/5">
                        <span className="text-[9px] text-zinc-500 uppercase block mb-0.5">KYC Level</span>
                        <span className={`text-xs font-bold truncate block ${casino.kycLevel === 'NONE' ? 'text-[#00FFC0]' : casino.kycLevel === 'LOW' ? 'text-yellow-500' : 'text-red-500'}`}>
                            {casino.kycLevel}
                        </span>
                     </div>
                </div>
                
                {/* Bonus Highlight */}
                <div className="mb-4 bg-[#00FFC0]/5 border border-[#00FFC0]/20 rounded-lg p-2 text-center">
                    <span className="text-[#00FFC0] text-xs font-bold font-rajdhani uppercase tracking-wide">{casino.bonus}</span>
                </div>
                
                {/* Tags - Mobile optimized to show limited */}
                <div className="flex flex-wrap gap-1.5 mb-4 mt-auto">
                     {casino.features.vpnFriendly && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/5 flex items-center gap-1">
                            <Globe className="w-2.5 h-2.5" /> VPN
                        </span>
                    )}
                     {casino.chains.slice(0, 3).map(chain => (
                        <span key={chain} className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/5">
                            {chain}
                        </span>
                    ))}
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2 mt-2">
                    <button 
                        className="h-9 rounded-lg bg-white/5 hover:bg-white/10 text-white text-[10px] font-bold uppercase tracking-wider border border-white/10 transition-colors"
                        onClick={(e) => { e.stopPropagation(); onSelect(casino); }}
                    >
                        Intel
                    </button>
                    <a 
                        href={`${casino.website}?ref=zapway`}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="h-9 rounded-lg bg-[#00FFC0] hover:bg-[#00FFC0]/90 text-black text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-1 transition-colors shadow-sm"
                    >
                        Play <ExternalLink className="w-3 h-3" />
                    </a>
                </div>
            </div>
        </div>
    );
});

const CasinoDetail: React.FC<{ casino: Casino; onBack: () => void }> = ({ casino, onBack }) => {
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => { window.scrollTo(0,0); }, []);

    return (
        <div className="min-h-screen bg-[#050505] text-white pb-32 relative overflow-x-hidden animate-fadeIn font-rajdhani">
            
            {/* Sticky Command Bar */}
            <div className="sticky top-16 z-40 w-full bg-black/90 backdrop-blur-md border-b border-white/5 transition-all duration-300">
                <div className="max-w-[1800px] mx-auto px-4 py-3 flex items-center justify-between">
                     <button 
                        onClick={onBack}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#00FFC0]/50 transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 text-[#00FFC0] group-hover:-translate-x-1 transition-transform" />
                        <span className="text-xs font-bold font-orbitron uppercase tracking-wider text-zinc-300 group-hover:text-white">Back to Grid</span>
                    </button>
                    
                    {/* Mobile Context Header */}
                    <div className="flex items-center gap-3 lg:hidden">
                         <span className="text-xs font-bold font-orbitron uppercase text-white">{casino.name}</span>
                         <div className={`w-2 h-2 rounded-full ${casino.status === 'VERIFIED' ? 'bg-[#00FFC0]' : 'bg-yellow-500'}`}></div>
                    </div>
                </div>
            </div>

            {/* Cinematic Hero Section */}
            <div className="relative min-h-[50vh] lg:min-h-[60vh] w-full overflow-hidden flex items-end pb-12 lg:pb-16 border-b border-white/5">
                <div className="absolute inset-0 bg-[#050505]">
                     <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent z-10"></div>
                     <div className="absolute top-0 left-0 right-0 h-[80%] opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#00FFC0]/30 via-transparent to-transparent"></div>
                </div>

                <div className="relative z-10 w-full max-w-[1800px] mx-auto px-4 lg:px-12">
                    <div className="flex flex-col lg:flex-row lg:items-end gap-6 lg:gap-12">
                        
                        {/* Logo Box */}
                        <div className="w-24 h-24 lg:w-48 lg:h-48 rounded-[1.5rem] lg:rounded-[2rem] bg-[#0e0e10] border border-white/10 p-2 lg:p-3 relative shrink-0 group shadow-2xl">
                            <img 
                                src={casino.logo} 
                                alt="" 
                                className="w-full h-full object-cover rounded-[1rem] lg:rounded-[1.5rem]" 
                                loading="lazy"
                            />
                        </div>

                        {/* Title Info */}
                        <div className="flex-1 space-y-4 lg:space-y-6">
                            <div>
                                <div className="flex flex-wrap items-center gap-3 mb-2 lg:mb-4">
                                    {casino.specialRanking === 'ETERNAL CROWN' && (
                                        <div className="px-3 py-1 rounded-full bg-[#00FFC0]/10 border border-[#00FFC0]/30 text-[#00FFC0] text-[9px] lg:text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5">
                                            <Gem className="w-3 h-3" /> Crown
                                        </div>
                                    )}
                                     <div className={`px-3 py-1 rounded-full border text-[9px] lg:text-[10px] font-bold font-mono flex items-center gap-1.5 ${casino.status === 'VERIFIED' ? 'border-[#00FFC0]/30 bg-[#00FFC0]/5 text-[#00FFC0]' : 'border-yellow-500/30 bg-yellow-500/5 text-yellow-500'}`}>
                                        <div className={`w-1.5 h-1.5 rounded-full ${casino.status === 'VERIFIED' ? 'bg-[#00FFC0] animate-pulse' : 'bg-yellow-500'}`}></div>
                                        {casino.status === 'VERIFIED' ? 'VERIFIED' : 'UNVERIFIED'}
                                    </div>
                                </div>
                                <h1 className="text-4xl lg:text-7xl font-black uppercase tracking-tighter text-white font-orbitron leading-none">
                                    {casino.name}
                                </h1>
                            </div>
                            
                            <p className="text-zinc-400 text-sm lg:text-lg font-medium max-w-3xl leading-relaxed border-l-2 border-[#00FFC0] pl-4">
                                {casino.description}
                            </p>
                        </div>

                        {/* Hero Stats */}
                        <div className="flex gap-8 lg:gap-12 border-t lg:border-t-0 lg:border-l border-white/10 pt-4 lg:pt-0 lg:pl-12">
                             <div>
                                 <p className="text-[10px] lg:text-xs font-orbitron text-zinc-500 uppercase tracking-widest mb-1">Trust Score</p>
                                 <p className="text-3xl lg:text-5xl font-black text-white font-orbitron">{casino.rating.toFixed(1)}</p>
                             </div>
                             <div>
                                 <p className="text-[10px] lg:text-xs font-orbitron text-zinc-500 uppercase tracking-widest mb-1">Bonus</p>
                                 <p className="text-lg lg:text-2xl font-bold text-[#00FFC0] font-rajdhani">{casino.bonus}</p>
                             </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="max-w-[1800px] mx-auto px-4 lg:px-12 py-8 lg:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                
                {/* Left Column (8 Cols) */}
                <div className="lg:col-span-8 space-y-8">
                    
                    {/* Tab Switcher */}
                    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                        {['TACTICAL ANALYSIS', 'COMPLIANCE', 'COMMUNITY FEED'].map((tab, i) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(i)}
                                className={`px-6 py-3 rounded-lg text-[10px] lg:text-xs font-black uppercase tracking-[0.15em] transition-colors whitespace-nowrap border ${activeTab === i ? 'bg-[#00FFC0] text-black border-[#00FFC0]' : 'bg-[#0e0e10] text-zinc-500 border-white/5 hover:border-white/20 hover:text-white'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Tab 1: Tactical Analysis */}
                    {activeTab === 0 && (
                        <div className="space-y-6 animate-fade-up">
                            {/* Pros & Cons */}
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-[#0c0c0e] border border-white/5 rounded-2xl p-6">
                                    <h4 className="text-neon-surge font-bold uppercase tracking-wider text-xs mb-4 flex items-center gap-2 font-orbitron">
                                        <ThumbsUp className="w-4 h-4" /> Strengths
                                    </h4>
                                    <ul className="space-y-3">
                                        {casino.pros.map((pro, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                                                <CheckCircle2 className="w-4 h-4 text-neon-surge mt-0.5 shrink-0" />
                                                {pro}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-[#0c0c0e] border border-white/5 rounded-2xl p-6">
                                    <h4 className="text-red-500 font-bold uppercase tracking-wider text-xs mb-4 flex items-center gap-2 font-orbitron">
                                        <ThumbsDown className="w-4 h-4" /> Weaknesses
                                    </h4>
                                    <ul className="space-y-3">
                                        {casino.cons.map((con, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                                                <X className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                                                {con}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                             </div>

                            {/* Advisory Banner */}
                            <div className={`p-6 lg:p-8 rounded-2xl border relative overflow-hidden ${casino.status === 'VERIFIED' ? 'bg-[#00FFC0]/5 border-[#00FFC0]/20' : 'bg-yellow-500/5 border-yellow-500/20'}`}>
                                <div className="flex items-start gap-4 lg:gap-6 relative z-10">
                                    <div className={`p-3 lg:p-4 rounded-xl shrink-0 ${casino.status === 'VERIFIED' ? 'bg-[#00FFC0]/10' : 'bg-yellow-500/10'}`}>
                                        {casino.status === 'VERIFIED' ? <ShieldCheck className="w-6 h-6 lg:w-8 lg:h-8 text-[#00FFC0]" /> : <ShieldAlert className="w-6 h-6 lg:w-8 lg:h-8 text-yellow-500" />}
                                    </div>
                                    <div>
                                        <h4 className={`text-xs lg:text-sm font-black uppercase tracking-[0.2em] mb-2 font-orbitron ${casino.status === 'VERIFIED' ? 'text-[#00FFC0]' : 'text-yellow-500'}`}>
                                            System Advisory Protocol
                                        </h4>
                                        <p className="text-sm lg:text-base text-zinc-300 leading-relaxed font-mono">{casino.advisory}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Corporate & Tech Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-[#08080a] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors group">
                                    <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-3 font-orbitron">
                                        <Landmark className="w-4 h-4 text-zinc-600 group-hover:text-white transition-colors" /> Corporate Structure
                                    </h4>
                                    <div className="space-y-4">
                                        <div className="flex justify-between border-b border-white/5 pb-2">
                                            <span className="text-xs text-zinc-500 font-mono tracking-wider">LICENSE</span>
                                            <span className="text-xs font-bold text-white">{casino.license}</span>
                                        </div>
                                        <div className="flex justify-between border-b border-white/5 pb-2">
                                            <span className="text-xs text-zinc-500 font-mono tracking-wider">FOUNDER</span>
                                            <span className="text-xs font-bold text-white">{casino.founder}</span>
                                        </div>
                                        <div className="flex justify-between border-b border-white/5 pb-2">
                                            <span className="text-xs text-zinc-500 font-mono tracking-wider">SIZE</span>
                                            <span className="text-xs font-bold text-white">{casino.companySize}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-[#08080a] border border-white/5 rounded-2xl p-6">
                                    <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] mb-6 font-orbitron">Platform Capabilities</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {Object.entries(casino.features).map(([key, val]) => (
                                            <div key={key} className="flex items-center justify-between p-3 rounded-lg bg-[#121214] border border-white/5">
                                                <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">{key.replace(/([A-Z])/g, ' $1')}</span>
                                                {val ? <CheckCircle2 className="w-3.5 h-3.5 text-[#00FFC0]" /> : <X className="w-3.5 h-3.5 text-zinc-800" />}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {/* Tab 2: KYC */}
                    {activeTab === 1 && (
                         <div className="space-y-6 animate-fade-up">
                            <div className="bg-[#08080a] border border-white/5 rounded-2xl p-8 text-center relative overflow-hidden">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-[#00FFC0]/50 to-transparent"></div>
                                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] mb-6 font-orbitron">Verification Friction Level</h4>
                                <div className="flex items-center justify-center gap-2 mb-6 max-w-md mx-auto">
                                    {['NONE', 'LOW', 'HIGH'].map((level, idx) => {
                                        const isActive = casino.kycLevel === level;
                                        const color = level === 'NONE' ? 'bg-[#00FFC0]' : level === 'LOW' ? 'bg-yellow-500' : 'bg-red-500';
                                        return (
                                            <div key={level} className={`flex-1 h-2 rounded-full transition-all duration-500 ${isActive ? color : 'bg-[#1a1a1c]'}`}></div>
                                        )
                                    })}
                                </div>
                                <p className="text-3xl font-black text-white font-orbitron mb-3">{casino.kycLevel} KYC</p>
                                <p className="text-zinc-400 max-w-md mx-auto leading-relaxed text-sm">
                                    {casino.kycLevel === 'NONE' 
                                        ? 'No personal identification required. Crypto-native wallet connection only.' 
                                        : casino.kycLevel === 'LOW' 
                                        ? 'Basic info required. ID only for large cashouts.'
                                        : 'Standard identity verification (ID + Selfie) required for withdrawals exceeding threshold.'}
                                </p>
                            </div>
                            
                             <div className="bg-[#08080a] border border-white/5 rounded-2xl p-6">
                                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2 font-orbitron">
                                    <Globe className="w-4 h-4" /> Restricted Zones
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {casino.restricted.map(r => (
                                        <span key={r} className="px-3 py-1.5 rounded bg-red-500/5 text-red-500 border border-red-500/20 text-[10px] font-bold uppercase tracking-wider">
                                            {r}
                                        </span>
                                    ))}
                                </div>
                            </div>
                         </div>
                    )}

                    {/* Tab 3: Community Feed (Placeholder) */}
                    {activeTab === 2 && (
                        <div className="bg-[#050505] rounded-2xl border border-[#333] overflow-hidden font-mono text-xs shadow-2xl animate-fade-up relative h-96">
                            <div className="absolute inset-0 flex items-center justify-center text-zinc-600 flex-col gap-4">
                                <Activity className="w-10 h-10 opacity-50" />
                                <span className="uppercase tracking-widest">Live Feed Connecting...</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column: Stats & CTA (4 Cols) */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Hero CTA Card */}
                    <div className="relative rounded-2xl overflow-hidden border border-[#00FFC0]/30 bg-[#00FFC0]/5 p-8 text-center group">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#00FFC0]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <p className="text-xs font-bold text-[#00FFC0] uppercase tracking-[0.25em] mb-4">Active Bounty</p>
                        <h3 className="text-4xl font-black text-white italic mb-8 font-orbitron tracking-tighter leading-none">{casino.bonus}</h3>
                        
                        <a 
                            href={`${casino.website}?ref=zapway`} 
                            target="_blank" 
                            rel="noreferrer"
                            className="block w-full py-4 bg-[#00FFC0] text-black font-black uppercase tracking-[0.15em] text-xs rounded-lg hover:bg-white hover:scale-[1.02] transition-all font-orbitron shadow-lg shadow-[#00FFC0]/20"
                        >
                            Claim Bonus
                        </a>
                        <p className="text-[9px] text-zinc-500 mt-4 font-mono">Terms & Conditions Apply. 18+</p>
                    </div>

                    {/* Info Blocks */}
                    <div className="space-y-4">
                         {/* Speed Metric */}
                        <div className="bg-[#08080a] rounded-xl border border-white/5 p-6 hover:border-white/10 transition-colors">
                            <div className="flex justify-between items-end mb-3">
                                <span className="text-xs text-zinc-500 uppercase tracking-[0.2em] font-orbitron">Speed</span>
                                <Timer className="w-4 h-4 text-[#00FFC0]" />
                            </div>
                            <div className="text-xl font-bold text-white font-rajdhani">{casino.withdrawalSpeed}</div>
                            <div className="h-1 w-full bg-[#222] rounded-full mt-4 overflow-hidden">
                                <div className="h-full bg-[#00FFC0] w-[95%]"></div>
                            </div>
                        </div>

                        {/* Networks */}
                         <div className="bg-[#08080a] rounded-xl border border-white/5 p-6 hover:border-white/10 transition-colors">
                            <span className="text-xs text-zinc-500 uppercase block mb-4 font-orbitron tracking-[0.2em]">Supported Networks</span>
                            <div className="flex flex-wrap gap-2">
                                {casino.chains.map(c => (
                                    <span key={c} className="px-2.5 py-1 bg-[#121214] text-zinc-300 text-[9px] font-bold rounded border border-white/5 hover:border-[#00FFC0]/50 hover:text-white transition-colors">
                                        {c}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

             {/* Mobile Sticky Footer */}
             <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#09090b]/95 border-t border-white/10 z-30 lg:hidden pb-[calc(1rem+env(safe-area-inset-bottom))] backdrop-blur-xl">
                <div className="flex gap-3 items-center max-w-md mx-auto">
                    <div className="flex-1">
                        <p className="text-[9px] text-zinc-500 uppercase font-orbitron tracking-wider">Bonus</p>
                        <p className="text-sm font-bold text-white truncate font-rajdhani">{casino.bonus}</p>
                    </div>
                    <a 
                        href={`${casino.website}?ref=zapway`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="px-6 py-3 bg-[#00FFC0] text-black font-black uppercase tracking-widest text-xs rounded-lg hover:bg-white transition-colors font-orbitron"
                    >
                        Play Now
                    </a>
                </div>
            </div>
        </div>
    );
};

// --- MAIN PAGE ---
const CasinoDirectoryPage: React.FC = () => {
    const [selectedCasinoId, setSelectedCasinoId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('ALL');
    const [sortBy, setSortBy] = useState<SortOption>('RATING_DESC');
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    
    // Advanced Filters State
    const [filters, setFilters] = useState({
        vpnFriendly: false,
        fiatOnramp: false,
        noKyc: false,
    });

    const filteredCasinos = useMemo(() => {
        let c = CASINOS.filter(casino => {
            if (!casino.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
            if (activeCategory === 'VERIFIED' && casino.status !== 'VERIFIED') return false;
            if (activeCategory === 'NO_KYC' && casino.kycLevel !== 'NONE') return false;
            if (activeCategory === 'CRYPTO' && casino.chains.length === 0) return false;
            
            // Advanced Filters
            if (filters.vpnFriendly && !casino.features.vpnFriendly) return false;
            if (filters.fiatOnramp && !casino.features.fiatOnramp) return false;
            if (filters.noKyc && casino.kycLevel !== 'NONE') return false;

            return true;
        });
        
        return sortCasinos(c, sortBy);
    }, [searchTerm, activeCategory, filters, sortBy]);

    if (selectedCasinoId) {
        const casino = CASINOS.find(c => c.id === selectedCasinoId);
        if (casino) return <CasinoDetail casino={casino} onBack={() => setSelectedCasinoId(null)} />;
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans pb-20 relative selection:bg-[#00FFC0] selection:text-black animate-fadeIn font-rajdhani">
            
            {/* Simplified Background */}
            <div className="fixed inset-0 pointer-events-none z-0 bg-[#050505]">
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#00FFC0]/5 blur-[150px] rounded-full opacity-20"></div>
            </div>

            {/* Main Container */}
            <div className="relative z-10 pt-4 lg:pt-8 px-0 lg:px-8">
                <div className="max-w-[1900px] mx-auto lg:bg-[#050505]/50 lg:rounded-[3rem] lg:border border-white/5 min-h-[calc(100vh-4rem)] relative">
                    
                    {/* Inner Top Glow (Desktop) */}
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00FFC0]/50 to-transparent hidden lg:block"></div>

                    {/* Hero Section */}
                    <div className="relative pt-12 lg:pt-16 pb-8 px-6 lg:px-12">
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-12">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00FFC0]/20 bg-[#00FFC0]/5 text-[#00FFC0] text-[9px] lg:text-[10px] font-bold uppercase tracking-[0.2em] mb-4 lg:mb-6 backdrop-blur-sm shadow-[0_0_15px_rgba(0,255,192,0.1)]">
                                    <Zap className="w-3 h-3" /> Live Grid Status // Online
                                </div>
                                <h1 className="text-5xl lg:text-8xl font-black uppercase tracking-tighter leading-none font-orbitron">
                                    Operator <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFC0] via-white to-[#00FFC0]">Grid</span>
                                </h1>
                            </div>
                            
                            {/* Stats Ticker - Mobile Scrollable */}
                            <div className="flex gap-3 overflow-x-auto no-scrollbar w-full lg:w-auto pb-2">
                                {[
                                    { label: 'Active Nodes', value: CASINOS.length, color: 'text-white' },
                                    { label: 'Compliance', value: '98.2%', color: 'text-[#00FFC0]' },
                                    { label: '24h Volume', value: '$42.5M', color: 'text-blue-400' }
                                ].map((stat, i) => (
                                    <div key={i} className="bg-[#0e0e10] border border-white/5 p-4 rounded-xl min-w-[140px] hover:border-[#00FFC0]/30 transition-colors group shrink-0">
                                        <p className="text-[9px] text-zinc-500 uppercase font-bold tracking-wider mb-1 font-orbitron group-hover:text-[#00FFC0] transition-colors">{stat.label}</p>
                                        <p className={`text-2xl font-black font-rajdhani ${stat.color}`}>{stat.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Command Bar - Desktop Sticky */}
                        <div className="sticky top-20 lg:top-4 z-30 transition-all duration-300">
                            <div className="bg-[#0e0e10]/90 backdrop-blur-xl border border-white/10 rounded-xl lg:rounded-2xl shadow-2xl p-2 flex flex-col lg:flex-row gap-2 relative overflow-hidden">
                                
                                {/* Mobile Filter Toggle */}
                                <div className="flex lg:hidden gap-2">
                                    <div className="relative flex-1 group">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-[#00FFC0] transition-colors" />
                                        <input 
                                            type="text" 
                                            placeholder="SEARCH..." 
                                            className="w-full h-10 pl-10 bg-[#050505] border border-white/5 rounded-lg text-white text-xs font-bold uppercase tracking-wider outline-none placeholder:text-zinc-700 focus:border-[#00FFC0]/40 focus:bg-[#0a0a0a] transition-all font-orbitron"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                    <button 
                                        onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                                        className={`h-10 px-4 rounded-lg border flex items-center justify-center gap-2 transition-colors ${isMobileFilterOpen ? 'bg-[#00FFC0] text-black border-[#00FFC0]' : 'bg-[#050505] border-white/5 text-zinc-400'}`}
                                    >
                                        <SlidersHorizontal className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Desktop Bar */}
                                <div className="hidden lg:flex items-center gap-3 w-full">
                                    <div className="relative flex-1 group">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-[#00FFC0] transition-colors" />
                                        <input 
                                            type="text" 
                                            placeholder="SEARCH FREQUENCY..." 
                                            className="w-full h-12 pl-12 bg-[#050505] border border-white/5 rounded-xl text-white text-xs font-bold uppercase tracking-wider outline-none placeholder:text-zinc-700 focus:border-[#00FFC0]/40 focus:bg-[#0a0a0a] transition-all font-orbitron"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                    <div className="h-8 w-px bg-white/10 mx-2"></div>
                                    <div className="flex gap-2">
                                        {['ALL', 'VERIFIED', 'NO_KYC', 'CRYPTO'].map(cat => (
                                            <button
                                                key={cat}
                                                onClick={() => setActiveCategory(cat)}
                                                className={`px-5 py-3 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-colors whitespace-nowrap border font-orbitron ${activeCategory === cat ? 'bg-[#00FFC0] text-black border-[#00FFC0]' : 'bg-[#050505] text-zinc-500 border-white/5 hover:border-white/20 hover:text-white'}`}
                                            >
                                                {cat.replace('_', ' ')}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="h-8 w-px bg-white/10 mx-2"></div>
                                    
                                    {/* Desktop Sort & Advanced Filters */}
                                    <div className="flex gap-2 items-center">
                                        <select 
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value as SortOption)}
                                            className="h-12 px-4 bg-[#050505] border border-white/5 rounded-xl text-xs text-zinc-400 font-orbitron uppercase focus:outline-none focus:border-[#00FFC0]/40 cursor-pointer"
                                        >
                                            <option value="RATING_DESC">Highest Rated</option>
                                            <option value="NEWEST">Newest Added</option>
                                            <option value="SPEED">Fastest Payout</option>
                                        </select>
                                        <button 
                                            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                                            className={`h-12 px-4 rounded-xl border flex items-center gap-2 transition-colors ${isMobileFilterOpen ? 'bg-[#00FFC0]/10 border-[#00FFC0] text-[#00FFC0]' : 'bg-[#050505] border-white/5 text-zinc-400 hover:text-white'}`}
                                        >
                                            <Filter className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Advanced Filter Drawer (Desktop & Mobile Logic) */}
                            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isMobileFilterOpen ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                                <div className="bg-[#0e0e10]/95 backdrop-blur-xl border border-white/10 rounded-xl p-4 lg:p-6 shadow-2xl">
                                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                                        <div>
                                            <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-3 font-orbitron">Core Features</h4>
                                            <div className="flex flex-wrap gap-2">
                                                <FilterChip label="VPN Friendly" icon={Globe} active={filters.vpnFriendly} onClick={() => setFilters(p => ({...p, vpnFriendly: !p.vpnFriendly}))} />
                                                <FilterChip label="Fiat On-Ramp" icon={CreditCard} active={filters.fiatOnramp} onClick={() => setFilters(p => ({...p, fiatOnramp: !p.fiatOnramp}))} />
                                                <FilterChip label="No KYC" icon={ShieldCheck} active={filters.noKyc} onClick={() => setFilters(p => ({...p, noKyc: !p.noKyc}))} />
                                            </div>
                                        </div>
                                        <div className="lg:col-span-2 lg:border-l border-white/10 lg:pl-6">
                                            <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-3 font-orbitron">Sort Order (Mobile)</h4>
                                            <div className="flex flex-wrap gap-2">
                                                 <FilterChip label="Highest Rated" active={sortBy === 'RATING_DESC'} onClick={() => setSortBy('RATING_DESC')} />
                                                 <FilterChip label="Newest Added" active={sortBy === 'NEWEST'} onClick={() => setSortBy('NEWEST')} />
                                                 <FilterChip label="Fastest Payout" active={sortBy === 'SPEED'} onClick={() => setSortBy('SPEED')} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Grid */}
                    <div className="px-4 lg:px-12 pb-24 relative z-10">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 lg:gap-6">
                            {filteredCasinos.map((casino, i) => (
                                <CasinoCard 
                                    key={casino.id} 
                                    casino={casino} 
                                    index={i} 
                                    onSelect={(c) => setSelectedCasinoId(c.id)} 
                                />
                            ))}
                        </div>
                        
                        {filteredCasinos.length === 0 && (
                            <div className="py-32 text-center border border-dashed border-white/10 rounded-[2rem] bg-[#0a0a0a]/50 mt-12">
                                <Activity className="w-16 h-16 text-zinc-800 mx-auto mb-6" />
                                <h3 className="text-2xl font-black text-zinc-600 uppercase tracking-widest font-orbitron">No Signal Found</h3>
                                <p className="text-zinc-700 mt-2 font-mono text-sm">Adjust filters to re-establish connection.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CasinoDirectoryPage;
