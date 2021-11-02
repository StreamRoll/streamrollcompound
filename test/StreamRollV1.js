const { Signer } = require("@ethersproject/abstract-signer");
const { expect, assert, should} = require("chai");

const provider = waffle.provider;

// npx hardhat test to run the tests
describe("StreamRolV1.sol", () => {
    //signerContract --> alice transactions
    let StreamRollV1Mock;
    let contract;
    let alice;
    let bob;
    let attacker;
    let signerContract; //alice is the signer
    let bobContract;
    let attackerContract;
    let aliceAddress;
    let bobAddress;
    let attackerAddress;

    beforeEach(async () => {

        [alice, bob, attacker] = await ethers.getSigners();
        aliceAddress = alice.address;
        bobAddress = bob.address;
        attackerAddress = attacker.address;
        StreamRollV1 = await ethers.getContractFactory("StreamRollV1Mock");
        contract = await StreamRollV1.deploy();
        signerContract = await contract.connect(alice);
        bobContract = await contract.connect(bob);
        attackerContract = await contract.connect(attacker);

    });

    describe("Correct deployment", () => {
        it("should have a payable function to recieve eth and update accordingly", async () => {
            const balance = await provider.getBalance(contract.address);
            expect(balance.toString()).to.equal("0");
            await alice.sendTransaction({
                to: contract.address,
                value: ethers.utils.parseEther("10")
            });
            const newBalance = await provider.getBalance(contract.address);
            expect(ethers.utils.formatEther(newBalance)).to.equal("10.0");
        });
  
    });

    describe("Core functionality", () => {
        it("should supply Eth to compound and update balances", async () => {
            let aliceBalance = await signerContract.getSuppliedBalances(aliceAddress);
            expect(aliceBalance.toString()).to.equal("0");
            await signerContract.supplyEthToCompound({
                value: ethers.utils.parseEther("1")
            });

            aliceBalance = await signerContract.getSuppliedBalances(aliceAddress);
            expect(aliceBalance.toString()).to.equal(ethers.utils.parseEther("1"));
        });
        it("should supply Eth --> convert it to cEth --> get Eth back", async () => {
            let aliceBalance = await signerContract.getSuppliedBalances(aliceAddress);
            let amount = ethers.utils.parseEther("10");
            let contractBalance = await provider.getBalance(contract.address);
            expect(contractBalance.toString()).to.equal("0");
            expect(aliceBalance.toString()).to.equal("0");
            await signerContract.supplyEthToCompound({
                value: amount
            });
            aliceBalance = await signerContract.getSuppliedBalances(aliceAddress);
            amount = ethers.utils.parseEther("10");
            expect(await aliceBalance.toString()).to.equal(amount);
            await signerContract.getEtherBack(amount);
            contractBalance = await provider.getBalance(contract.address);
            aliceBalance = await signerContract.getSuppliedBalances(aliceAddress);
            expect(aliceBalance.toString()).to.equal("0");
            expect(contractBalance.toString()).to.equal(amount);
        });
        it("getCheckout() balances should update accordingly", async () => {
            let amount = ethers.utils.parseEther("10");
            let aliceCheckout = await signerContract.getCheckout(aliceAddress);
            expect(aliceCheckout).to.equal("0");
            await signerContract.supplyEthToCompound({
                value:amount
            });
            aliceCheckout = await signerContract.getCheckout(aliceAddress);
            expect(aliceCheckout).to.equal("0");
            await signerContract.getEtherBack(amount);
            aliceCheckout = await signerContract.getCheckout(aliceAddress);
            expect(aliceCheckout).to.equal(amount);
            await signerContract.transferBack(amount, aliceAddress);
            aliceCheckout = await signerContract.getCheckout(aliceAddress);
            expect(aliceCheckout).to.equal("0");
        });
        it("should be able to borrow", async () => {
            let amount = ethers.utils.parseEther("100");
            expect(await signerContract.returnBorrowedBalances()).to.equal("0");
            await signerContract.supplyEthToCompound({
                value:amount
            });
            await signerContract.borrowFromCompound(amount);
            expect(await signerContract.returnBorrowedBalances()).to.equal(amount);
        });
        it("should be able to borrow & repay the borrow", async () => {
            let amount = ethers.utils.parseEther("100");
            expect(await signerContract.returnBorrowedBalances()).to.equal("0");
            await signerContract.supplyEthToCompound({
                value:amount
            });
            await signerContract.borrowFromCompound(amount);
            expect(await signerContract.returnBorrowedBalances()).to.equal(amount);
            await signerContract.repayDebt(amount);
            expect(await signerContract.returnBorrowedBalances()).to.equal("0");
        });
        
    });

    describe("Users journey", () => {
        it("should supply eth from 2 accounts and update accordingly", async () => {
            let aliceAmount = ethers.utils.parseEther("100");
            let bobAmount = ethers.utils.parseEther("1000");
            expect(await signerContract.getSuppliedBalances(aliceAddress)).to.equal("0");
            expect(await signerContract.getSuppliedBalances(bobAddress)).to.equal("0");
            //Alice supplying Eth
            await signerContract.supplyEthToCompound({
                value:aliceAmount
            });
            //Bob supplying Eth
            await bobContract.supplyEthToCompound({
                value:bobAmount
            });
            expect(await signerContract.getSuppliedBalances(aliceAddress)).to.equal(aliceAmount);
            expect(await signerContract.getSuppliedBalances(bobAddress)).to.equal(bobAmount);   
        });
        it("should borrow from compound from 2 accounts and update accordingly", async () => {
            let aliceAmount = ethers.utils.parseEther("100");
            let bobAmount = ethers.utils.parseEther("1000");
            //Alice supplying Eth
            await signerContract.supplyEthToCompound({
                value:aliceAmount
            });
            //Bob supplying Eth
            await bobContract.supplyEthToCompound({
                value:bobAmount
            });
            expect(await signerContract.returnBorrowedBalances()).to.equal("0");
            expect(await bobContract.returnBorrowedBalances()).to.equal("0");
            //Alice borrowing from compound
            await signerContract.borrowFromCompound(aliceAmount);
            //Bob borrowing from compound
            await bobContract.borrowFromCompound(bobAmount);
            expect(await signerContract.returnBorrowedBalances()).to.equal(aliceAmount);
            expect(await bobContract.returnBorrowedBalances()).to.equal(bobAmount);

        });
        it("should update checkout balances for 2 accounts", async () => {
            let aliceAmount = ethers.utils.parseEther("100");
            let bobAmount = ethers.utils.parseEther("1000");
             //Alice supplying Eth
            await signerContract.supplyEthToCompound({
                value:aliceAmount
            });
             //Bob supplying Eth
            await bobContract.supplyEthToCompound({
                value:bobAmount
            });
            expect(await signerContract.getCheckout(aliceAddress)).to.equal("0");
            expect(await signerContract.getCheckout(bobAddress)).to.equal("0");
            await signerContract.getEtherBack(aliceAmount);
            await bobContract.getEtherBack(bobAmount);
            expect(await signerContract.getCheckout(aliceAddress)).to.equal(aliceAmount);
            expect(await signerContract.getCheckout(bobAddress)).to.equal(bobAmount);
            await signerContract.transferBack(aliceAmount, aliceAddress);
            await bobContract.transferBack(bobAmount, bobAddress);
            expect(await signerContract.getCheckout(aliceAddress)).to.equal("0");
            expect(await signerContract.getCheckout(bobAddress)).to.equal("0");
        });
    });
    
    describe("attack vectors", () => {   
        it("should not work due to insufficient funds", async () => {
            await attackerContract.supplyEthToCompound({
                value:ethers.utils.parseEther("1")
            });
            //Trying to get more ether back than current balances
            //Should throw error
            await attackerContract.getEtherBack(
                ethers.utils.parseEther("1.0000001")
            );
        });
        it("should not be able to borrow", async () => {
            await attackerContract.supplyEthToCompound({
                value:ethers.utils.parseEther("1")
            });
            //Should throw error
            await attackerContract.borrowFromCompound(
                ethers.utils.parseEther("10000")
            );
        });
 
            
    });

});



