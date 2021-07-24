export default {
  "tokens": {
    "TDEN": "0xceadbb9ef26f4e41a0e8d48940779af89695ff55",  
    "TGLD": "0xD6E915Ec2991e6ED27B70e6f14BBBFcB82BBD8Eb",
    "TEMR": "0x403F32c7E8b8dB7a8fFA52b183746C0b29f33570",
    "TSPP": "0xb4a2826fC5Da2b8385a3a154960efB1e450065d1",
    "TRBY": "0xC05101497AE24241cE8494866F1e000b49921117"
  },
  "farms": {
    "gold": {
      address: "0xd639bf461eC0e60388a1A964c77d22a976cfe7d3",
      resources: ["tgld"],
      rewardsPerBlock: ["15000000000000000"]
    },
    "emerald": {
      address: "0xd95Eb8a6aaF02C40aE07E1a0A31458667DB05fe4",
      resources: ["temr"],
      rewardsPerBlock: ["15000000000000000"]
    },
    "sapphire": {
      address: "0x5883D5C00674Ec6F60027A0223637B5550B47F03",
      resources: ["tspp"],
      rewardsPerBlock: ["15000000000000000"]
    },
    "ruby": {
      address: "0xcE928068D1b2C2758e4bDa5735829eC040e68a59",
      resources: ["trby"],
      rewardsPerBlock: ["15000000000000000"]
    }
  },
  "wrapped": {
    "WBNB": "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd"
  },
  "arch": {
    "pancakeRouter": "0xD99D1c33F9fC3444f8101754aBC46c52416550D1",
    "tdenMainPool": "0x0a174f9cf22e991565e52243125629448C1d95b3",
  }
}