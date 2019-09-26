const ethers = require('ethers');
const RegistrationArtifact = require('../build/Registration.json'); 
const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
const signer = provider.getSigner(0);

jest.setTimeout(20000);
it('Listens for the Registered event', async () => {
    let contract = await new ethers.ContractFactory(
        RegistrationArtifact.abi,
        RegistrationArtifact.bytecode,
        signer
    ).deploy();

let registeredEvent = new Promise((resolve, reject) => {
    contract.on('Registered', (idx, event) => {
        event.removeListener();

        resolve({ idx: idx });
    });

    });

    await contract.register(2);
    const event = await registeredEvent;

    expect(event.idx._hex).toBe('0x02')
})
