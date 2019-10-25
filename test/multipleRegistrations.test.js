const ethers = require('ethers');
const RegistrationArtifact = require('../build/Registration.json');
const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
const signer = provider.getSigner(0);

jest.setTimeout(10000);

it('Usually times out when two registrations occur', async () => {
    let contract = await new ethers.ContractFactory(
        RegistrationArtifact.abi,
        RegistrationArtifact.bytecode,
        signer
    ).deploy();

    const filter = contract.filters.Registered(1);
    
    let registration = new Promise((resolve, reject) => {
        contract.on(filter, (idx, event) => {
            event.removeListener();
            
            resolve({ idx: idx });
        });

        setTimeout(() => {
            reject(new Error('timeout'));
        }, 8000)
    });
    
    await contract.register(1);
    await contract.register(2);

    const event = await registration;
    expect(event.idx._hex).toBe('0x01')
})

it('Passes when just one registration occurs', async () => {
    let contract = await new ethers.ContractFactory(
        RegistrationArtifact.abi,
        RegistrationArtifact.bytecode,
        signer
    ).deploy();

    const idx = '0x03'
    const filter = contract.filters.Registered(idx);
    
    let registration = new Promise((resolve, reject) => {
        contract.on(filter, (idx, event) => {
            event.removeListener();
            
            resolve({ idx: idx });
        });

        setTimeout(() => {
            reject(new Error('timeout'));
        }, 8000)
    });
    
    await contract.register(idx);

    const event = await registration;
    expect(event.idx._hex).toBe(idx)
})
